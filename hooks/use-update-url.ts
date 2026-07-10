import { useRouter, useSearchParams } from "next/navigation";
export const useUpdateUrl = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return ({
    from,
    to,
    tab,
    range,
  }: { from?: string; to?: string; tab?: string; range?: Range } = {}) => {
    const params = new URLSearchParams(searchParams);
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");
    const tabParam = searchParams.get("tab");
    const rangeParam = searchParams.get("range");
    if (from && from !== fromParam) {
      params.set("from", from);
    }
    if (to && to !== toParam) {
      params.set("to", to);
    }
    if (tab && tab !== tabParam) {
      params.set("tab", tab);
    }
    if (range && range.toString() !== rangeParam) {
      params.set("range", range.toString());
    }
    router.replace(`/?${params.toString()}`);
  };
};
