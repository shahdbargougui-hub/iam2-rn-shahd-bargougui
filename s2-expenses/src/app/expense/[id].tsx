import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { ExpenseForm } from '@/components/ExpenseForm';
import type { ExpenseInput } from '@/db/expenseRepo';
import { toFormValues } from '@/features/expenses/expenseForm';
import { useExpense } from '@/features/expenses/useExpense';
import { useExpenseActions } from '@/features/expenses/useExpenseActions';

export default function EditExpenseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const expenseId = Number(id);
  const router = useRouter();
  const state = useExpense(expenseId);
  const { updateExpense, removeExpense } = useExpenseActions();

  if (state.status === 'loading') {
    return (
      <View style={styles.center}>
        <Text style={styles.info}>Chargement...</Text>
      </View>
    );
  }

  if (state.status === 'missing') {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Dépense introuvable</Text>
        <Text style={styles.info}>Identifiant demandé : {id}</Text>
      </View>
    );
  }

  const { expense } = state;

  const handleSubmit = async (input: ExpenseInput) => {
    await updateExpense(expense.id, input);
    router.back();
  };

  const handleRemove = async () => {
    try {
      await removeExpense(expense.id);
      router.back();
    } catch (e) {
      console.error(e);
      Alert.alert('Erreur', 'Suppression impossible.');
    }
  };

  const confirmRemove = () => {
    Alert.alert('Supprimer la dépense', `Supprimer « ${expense.label} » ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: handleRemove },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ExpenseForm initialValues={toFormValues(expense)} submitLabel="Enregistrer" onSubmit={handleSubmit} />
      <View style={styles.footer}>
        <Pressable style={styles.dangerButton} onPress={confirmRemove} accessibilityRole="button">
          <Text style={styles.dangerButtonText}>Supprimer</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#ffffff' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: { fontSize: 20, fontWeight: '700', color: '#1f2430' },
  info: { fontSize: 16, color: '#6b7280' },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  dangerButton: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b91c1c',
  },
  dangerButtonText: { fontSize: 16, fontWeight: '700', color: '#b91c1c' },
});