import type { Product } from "@/features/products/useProducts";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = { product: Product; onAdd?: (product: Product) => void };

export function ProductCard({ product, onAdd }: Props) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: product.thumbnail }} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>{product.price.toFixed(2)} $</Text>
      </View>
      {onAdd ? (
        <Pressable style={styles.button} onPress={() => onAdd(product)}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  thumb: { width: 56, height: 56, borderRadius: 8, backgroundColor: "#e2e8f0" },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", color: "#0f172a" },
  category: { fontSize: 13, color: "#64748b", marginTop: 2 },
  price: { fontSize: 16, fontWeight: "700", color: "#1d4ed8", marginTop: 4 },
  button: {
    backgroundColor: "#1d4ed8",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: { color: "#ffffff", fontWeight: "600" },
});
