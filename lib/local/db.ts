import { Dexie, type EntityTable } from "dexie";

export interface Favorite {
  id: string;
  base: string;
  quote: string;
  updatedAt: string;
  deletedAt: string | null;
  dirty: boolean;
}
export interface Conversion {
  id: string;
  base: string;
  quote: string;
  sentAmount: number;
  receivedAmount: number;
  rate: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  dirty: boolean;
}
interface Meta {
  key: "since";
  value: string | null;
}
export interface Db extends Dexie {
  favorites: EntityTable<Favorite, "id">;
  conversions: EntityTable<Conversion, "id">;
  meta: EntityTable<Meta, "key">;
}
const dbCache = new Map<string, Db>();

export function getDb(userId: string) {
  if (dbCache.has(userId)) {
    return dbCache.get(userId)!;
  }
  const db = new Dexie(`fx-checker-${userId}`) as Db;
  db.version(1).stores({
    favorites: "id, base, quote, updatedAt, deletedAt, dirty, [base+quote]",
    conversions: "id, updatedAt, createdAt, deletedAt, dirty",
    meta: "key",
  });
  dbCache.set(userId, db);
  return db;
}
export async function getSince(db: Db) {
  const row = await db.meta.get("since");
  return row?.value ?? null;
}
export function setSince(db: Db, since: string | null) {
  return db.meta.put({ key: "since", value: since ?? null });
}
export async function listFavorites(db: Db) {
  const rows = await db.favorites.toArray();
  return rows.filter((row) => !row.deletedAt);
}
export async function listDirtyFavorites(db: Db) {
  const rows = await db.favorites.toArray();
  return rows.filter((row) => row.dirty);
}
export async function listDirtyConversions(db: Db) {
  const rows = await db.conversions.toArray();
  return rows.filter((row) => row.dirty);
}
export function upsertFavorite(db: Db, favorite: Favorite) {
  return db.favorites.put(favorite);
}
export function upsertConversion(db: Db, conversion: Conversion) {
  return db.conversions.put(conversion);
}
export async function listConversions(db: Db) {
  const rows = await db.conversions.toArray();
  return rows.filter((row) => !row.deletedAt);
}
export async function wipeUserData(db: Db) {
  await Promise.all([
    db.favorites.clear(),
    db.conversions.clear(),
    db.meta.clear(),
  ]);
  return db;
}
