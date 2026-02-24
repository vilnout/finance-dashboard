interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div className={`animate-pulse rounded-xl bg-slate-800 ${className}`} />
  );
};

export const StatCardSkeleton = () => {
  return (
    <div className="flex h-[104px] items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-32" />
      </div>
      <Skeleton className="h-12 w-12 rounded-lg" />
    </div>
  );
};
