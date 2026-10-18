import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';

import { expenseRepo, type Expense } from '@/db/expenseRepo';

// Discriminated union: expense exists only when status is 'ready'.
export type ExpenseState =
  | { status: 'loading' }
  | { status: 'missing' }
  | { status: 'ready'; expense: Expense };

export function useExpense(id: number): ExpenseState {
  const db = useSQLiteContext();
  const [state, setState] = useState<ExpenseState>({ status: 'loading' });

  useEffect(() => {
    let isCurrent = true;

    const load = async () => {
      try {
        // A route parameter such as "abc" gives NaN: no query is needed.
        const row = Number.isInteger(id) ? await expenseRepo(db).byId(id) : null;
        if (isCurrent) {
          setState(row ? { status: 'ready', expense: row } : { status: 'missing' });
        }
      } catch (e) {
        console.error(e);
        if (isCurrent) {
          setState({ status: 'missing' });
        }
      }
    };

    load();

    return () => {
      isCurrent = false;
    };
  }, [db, id]);

  return state;
}