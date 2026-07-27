export type QuoteItem = {
  id: string;
  lines: [string, string];
};

export const quotes: QuoteItem[] = [
  {
    id: "attention",
    lines: ["Widz decyduje w kilka sekund:", "zostać albo kliknąć dalej"],
  },
  {
    id: "sound",
    lines: ["Obraz wprowadza", "Dźwięk wciąga"],
  },
  {
    id: "seconds",
    lines: [
      "W reklamie liczy się każda sekunda",
      "Dobry dźwięk wykorzystuje każdą z nich",
    ],
  },
];
