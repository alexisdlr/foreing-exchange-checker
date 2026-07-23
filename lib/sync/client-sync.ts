import {
  Db,
  getSince,
  getDb,
  setSince,
  wipeUserData,
  upsertFavorite,
  upsertConversion,
  listDirtyConversions,
  listDirtyFavorites,
} from "../local/db";

export async function syncNow(
  userId: string,
): Promise<{ error?: string; success: boolean }> {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const db: Db = getDb(userId);
    const since = await getSince(db);

    if (!since) await wipeUserData(db);

    const favoritesDirty = await listDirtyFavorites(db);
    const conversionsDirty = await listDirtyConversions(db);

    const body = {
      favorites: favoritesDirty.map((favorite) => ({
        id: favorite.id,
        base: favorite.base,
        quote: favorite.quote,
        updatedAt: favorite.updatedAt,
        deletedAt: favorite.deletedAt ?? null,
      })),
      conversions: conversionsDirty.map((conversion) => ({
        id: conversion.id,
        base: conversion.base,
        quote: conversion.quote,
        sentAmount: conversion.sentAmount,
        receivedAmount: conversion.receivedAmount,
        rate: conversion.rate,
        updatedAt: conversion.updatedAt,
        createdAt: conversion.createdAt,
        deletedAt: conversion.deletedAt,
      })),
      since: since ?? null,
    };
    const response = await fetch(`/api/sync`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return {
        error: `Failed to sync: ${response.statusText}`,
        success: false,
      };
    }
    const data = await response.json();
    if (data.error) {
      return { error: data.error, success: false };
    }
    for (const favorite of data.favorites) {
      await upsertFavorite(db, { ...favorite, dirty: false });
    }

    for (const favorite of favoritesDirty) {
      const existing = await db.favorites.get(favorite.id);
      if (existing) {
        await db.favorites.update(favorite.id, { dirty: false });
      }
    }
    for (const conversion of data.conversions) {
      await upsertConversion(db, { ...conversion, dirty: false });
    }

    for (const conversion of conversionsDirty) {
      const existing = await db.conversions.get(conversion.id);
      if (existing) {
        await db.conversions.update(conversion.id, { dirty: false });
      }
    }

    await setSince(db, data.serverTime);
    return { success: true };
  } catch (error) {
    return { error: (error as Error).message, success: false };
  }
}
