import { Skeleton } from "../ui/skeleton";

const HistoryChartSkeleton = () => {
  return (
    <Skeleton
      aria-hidden="true"
      className="w-full h-[300px] bg-neutral-700 rounded-lg border border-neutral-600"
    />
  );
};

export default HistoryChartSkeleton;
