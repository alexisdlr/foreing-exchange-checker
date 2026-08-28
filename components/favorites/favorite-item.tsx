import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { FavoriteWithRate } from "@/lib/types";

type FavoriteItemProps = {
  favorite: FavoriteWithRate;
  onUnpin: (favorite: FavoriteWithRate) => void;
};
const FavoriteItem = ({ favorite, onUnpin }: FavoriteItemProps) => {
  return (
    <div className="flex items-center justify-between bg-neutral-600 border border-neutral-500 rounded-md py-3 px-4">
      <div className="text-preset-4 text-neutral-50 flex items-center gap-2">
        {favorite.base}
        <ArrowRight className="w-4 h-4 text-neutral-50/50" />
        {favorite.quote}
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-preset-3 text-neutral-50/80 uppercase">
            {favorite.rate?.toFixed(4) ?? "-"}
          </span>
          <span className="text-preset-6 text-neutral-50/80 uppercase">
            {/* {favorite.percentageChange} */}
          </span>
        </div>{" "}
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center hover:bg-neutral-600 cursor-pointer border border-lime-500 rounded-sm bg-transparent"
          onClick={() => onUnpin(favorite)}
        >
          <Image
            src="/assets/images/icon-star-filled.svg"
            alt="pin"
            width={16}
            height={16}
          />
        </Button>
      </div>
    </div>
  );
};

export default FavoriteItem;
