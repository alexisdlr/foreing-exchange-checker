import { TimeSeriesResponse } from "./types";

export type Stats = {
  open: number;
  last: number;
  change: number;
  percentChange: number;
};

export function computeStats(series: TimeSeriesResponse): Stats | null {
  if (series.length === 0) return null;

  const open = series[0].rate;

  if (open === 0) return null;

  const last = series[series.length - 1].rate;
  const change = last - open;
  const percentChange = (change / open) * 100;
  return { open, last, change, percentChange };
}
