import type { SQLiteDatabase } from 'expo-sqlite';

export type Category = 'food' | 'transport' | 'housing' | 'leisure' | 'other';

export type Expense = {
  id: number;
  label: string;
  amount: number;
  category: Category;
  created_at: number;
};

export type NewExpense = {
  label: string;
  amount: number;
  category: Category;
};

export type ExpenseInput = NewExpense;

export function expenseRepo(db: SQLiteDatabase) {
  return {
    // Newest first; optionally filtered by category.
    all: (category?: Category) =>
      category
        ? db.getAllAsync<Expense>(
            'SELECT * FROM expenses WHERE category = ? ORDER BY created_at DESC, id DESC',
            category,
          )
        : db.getAllAsync<Expense>('SELECT * FROM expenses ORDER BY created_at DESC, id DESC'),

    // Sum of amounts, optionally for one category.
    total: async (category?: Category): Promise<number> => {
      const row = category
        ? await db.getFirstAsync<{ total: number | null }>(
            'SELECT SUM(amount) AS total FROM expenses WHERE category = ?',
            category,
          )
        : await db.getFirstAsync<{ total: number | null }>('SELECT SUM(amount) AS total FROM expenses');
      // SUM returns NULL when no row matches.
      return row?.total ?? 0;
    },

    // Returns null when no expense has this id.
    byId: (id: number): Promise<Expense | null> =>
      db.getFirstAsync<Expense>('SELECT * FROM expenses WHERE id = ?', id),

    add: async (input: ExpenseInput): Promise<void> => {
      await db.runAsync(
        'INSERT INTO expenses (label, amount, category, created_at) VALUES (?, ?, ?, ?)',
        input.label,
        input.amount,
        input.category,
        Date.now(),
      );
    },

    // All the rows are written, or none: an error undoes every INSERT of the block.
    addMany: (inputs: ExpenseInput[]) =>
      db.withTransactionAsync(async () => {
        for (const input of inputs) {
          await db.runAsync(
            'INSERT INTO expenses (label, amount, category, created_at) VALUES (?, ?, ?, ?)',
            input.label,
            input.amount,
            input.category,
            Date.now(),
          );
        }
      }),

    update: async (id: number, input: ExpenseInput): Promise<void> => {
      await db.runAsync(
        'UPDATE expenses SET label = ?, amount = ?, category = ? WHERE id = ?',
        input.label,
        input.amount,
        input.category,
        id,
      );
    },

    remove: async (id: number): Promise<void> => {
      await db.runAsync('DELETE FROM expenses WHERE id = ?', id);
    },
  };
}