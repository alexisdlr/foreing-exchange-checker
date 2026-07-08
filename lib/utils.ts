import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currency } from "./types";
import { Tab, TABS } from "./constants";

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
