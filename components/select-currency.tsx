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
import { ChevronDown } from "lucide-react";

type SelectCurrencyProps = {
  currencies: Currency[];
  selectedCurrency: string;
  onSelectCurrency: (currency: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SelectCurrency = ({
  currencies,
  selectedCurrency,
  open,
  setOpen,
  onSelectCurrency,
}: SelectCurrencyProps) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer bg-neutral-600 ring-1 ring-neutral-500 hover:ring-lime-500/50 transition-all duration-300 rounded-md p-3">
          {/* bandera + iso_code + chevron */}
          <Image
            src={`/assets/images/flags/${selectedCurrency.slice(0, 2).toLowerCase()}.webp`}
            alt={selectedCurrency}
            width={18}
            height={18}
          />
          <span className="text-preset-4 text-neutral-50 uppercase">
            {selectedCurrency}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search currencies..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup heading="Popular">
              {currencies.map((currency) => (
                <CommandItem
                  key={currency.iso_code}
                  disabled={currency.iso_code === selectedCurrency}
                  value={currency.iso_code}
                  onSelect={() => onSelectCurrency(currency.iso_code)}
                >
                  {currency.name} ({currency.iso_code})
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Other currencies">
              {currencies.map((currency) => (
                <CommandItem
                  disabled={currency.iso_code === selectedCurrency}
                  onSelect={() => onSelectCurrency(currency.iso_code)}
                  key={currency.iso_code}
                  value={currency.iso_code}
                >
                  {currency.name} ({currency.iso_code})
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
