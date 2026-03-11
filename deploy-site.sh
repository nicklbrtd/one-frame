#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOCAL_DIR="${LOCAL_DIR:-$SCRIPT_DIR}"

SSH_HOST="${SSH_HOST:-185.43.6.127}"
SSH_USER="${SSH_USER:-root}"
SSH_PORT="${SSH_PORT:-22}"
SSH_TARGET="${SSH_USER}@${SSH_HOST}"

REMOTE_DIR="${REMOTE_DIR:-/opt/pdiv/one-frame}"
SERVICE_NAME="${SERVICE_NAME:-pdiv-site}"
APP_PORT="${APP_PORT:-3001}"
NODE_MAJOR="${NODE_MAJOR:-22}"

DOMAIN="${DOMAIN:-pdiv.duckdns.org}"
SETUP_NGINX="${SETUP_NGINX:-0}"
ENABLE_SSL="${ENABLE_SSL:-0}"
SKIP_APT="${SKIP_APT:-0}"

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  cat <<'EOF'
Usage:
  ./deploy-site.sh

Optional env vars:
  SSH_HOST=185.43.6.127
  SSH_USER=root
  SSH_PORT=22
  REMOTE_DIR=/opt/pdiv/one-frame
  SERVICE_NAME=pdiv-site
  APP_PORT=3001
  NODE_MAJOR=22
  DOMAIN=pdiv.duckdns.org
  SETUP_NGINX=0        # 1 = create/update nginx config
  ENABLE_SSL=0         # 1 = run certbot (works only with SETUP_NGINX=1)
  SKIP_APT=0           # 1 = skip apt installs/updates
EOF
  exit 0
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "Local rsync not found. Install rsync and retry."
  exit 1
fi

if ! command -v ssh >/dev/null 2>&1; then
  echo "Local ssh not found."
  exit 1
fi

if [[ ! -f "${LOCAL_DIR}/package.json" ]]; then
  echo "package.json not found in LOCAL_DIR=${LOCAL_DIR}"
  exit 1
fi

echo "==> Preparing server: ${SSH_TARGET}"
ssh -p "${SSH_PORT}" "${SSH_TARGET}" \
  "export REMOTE_DIR='${REMOTE_DIR}' SERVICE_NAME='${SERVICE_NAME}' APP_PORT='${APP_PORT}' NODE_MAJOR='${NODE_MAJOR}' DOMAIN='${DOMAIN}' SETUP_NGINX='${SETUP_NGINX}' ENABLE_SSL='${ENABLE_SSL}' SKIP_APT='${SKIP_APT}'; bash -s" <<'REMOTE_SETUP'
set -Eeuo pipefail

if [[ "${SKIP_APT}" != "1" ]]; then
  apt-get update -y
  apt-get install -y rsync curl ca-certificates
fi

mkdir -p "${REMOTE_DIR}"

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found after Node.js installation."
  exit 1
fi

cat > "/etc/systemd/system/${SERVICE_NAME}.service" <<EOF
[Unit]
Description=P9IV Next.js Site
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
Group=root
WorkingDirectory=${REMOTE_DIR}
Environment=NODE_ENV=production
Environment=PORT=${APP_PORT}
ExecStart=/usr/bin/npm run start -- -p ${APP_PORT}
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable "${SERVICE_NAME}" >/dev/null 2>&1 || true

if [[ "${SETUP_NGINX}" == "1" ]]; then
  if [[ "${SKIP_APT}" != "1" ]]; then
    apt-get install -y nginx
  fi

  cat > "/etc/nginx/sites-available/${DOMAIN}" <<EOF
server {
  listen 80;
  server_name ${DOMAIN};

  location / {
    proxy_pass http://127.0.0.1:${APP_PORT};
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
EOF

  ln -sf "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
  nginx -t
  systemctl reload nginx

  if [[ "${ENABLE_SSL}" == "1" ]]; then
    if [[ "${SKIP_APT}" != "1" ]]; then
      apt-get install -y certbot python3-certbot-nginx
    fi
    certbot --nginx -d "${DOMAIN}" --non-interactive --agree-tos -m "admin@${DOMAIN}" --redirect || true
  fi
fi
REMOTE_SETUP

echo "==> Syncing files to ${SSH_TARGET}:${REMOTE_DIR}"
rsync -avz --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude .DS_Store \
  -e "ssh -p ${SSH_PORT}" \
  "${LOCAL_DIR}/" "${SSH_TARGET}:${REMOTE_DIR}/"

echo "==> Installing deps, building and restarting service"
ssh -p "${SSH_PORT}" "${SSH_TARGET}" \
  "cd '${REMOTE_DIR}' && npm ci && npm run build && systemctl restart '${SERVICE_NAME}' && systemctl --no-pager --full status '${SERVICE_NAME}' | sed -n '1,30p'"

echo
echo "Done."
echo "Useful checks:"
echo "  ssh -p ${SSH_PORT} ${SSH_TARGET} \"journalctl -u ${SERVICE_NAME} -f\""
if [[ "${SETUP_NGINX}" == "1" ]]; then
  echo "  https://${DOMAIN}"
fi
