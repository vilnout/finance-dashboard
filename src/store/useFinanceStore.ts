import { create } from "zustand";
import { MOCK_BUDGETS, MOCK_TRANSACTIONS } from "../data/mockData";
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
