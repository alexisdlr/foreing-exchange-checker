import SelectCurrency from "../select-currency";
import { amountSizeClass, cn, formatNumber } from "@/lib/utils";
import { Currency } from "@/lib/types";
import { useState } from "react";
import { useUpdateUrl } from "@/hooks/use-update-url";

type ReceiveAmountProps = {
  amountReceive: number;
  currencies: Currency[];
  selectedCurrencyReceive: Currency;
};

const ReceiveAmount = ({
  amountReceive,
  currencies,
  selectedCurrencyReceive,
}: ReceiveAmountProps) => {
  const [open, setOpen] = useState(false);
  const updateUrl = useUpdateUrl();
  const onSelectCurrencyReceive = (currency: string) => {
    setOpen(false);
    updateUrl({ to: currency.toUpperCase() });
  };
  return (
    <div className="w-full md:w-auto md:flex-1 h-full bg-neutral-600 rounded-lg p-4 flex flex-col items-center justify-center ring-1 ring-neutral-500">
      <div className="self-start mb-2">
        <span className="text-preset-4 text-neutral-50 uppercase">Receive</span>
      </div>
      <div className="w-full h-full flex items-center justify-between">
        <input
          type="text"
          disabled
          value={formatNumber(amountReceive)}
          placeholder={formatNumber(0)}
          className={cn(
            "w-full h-full max-w-[180px] rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-500",
            amountReceive > 0 && " text-lime-500! ",
            amountSizeClass(formatNumber(amountReceive).length),
          )}
        />
        <SelectCurrency
          currencies={currencies}
          selectedCurrency={selectedCurrencyReceive.iso_code}
          onSelectCurrency={onSelectCurrencyReceive}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default ReceiveAmount;
