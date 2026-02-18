import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { useFinanceStore } from "../../store/useFinanceStore";
import { Input, baseStyles } from "../ui/Input";

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

const labelClass = "mb-1 block text-sm font-medium text-slate-400";

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

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="mb-6 text-xl font-bold text-white">Add Transaction</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-800 p-1">
            <label className="cursor-pointer">
              <input
                type="radio"
                value="expense"
                className="peer sr-only"
                {...register("type")}
              />
              <div className="rounded-md py-2 text-center text-slate-400 transition-all peer-checked:bg-rose-500 peer-checked:text-white">
                Expense
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                value="income"
                className="peer sr-only"
                {...register("type")}
              />
              <div className="rounded-md py-2 text-center text-slate-400 transition-all peer-checked:bg-emerald-500 peer-checked:text-white">
                Income
              </div>
            </label>
          </div>

          <div>
            <label className={labelClass}>Amount</label>
            <Input
              type="number"
              step="0.01"
              error={errors.amount?.message}
              {...register("amount", { valueAsNumber: true })}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <Input
              type="text"
              {...register("description")}
              error={errors.description?.message}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select {...register("category")} className={baseStyles}>
                <option value="Food">Food</option>
                <option value="Housing">Housing</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <Input type="date" {...register("date")} />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition-colors hover:bg-green-500"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};
