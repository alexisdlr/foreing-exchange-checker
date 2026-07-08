export const POPULAR_CODES = ["USD", "EUR", "GBP", "JPY"];
export const TABS = [
  { label: "History", value: "history" },
  { label: "Logs", value: "logs" },
  { label: "Compare", value: "compare" },
  { label: "Favorites", value: "favorites" },
] as const;

export type Tab = (typeof TABS)[number]["value"];
export const DEFAULT_PAIR = {
  from: "USD",
  to: "EUR",
};
