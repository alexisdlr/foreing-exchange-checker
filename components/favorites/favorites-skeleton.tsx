import { Skeleton } from "../ui/skeleton";

const FavoritesSkeleton = () => {
  return (
    <div className="bg-neutral-700 rounded-lg px-4 py-6 mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-20 h-4" />
        </div>
        <div className="flex items-center gap-2 ">
          <Skeleton className="w-10 h-10" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
      </div>
    </div>
  );
};

export default FavoritesSkeleton;
