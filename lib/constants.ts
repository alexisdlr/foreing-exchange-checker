export const POPULAR_CODES = ["USD", "EUR", "GBP", "JPY"];
export const TABS = [
  { label: "History", value: "history" },
  { label: "Compare", value: "compare" },
  { label: "Logs", value: "logs" },
  { label: "Favorites", value: "favorites" },
] as const;

export type Tab = (typeof TABS)[number]["value"];
export const DEFAULT_PAIR = {
  from: "USD",
  to: "EUR",
};
export const RANGES = ["1W", "1M", "3M", "1Y", "5Y"] as const;

export type Range = (typeof RANGES)[number];
// Range = "1W" | "1M" | "3M" | "1Y" | "5Y"

export const DEFAULT_RANGE: Range = "1M";
