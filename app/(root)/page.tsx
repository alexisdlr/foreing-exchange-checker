import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrencies, getPairRate } from "@/lib/api";
import { DEFAULT_PAIR } from "@/lib/constants";
import { Currency } from "@/lib/types";
import { validatePair } from "@/lib/utils";
import Converter from "@/components/converter";
import Tabs from "@/components/tabs/tabs";

interface HomePageProps {
  searchParams: Promise<{ from?: string; to?: string }>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const currencies = await getCurrencies();
  return (
    <div className="flex flex-col items-center justify-center text-neutral-200">
      <Suspense fallback={<div>Loading...</div>}>
        <ConverterSection searchParams={searchParams} currencies={currencies} />
      </Suspense>
      <Tabs />
    </div>
  );
};

// ConverterSection — async, aquí vive lo dinámico
async function ConverterSection({
  searchParams,
  currencies,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
  currencies: Currency[];
}) {
  const { from, to } = await searchParams;
  const fromCode = from || DEFAULT_PAIR.from;
  const toCode = to || DEFAULT_PAIR.to;
  const isValid = validatePair(currencies, fromCode, toCode);
  if (!isValid) {
    redirect(`/?from=${DEFAULT_PAIR.from}&to=${DEFAULT_PAIR.to}`);
  }
  const convert = await getPairRate(
    fromCode.toUpperCase(),
    toCode.toUpperCase(),
  );

  return <Converter currencies={currencies} convert={convert} />;
}

export default HomePage;
