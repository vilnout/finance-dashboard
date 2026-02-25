import { create } from "zustand";
import type {
  Transaction,
  MonthlyStats,
  Budget,
  BudgetProgress,
} from "../types";

interface FinanceStore {
  transactions: Transaction[];
  budgets: Budget[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  getMonthlyStats: () => MonthlyStats;
  getBudgetProgress: () => BudgetProgress[];
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
    amount: -1600,
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
  {
    id: "4",
    date: new Date(2026, 1, 26),
    amount: -200,
    description: "Food",
    category: "Food",
  },
  {
    id: "5",
    date: new Date(2026, 1, 28),
    amount: -301,
    description: "Movies",
    category: "Entertainment",
  },
];

const MOCK_BUDGETS: Budget[] = [
  { id: "b1", category: "Food", limit: 800 },
  { id: "b2", category: "Housing", limit: 2000 },
  { id: "b3", category: "Transport", limit: 400 },
  { id: "b4", category: "Entertainment", limit: 300 },
];

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  transactions: MOCK_TRANSACTIONS,
  budgets: MOCK_BUDGETS,

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

  getBudgetProgress: () => {
    const { transactions, budgets } = get();
    return budgets.map((budget) => {
      const spent = transactions
        .filter((t) => t.category === budget.category && t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const remaining = budget.limit - spent;
      const percentage = Math.min((spent / budget.limit) * 100, 100);

      return {
        ...budget,
        spent,
        remaining,
        percentage,
      };
    });
  },
}));
