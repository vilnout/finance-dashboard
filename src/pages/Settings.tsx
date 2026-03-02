import { AlertTriangle, Globe, Save } from "lucide-react";
import { useState } from "react";
import { useFinanceStore } from "../store/useFinanceStore";
import { useToastStore } from "../store/useToastStore";

export const Settings = () => {
  const currency = useFinanceStore((state) => state.currency);
  const setCurrency = useFinanceStore((state) => state.setCurrency);
  const resetAllData = useFinanceStore((state) => state.resetAllData);
  const addToast = useToastStore((state) => state.addToast);

  const [currencyInput, setCurrencyInput] = useState(currency);

  const handleSavePreferences = () => {
    setCurrency(currencyInput);
    addToast("Preferences updated successfully", "success");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure? This will deleted all transactiona and budgets. This cannot be undone.",
      )
    ) {
      resetAllData();
      addToast("All data has been erased", "error");
    }
  };
  return (
    <div className="max-w-4xl space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Settings
        </h2>
        <p className="mt-2 text-slate-400">
          Manage your account preferences and data.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-500">
            <Globe size={24} />
          </div>
          <h3 className="text-xl font-semibold text-white">Preferences</h3>
        </div>

        <div className="max-w-md space-y-4">
          <label className="mb-1 block text-sm font-medium text-slate-400">
            Default Currency
          </label>
          <select
            value={currencyInput}
            onChange={(e) => setCurrencyInput(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="USD">USD ($) - US Dollar</option>
            <option value="INR">INR (₹) - Indian Rupee</option>
            <option value="EUR">EUR (€) - Euro</option>
            <option value="GBP">GBP (£) - British Pound</option>
            <option value="JPY">JPY (¥) - Japanese Yen</option>
            <option value="SEK">SEK (kr) - Swedish Krona</option>
          </select>
          <button
            onClick={handleSavePreferences}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-500"
          >
            <Save size={16} /> Save Preferences
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-rose-500/30 bg-slate-900 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-rose-500/10 p-2 text-rose-500">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-xl font-semibold text-rose-500">Danger Zone</h3>
        </div>
        <p className="mb-4 max-w-xl text-sm text-slate-400">
          Permanently delete all transactions, budgets, and account history.
          This action cannot be reversed.
        </p>
        <button
          onClick={handleReset}
          className="cursor-pointer rounded-lg border border-rose-500 bg-rose-500/10 px-4 py-2 text-rose-500 transition-colors hover:bg-rose-500 hover:text-white"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
};
