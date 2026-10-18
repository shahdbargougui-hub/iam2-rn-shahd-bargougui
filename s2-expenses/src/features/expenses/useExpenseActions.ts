import { useSQLiteContext } from "expo-sqlite";

import { expenseRepo, type ExpenseInput } from "@/db/expenseRepo";

const SAMPLE_EXPENSES: ExpenseInput[] = [
  { label: "Sandwich", amount: 4.5, category: "food" },
  { label: "Taxi", amount: 3.2, category: "transport" },
  { label: "Cinéma", amount: 9, category: "leisure" },
];

export function useExpenseActions() {
  const db = useSQLiteContext();
  const repo = expenseRepo(db);

  const addExpense = async (input: ExpenseInput): Promise<void> => {
    await repo.add(input);
  };

  const updateExpense = async (
    id: number,
    input: ExpenseInput,
  ): Promise<void> => {
    await repo.update(id, input);
  };

  const removeExpense = async (id: number): Promise<void> => {
    await repo.remove(id);
  };

  const addSampleExpenses = async (): Promise<void> => {
    await repo.addMany(SAMPLE_EXPENSES);
  };

  return { addExpense, updateExpense, removeExpense, addSampleExpenses };
}
