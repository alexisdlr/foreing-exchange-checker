import { TOMBSTONE_RETENTION_DAYS } from "../constants";
import { ConversionSyncItem, FavoriteSyncItem } from "../types/sync";
import { prisma } from "@/lib/prisma";

export async function buildPull(
  userId: string,
  since: string | null,
): Promise<{
  favorites: FavoriteSyncItem[];
  conversions: ConversionSyncItem[];
  error: string | null;
  status: number;
}> {
  try {
    const favorites = await prisma.favorite.findMany({
      where: pullWhere(userId, since),
    });
    const conversions = await prisma.conversion.findMany({
      where: pullWhere(userId, since),
    });
    return {
      favorites: favorites.map((favorite) => ({
        id: favorite.id,
        base: favorite.base,
        quote: favorite.quote,
        updatedAt: favorite.updatedAt.toISOString(),
        deletedAt: favorite.deletedAt?.toISOString() ?? null,
      })),
      conversions: conversions.map((conversion) => ({
        id: conversion.id,
        base: conversion.base,
        quote: conversion.quote,
        sentAmount: conversion.sentAmount.toNumber(),
        receivedAmount: conversion.receivedAmount.toNumber(),
        rate: conversion.rate.toNumber(),
        updatedAt: conversion.updatedAt.toISOString(),
        deletedAt: conversion.deletedAt?.toISOString() ?? null,
        createdAt: conversion.createdAt.toISOString(),
      })),
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      favorites: [],
      conversions: [],
      error: "Error building pull",
      status: 500,
    };
  }
}

function pullWhere(userId: string, since: string | null) {
  if (!since) {
    return {
      userId: userId,
      OR: [
        {
          deletedAt: null,
        },
        {
          deletedAt: {
            gt: new Date(
              Date.now() - TOMBSTONE_RETENTION_DAYS * 24 * 60 * 60 * 1000,
            ),
          },
        },
      ],
    };
  } else {
    return {
      userId: userId,
      updatedAt: { gt: new Date(since) },
    };
  }
}
