import Link from "next/link";
import { Tab, TABS } from "@/lib/constants";
import { buildHref, cn } from "@/lib/utils";

type TabNavProps = {
  activeTab: Tab;
  currentParams: Record<string, string | undefined>;
};

const TabNav = ({ activeTab, currentParams }: TabNavProps) => {
  return (
    <div className="flex mt-2 gap-2 border-b border-neutral-600">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.value;
        const href = buildHref(currentParams, { tab: tab.value });
        return (
          <Link
            key={tab.value}
            href={href}
            replace
            scroll={false}
            className={cn(
              "text-preset-3 uppercase border-0 tracking-wider text-neutral-50 px-3 py-2",
              isActive && "border-b border-lime-500",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default TabNav;
