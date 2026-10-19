import type { SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 1;

export async function migrateDbIfNeeded(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );
  let version = row?.user_version ?? 0;
  if (version >= DATABASE_VERSION) return;
  if (version === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS cart_items (
        product_id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        price REAL NOT NULL,
        thumbnail TEXT NOT NULL,
        quantity INTEGER NOT NULL
      );
    `);
    version = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
