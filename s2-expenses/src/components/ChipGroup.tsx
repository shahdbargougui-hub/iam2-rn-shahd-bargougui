import { Pressable, StyleSheet, Text, View } from "react-native";

export type ChipOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  options: ChipOption<T>[];
  selected: T;
  onSelect: (value: T) => void;
};

// Generic component: T is the union of the allowed values.
export function ChipGroup<T extends string>({
  options,
  selected,
  onSelect,
}: Props<T>) {
  return (
    <View style={styles.group}>
      {options.map((option) => {
        const isSelected = option.value === selected;
        return (
          <Pressable
            key={option.value}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            <Text
              style={[styles.chipText, isSelected && styles.chipTextSelected]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#9ca3af",
  },
  chipSelected: { backgroundColor: "#1f2430", borderColor: "#1f2430" },
  chipText: { fontSize: 14, fontWeight: "600", color: "#1f2430" },
  chipTextSelected: { color: "#ffffff" },
});
