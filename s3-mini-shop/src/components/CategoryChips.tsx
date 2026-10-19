import type { Category } from "@/features/products/useProducts";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

type Props = {
  categories: Category[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
};

export function CategoryChips({ categories, selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      <Chip
        label="Toutes"
        active={selected === null}
        onPress={() => onSelect(null)}
      />
      {categories.map((category) => (
        <Chip
          key={category.slug}
          label={category.name}
          active={selected === category.slug}
          onPress={() => onSelect(category.slug)}
        />
      ))}
    </ScrollView>
  );
}

type ChipProps = { label: string; active: boolean; onPress: () => void };

function Chip({ label, active, onPress }: ChipProps) {
  return (
    <Pressable
      style={[styles.chip, active ? styles.chipActive : null]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  content: { paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#94a3b8",
    backgroundColor: "#ffffff",
  },
  chipActive: { backgroundColor: "#1d4ed8", borderColor: "#1d4ed8" },
  chipText: { fontSize: 14, color: "#334155" },
  chipTextActive: { color: "#ffffff", fontWeight: "600" },
});
