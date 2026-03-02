import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { BudgetProgress } from "../../types";

type BudgetEditMenuProps = {
  budget: BudgetProgress;
  onEdit: (budget: BudgetProgress) => void;
  onDelete: (id: string) => void;
};

export const BudgetEditMenu = ({
  budget,
  onEdit,
  onDelete,
}: BudgetEditMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 text-slate-500 hover:text-slate-200"
      >
        <MoreVertical size={20} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 flex w-30 flex-col items-center justify-center rounded-md border border-slate-700 bg-slate-800 shadow-lg">
          <button
            onClick={() => onEdit(budget)}
            className="flex w-full items-center gap-2 px-4 py-2 text-slate-500 hover:text-blue-500"
          >
            <Pencil size={16} /> Edit
          </button>
          <button
            onClick={() => onDelete(budget.id)}
            className="flex w-full items-center gap-2 px-4 py-2 text-slate-500 hover:text-rose-500"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};
