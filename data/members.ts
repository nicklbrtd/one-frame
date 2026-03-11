export type Member = {
  id: string;
  name: string;
  phrase: string;
  keywords: string[];
  mood: string;
  color: string;
};

export const members: Member[] = [
  {
    id: "alina",
    name: "Alina",
    phrase: "Quiet precision with a bright inner fire.",
    keywords: ["focus", "elegance", "patience"],
    mood: "Silver Morning",
    color: "#A9C4D6",
  },
  {
    id: "timur",
    name: "Timur",
    phrase: "Steady voice, sharp ideas, calm confidence.",
    keywords: ["structure", "clarity", "discipline"],
    mood: "Graphite Pulse",
    color: "#7D8A96",
  },
  {
    id: "lina",
    name: "Lina",
    phrase: "Warm energy that makes every room softer.",
    keywords: ["kindness", "light", "intuition"],
    mood: "Pearl Glow",
    color: "#C6D8D5",
  },
  {
    id: "daniel",
    name: "Daniel",
    phrase: "Curiosity in motion, always finding new angles.",
    keywords: ["motion", "play", "insight"],
    mood: "Mint Drift",
    color: "#8FB8B2",
  },
  {
    id: "mira",
    name: "Mira",
    phrase: "Poetic attention to details others miss.",
    keywords: ["sensitivity", "taste", "depth"],
    mood: "Soft Echo",
    color: "#B7BEC8",
  },
  {
    id: "artem",
    name: "Artem",
    phrase: "Bold decisions with controlled intensity.",
    keywords: ["drive", "strength", "presence"],
    mood: "Steel Horizon",
    color: "#94A7B8",
  },
];
