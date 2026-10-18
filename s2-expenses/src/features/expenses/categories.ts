import type { Category } from "@/db/expenseRepo";

export const CATEGORIES: Category[] = [
  "food",
  "transport",
  "housing",
  "leisure",
  "other",
];

export const CATEGORY_LABELS: Record<Category, string> = {
  food: "Alimentation",
  transport: "Transport",
  housing: "Logement",
  leisure: "Loisirs",
  other: "Autre",
};
// The filter of the list: one category, or all of them.
export type CategoryFilter = Category | "all";
