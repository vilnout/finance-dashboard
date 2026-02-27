import type { Transaction, TransactionFormCategory } from "../types";

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

export const groupTransactionsByMonth = (transactions: Transaction[]) => {
  const map = new Map<string, Transaction[]>();

  for (const t of transactions) {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(t);
  }
  return map;
};

export const filterTransactions = (
  searchTerm: string,
  categoryFilter: TransactionFormCategory,
  transactions: Transaction[],
) => {
  return transactions
    .filter((tnx) => {
      const matchesSearch = tnx.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        tnx.category === categoryFilter ||
        categoryFilter === "All Categories" ||
        (categoryFilter === "Expenses" && tnx.amount < 0);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
