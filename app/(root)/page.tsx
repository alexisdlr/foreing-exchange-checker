import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrencies, getPairRate } from "@/lib/services";
import { DEFAULT_PAIR, Range, Tab } from "@/lib/constants";
import { Currency } from "@/lib/types";
import { getValidRange, getValidTab, validatePair } from "@/lib/utils";
import ConverterSkeleton from "@/components/skeletons/converter-skeleton";
import Converter from "@/components/converter/converter";
import Favorites from "@/components/tabs/favorites";
import Compare from "@/components/tabs/compare";
import History from "@/components/tabs/history";
import Logs from "@/components/tabs/log";
import TabNav from "@/components/tabs/tabnav";

import TabsSkeleton from "@/components/skeletons/tabs-skeleton";

type SearchParamsProps = Promise<{
  from?: string;
  to?: string;
  tab?: string;
  range?: string;
}>;

// page.tsx (RSC)
export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const currencies = await getCurrencies();

  return (
    <>
      <Suspense fallback={<ConverterSkeleton />}>
        <ConverterSection searchParams={searchParams} currencies={currencies} />
      </Suspense>

      <Suspense fallback={<TabsSkeleton />}>
        <TabsSection searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ConverterSection({
  searchParams,
  currencies,
}: {
  searchParams: SearchParamsProps;
  currencies: Currency[];
}) {
  const { from, to } = await searchParams;
  const fromCode = from?.toUpperCase() || DEFAULT_PAIR.from;
  const toCode = to?.toUpperCase() || DEFAULT_PAIR.to;
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

async function TabsSection({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const currentParams = await searchParams;
  const { tab, range, from, to } = currentParams;
  const fromCode = from?.toUpperCase() || DEFAULT_PAIR.from;
  const toCode = to?.toUpperCase() || DEFAULT_PAIR.to;
  const activeTab: Tab = getValidTab(tab);
  const activeRange: Range = getValidRange(range);

  return (
    <>
      <TabNav activeTab={activeTab} currentParams={currentParams} />
      {activeTab === "history" && (
        <History from={fromCode} to={toCode} range={activeRange} />
      )}
      {activeTab === "compare" && <Compare />}
      {activeTab === "logs" && <Logs />}
      {activeTab === "favorites" && <Favorites />}
    </>
  );
}
