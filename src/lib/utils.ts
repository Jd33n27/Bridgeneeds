import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount?: number | string | null, currency: string = "₦"): string {
  const safeCurrency = currency || "₦";
  if (amount === undefined || amount === null || amount === "") {
    return `${safeCurrency}0`;
  }
  const numericAmount = typeof amount === "number" ? amount : Number(amount);
  if (isNaN(numericAmount)) {
    return `${safeCurrency}0`;
  }
  return `${safeCurrency}${numericAmount.toLocaleString()}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}
