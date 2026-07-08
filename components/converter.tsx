"use client";
import { Currency } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import SelectCurrency from "./select-currency";
import { Button } from "./ui/button";

const currencies: Currency[] = [
  {
    iso_code: "MXN",
    iso_numeric: "484",
    name: "Mexican Peso",
    symbol: "$",
    start_date: "1991-11-12",
    end_date: "2026-07-05",
  },
  {
    iso_code: "USD",
    iso_numeric: "840",
    name: "United States Dollar",
    symbol: "$",
    start_date: "1991-11-12",
    end_date: "2026-07-05",
  },
  {
    iso_code: "EUR",
    iso_numeric: "978",
    name: "Euro",
    symbol: "€",
    start_date: "1991-11-12",
    end_date: "2026-07-05",
  },
  {
    iso_code: "GBP",
    iso_numeric: "826",
    name: "British Pound",
    symbol: "£",
    start_date: "1991-11-12",
    end_date: "2026-07-05",
  },
];

const Converter = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    currencies[0],
  );
  const [amountSend, setAmountSend] = useState<number>(0);
  const [amountReceive, setAmountReceive] = useState<number>(0);
  const [selectedCurrencyReceive, setSelectedCurrencyReceive] =
    useState<Currency>(currencies[1]);
  const [openSend, setOpenSend] = useState(false);
  const [openReceive, setOpenReceive] = useState(false);

  const onSelectCurrency = (currency: string) => {
    setSelectedCurrency(currencies.find((c) => c.iso_code === currency)!);
    setOpenSend(false);
  };
  const onSelectCurrencyReceive = (currency: string) => {
    setSelectedCurrencyReceive(
      currencies.find((c) => c.iso_code === currency)!,
    );
    setOpenReceive(false);
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
          <div className="w-full md:w-auto md:flex-1 h-full bg-neutral-600 ring-1 ring-neutral-500 rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="self-start mb-2">
              <span className="text-preset-4 text-neutral-50 uppercase">
                Send
              </span>
            </div>
            <div className="w-full h-full flex items-center justify-between">
              <input
                type="text"
                value={amountSend}
                onChange={(e) => setAmountSend(Number(e.target.value))}
                placeholder="0.00"
                className="w-full h-full max-w-[150px] rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-500 text-preset-1 text-neutral-50 placeholder:text-neutral-50/50"
              />
              <SelectCurrency
                currencies={currencies}
                selectedCurrency={selectedCurrency.iso_code}
                onSelectCurrency={onSelectCurrency}
                open={openSend}
                setOpen={setOpenSend}
              />
            </div>
          </div>

          {/* EXCHANGE BUTTON */}
          <div className=" w-full md:w-auto md:shrink-0 h-full flex items-center justify-center">
            <button className="bg-neutral-600 text-neutral-50 p-3 rounded-md cursor-pointer ring-1 ring-neutral-500 hover:ring-lime-500/50 transition-all duration-300">
              <Image
                src="/assets/images/icon-exchange.svg"
                alt="arrow-right"
                width={25}
                height={25}
              />
            </button>
          </div>

          {/* RECEIVE BOX */}
          <div className="w-full md:w-auto md:flex-1 h-full bg-neutral-600 rounded-lg p-4 flex flex-col items-center justify-center ring-1 ring-neutral-500">
            <div className="self-start mb-2">
              <span className="text-preset-4 text-neutral-50 uppercase">
                Receive
              </span>
            </div>
            <div className="w-full h-full flex items-center justify-between">
              <input
                type="text"
                value={amountReceive}
                onChange={(e) => setAmountReceive(Number(e.target.value))}
                placeholder="0.00"
                className="w-full h-full max-w-[150px] rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-500 text-preset-1 text-neutral-50 placeholder:text-neutral-50/50"
              />
              <SelectCurrency
                currencies={currencies}
                selectedCurrency={selectedCurrencyReceive.iso_code}
                onSelectCurrency={onSelectCurrencyReceive}
                open={openReceive}
                setOpen={setOpenReceive}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-neutral-500/50 mt-4"></div>
        {/* RATE BOX */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full rounded-lg mt-4">
          <div>
            <span className="text-preset-5 text-neutral-50 uppercase">
              1 USD = 100 INR
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button className="bg-neutral-800 text-neutral-50 px-4 py-2 rounded-lg uppercase">
              Favorite
            </Button>
            <Button className="bg-neutral-800 text-neutral-50 px-4 py-2 rounded-lg uppercase">
              Log Conversion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
