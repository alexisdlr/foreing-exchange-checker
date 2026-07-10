import { Range } from "@/lib/constants";
import EmptyState from "../empty-state";
import { getDateRange } from "@/lib/utils";
import { getTimeSeries } from "@/lib/services";
import { computeStats } from "@/lib/stats";
import Stats from "../stats/stats";
import RangeSelector from "../range-selector";
import HistoryChart from "../history-chart";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const History = async ({
  from,
  to,
  range,
}: {
  from: string;
  to: string;
  range: Range;
}) => {
  const currentParams = { from, to, range, tab: "history" };
  const dateRange = getDateRange(range);
  const end = dateRange.end;
  const start = dateRange.start;
  const timeSeries = await getTimeSeries(start, end, from, [to]);
  if (timeSeries.length === 0) {
    return <EmptyState title="No data" description="No data found" />;
  }

  const stats = computeStats(timeSeries);
  const change = Number(stats?.change ?? 0);
  const percentChange = Number(stats?.percentChange ?? 0);
  const formattedDate = formatDate(timeSeries[timeSeries.length - 1].date);
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col justify-between lg:flex-row  lg:items-center  gap-4">
        {/* STATS */}
        <div className="flex-1 ">
          {stats ? (
            <Stats
              open={stats.open}
              last={stats.last}
              change={change}
              percentChange={percentChange}
            />
          ) : (
            <EmptyState title="No data" description="No data found" />
          )}
        </div>
        {/* RANGE SELECTOR */}
        <div className="flex-1">
          <RangeSelector range={range} currentParams={currentParams} />
        </div>
      </div>
      {/* CHART */}
      <div className="w-full mt-4">
        <HistoryChart
          lastRate={stats?.last ?? 0}
          formattedDate={formattedDate}
          data={timeSeries}
          from={from}
          to={to}
        />
      </div>
      {/* TABLE */}
      <div>table</div>
    </div>
  );
};

export default History;
