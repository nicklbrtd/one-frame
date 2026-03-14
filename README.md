# П9ИВ (one-frame)

Сайт на Next.js со статическим экспортом для Cloudflare Pages.

## Локальный запуск

```bash
npm install
npm run dev
```

Открой `http://localhost:3000`.

## Продакшн сборка

```bash
npm run build
```

После сборки статический сайт лежит в папке `out/`.

## Деплой

Проект деплоится через **Cloudflare Pages** из GitHub.

Рекомендуемые настройки Pages:

- Build command: `npm run build`
- Build output directory: `out`
