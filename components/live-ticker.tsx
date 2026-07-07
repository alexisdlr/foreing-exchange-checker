import LiveMarketsBadge from "./live-markets-badge";
import TickerTrack from "./ticker-track";

const LiveTicker = () => {
  return (
    <section aria-label="Live markets" className="flex items-center ">
      <LiveMarketsBadge />
      <TickerTrack />
    </section>
  );
};

export default LiveTicker;
