import TickerItem from "./ticker-item";

const TickerList = () => {
  const tickers = [
    { ticker: "EUR/USD", price: "123.46", changePercent: "-14" },
    { ticker: "USD/JPY", price: "1.23456", changePercent: "+0.016" },
    { ticker: "GBP/USD", price: "1.23456", changePercent: "-12" },
  ];
  return (
    <div className="shrink-0">
      <ul className="flex items-center gap-2 divide-x divide-neutral-500">
        {tickers.map((ticker, index) => (
          <TickerItem key={index} {...ticker} />
        ))}
      </ul>
    </div>
  );
};

export default TickerList;
