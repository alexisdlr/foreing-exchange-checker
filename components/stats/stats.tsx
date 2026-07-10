import StatItem from "./stat-item";

type StatsProps = {
  open: number;
  last: number;
  change: number;
  percentChange: number;
};

const Stats = ({ open, last, change, percentChange }: StatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatItem label="Open" value={open} type="number" />
      <StatItem label="Last" value={last} type="number" />
      <StatItem label="Change" value={change} type="change" />
      <StatItem label="% Change" value={percentChange} type="percentChange" />
    </div>
  );
};

export default Stats;
