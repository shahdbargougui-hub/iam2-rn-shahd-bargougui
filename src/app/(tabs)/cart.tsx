import { StateView } from "@/components/StateView";
import { useCart, useRemoveFromCart } from "@/features/cart/useCart";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function CartScreen() {
  const { items, total, isPending } = useCart();
  const removeFromCart = useRemoveFromCart();

  if (isPending) {
    return <StateView kind="loading" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.product_id)}
        contentContainerStyle={items.length === 0 ? styles.emptyContent : null}
        ListEmptyComponent={
          <StateView kind="empty" message="Votre panier est vide." />
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.meta}>
                {item.quantity} x {item.price.toFixed(2)} $
              </Text>
            </View>
            <Pressable onPress={() => removeFromCart.mutate(item.product_id)}>
              <Text style={styles.remove}>Retirer</Text>
            </Pressable>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total : {total.toFixed(2)} $</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  emptyContent: { flexGrow: 1 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#cbd5e1",
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", color: "#0f172a" },
  meta: { fontSize: 14, color: "#64748b", marginTop: 2 },
  remove: { color: "#b91c1c", fontWeight: "600" },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "right",
  },
});
