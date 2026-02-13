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
import type { Category } from "../../types";

export const categoryIconMap: Record<Category, LucideIcon> = {
  Housing: House,
  Food: Utensils,
  Transport: Car,
  Utilities: UtilityPole,
  Entertainment: Film,
  Income: Coins,
  Other: ChevronsLeftRight,
};
