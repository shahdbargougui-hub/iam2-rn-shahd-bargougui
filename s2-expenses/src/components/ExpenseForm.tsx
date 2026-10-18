import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

import { ChipGroup, type ChipOption } from '@/components/ChipGroup';
import type { Category, ExpenseInput } from '@/db/expenseRepo';
import { CATEGORIES, CATEGORY_LABELS } from '@/features/expenses/categories';
import {
  EMPTY_FORM_VALUES,
  validateExpense,
  type ExpenseFormErrors,
  type ExpenseFormValues,
} from '@/features/expenses/expenseForm';

type Props = {
  initialValues?: ExpenseFormValues;
  submitLabel: string;
  onSubmit: (input: ExpenseInput) => Promise<void>;
};

const CATEGORY_OPTIONS: ChipOption<Category>[] = CATEGORIES.map((category) => ({
  value: category,
  label: CATEGORY_LABELS[category],
}));

export function ExpenseForm({ initialValues = EMPTY_FORM_VALUES, submitLabel, onSubmit }: Props) {
  // initialValues is read on the first render only.
  const [values, setValues] = useState<ExpenseFormValues>(initialValues);
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const result = validateExpense(values);
    setErrors(result.errors);
    if (!result.input) {
      return;
    }
    setIsSaving(true);
    setSaveError(null);
    try {
      await onSubmit(result.input);
    } catch (e) {
      console.error(e);
      setSaveError('Enregistrement impossible.');
      setIsSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.fieldLabel}>Libellé</Text>
      <TextInput
        style={[styles.input, errors.label ? styles.inputError : null]}
        value={values.label}
        onChangeText={(text) => setValues((current) => ({ ...current, label: text }))}
        placeholder="Exemple : Sandwich"
        placeholderTextColor="#9ca3af"
        maxLength={60}
        returnKeyType="next"
      />
      {errors.label ? <Text style={styles.errorText}>{errors.label}</Text> : null}

      <Text style={styles.fieldLabel}>Montant (DT)</Text>
      <TextInput
        style={[styles.input, errors.amount ? styles.inputError : null]}
        value={values.amountText}
        onChangeText={(text) => setValues((current) => ({ ...current, amountText: text }))}
        placeholder="Exemple : 4,500"
        placeholderTextColor="#9ca3af"
        keyboardType="decimal-pad"
        maxLength={12}
      />
      {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}

      <Text style={styles.fieldLabel}>Catégorie</Text>
      <ChipGroup
        options={CATEGORY_OPTIONS}
        selected={values.category}
        onSelect={(category) => setValues((current) => ({ ...current, category }))}
      />

      {saveError ? <Text style={styles.errorText}>{saveError}</Text> : null}

      <Pressable
        style={[styles.submit, isSaving && styles.submitDisabled]}
        onPress={handleSubmit}
        disabled={isSaving}
        accessibilityRole="button"
      >
        <Text style={styles.submitText}>{isSaving ? 'Enregistrement...' : submitLabel}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#ffffff' },
  content: { padding: 16, gap: 8 },
  fieldLabel: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1f2430',
  },
  inputError: { borderColor: '#b91c1c' },
  errorText: { fontSize: 14, color: '#b91c1c' },
  submit: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#1f2430',
  },
  submitDisabled: { opacity: 0.5 },
  submitText: { fontSize: 16, fontWeight: '700', color: '#ffffff' },
});