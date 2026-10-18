import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ChipGroup, type ChipOption } from "@/components/ChipGroup";
import { ExpenseRow } from "@/components/ExpenseRow";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  type CategoryFilter,
} from "@/features/expenses/categories";
import { formatAmount } from "@/features/expenses/format";
import { useExpenseActions } from "@/features/expenses/useExpenseActions";
import { useExpenses } from "@/features/expenses/useExpenses";

const FILTER_OPTIONS: ChipOption<CategoryFilter>[] = [
  { value: "all", label: "Toutes" },
  ...CATEGORIES.map((category) => ({
    value: category,
    label: CATEGORY_LABELS[category],
  })),
];

function Separator() {
  return <View style={styles.separator} />;
}

export default function ExpensesScreen() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const { expenses, total, isLoading, error, reload } = useExpenses(filter);
  const { addSampleExpenses } = useExpenseActions();

  const handleAddSamples = async () => {
    try {
      await addSampleExpenses();
    } catch (e) {
      console.error(e);
      Alert.alert("Erreur", "Aucun exemple n'a été ajouté.");
    }
    reload();
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.info}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <ChipGroup
          options={FILTER_OPTIONS}
          selected={filter}
          onSelect={setFilter}
        />
        <Text style={styles.total}>
          Total : {formatAmount(total)} ({expenses.length})
        </Text>
      </View>
      <FlatList
        style={styles.list}
        data={expenses}
        keyExtractor={(expense) => String(expense.id)}
        renderItem={({ item }) => <ExpenseRow expense={item} />}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={<Text style={styles.empty}>Aucune dépense.</Text>}
      />
      <View style={styles.footer}>
        <Link href="/expense/new" asChild>
          <Pressable style={styles.primaryButton} accessibilityRole="button">
            <Text style={styles.primaryButtonText}>Ajouter une dépense</Text>
          </Pressable>
        </Link>
        <Pressable
          style={styles.secondaryButton}
          onPress={handleAddSamples}
          accessibilityRole="button"
        >
          <Text style={styles.secondaryButtonText}>Ajouter 3 exemples</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  total: { fontSize: 16, fontWeight: "700", color: "#1f2430" },
  list: { flex: 1 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  info: { fontSize: 16, color: "#6b7280" },
  error: { fontSize: 16, color: "#b91c1c", textAlign: "center" },
  separator: { height: 1, backgroundColor: "#e5e7eb", marginLeft: 16 },
  empty: { padding: 24, textAlign: "center", color: "#6b7280" },
  footer: { padding: 16, gap: 8, borderTopWidth: 1, borderTopColor: "#e5e7eb" },
  primaryButton: {
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#1f2430",
  },
  primaryButtonText: { fontSize: 16, fontWeight: "700", color: "#ffffff" },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#9ca3af",
  },
  secondaryButtonText: { fontSize: 16, fontWeight: "600", color: "#1f2430" },
});
