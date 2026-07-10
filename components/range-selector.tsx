import { Range, RANGES } from "@/lib/constants";
import { buildHref, cn } from "@/lib/utils";
import Link from "next/link";

type RangeSelectorProps = {
  range: Range;
  currentParams: Record<string, string | undefined>;
};

const RangeSelector = ({ range, currentParams }: RangeSelectorProps) => {
  return (
    <div className="flex  items-center lg:justify-end ">
      <div className="flex items-center bg-neutral-700 rounded-md gap-0 ">
        {RANGES.map((r: Range) => (
          <Link
            key={r}
            href={buildHref(currentParams, { range: r })}
            replace
            scroll={false}
            className={cn(
              "text-preset-5 border-0 rounded-sm p-4 ",
              range === r ? "bg-neutral-500!" : "",
            )}
          >
            {r}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RangeSelector;
