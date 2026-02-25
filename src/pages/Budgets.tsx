import { BudgetCard } from "../components/budgets/BudgetCard";
import { useFinanceStore } from "../store/useFinanceStore";

export const Budgets = () => {
  const budgetProgresss = useFinanceStore((state) => state.getBudgetProgress);
  const budgetProgress = budgetProgresss();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
        <p className="mt-2 text-slate-400">
          Track your spending limits by category
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {budgetProgress.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  );
};
