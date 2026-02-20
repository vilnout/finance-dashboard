import { useState } from "react";
import { useFinanceStore } from "../../store/useFinanceStore";
import { Search, Trash2 } from "lucide-react";

const baseStyles =
  "rounded-lg border border-slate-800 bg-slate-950 focus:ring-2 focus:ring-blue-500 focus:outline-none";

export const TransactionTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const transactions = useFinanceStore((state) => state.transactions);
  const removeTransaction = useFinanceStore((state) => state.removeTransaction);

  const filteredTransactions = transactions.filter((tnx) => {
    const matchesSearch = tnx.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || tnx.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 sm:flex-row">
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
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left">
          <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredTransactions.map((t) => (
              <tr
                key={t.id}
                className="transition-colors hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 text-slate-400">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td className="font-medium text-white">{t.description}</td>
                <td>
                  <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300">
                    {t.category}
                  </span>
                </td>
                <td
                  className={`font-bold ${t.amount < 0 ? "text-rose-500" : "text-emerald-500"}`}
                >
                  {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
                </td>
                <td>
                  <button
                    onClick={() => removeTransaction(t.id)}
                    className="text-slate-500 transition-colors hover:text-rose-500"
                  >
                    <Trash2 size={22} />
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
    </div>
  );
};
