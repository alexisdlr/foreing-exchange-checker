"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";
import { Favorite, getDb, listFavorites } from "@/lib/local/db";
import { useSearchParams } from "next/navigation";
import { toggleFavorite } from "@/lib/local/favorites";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { syncNow } from "@/lib/sync/client-sync";
import { toast } from "react-hot-toast";
import { DEFAULT_PAIR } from "@/lib/constants";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const base = searchParams.get("from");
  const quote = searchParams.get("to");
  const { userId } = useAuth();
  const handleFavorite = async () => {
    if (!userId) {
      toast.error("Sign in to favorite");
      return;
    }
    setIsLoading(true);
    try {
      const db = getDb(userId);
      const result = await toggleFavorite(
        db,
        base ?? DEFAULT_PAIR.from,
        quote ?? DEFAULT_PAIR.to,
      );

      const syncResult = await syncNow(userId);
      if (!syncResult.success) {
        toast.error(syncResult.error ?? "Failed to sync favorites");

        return;
      }
      toast.success(result === "added" ? "Favorite added" : "Favorite removed");
      setIsFavorite(result === "added");
    } catch (error) {
      toast.error("Failed to favorite");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    const db = getDb(userId);
    const fetchFavorites = async () => {
      const favorites = await listFavorites(db);
      setIsFavorite(
        favorites.some(
          (favorite: Favorite) =>
            favorite.base === base && favorite.quote === quote,
        ),
      );
    };
    fetchFavorites();
  }, [base, quote, userId]);

  return (
    <Button
      disabled={isLoading}
      onClick={handleFavorite}
      className={cn(
        "bg-transparent cursor-pointer text-neutral-50 px-3 py-2 rounded-md border-0 outline-0 ring-1 ring-neutral-500 hover:bg-neutral-600 hover:ring-lime-500/50 transition-all duration-300 uppercase",
        isFavorite && "bg-lime-500 hover:bg-lime-500/50 text-neutral-900",
      )}
    >
      <StarIcon className="w-4 h-4 mr-1" />

      {isFavorite ? "Favorited" : "Favorite"}
    </Button>
  );
};

export default FavoriteButton;
