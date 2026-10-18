import type { Category, Expense, ExpenseInput } from '@/db/expenseRepo';

// What the form holds while the user types: the amount is still a text.
export type ExpenseFormValues = {
  label: string;
  amountText: string;
  category: Category;
};

export type ExpenseFormErrors = {
  label?: string;
  amount?: string;
};

export const EMPTY_FORM_VALUES: ExpenseFormValues = {
  label: '',
  amountText: '',
  category: 'food',
};

// Fills the form from a stored expense: 4.5 becomes the text "4,5".
export function toFormValues(expense: Expense): ExpenseFormValues {
  return {
    label: expense.label,
    amountText: String(expense.amount).replace('.', ','),
    category: expense.category,
  };
}

// "12,5" and "12.5" both give 12.5; an empty, invalid or negative text gives null.
export function parseAmount(text: string): number | null {
  const normalized = text.trim().replace(',', '.');
  if (normalized === '') {
    return null;
  }
  // Number('abc') is NaN; rounding keeps three decimals (millimes).
  const value = Math.round(Number(normalized) * 1000) / 1000;
  if (!Number.isFinite(value) || value < 0) {
    return null;
  }
  return value;
}
export type ExpenseValidation = {
  errors: ExpenseFormErrors;
  input: ExpenseInput | null;
};

// Checks the form values; input is null when at least one field is invalid.
export function validateExpense(values: ExpenseFormValues): ExpenseValidation {
  const errors: ExpenseFormErrors = {};

  const label = values.label.trim();
  if (label === '') {
    errors.label = 'Le libellé est obligatoire.';
  }

  const amount = parseAmount(values.amountText);
  if (amount === null || amount <= 0) {
    errors.amount = 'Saisissez un montant supérieur à 0.';
  }

  if (errors.label || errors.amount || amount === null) {
    return { errors, input: null };
  }
  return { errors, input: { label, amount, category: values.category } };
}