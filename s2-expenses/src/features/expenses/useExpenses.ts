import { useIsFocused } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

import { expenseRepo, type Expense } from "@/db/expenseRepo";
import type { CategoryFilter } from "@/features/expenses/categories";

export function useExpenses(filter: CategoryFilter) {
  const db = useSQLiteContext();
  const isFocused = useIsFocused();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState<number>(0);

  useEffect(() => {
    // Read again each time the screen comes back to the front.
    if (!isFocused) {
      return;
    }
    let isCurrent = true;

    const load = async () => {
      try {
        const repo = expenseRepo(db);
        const category = filter === "all" ? undefined : filter;
        // The two queries are independent: start both, then wait for both.
        const [rows, sum] = await Promise.all([
          repo.all(category),
          repo.total(category),
        ]);
        if (isCurrent) {
          setExpenses(rows);
          setTotal(sum);
          setError(null);
        }
      } catch (e) {
        console.error(e);
        if (isCurrent) {
          setError("Lecture de la base impossible.");
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    load();

    // Cleanup: a slow answer from an older effect must not overwrite a newer one.
    return () => {
      isCurrent = false;
    };
  }, [db, filter, isFocused, reloadCount]);

  // Changing reloadCount changes a dependency, so the effect runs again.
  const reload = () => setReloadCount((count) => count + 1);

  return { expenses, total, isLoading, error, reload };
}