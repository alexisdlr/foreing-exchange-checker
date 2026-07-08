import Header from "@/components/header";
import LiveTicker from "@/components/ticker/live-ticker";

import React from "react";

const LayoutApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full flex flex-col ">
      <Header />
      <LiveTicker />
      <div className=" max-w-6xl mx-auto h-full w-full px-4 py-8 md:px-8 md:py-12">
        <main className="flex-1" role="main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutApp;
