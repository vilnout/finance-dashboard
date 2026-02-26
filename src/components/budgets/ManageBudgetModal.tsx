import * as z from "zod";

import type { Budget, ExpenseCategory } from "../../types";
import { useFinanceStore } from "../../store/useFinanceStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { X } from "lucide-react";
import { expenseCategories } from "../transaction/categoryConfig";
import { Input } from "../ui/Input";

const budgetSchema = z.object({
  category: z.enum([
    "Housing",
    "Food",
    "Transport",
    "Utilities",
    "Entertainment",
    "Other",
  ]),
  limit: z.number().min(1, "Limit must be greater than zero"),
});

type BudgetFormData = z.infer<typeof budgetSchema>;

interface ManageBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingBudget?: Budget | null;
  usedCategories: ExpenseCategory[];
}

export const ManageBudgetModal = ({
  isOpen,
  onClose,
  existingBudget,
  usedCategories,
}: ManageBudgetModalProps) => {
  const addBudget = useFinanceStore((state) => state.addBudget);
  const updateBudget = useFinanceStore((state) => state.updateBudget);
  const validCategories = existingBudget
    ? expenseCategories
    : expenseCategories.filter((c) => !usedCategories.includes(c));

  const defaultCategory = validCategories[0] ?? "";
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: { category: defaultCategory, limit: 0 },
  });

  useEffect(() => {
    if (existingBudget) {
      setValue("category", existingBudget.category as ExpenseCategory);
      setValue("limit", existingBudget.limit);
    } else {
      reset({ category: defaultCategory, limit: 0 });
    }
  }, [existingBudget, setValue, reset, isOpen, defaultCategory]);

  const onSubmit = (data: BudgetFormData) => {
    if (existingBudget) {
      updateBudget(existingBudget.id, data.limit);
    } else {
      addBudget({
        id: crypto.randomUUID(),
        category: data.category,
        limit: data.limit,
      });
    }
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="mb-6 text-xl font-bold text-white">
          {existingBudget ? "Edit Budget" : "Create New Budget"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-400">
              Category
            </label>
            <select
              {...register("category")}
              disabled={!!existingBudget}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
            >
              {validCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-400">
              Monthly Limit
            </label>
            <Input
              type="number"
              error={errors.limit?.message}
              {...register("limit", { valueAsNumber: true })}
            />
          </div>
          <button className="mt-4 w-full rounded-lg bg-blue-800 py-3 font-bold text-white transition-colors hover:bg-blue-500">
            {existingBudget ? "Save Changes" : "Create Budget"}
          </button>
        </form>
      </div>
    </div>
  );
};
