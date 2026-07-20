import { FavoriteSyncItem } from "@/lib/types/sync";
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
      throw new Error("User not found");
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
    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error applying favorite push" };
  }
}
