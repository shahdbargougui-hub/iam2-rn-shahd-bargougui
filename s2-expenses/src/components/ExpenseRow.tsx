import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Expense } from "@/db/expenseRepo";
import { CATEGORY_LABELS } from "@/features/expenses/categories";
import { formatAmount, formatDate } from "@/features/expenses/format";

type Props = {
  expense: Expense;
};

export function ExpenseRow({ expense }: Props) {
  return (
    <Link
      href={{ pathname: "/expense/[id]", params: { id: String(expense.id) } }}
      asChild
    >
      <Pressable style={styles.row}>
        <View style={styles.texts}>
          <Text style={styles.label}>{expense.label}</Text>
          <Text style={styles.meta}>
            {CATEGORY_LABELS[expense.category]} -{" "}
            {formatDate(expense.created_at)}
          </Text>
        </View>
        <Text style={styles.amount}>{formatAmount(expense.amount)}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  texts: { flex: 1 },
  label: { fontSize: 16, fontWeight: "600", color: "#1f2430" },
  meta: { fontSize: 14, color: "#6b7280", marginTop: 2 },
  amount: { fontSize: 16, fontWeight: "700", color: "#1f2430" },
});
