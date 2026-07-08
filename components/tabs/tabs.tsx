"use client";
import TabNav from "./tabnav";
import Compare from "./compare";
import History from "./history";
import Logs from "./log";
import Favorites from "./favorites";
import { usePersistentState } from "@/hooks/use-persistent-state";

const Tabs = () => {
  const [activeTab, setActiveTab] = usePersistentState<string>(
    "activeTab",
    "history",
  );
  return (
    <div className="flex flex-col self-start gap-4 mt-4">
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "history" && <History />}
      {activeTab === "logs" && <Logs />}
      {activeTab === "compare" && <Compare />}
      {activeTab === "favorites" && <Favorites />}
    </div>
  );
};

export default Tabs;
