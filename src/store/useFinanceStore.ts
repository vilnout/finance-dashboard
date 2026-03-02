import { create } from "zustand";
import type { Budget, Transaction } from "../types";

interface FinanceStore {
  transactions: Transaction[];
  budgets: Budget[];
  currentMonth: Date;

  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;

  addBudget: (budget: Budget) => void;
  updateBudget: (id: string, limit: number) => void;
  deleteBudget: (id: string) => void;
  setCurrentMonth: (date: Date) => void;
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

export const useFinanceStore = create<FinanceStore>((set) => ({
  transactions: MOCK_TRANSACTIONS,
  budgets: MOCK_BUDGETS,
  currentMonth: new Date(),

  setCurrentMonth: (date) => set({ currentMonth: date }),

  addBudget: (newBudget) =>
    set((state) => ({ budgets: [...state.budgets, newBudget] })),

  updateBudget: (id, newLimit) =>
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.id === id ? { ...b, limit: newLimit } : b,
      ),
    })),

  deleteBudget: (id) =>
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
    })),

  addTransaction: (newTx) =>
    set((state) => ({ transactions: [newTx, ...state.transactions] })),

  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id != id),
    })),
}));
