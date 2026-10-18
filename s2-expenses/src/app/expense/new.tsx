import { useRouter } from 'expo-router';

import { ExpenseForm } from '@/components/ExpenseForm';
import { useExpenseActions } from '@/features/expenses/useExpenseActions';

export default function NewExpenseScreen() {
  const router = useRouter();
  const { addExpense } = useExpenseActions();

  return (
    <ExpenseForm
      submitLabel="Ajouter"
      onSubmit={async (input) => {
        await addExpense(input);
        router.back();
      }}
    />
  );
}