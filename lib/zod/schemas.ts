import { z } from "zod";

export const favoriteSyncItemSchema = z.object({
  id: z.uuid(),
  base: z
    .string()
    .min(3)
    .max(3)
    .transform((val) => val.toUpperCase()),
  quote: z
    .string()
    .min(3)
    .max(3)
    .transform((val) => val.toUpperCase()),

  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
});

export const conversionSyncItemSchema = z.object({
  id: z.uuid(),
  base: z
    .string()
    .min(3)
    .max(3)
    .transform((val) => val.toUpperCase()),
  quote: z
    .string()
    .min(3)
    .max(3)
    .transform((val) => val.toUpperCase()),
  sentAmount: z.number(),
  receivedAmount: z.number(),
  rate: z.number(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
});

export const syncRequestSchema = z.object({
  since: z.iso.datetime().nullable(),
  favorites: z.array(favoriteSyncItemSchema).max(500),
  conversions: z.array(conversionSyncItemSchema).max(500),
});
