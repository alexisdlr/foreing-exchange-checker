import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currency } from "./types";

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
