import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currency } from "./types";
import { DEFAULT_RANGE, Range, RANGES, Tab, TABS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validatePair = (
  currencies: Currency[],
  from: string,
  to: string,
) => {
  return (
    currencies.some((c) => c.iso_code === from.toUpperCase()) &&
    currencies.some((c) => c.iso_code === to.toUpperCase())
  );
};

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export const formatNumber = (n: number) => numberFormatter.format(n);

export function amountSizeClass(len: number) {
  if (len <= 5) return "text-preset-1";
  if (len <= 10) return "text-preset-2";
  return "text-preset-3";
}

export function getValidTab(tab: string | undefined | null): Tab {
  // TABS.some(...) → si existe, devolvemos el tab; si no, TABS[0].value
  return TABS.some((t: { value: string }) => t.value === tab)
    ? (tab as Tab)
    : (TABS[0].value as Tab);
}

export function buildHref(
  current: Record<string, string | undefined>,
  updates: Record<string, string | undefined>,
): string {
  // 1. combinar current + updates (updates gana)
  // 2. omitir claves cuyo valor sea undefined/""
  // 3. devolver "?" + querystring
  const combined = { ...current, ...updates };
  const filtered = Object.fromEntries(
    Object.entries(combined).filter(
      (entry): entry is [string, string] =>
        typeof entry[1] === "string" && entry[1] !== "",
    ),
  );
  return "?" + new URLSearchParams(filtered).toString();
}

const isValidRange = (r: unknown): r is Range => RANGES.includes(r as Range);

export function getValidRange(range: string | undefined | null): Range {
  // devuelve range si es un valor válido, si no → DEFAULT_RANGE
  return isValidRange(range) ? range : DEFAULT_RANGE;
}

const format = (d: Date) => d.toISOString().split("T")[0];

export function getDateRange(range: Range): { start: string; end: string } {
  const end = new Date(); // hoy
  const start = new Date(); // arranca como hoy y le vamos a restar

  switch (range) {
    case "1W":
      start.setDate(start.getDate() - 7);
      break;
    case "1M":
      start.setMonth(start.getMonth() - 1);
      break;
    case "3M":
      start.setMonth(start.getMonth() - 3);
      break;
    case "1Y":
      start.setFullYear(start.getFullYear() - 1);
      break;
    case "5Y":
      start.setFullYear(start.getFullYear() - 5);
      break;
  }

  return {
    start: format(start),
    end: format(end),
  };
}

export const getValuePrefix = (
  value: number,
  type: "number" | "change" | "percentChange",
) => {
  if (type === "number") {
    return value;
  }
  const percent = type === "percentChange" ? "%" : "";
  const decimals = type === "percentChange" ? 2 : 4;

  const absValue = Math.abs(value);
  if (value > 0) {
    return `+${absValue.toFixed(decimals)}${percent}`;
  }
  if (value < 0) {
    return `-${absValue.toFixed(decimals)}${percent}`;
  }
  if (value === 0) {
    return `${Math.abs(value).toFixed(decimals)}${percent}`;
  }
};

export const getValueClass = (
  value: number,
  type: "number" | "change" | "percentChange",
) => {
  const isPositive = value > 0;
  if (type === "percentChange") {
    return isPositive
      ? " font-semibold text-green-500"
      : " font-semibold text-neutral-50";
  }
  if (type === "change") {
    return isPositive
      ? " font-semibold text-green-500"
      : " font-semibold text-neutral-50";
  }
};
