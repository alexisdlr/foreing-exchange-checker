"use client";
import { Currency } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUpdateUrl } from "@/hooks/use-update-url";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import SendAmount from "@/components/converter/send-amount";
import ReceiveAmount from "@/components/converter/receive-amount";
import { StarIcon } from "lucide-react";
import FavoriteButton from "./favorite-button";

type ConverterProps = {
  currencies: Currency[];
  convert: {
    date: string;
    base: string;
    quote: string;
    rate: number;
  };
};

function calculateAmountReceive(amountSend: number, rate: number) {
  return Math.round(amountSend * rate * 100) / 100;
}

const Converter = ({ currencies, convert }: ConverterProps) => {
  const updateUrl = useUpdateUrl();
  const selectedCurrency = currencies.find((c) => c.iso_code === convert.base)!;
  const selectedCurrencyReceive = currencies.find(
    (c) => c.iso_code === convert.quote,
  )!;
  const delay = 400;
  const [amountSend, setAmountSend] = useState<string>("");
  const debouncedAmountSend = useDebounceValue(Number(amountSend) || 0, delay);
  const amountReceive = calculateAmountReceive(
    debouncedAmountSend,
    convert.rate,
  );

  const onExchange = () => {
    updateUrl({
      from: selectedCurrencyReceive.iso_code,
      to: selectedCurrency.iso_code,
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="self-start mb-4">
        <h1 className="text-preset-2 text-neutral-50 uppercase ">
          Check the rate
        </h1>
      </div>
      <div className="flex flex-col w-full h-full items-center justify-center bg-neutral-700 rounded-[20px] p-4">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          {/* SEND BOX */}
          <SendAmount
            amountSend={amountSend}
            setAmountSend={setAmountSend}
            currencies={currencies}
            selectedCurrency={selectedCurrency}
          />

          {/* EXCHANGE BUTTON */}
          <div className=" w-full md:w-auto md:shrink-0 h-full flex items-center justify-center">
            <Button
              onClick={onExchange}
              className="bg-neutral-600 text-neutral-50 px-2 py-4 rounded-md cursor-pointer hover:bg-transparent ring-1 ring-neutral-500 hover:ring-lime-500/50 transition-all duration-300"
            >
              <Image
                src="/assets/images/icon-exchange.svg"
                alt="arrow-right"
                width={20}
                height={20}
              />
            </Button>
          </div>

          {/* RECEIVE BOX */}
          <ReceiveAmount
            amountReceive={amountReceive}
            currencies={currencies}
            selectedCurrencyReceive={selectedCurrencyReceive}
          />
        </div>
        <div className="w-full h-[1px] bg-neutral-500/50 mt-4"></div>
        {/* RATE BOX */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full rounded-lg mt-4 gap-4">
          <div>
            <span className="text-preset-5 text-neutral-50 uppercase">
              1 {selectedCurrency.iso_code} = {convert.rate}{" "}
              {selectedCurrencyReceive.iso_code}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FavoriteButton />
            <Button className="bg-transparent cursor-pointer text-neutral-50 px-4 py-2 rounded-md border-0 outline-0 ring-1 ring-neutral-500 hover:bg-neutral-600 hover:ring-lime-500/50 transition-all duration-300 uppercase">
              Log Conversion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
