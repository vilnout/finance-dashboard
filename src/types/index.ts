import {
  transactionFormCategories,
  type categoryConfig,
} from "../components/transaction/categoryConfig";
import type { currencyConfig } from "../components/transaction/currencyConfig";

export type Category = keyof typeof categoryConfig;

export type ExpenseCategory = Exclude<Category, "Income">;

export type TransactionFormCategory =
  (typeof transactionFormCategories)[number];

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  description: string;
  category: Category;
}

export interface MonthlyStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

export interface Budget {
  id: string;
  category: ExpenseCategory;
  limit: number;
}

export interface BudgetProgress extends Budget {
  spent: number;
  remaining: number;
  percentage: number;
}

export type ToastType = "success" | "error" | "info";

export type Currency = keyof typeof currencyConfig;
