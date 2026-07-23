import { ConversionSyncItem, FavoriteSyncItem } from "@/lib/types/sync";
import { prisma } from "@/lib/prisma";
export async function applyFavoritePush(
  userId: string,
  favorites: FavoriteSyncItem[],
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return { success: false, error: "User not found", status: 404 };
    }
    for (const favorite of favorites) {
      const existingById = await prisma.favorite.findUnique({
        where: {
          id: favorite.id,
        },
      });

      if (existingById && existingById.userId !== userId) {
        continue;
      }

      if (existingById) {
        if (existingById.updatedAt < new Date(favorite.updatedAt)) {
          await prisma.favorite.update({
            where: { id: existingById.id },
            data: {
              base: favorite.base,
              quote: favorite.quote,
              updatedAt: new Date(favorite.updatedAt),
              deletedAt: favorite.deletedAt
                ? new Date(favorite.deletedAt)
                : null,
            },
          });
        }
      } else {
        const existingByPair = await prisma.favorite.findUnique({
          where: {
            userId_base_quote: {
              userId: user.id,
              base: favorite.base,
              quote: favorite.quote,
            },
          },
        });

        if (existingByPair) {
          if (existingByPair.updatedAt < new Date(favorite.updatedAt)) {
            await prisma.favorite.update({
              where: { id: existingByPair.id },
              data: {
                updatedAt: new Date(favorite.updatedAt),
                deletedAt: favorite.deletedAt
                  ? new Date(favorite.deletedAt)
                  : null,
                base: favorite.base,
                quote: favorite.quote,
              },
            });
          }
        } else {
          await prisma.favorite.create({
            data: {
              id: favorite.id,
              userId: user.id,
              base: favorite.base,
              quote: favorite.quote,
              updatedAt: new Date(favorite.updatedAt),
              deletedAt: favorite.deletedAt
                ? new Date(favorite.deletedAt)
                : null,
            },
          });
        }
      }
    }
    return { success: true, error: null, status: 200 };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error applying favorite push" };
  }
}

export async function applyConversionPush(
  userId: string,
  conversions: ConversionSyncItem[],
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return { success: false, error: "User not found", status: 404 };
    }
    for (const conversion of conversions) {
      const existingById = await prisma.conversion.findUnique({
        where: { id: conversion.id },
      });
      if (existingById && existingById.userId !== userId) {
        continue;
      }
      if (existingById) {
        if (existingById.updatedAt < new Date(conversion.updatedAt)) {
          await prisma.conversion.update({
            where: { id: existingById.id },
            data: {
              base: conversion.base,
              quote: conversion.quote,
              sentAmount: conversion.sentAmount,
              receivedAmount: conversion.receivedAmount,
              rate: conversion.rate,
              updatedAt: new Date(conversion.updatedAt),
              deletedAt: conversion.deletedAt
                ? new Date(conversion.deletedAt)
                : null,
            },
          });
        }
      } else {
        await prisma.conversion.create({
          data: {
            id: conversion.id,
            userId: user.id,
            base: conversion.base,
            quote: conversion.quote,
            sentAmount: conversion.sentAmount,
            receivedAmount: conversion.receivedAmount,
            rate: conversion.rate,
            updatedAt: new Date(conversion.updatedAt),
            createdAt: new Date(conversion.createdAt),
            deletedAt: conversion.deletedAt
              ? new Date(conversion.deletedAt)
              : null,
          },
        });
      }
    }
    return { success: true, error: null, status: 200 };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Error applying conversion push",
      status: 500,
    };
  }
}
