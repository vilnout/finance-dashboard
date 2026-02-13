import { useFinanceStore } from "../../store/useFinanceStore";
import { TransactionItem } from "./TransactionItem";

export const RecentTransactions = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  const sortedTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="flex h-full flex-col border-slate-800 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100">
          Recent Activity
        </h3>
        <button className="text-sm text-blue-500 hover:text-blue-400">
          View all
        </button>
      </div>
      <div className="space-y-1">
        {sortedTransactions.length === 0 ? (
          <p>No Transactions yet</p>
        ) : (
          sortedTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
};
