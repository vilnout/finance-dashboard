export const TransactionSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col items-center justify-between gap-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4 sm:flex-row">
        <div className="flex h-10 w-70 animate-pulse items-center justify-center rounded-lg border border-slate-800 bg-slate-800"></div>
        <div className="flex h-10 w-70 animate-pulse items-center justify-center rounded-lg border border-slate-800 bg-slate-800"></div>
      </div>
      <div className="sm:hidden">
        <div className="h-15 w-full animate-pulse rounded-lg bg-slate-800"></div>
      </div>
      <div className="flex h-100 w-full items-center justify-center rounded-lg border border-slate-800 bg-slate-900">
        <div className="h-[80%] w-[95%] animate-pulse rounded-lg bg-slate-800"></div>
      </div>
      <div className="h-12 w-50 animate-pulse self-center rounded-lg bg-slate-800"></div>
    </div>
  );
};
