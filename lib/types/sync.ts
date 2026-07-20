import { z } from "zod";
import {
  conversionSyncItemSchema,
  favoriteSyncItemSchema,
  syncRequestSchema,
} from "../zod/schemas";

export type FavoriteSyncItem = z.infer<typeof favoriteSyncItemSchema>;

export type ConversionSyncItem = z.infer<typeof conversionSyncItemSchema>;

export type SyncRequest = z.infer<typeof syncRequestSchema>;

export type SyncResponse = {
  serverTime: string; // el cliente lo guarda como próximo `since`
  favorites: FavoriteSyncItem[];
  conversions: ConversionSyncItem[];
};
