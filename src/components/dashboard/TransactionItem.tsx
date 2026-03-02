import type { Currency, Transaction } from "../../types";
import { timeAgo } from "../../utils/transactionItems";
import { formatMoney } from "../../utils/transactions";
import { categoryConfig } from "../transaction/categoryConfig";

interface TransactionItemProps {
  transaction: Transaction;
  currency: Currency;
}

export const TransactionItem = ({
  transaction,
  currency,
}: TransactionItemProps) => {
  const Icon = categoryConfig[transaction.category].icon;
  const iconColor = categoryConfig[transaction.category].color;
  const isExpense = transaction.amount < 0;
  return (
    <div className="scrollbar-hidden grid grid-cols-2 items-center gap-2 overflow-x-auto border-b border-slate-800 p-2 px-4 text-center transition-colors last:border-0 hover:bg-slate-800/50 md:mx-4">
      <div className="flex items-center gap-4 justify-self-start">
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
          <span
            className="text-xs text-slate-400"
            title={new Date(transaction.date).toLocaleDateString()}
          >
            {timeAgo(transaction.date)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-self-end md:grid-cols-2 md:justify-self-auto">
        <div
          className="justify-self-end truncate md:justify-self-auto"
          title={transaction.category}
        >
          {transaction.category}
        </div>
        <div
          className={`font-semibold ${isExpense ? "text-rose-400" : "text-emerald-400"} justify-self-end`}
        >
          {formatMoney(transaction.amount, currency)}
        </div>
      </div>
    </div>
  );
};
