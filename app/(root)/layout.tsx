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
      <div className="flex flex-col items-center justify-center max-w-6xl mx-auto w-full px-4 py-8 md:px-8 md:py-12">
        <Converter />
        <TabNav />
        <main className="flex-1 px-4" role="main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutApp;
