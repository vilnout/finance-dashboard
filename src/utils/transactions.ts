import type { Transaction } from "../types";

interface AccTransactions {
  [name: string]: {
    income: number;
    expense: number;
  };
}

export interface GroupedTransactions {
  date: string;
  income: number;
  expenses: number;
  balance: number;
}

export const aggregrateTransactions = (
  transactions: Transaction[],
): GroupedTransactions[] => {
  const acc = transactions.reduce<AccTransactions>((acc, tnx) => {
    const date = new Date(tnx.date).toLocaleDateString();

    if (!acc[date]) {
      acc[date] = { income: 0, expense: 0 };
    }

    if (tnx.amount > 0) {
      acc[date].income += tnx.amount;
    } else {
      acc[date].expense += Math.abs(tnx.amount);
    }

    return acc;
  }, {});

  return Object.entries(acc)
    .sort(
      ([dateA], [dateB]) =>
        new Date(dateA).getTime() - new Date(dateB).getTime(),
    )
    .map(([key, value]) => ({
      date: key,
      income: value.income,
      expenses: value.expense,
      balance: value.income - value.expense,
    }));
};
