export type Moment = {
  id: string;
  title: string;
  caption: string;
  tone: string;
};

export const moments: Moment[] = [
  {
    id: "m-1",
    title: "Перед презентацией",
    caption: "Тихие десять минут, когда все становятся особенно собранными.",
    tone: "linear-gradient(145deg, #0b1320 0%, #21446a 100%)",
  },
  {
    id: "m-2",
    title: "Окно в библиотеке",
    caption: "Дневной свет над открытыми ноутбуками и рукописными заметками.",
    tone: "linear-gradient(145deg, #0d1621 0%, #1b5063 100%)",
  },
  {
    id: "m-3",
    title: "Разговор в коридоре",
    caption: "Идеи продолжаются между парами, на ходу.",
    tone: "linear-gradient(145deg, #081019 0%, #176265 100%)",
  },
  {
    id: "m-4",
    title: "Поздняя сессия",
    caption: "Уставшие глаза, уверенные руки и еще один финальный штрих.",
    tone: "linear-gradient(145deg, #111425 0%, #3a2d67 100%)",
  },
  {
    id: "m-5",
    title: "Маленький праздник",
    caption: "Момент после сдачи, когда все выдыхают вместе.",
    tone: "linear-gradient(145deg, #0b1420 0%, #38507d 100%)",
  },
  {
    id: "m-6",
    title: "Обычный день",
    caption: "Ничего особенного не случилось, и все же это стало частью нас.",
    tone: "linear-gradient(145deg, #0c1117 0%, #264447 100%)",
  },
];
