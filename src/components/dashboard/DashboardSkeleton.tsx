import { StatCardSkeleton } from "./StatCardSkeleton";

export const DashboardSkeleton = () => {
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="mb-2 h-8 w-48 animate-pulse rounded bg-slate-800"></div>
          <div className="h-9 w-44 animate-pulse rounded bg-slate-800"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="my-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
          <div className="flex h-[400px] items-center justify-center rounded-lg border border-slate-800">
            <div className="h-[300px] w-[90%] animate-pulse rounded-lg bg-slate-800"></div>
          </div>
          <div className="grid-col1 grid gap-4 md:gap-2 lg:grid-cols-2">
            <div className="flex h-[300px] min-h-20 w-full items-center justify-center rounded-lg border border-slate-800">
              <div className="h-[90%] w-[90%] animate-pulse rounded-lg bg-slate-800"></div>
            </div>
            <div className="flex h-[300px] min-h-20 w-full items-center justify-center rounded-lg border border-slate-800">
              <div className="h-[170px] w-[170px] animate-pulse rounded-full bg-slate-800"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
