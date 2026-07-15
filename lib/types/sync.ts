export type FavoriteSyncItem = {
  id: string;
  base: string;
  quote: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type ConversionSyncItem = {
  id: string;
  base: string;
  quote: string;
  sentAmount: string;
  receivedAmount: string;
  rate: string;
  updatedAt: string;
  deletedAt: string | null;
  createdAt: string;
};

export type SyncRequest = {
  since: string | null;
  favorites: FavoriteSyncItem[];
  conversions: ConversionSyncItem[];
};

export type SyncResponse = {
  serverTime: string; // el cliente lo guarda como próximo `since`
  favorites: FavoriteSyncItem[];
  conversions: ConversionSyncItem[];
};
