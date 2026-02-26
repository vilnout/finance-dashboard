import { useMemo, useState } from "react";
import { BudgetCard } from "../components/budgets/BudgetCard";
import { useFinanceStore } from "../store/useFinanceStore";
import type { Budget, ExpenseCategory } from "../types";
import { Calendar, Plus } from "lucide-react";
import { ManageBudgetModal } from "../components/budgets/ManageBudgetModal";
import { getBudgetProgress } from "../utils/budgets";

export const Budgets = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  const budgets = useFinanceStore((state) => state.budgets);
  const currentMonth = useFinanceStore((state) => state.currentMonth);

  const budgetProgress = useMemo(() => {
    return getBudgetProgress(transactions, budgets, currentMonth);
  }, [transactions, budgets, currentMonth]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | null>(null);
  const usedCategories = budgets.map(
    (b) => b.category,
  ) satisfies ExpenseCategory[];

  const handleEdit = (budget: Budget) => {
    setBudgetToEdit(budget);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setBudgetToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
          <p className="mt-2 text-slate-400">
            Track your spending limits by category
          </p>
          <div className="mt-2 flex items-center gap-2 text-slate-400">
            <Calendar size={16} />
            <span>
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleCreate}
            className="mt-2 flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-500"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {budgetProgress.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} onEdit={handleEdit} />
        ))}
      </div>
      <ManageBudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        existingBudget={budgetToEdit}
        usedCategories={usedCategories}
      />
    </div>
  );
};
