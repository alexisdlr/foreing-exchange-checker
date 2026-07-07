const LiveMarketsBadge = () => {
  return (
    <div className="flex items-center gap-2 bg-lime-500 z-50 text-neutral-900 p-3 text-sm shrink-0">
      <div className="w-2 h-2 bg-neutral-900 rounded-full" />
      <span className="uppercase text-preset-5-medium">Live Markets</span>
    </div>
  );
};

export default LiveMarketsBadge;
