"use client";
import { useFavorites } from "@/hooks/use-favorites";
import { getDb, listConversions, listFavorites } from "@/lib/local/db";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type TabBadgeProps = {
  value: "favorites" | "logs";
};

const TabBadge = ({ value }: TabBadgeProps) => {
  const auth = useAuth();
  const { userId } = auth;
  const [count, setCount] = useState(0);
  const { revision } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const db = getDb(userId);

      if (value === "favorites") {
        const favorites = await listFavorites(db);
        setCount(favorites.length);
      } else {
        const conversions = await listConversions(db);
        setCount(conversions.length);
      }
    };
    fetchData();
  }, [userId, value, revision]);

  return (
    <div className="size-4 flex items-center justify-center">
      {count > 0 ? (
        <span className=" flex items-center justify-center text-xs text-lime-500 bg-lime-800 px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      ) : null}
    </div>
  );
};

export default TabBadge;
