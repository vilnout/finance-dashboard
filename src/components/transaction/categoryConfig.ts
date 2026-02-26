import {
  House,
  Utensils,
  Car,
  UtilityPole,
  Film,
  Coins,
  ChevronsLeftRight,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { Category, ExpenseCategory } from "../../types";

type CategoryConfig = {
  icon: LucideIcon;
  color: string;
};

export const categoryConfig = {
  Housing: { icon: House, color: "#0ea5e9" },
  Food: { icon: Utensils, color: "#22c55e" },
  Transport: { icon: Car, color: "#eab308" },
  Utilities: { icon: UtilityPole, color: "#f97316" },
  Entertainment: { icon: Film, color: "#ef4444" },
  Income: { icon: Coins, color: "#a855f7" },
  Other: { icon: ChevronsLeftRight, color: "#F23a98" },
} satisfies Record<string, CategoryConfig>;

export const expenseCategories = (
  Object.keys(categoryConfig) as Category[]
).filter((c): c is ExpenseCategory => c !== "Income");
