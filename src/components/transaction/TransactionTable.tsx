import { useState } from "react";
import { useFinanceStore } from "../../store/useFinanceStore";
import { Search, Trash2 } from "lucide-react";
import { AddTransactionButton } from "../ui/AddTransactionButton";

const baseStyles =
  "rounded-lg border border-slate-800 bg-slate-950 focus:ring-2 focus:ring-blue-500 focus:outline-none";

type TransactionTableProps = {
  setIsModalOpen: (value: boolean) => void;
};

export const TransactionTable = ({ setIsModalOpen }: TransactionTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const transactions = useFinanceStore((state) => state.transactions);
  const removeTransaction = useFinanceStore((state) => state.removeTransaction);

  const filteredTransactions = transactions
    .filter((tnx) => {
      const matchesSearch = tnx.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || tnx.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col justify-between gap-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4 sm:flex-row">
        <div className="relative">
          <Search
            size={20}
            className="absolute top-2.5 left-3 text-slate-500"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${baseStyles} w-full py-2 pr-4 pl-10 text-white sm:w-64`}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`${baseStyles} px-4 py-2 text-white focus:outline-none`}
        >
          <option value="All">All Categories</option>
          <option value="Income">Income</option>
          <option value="Food">Food</option>
          <option value="Housing">Housing</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
        <div className="sm:hidden">
          <AddTransactionButton
            className="w-full"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border-slate-800 bg-slate-900 md:border">
        <table className="w-full text-left md:table">
          <thead className="hidden bg-slate-950 text-xs font-semibold text-slate-400 uppercase md:table-header-group">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="block divide-slate-800 md:table-row-group md:divide-y">
            {filteredTransactions.map((t) => (
              <tr
                key={t.id}
                className="mb-4 block rounded-lg border border-slate-700 bg-slate-800 p-2 shadow-lg shadow-black/50 transition hover:bg-slate-600 md:table-row"
              >
                <td className="block p-2 px-6 font-medium text-white md:table-cell md:p-4">
                  <span className="font-semibold md:hidden">Date: </span>
                  <span>{new Date(t.date).toLocaleDateString()}</span>
                </td>
                <td className="block p-2 px-6 font-medium text-white md:table-cell">
                  <span className="font-semibold md:hidden">Description: </span>
                  {t.description}
                </td>
                <td className="block p-2 px-6 font-medium text-white md:table-cell">
                  <span className="font-semibold md:hidden">Category: </span>
                  <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300">
                    {t.category}
                  </span>
                </td>
                <td
                  className={`block p-2 px-6 font-bold md:table-cell ${t.amount < 0 ? "text-rose-500" : "text-emerald-500"}`}
                >
                  <span className="font-semibold text-white md:hidden">
                    Amount:{" "}
                  </span>
                  {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
                </td>
                <td className="block p-2 px-6 text-right md:table-cell md:text-left">
                  <button
                    onClick={() => removeTransaction(t.id)}
                    className="text-slate-500 transition-colors hover:text-rose-500"
                  >
                    <Trash2 size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            No Transactions found matching your filters.
          </div>
        )}
      </div>
      <div className="sticky bottom-7 hidden self-center sm:block">
        <AddTransactionButton onClick={() => setIsModalOpen(true)} />
      </div>
    </div>
  );
};
