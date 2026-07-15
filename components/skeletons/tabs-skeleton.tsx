import { TABS } from "@/lib/constants";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const TabsSkeleton = () => {
  return (
    <React.Fragment>
      <div className="flex mt-2 gap-2 border-b border-neutral-600">
        {TABS.map((tab) => (
          <Skeleton key={tab.value} aria-hidden="true" className="w-1/4 h-10" />
        ))}
      </div>
    </React.Fragment>
  );
};

export default TabsSkeleton;
