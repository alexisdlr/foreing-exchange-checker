import { Favorite } from "@/lib/local/db";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FavoriteItem from "./favorite-item";

type FavoritesContentProps = {
  favorites: Favorite[];
};

const FavoritesContent = ({ favorites }: FavoritesContentProps) => {
  return (
    <div className="bg-neutral-700 rounded-lg px-4 py-6 mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-preset-3-medium text-neutral-50 uppercase">
            Pinned Pairs
          </h2>
        </div>
        <div className="flex items-center gap-2 ">
          <span className="text-preset-5 text-neutral-50/80 uppercase">
            {favorites.length} favorites
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {favorites.map((favorite) => (
          <FavoriteItem
            key={favorite.base + favorite.quote}
            favorite={favorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesContent;
