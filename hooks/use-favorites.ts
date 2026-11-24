"use client";

import { useContext } from "react";
import { FavoritesContext } from "@/components/providers/favorites-context";

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
