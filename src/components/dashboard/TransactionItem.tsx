import type { Transaction } from "../../types";
import { categoryConfig } from "../transaction/categoryConfig";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const Icon = categoryConfig[transaction.category].icon;
  const iconColor = categoryConfig[transaction.category].color;
  const isExpense = transaction.amount < 0;
  return (
    <div className="mx-4 flex items-center justify-between border-b border-slate-800 p-3 px-4 text-center transition-colors last:border-0 hover:bg-slate-800/50">
      <div className="flex items-center gap-4">
        <span
          className="rounded-full p-3"
          style={{ backgroundColor: iconColor }}
        >
          <Icon size={20} />
        </span>
        <div className="flex flex-col items-start">
          <p
            className="max-w-24 truncate font-medium text-slate-100"
            title={transaction.description}
          >
            {transaction.description}
          </p>
          <span className="text-xs text-slate-400">
            {new Date(transaction.date).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div>{transaction.category}</div>
      <div
        className={`font-semibold ${isExpense ? "text-rose-400" : "text-emerald-400"}`}
      >
        {isExpense ? "-" : "+"}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Math.abs(transaction.amount))}
      </div>
    </div>
  );
};
