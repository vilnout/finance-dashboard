import { useFinanceStore } from "../../store/useFinanceStore";
import { useToastStore } from "../../store/useToastStore";
import { type Budget, type BudgetProgress } from "../../types";
import { categoryConfig } from "../transaction/categoryConfig";
import { BudgetEditMenu } from "./BudgetEditMenu";

interface BudgetCardProps {
  budget: BudgetProgress;
  onEdit: (budget: Budget) => void;
}

export const BudgetCard = ({ budget, onEdit }: BudgetCardProps) => {
  const deleteBudget = useFinanceStore((state) => state.deleteBudget);
  const addToast = useToastStore((state) => state.addToast);

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const Icon = categoryConfig[budget.category].icon;
  const iconColor = categoryConfig[budget.category].color;

  let barColor = "bg-emerald-500";
  if (budget.percentage >= 90) {
    barColor = "bg-rose-500";
  } else if (budget.percentage >= 75) {
    barColor = "bg-amber-500";
  }

  const onDelete = (id: string) => {
    deleteBudget(id);
    addToast("Budget Deleted!", "success");
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-slate-700">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="rounded-lg p-2 text-slate-200"
            style={{ backgroundColor: iconColor }}
          >
            <Icon size={20} />
          </div>
          <h3 className="font-semibold text-slate-100">{budget.category}</h3>
        </div>
        <div className="flex flex-row-reverse items-center gap-2">
          <BudgetEditMenu budget={budget} onEdit={onEdit} onDelete={onDelete} />
          <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-medium text-slate-400">
            {formatMoney(budget.limit)} limit
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-slate-100">
            {formatMoney(budget.spent)} spent
          </span>
          <span
            className={`${budget.remaining < 0 ? "text-rose-500" : "text-slate-400"}`}
          >
            {budget.remaining < 0
              ? "Over Budget"
              : `${formatMoney(budget.remaining)} left`}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${budget.percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
