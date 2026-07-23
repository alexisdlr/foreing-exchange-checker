import { Db, Favorite } from "./db";

export async function getFavoriteByPair(
  db: Db,
  base: string,
  quote: string,
): Promise<Favorite[]> {
  const favorites = await db.favorites
    .where("[base+quote]")
    .equals([base.toUpperCase(), quote.toUpperCase()])
    .toArray();
  return favorites;
}

export async function toggleFavorite(
  db: Db,
  base: string,
  quote: string,
): Promise<"added" | "removed"> {
  const rows = await getFavoriteByPair(
    db,
    base.toUpperCase(),
    quote.toUpperCase(),
  );
  const live = rows.find((r) => r.deletedAt === null);
  const tombstone = rows.find((r) => r.deletedAt !== null);
  const now = new Date().toISOString();
  if (live) {
    await db.favorites.update(live.id, {
      dirty: true,
      updatedAt: now,
      deletedAt: now,
    });
    return "removed";
  } else if (tombstone) {
    await db.favorites.update(tombstone.id, {
      dirty: true,
      updatedAt: now,
      deletedAt: null,
    });
    return "added";
  } else {
    await db.favorites.add({
      id: crypto.randomUUID(),
      base: base.toUpperCase(),
      quote: quote.toUpperCase(),
      dirty: true,
      updatedAt: now,
      deletedAt: null,
    });
    return "added";
  }
}
