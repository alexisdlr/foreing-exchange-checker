"use client";

import { createContext, useState } from "react";

export type FavoritesContextType = {
  revision: number;
  notifyFavoritesChanged: () => void;
};
export const FavoritesContext = createContext<FavoritesContextType>({
  revision: 0,
  notifyFavoritesChanged: () => {},
});

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [revision, setRevision] = useState(0);
  const notifyFavoritesChanged = () => {
    setRevision((r) => r + 1); // incrementa en 1 cada vez que se llama
  };
  return (
    <FavoritesContext.Provider value={{ revision, notifyFavoritesChanged }}>
      {children}
    </FavoritesContext.Provider>
  );
};
