"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { TABS } from "@/lib/constants";

type TabNavProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabNav = ({ activeTab, setActiveTab }: TabNavProps) => {
  return (
    <div className="flex mt-2 gap-2 border-b border-neutral-600">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <Button
            variant={"default"}
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "text-preset-3 cursor-pointer uppercase border-0 tracking-wider rounded-none hover:bg-transparent text-neutral-50 bg-transparent",
              isActive && "border-b border-lime-500",
            )}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

export default TabNav;
