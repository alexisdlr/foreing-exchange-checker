import { Skeleton } from "../ui/skeleton";

const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Skeleton className="flex min-h-[80px]  flex-col gap-4 bg-neutral-700 border border-neutral-600 px-4 py-3 rounded-lg" />
      <Skeleton className="flex min-h-[80px] flex-col gap-4 bg-neutral-700 border border-neutral-600 px-4 py-3 rounded-lg" />
      <Skeleton className="flex min-h-[80px] flex-col gap-4 bg-neutral-700 border border-neutral-600 px-4 py-3 rounded-lg" />
      <Skeleton className="flex min-h-[80px]  flex-col gap-4 bg-neutral-700 border border-neutral-600 px-4 py-3 rounded-lg" />
    </div>
  );
};

export default StatsSkeleton;
