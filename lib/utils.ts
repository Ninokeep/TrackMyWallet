import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Updater } from "@tanstack/vue-table";
import { type Ref } from "vue";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref
) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}

export function totalPages(items: number, take: number) {
  return Math.ceil(items / take);
}

export function skip(pages: number, take: number) {
  return (pages - 1) * take;
}

export function hasNextPage(currentPage: number, pageCount: number) {
  return currentPage < pageCount;
}

export function hasPreviousPage(currentPage: number) {
  return currentPage > 1;
}
