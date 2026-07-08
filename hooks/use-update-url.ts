import { DEFAULT_PAIR } from "@/lib/constants";
import { useRouter } from "next/navigation";

export const useUpdateUrl = ({ from, to }: { from?: string; to?: string }) => {
  const router = useRouter();
  return () => {
    router.push(
      `/?from=${from || DEFAULT_PAIR.from}&to=${to || DEFAULT_PAIR.to}`,
    );
  };
};
