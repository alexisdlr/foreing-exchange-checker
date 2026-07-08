import { useRouter, useSearchParams } from "next/navigation";
export const useUpdateUrl = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return ({
    from,
    to,
    tab,
  }: { from?: string; to?: string; tab?: string } = {}) => {
    const params = new URLSearchParams(searchParams);
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");
    const tabParam = searchParams.get("tab");

    if (from && from !== fromParam) {
      params.set("from", from);
    }
    if (to && to !== toParam) {
      params.set("to", to);
    }
    if (tab && tab !== tabParam) {
      params.set("tab", tab);
    }
    router.replace(`/?${params.toString()}`);
  };
};
