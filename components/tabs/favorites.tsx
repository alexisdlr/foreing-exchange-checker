"use client";
import { getDb, listFavorites } from "@/lib/local/db";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import FavoritesContent from "../favorites/favorites-content";
import { FavoriteWithRate, Rate } from "@/lib/types";

import FavoritesSkeleton from "../favorites/favorites-skeleton";
import { toggleFavorite } from "@/lib/local/favorites";
import { syncNow } from "@/lib/sync/client-sync";

const FavoritesTab = () => {
  const { userId } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteWithRate[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUnpin = async (favorite: FavoriteWithRate) => {
    try {
      if (!userId) {
        return;
      }
      const db = getDb(userId);
      await toggleFavorite(db, favorite.base, favorite.quote);
      await syncNow(userId);

      setFavorites(favorites.filter((f) => f.id !== favorite.id));
      toast.success("Unpinned favorite");
    } catch (error) {
      toast.error("Failed to unpin favorite");
      console.error(error);
    }
  };
  useEffect(() => {
    if (!userId) {
      return;
    }
    const db = getDb(userId);
    const fetchFavorites = async () => {
      const result = await listFavorites(db);
      try {
        setLoading(true);

        if (result.length === 0) {
          setFavorites([]);
          return;
        }
        const pairs = result.map(({ base, quote }) => ({ base, quote }));

        const res = await fetch("/api/favorites/rates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pairs),
        });

        if (!res.ok) {
          toast.error("Failed to fetch favorites rates");
          setFavorites(result.map((f) => ({ ...f, rate: null })));
          return;
        }
        const data = await res.json();

        setFavorites(
          result.map((f) => {
            const match = data.find(
              (r: Rate) => r.base === f.base && r.quote === f.quote,
            );
            return { ...f, rate: match?.rate ?? null };
          }),
        );
      } catch (error) {
        toast.error("Failed to fetch favorites");
        console.error(error);
        setFavorites(result.map((f) => ({ ...f, rate: null })));
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);
  return (
    <>
      {favorites.length === 0 && !loading ? (
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
      ) : loading ? (
        <FavoritesSkeleton />
      ) : (
        <FavoritesContent favorites={favorites} onUnpin={handleUnpin} />
      )}
    </>
  );
};

export default FavoritesTab;
