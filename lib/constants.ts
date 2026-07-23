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

export const TOMBSTONE_RETENTION_DAYS = 30;

export const TOAST_POSITION = "top-right";
export const TOAST_STYLE = {
  background: "bg-neutral-900",
  color: "text-white",
  border: "border-neutral-700",
  borderRadius: "rounded-md",
  padding: "p-4",
  fontSize: "text-sm",
  fontWeight: "bold",
  textAlign: "center",
  fontFamily: "font-mono",
};
