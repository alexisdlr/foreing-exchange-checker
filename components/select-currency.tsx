import { useMemo } from "react";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command } from "./ui/command";
import { Currency } from "@/lib/types";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { POPULAR_CODES } from "@/lib/constants";
import CurrencyFlag from "./currency-flag";

type SelectCurrencyProps = {
  currencies: Currency[];
  selectedCurrency: string;
  onSelectCurrency: (currency: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CommandGroupHeading = ({
  heading,
  count,
}: {
  heading: string;
  count: number;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 my-2">
      <span className="text-preset-5 text-neutral-200 uppercase">
        {heading}
      </span>
      <span className="text-preset-5 text-neutral-200">{count}</span>
    </div>
  );
};

const SelectCurrency = ({
  currencies,
  selectedCurrency,
  open,
  setOpen,
  onSelectCurrency,
}: SelectCurrencyProps) => {
  const { popular, otherCurrencies } = useMemo(() => {
    return {
      popular: currencies.filter((currency) =>
        POPULAR_CODES.includes(currency.iso_code),
      ),
      otherCurrencies: currencies.filter(
        (currency) => !POPULAR_CODES.includes(currency.iso_code),
      ),
    };
  }, [currencies]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer bg-neutral-600 ring-1 ring-neutral-500 rounded-md p-3">
          {/* bandera + iso_code + chevron */}
          <CurrencyFlag key={selectedCurrency} iso_code={selectedCurrency} />
          {/* <Image
            src={`/assets/images/flags/${selectedCurrency.slice(0, 2).toLowerCase()}.webp`}
            alt={selectedCurrency}
            width={18}
            height={18}
          /> */}
          <span className="text-preset-4 text-neutral-50 uppercase">
            {selectedCurrency}
          </span>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 rounded-md">
        <Command>
          <CommandInput placeholder="Search currencies..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            {popular.length > 0 && (
              <CommandGroup
                heading={
                  <CommandGroupHeading
                    heading="Popular"
                    count={popular.length}
                  />
                }
              >
                {popular.map((currency) => (
                  <CommandItem
                    key={currency.iso_code}
                    disabled={currency.iso_code === selectedCurrency}
                    value={currency.iso_code}
                    keywords={[currency.iso_code, currency.name]}
                    onSelect={() => onSelectCurrency(currency.iso_code)}
                  >
                    <CurrencyFlag
                      key={currency.iso_code}
                      iso_code={currency.iso_code}
                    />

                    <span className="text-preset-4 text-neutral-50 ">
                      {currency.iso_code}
                    </span>
                    <span className="text-preset-5 text-neutral-200">
                      {currency.name}
                    </span>
                    {currency.iso_code === selectedCurrency && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandGroup
              heading={
                <CommandGroupHeading
                  heading="Other currencies"
                  count={otherCurrencies.length}
                />
              }
            >
              {otherCurrencies.length > 0 &&
                otherCurrencies.map((currency) => (
                  <CommandItem
                    disabled={currency.iso_code === selectedCurrency}
                    onSelect={() => onSelectCurrency(currency.iso_code)}
                    key={currency.iso_code}
                    keywords={[currency.iso_code, currency.name]}
                    value={currency.iso_code}
                  >
                    <CurrencyFlag
                      key={currency.iso_code}
                      iso_code={currency.iso_code}
                    />
                    <span className="text-preset-4 text-neutral-50 ">
                      {currency.iso_code}
                    </span>
                    <span className="text-preset-5 text-neutral-200">
                      {currency.name}
                    </span>
                    {currency.iso_code === selectedCurrency && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectCurrency;
