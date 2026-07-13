"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";

type ChartPoint = { date: string; rate: number };

type HistoryChartProps = {
  data: ChartPoint[];
  from: string;
  to: string;
  lastRate: number;
  formattedDate: string;
};

const HistoryChart = ({
  data,
  from,
  to,
  lastRate,
  formattedDate,
}: HistoryChartProps) => {
  const chartConfig = {
    rate: {
      label: `${from} → ${to}`, // o "Rate"
      color: "var(--color-lime-500)", // tu token en globals.css
    },
  } satisfies ChartConfig;
  const chartData = data.map(({ date, rate }) => ({
    date: new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    rate,
  }));
  const min = Math.min(...chartData.map(({ rate }) => rate));
  const max = Math.max(...chartData.map(({ rate }) => rate));
  const padding = (max - min) * 0.1;
  const decimals = 5; // FX suele ir bien con 4–5
  const domain = [
    Number((min - padding).toFixed(decimals)),
    Number((max + padding).toFixed(decimals)),
  ];

  return (
    <div className="bg-neutral-700 rounded-lg p-4">
      <div className="flex justify-between mb-6">
        <span className="text-preset-3-medium text-neutral-50">
          {from}/{to}
        </span>
        <span className="text-preset-5 text-neutral-50/70">
          {lastRate} · {formattedDate}
        </span>
      </div>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart data={chartData}>
          <XAxis dataKey="date" tickLine={false} axisLine={false} />
          <YAxis
            domain={domain}
            tickCount={3}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />

          <defs>
            <linearGradient id="fillRate" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-lime-500)"
                stopOpacity={0.8}
              />
              <stop
                offset="100%"
                stopColor="var(--color-lime-500)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            fill="url(#fillRate)"
            stroke="var(--color-lime-500)"
            strokeWidth={2}
            dataKey="rate"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default HistoryChart;
