import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrencies, getPairRate } from "@/lib/api";
import { DEFAULT_PAIR, Tab } from "@/lib/constants";
import { Currency } from "@/lib/types";
import { getValidTab, validatePair } from "@/lib/utils";
import ConverterSkeleton from "@/components/skeletons/converter-skeleton";
import Converter from "@/components/converter/converter";
import Favorites from "@/components/tabs/favorites";
import Compare from "@/components/tabs/compare";
import History from "@/components/tabs/history";
import Logs from "@/components/tabs/log";
import TabNav from "@/components/tabs/tabnav";

import TabsSkeleton from "@/components/skeletons/tabs-skeleton";
interface HomePageProps {
  searchParams: Promise<{ from?: string; to?: string; tab?: string }>;
}

// page.tsx (RSC)
export default async function HomePage({ searchParams }: HomePageProps) {
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

async function TabsSection({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const currentParams = await searchParams;
  const { tab } = await searchParams;
  const activeTab: Tab = getValidTab(tab);

  return (
    <>
      <TabNav activeTab={activeTab} currentParams={currentParams} />
      {activeTab === "history" && <History />}
      {activeTab === "compare" && <Compare />}
      {activeTab === "logs" && <Logs />}
      {activeTab === "favorites" && <Favorites />}
    </>
  );
}
