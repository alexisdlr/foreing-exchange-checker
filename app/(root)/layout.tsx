import Converter from "@/components/converter";
import Header from "@/components/header";
import LiveTicker from "@/components/live-ticker";
import TabNav from "@/components/tabnav";
import React from "react";

const LayoutApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full flex flex-col ">
      <Header />
      <LiveTicker />
      <Converter />
      <TabNav />
      <main className="flex-1 px-4" role="main">
        {children}
      </main>
    </div>
  );
};

export default LayoutApp;
