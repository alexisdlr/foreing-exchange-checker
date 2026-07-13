import { Suspense } from "react";
import { Range } from "@/lib/constants";
import { getDateRange } from "@/lib/utils";
import { getTimeSeries } from "@/lib/services";
import { computeStats } from "@/lib/stats";
import Stats from "../stats/stats";
import RangeSelector from "../range-selector";
import HistoryChart from "../history-chart";
import StatsSkeleton from "../skeletons/stats-skeleton";
import HistoryChartSkeleton from "../skeletons/history-chart-skeleton";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const HistoryStatsSection = async ({
  range,
  from,
  to,
}: {
  range: Range;
  from: string;
  to: string;
}) => {
  const dateRange = getDateRange(range);
  const end = dateRange.end;
  const start = dateRange.start;
  const timeSeries = await getTimeSeries(start, end, from, [to]);

  const stats = computeStats(timeSeries);
  const change = Number(stats?.change ?? 0);
  const percentChange = Number(stats?.percentChange ?? 0);
  return (
    <Stats
      open={stats?.open ?? 0}
      last={stats?.last ?? 0}
      change={change}
      percentChange={percentChange}
    />
  );
};

const HistoryChartSection = async ({
  range,
  from,
  to,
}: {
  range: Range;
  from: string;
  to: string;
}) => {
  const dateRange = getDateRange(range);
  const end = dateRange.end;
  const start = dateRange.start;
  const timeSeries = await getTimeSeries(start, end, from, [to]);
  const formattedDate = formatDate(timeSeries[timeSeries.length - 1].date);

  return (
    <HistoryChart
      data={timeSeries}
      from={from}
      to={to}
      lastRate={timeSeries[timeSeries.length - 1].rate}
      formattedDate={formattedDate}
    />
  );
};

const History = ({
  from,
  to,
  range,
}: {
  from: string;
  to: string;
  range: Range;
}) => {
  const currentParams = { from, to, range, tab: "history" };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col justify-between lg:flex-row  lg:items-center  gap-4">
        {/* STATS */}
        <div className="flex-1 ">
          <Suspense key={`${from}-${to}-${range}`} fallback={<StatsSkeleton />}>
            <HistoryStatsSection range={range} from={from} to={to} />
          </Suspense>
        </div>
        {/* RANGE SELECTOR */}
        <div className="flex-1">
          <RangeSelector range={range} currentParams={currentParams} />
        </div>
      </div>
      {/* CHART */}
      <div className="w-full mt-4">
        <Suspense
          key={`${from}-${to}-${range}`}
          fallback={<HistoryChartSkeleton />}
        >
          <HistoryChartSection range={range} from={from} to={to} />
        </Suspense>
      </div>
      {/* TABLE */}
      <div>table</div>
    </div>
  );
};

export default History;
