import type { SQLiteDatabase } from 'expo-sqlite';

const DATABASE_VERSION = 1;

export async function migrateDbIfNeeded(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let version = row?.user_version ?? 0;
  console.log(`Database opened at version ${version}`);

  if (version >= DATABASE_VERSION) {
    return;
  }

  if (version === 0) {
    // execAsync runs several statements at once, but accepts no parameters.
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );
    `);
    // runAsync runs one statement, with one value per question mark.
    await db.runAsync(
      'INSERT INTO expenses (label, amount, category, created_at) VALUES (?, ?, ?, ?)',
      'Café',
      1.5,
      'food',
      Date.now(),
    );
    await db.runAsync(
      'INSERT INTO expenses (label, amount, category, created_at) VALUES (?, ?, ?, ?)',
      'Ticket de bus',
      0.8,
      'transport',
      Date.now(),
    );
    version = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  console.log(`Database migrated to version ${version}`);
}