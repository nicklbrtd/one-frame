export type Moment = {
  id: string;
  title: string;
  caption: string;
  tone: string;
};

export const moments: Moment[] = [
  {
    id: "m-1",
    title: "Before Presentation",
    caption: "The quiet ten minutes where everyone becomes extra attentive.",
    tone: "linear-gradient(145deg, #e3ebef 0%, #cfdbe4 100%)",
  },
  {
    id: "m-2",
    title: "Library Window",
    caption: "Afternoon light over open laptops and handwritten notes.",
    tone: "linear-gradient(145deg, #dbe3e8 0%, #c6d5de 100%)",
  },
  {
    id: "m-3",
    title: "Corridor Talk",
    caption: "Ideas continue between classes, in motion.",
    tone: "linear-gradient(145deg, #d7e5e2 0%, #bfd4d0 100%)",
  },
  {
    id: "m-4",
    title: "Late Session",
    caption: "Tired eyes, steady hands, and one more final polish.",
    tone: "linear-gradient(145deg, #d5dce5 0%, #c4ced8 100%)",
  },
  {
    id: "m-5",
    title: "Small Celebration",
    caption: "The moment after submitting when everyone exhales together.",
    tone: "linear-gradient(145deg, #e5e7ec 0%, #d4dae2 100%)",
  },
  {
    id: "m-6",
    title: "Ordinary Day",
    caption: "Nothing special happened, and still it became part of us.",
    tone: "linear-gradient(145deg, #dee7e6 0%, #c9d9d7 100%)",
  },
];
