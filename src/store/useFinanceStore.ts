import { create } from "zustand";
import type { Transaction, MonthlyStats } from "../types";

interface FinanceStore {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  getMonthlyStats: () => MonthlyStats;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: new Date(2026, 1, 20),
    amount: 5000,
    description: "Salary",
    category: "Income",
  },
  {
    id: "2",
    date: new Date(2026, 1, 22),
    amount: -1200,
    description: "Rent",
    category: "Housing",
  },
  {
    id: "3",
    date: new Date(2026, 1, 24),
    amount: 5000,
    description: "Grocery Run",
    category: "Food",
  },
];

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  transactions: MOCK_TRANSACTIONS,

  addTransaction: (newTx) =>
    set((state) => ({ transactions: [newTx, ...state.transactions] })),

  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id != id),
    })),

  getMonthlyStats: () => {
    const { transactions } = get();
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
  },
}));
