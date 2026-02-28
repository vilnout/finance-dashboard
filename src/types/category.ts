import { categoryConfig } from "../components/transaction/categoryConfig";

export const isCategoryName = (
  name: string,
): name is keyof typeof categoryConfig => {
  return name in categoryConfig;
};
