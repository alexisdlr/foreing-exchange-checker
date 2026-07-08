import TrendIcon from "./trend-icon";

type TickerItemProps = {
  ticker: string;
  price: string;
  changePercent: string;
};

const TickerItem = ({ ticker, price, changePercent }: TickerItemProps) => {
  const isPositive = changePercent.startsWith("+");
  const percentageColor = isPositive ? "text-green-500" : "text-red-500";
  return (
    <li className="p-3 flex items-center gap-2 ">
      <span className="text-preset-5 text-neutral-200">{ticker}</span>
      <span className="text-preset-5-medium text-neutral-50 ">{price}</span>

      <div className="flex items-center gap-1">
        <TrendIcon direction={isPositive ? "up" : "down"} />
        <span className={`text-preset-5 ${percentageColor}`}>
          {`${changePercent}%`}
        </span>
      </div>
    </li>
  );
};

export default TickerItem;
