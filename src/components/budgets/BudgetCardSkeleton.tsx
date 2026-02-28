export const BudgetCardSkeleton = () => {
  const baseStyle = "bg-slate-800 animate-pulse rounded-lg";
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-slate-700">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 ${baseStyle}`}></div>
          <div className={`h-6 w-20 ${baseStyle}`}></div>
        </div>
        <div
          className={`h-6 w-10 animate-pulse rounded-full border-slate-700 bg-slate-800 px-2 py-1 text-xs font-medium text-slate-400`}
        ></div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-slate-100">
            <div className={`h-4 w-20 ${baseStyle}`}></div>
          </span>
          <div className={`h-4 w-20 ${baseStyle}`}></div>
        </div>
        <div
          className={`h-3 w-full overflow-hidden rounded-full ${baseStyle}`}
        ></div>
      </div>
    </div>
  );
};
