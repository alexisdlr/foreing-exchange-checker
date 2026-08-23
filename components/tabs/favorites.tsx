"use client";
import { Favorite, getDb, listFavorites } from "@/lib/local/db";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import FavoritesContent from "../favorites/favorites-content";

const FavoritesTab = () => {
  const { userId } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const db = getDb(userId);
    const fetchFavorites = async () => {
      const result = await listFavorites(db);
      setFavorites(result);
      toast.success("Favorites Synced successfully");
    };

    fetchFavorites();
  }, [userId]);
  return (
    <>
      {favorites.length === 0 ? (
        <div className="flex justify-center items-center h-full mt-10">
          {" "}
          <div className="flex flex-col gap-2 items-center justify-center max-w-md">
            <h2 className="text-preset-2 text-neutral-100 text-center">
              No pinned pairs yet
            </h2>
            <p className="text-preset-4 text-neutral-200 text-center">
              Pin a pair to track it&apos;s rate here. Tap the star icon on any
              conversion or comparison row.
            </p>
          </div>
        </div>
      ) : (
        <FavoritesContent favorites={favorites} />
      )}
    </>
  );
};

export default FavoritesTab;
