import { BudgetCardSkeleton } from "./BudgetCardSkeleton";

export const BudgetsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="h-12 w-40 animate-pulse rounded-lg bg-slate-800 text-3xl font-bold tracking-tight"></h2>
          <p className="mt-2 h-8 w-80 animate-pulse rounded-lg bg-slate-800 text-slate-400"></p>
          <div className="mt-2 h-5 w-40 animate-pulse rounded-lg bg-slate-800 text-slate-400"></div>
        </div>
        <div className="h-11 w-full animate-pulse rounded-lg bg-slate-800 sm:w-22"></div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BudgetCardSkeleton />
        <BudgetCardSkeleton />
        <BudgetCardSkeleton />
        <BudgetCardSkeleton />
      </div>
    </div>
  );
};
