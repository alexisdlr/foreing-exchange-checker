import { useUpdateUrl } from "@/hooks/use-update-url";
import SelectCurrency from "../select-currency";
import { Currency } from "@/lib/types";
import { amountSizeClass, cn } from "@/lib/utils";
import { useState } from "react";

type SendAmountProps = {
  amountSend: string;
  setAmountSend: (amount: string) => void;
  currencies: Currency[];
  selectedCurrency: Currency;
};

const SendAmount = ({
  amountSend,
  setAmountSend,
  currencies,
  selectedCurrency,
}: SendAmountProps) => {
  const updateUrl = useUpdateUrl();
  const [open, setOpen] = useState(false);
  const onSelectCurrency = (currency: string) => {
    setOpen(false);
    updateUrl({ from: currency.toUpperCase() });
  };
  return (
    <div className="w-full md:w-auto md:flex-1 h-full bg-neutral-600 ring-1 ring-neutral-500 rounded-lg p-4 flex flex-col items-center justify-center">
      <div className="self-start mb-2">
        <span className="text-preset-4 text-neutral-50 uppercase">Send</span>
      </div>
      <div className="w-full h-full flex items-center justify-between">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step="0.01"
          aria-label="Amount to send"
          value={amountSend}
          onChange={(e) => setAmountSend(e.target.value || "")}
          placeholder="0.00"
          className={cn(
            "w-full h-full max-w-[180px] rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-500 text-neutral-50 placeholder:text-neutral-50/50",
            amountSizeClass(amountSend.toString().length),
          )}
        />
        <SelectCurrency
          currencies={currencies}
          selectedCurrency={selectedCurrency.iso_code}
          onSelectCurrency={onSelectCurrency}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default SendAmount;
