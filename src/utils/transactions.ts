import type { Currency, Transaction } from "../types";

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
    const date = new Date(tnx.date);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!acc[yearMonth]) {
      acc[yearMonth] = { income: 0, expense: 0 };
    }

    if (tnx.amount > 0) {
      acc[yearMonth].income += Math.round(tnx.amount);
    } else {
      acc[yearMonth].expense += Math.round(Math.abs(tnx.amount));
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
  typeFilter: string,
  categoryFilter: string,
  transactions: Transaction[],
  urlMonth?: string,
  urlYear?: string,
) => {
  return transactions
    .filter((tnx) => {
      const matchesSearch = tnx.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      let matchesType: boolean;

      if (typeFilter === "All") {
        matchesType = true;
      } else if (typeFilter === "Income") {
        matchesType = tnx.amount > 0;
      } else if (typeFilter === "Expense") {
        matchesType = tnx.amount < 0;
      } else {
        matchesType = false;
      }

      const matchesCategory =
        tnx.category === categoryFilter || categoryFilter === "All Categories";

      let matchesDate = true;
      if (urlMonth && urlYear) {
        const txDate = new Date(tnx.date);
        matchesDate =
          txDate.getMonth().toString() === urlMonth &&
          txDate.getFullYear().toString() === urlYear;
      }

      return matchesSearch && matchesCategory && matchesType && matchesDate;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const formatMoney = (
  value: number,
  currency: Currency,
  locale?: string,
) => {
  const resolvedLocale =
    locale ?? (typeof navigator !== "undefined" ? navigator.language : "en-US");
  return new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency,
  }).format(value);
};
