import { cn, getValueClass, getValuePrefix } from "@/lib/utils";

type StatItemProps = {
  label: string;
  value: number;
  type: "number" | "change" | "percentChange";
};

const StatItem = ({ label, value, type = "number" }: StatItemProps) => {
  const valuePrefix = getValuePrefix(value, type);
  const valueClass = getValueClass(value, type);

  return (
    <div className="flex flex-col gap-4 bg-neutral-700 border border-neutral-600 px-4 py-3 rounded-lg">
      <p className="text-preset-4 text-neutral-50/50">{label}</p>
      <p className={cn("text-preset-2!", valueClass)}>{valuePrefix}</p>
    </div>
  );
};

export default StatItem;
