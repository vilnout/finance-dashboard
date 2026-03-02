import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import type { Currency, Transaction } from "../../types";
import { TransactionItem } from "./TransactionItem";

interface RecentTransactionsProps {
  transactions: Transaction[];
  currency: Currency;
}

export const RecentTransactions = ({
  transactions,
  currency,
}: RecentTransactionsProps) => {
  const sortedTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="flex h-full flex-col border-slate-800">
      <div className="mb-6 flex items-center justify-between px-5 pt-6">
        <h3 className="text-lg font-semibold text-slate-100">
          Recent Activity
        </h3>
        <Link
          className="text-sm text-blue-500 hover:text-blue-400"
          to={ROUTES.TRANSACTIONS}
        >
          View all
        </Link>
      </div>
      {sortedTransactions.length === 0 ? (
        <p className="flex grow items-center justify-center p-8 text-slate-400">
          No Transactions yet
        </p>
      ) : (
        <div className="space-y-1">
          {sortedTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              currency={currency}
            />
          ))}
        </div>
      )}
    </div>
  );
};
