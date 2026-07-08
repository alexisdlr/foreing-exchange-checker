import TickerList from "./ticker-list";

const TickerTrack = () => {
  return (
    <div className="flex-1  bg-neutral-700  text-sm overflow-hidden">
      <div className="flex w-max animate-marquee">
        <TickerList />
        <TickerList aria-hidden="true" />
        <TickerList aria-hidden="true" />
      </div>
    </div>
  );
};

export default TickerTrack;
