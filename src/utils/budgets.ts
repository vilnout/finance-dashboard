import type { Budget, Transaction, Category, BudgetProgress } from "../types";
import { groupTransactionsByMonth } from "./transactions";

export const getBudgetProgress = (
  transactions: Transaction[],
  budgets: Budget[],
  currentMonth: Date,
): BudgetProgress[] => {
  const key = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const grouped = groupTransactionsByMonth(transactions);
  const data = grouped.get(key);

  if (!data) {
    return budgets.map((budget) => {
      return {
        ...budget,
        spent: 0,
        remaining: budget.limit,
        percentage: 0,
      };
    });
  }

  const expenseMap = new Map<Category, number>();

  for (const t of data) {
    const current = expenseMap.get(t.category) ?? 0;
    if (t.amount < 0) expenseMap.set(t.category, current + Math.abs(t.amount));
  }

  return budgets.map((budget) => {
    const spent = expenseMap.get(budget.category) ?? 0;
    const remaining = budget.limit - spent;
    const percentage = Math.min((spent / budget.limit) * 100, 100);
    return {
      ...budget,
      spent,
      remaining,
      percentage,
    };
  });
};
