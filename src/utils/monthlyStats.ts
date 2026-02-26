import type { Transaction } from "../types";

export const getMonthlyStats = (transactions: Transaction[]) => {
  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
  let monthlyIncome: number = 0;
  let monthlyExpenses: number = 0;

  transactions.forEach((tnx) => {
    if (tnx.amount > 0) {
      monthlyIncome += tnx.amount;
    } else {
      monthlyExpenses += Math.abs(tnx.amount);
    }
  });

  const monthlySavings = monthlyIncome - monthlyExpenses;
  const savingsRate = Math.round((monthlySavings / monthlyIncome) * 100);

  return { totalBalance, monthlyIncome, monthlyExpenses, savingsRate };
};
