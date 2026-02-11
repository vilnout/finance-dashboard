export type Category =
  | "Housing"
  | "Food"
  | "Transport"
  | "Utilities"
  | "Entertainment"
  | "Income"
  | "Other";

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
}
