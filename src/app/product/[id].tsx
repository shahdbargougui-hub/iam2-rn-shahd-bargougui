import { StateView } from "@/components/StateView";
import { useAddToCart } from "@/features/cart/useCart";
import { useProduct } from "@/features/products/useProducts";
import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const query = useProduct(id);
  const addToCart = useAddToCart();

  if (query.isPending) {
    return <StateView kind="loading" message="Chargement du produit" />;
  }
  if (query.isError) {
    return (
      <StateView
        kind="error"
        message="Impossible de charger ce produit."
        onRetry={() => query.refetch()}
      />
    );
  }

  const product = query.data;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.meta}>
        {product.brand ?? "Sans marque"} - {product.category}
      </Text>
      <Text style={styles.price}>{product.price.toFixed(2)} $</Text>
      <Text style={styles.meta}>
        Note {product.rating.toFixed(1)} / 5 - {product.stock} en stock
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <Pressable
        style={[
          styles.button,
          addToCart.isPending ? styles.buttonDisabled : null,
        ]}
        disabled={addToCart.isPending}
        onPress={() =>
          addToCart.mutate({
            product_id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
          })
        }
      >
        <Text style={styles.buttonText}>Ajouter au panier</Text>
      </Pressable>
      {addToCart.isSuccess ? (
        <Text style={styles.added}>Produit ajouté au panier.</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 8, backgroundColor: "#ffffff", flexGrow: 1 },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#0f172a" },
  meta: { fontSize: 14, color: "#64748b" },
  price: { fontSize: 24, fontWeight: "700", color: "#1d4ed8" },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#334155",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#1d4ed8",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  added: { color: "#15803d", textAlign: "center" },
});
