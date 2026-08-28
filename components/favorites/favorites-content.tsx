import FavoriteItem from "./favorite-item";
import { FavoriteWithRate } from "@/lib/types";

type FavoritesContentProps = {
  favorites: FavoriteWithRate[];
  onUnpin: (favorite: FavoriteWithRate) => void;
};

const FavoritesContent = ({ favorites, onUnpin }: FavoritesContentProps) => {
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
      <div className="flex flex-col gap-3">
        {favorites.map((favorite) => (
          <FavoriteItem
            key={favorite.id}
            favorite={favorite}
            onUnpin={onUnpin}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesContent;
