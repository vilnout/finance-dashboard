import type { LucideIcon } from "lucide-react";

interface Card {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: string;
  format?: "currency" | "percentage";
}

type StatCardProps = Card;

export const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  format = "currency",
}: StatCardProps) => {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const formattedValue =
    format == "currency" ? formatCurrency(value) : `${value}%`;
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-1 rounded-xl border border-slate-800 bg-slate-800 p-7 transition-colors hover:border-slate-300">
      <div className="min-w-0 overflow-x-auto">
        <p className="text-sm font-medium text-slate-300">{title}</p>
        <h3 className="mt-1 text-xl font-bold text-slate-100 lg:text-2xl">
          {formattedValue}
        </h3>
      </div>
      <div className={`shrink-0 justify-self-end rounded-lg p-3 ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  );
};
