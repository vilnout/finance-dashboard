import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { useFinanceStore } from "../../store/useFinanceStore";

const transactionSchema = z.object({
  description: z.string().min(3, "Description is too short"),
  amount: z.number().min(0.01, "Amount must be positive"),
  category: z.enum([
    "Housing",
    "Food",
    "Transport",
    "Utilities",
    "Entertainment",
    "Income",
    "Other",
  ]),
  date: z.string(),
  type: z.enum(["income", "expense"]),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal = ({ isOpen, onClose }: ModalProps) => {
  const addTransaction = useFinanceStore((state) => state.addTransaction);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    const finalAmount =
      data.type === "expense" ? -Math.abs(data.amount) : Math.abs(data.amount);

    addTransaction({
      id: crypto.randomUUID(),
      description: data.description,
      amount: finalAmount,
      date: new Date(data.date),
      category: data.category,
    });
    reset();
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
        <h2 className="mb-6 text-xl font-bold text-white">Add Transaction</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div>
            <label className="">
              <input
                type="radio"
                value="expense"
                className="peer sr-only"
                {...register("type")}
              />
              <div>Expense</div>
            </label>
            <label>
              <input
                type="radio"
                value="expense"
                className="peer sr-only"
                {...register("type")}
              />
              <div>Income</div>
            </label>
            <div>
              <label htmlFor="">Amount</label>
              <input
                type="number"
                step="0.01"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && <p>{errors.amount.message}</p>}
            </div>
            <div>
              <label htmlFor="">Description</label>
              <input type="text" {...register("description")} />
              {errors.description && <p>{errors.description.message}</p>}
            </div>
            <div>
              <div>
                <label>Category</label>
                <select {...register("category")}>
                  <option value="Food">Food</option>
                  <option value="Housing">Housing</option>
                  <option value="Transport">Transport</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Date</label>
                <input type="date" {...register("date")} />
              </div>
            </div>
            <button>Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};
