import { CategoryChips } from "@/components/CategoryChips";
import { ProductCard } from "@/components/ProductCard";
import { StateView } from "@/components/StateView";
import { useAddToCart } from "@/features/cart/useCart";
import {
  useCategories,
  useProducts,
  type Product,
} from "@/features/products/useProducts";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export default function CatalogScreen() {
  const [category, setCategory] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const search = useDebouncedValue(searchText.trim(), 400);

  const categories = useCategories();
  const query = useProducts({ category, search });
  const addToCart = useAddToCart();
  const products = query.data?.pages.flatMap((page) => page.products) ?? [];

  const selectCategory = (slug: string | null) => {
    setSearchText("");
    setCategory(slug);
  };

  const changeSearch = (text: string) => {
    setSearchText(text);
    if (text !== "") setCategory(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        value={searchText}
        onChangeText={changeSearch}
        placeholder="Rechercher un produit"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      <CategoryChips
        categories={categories.data ?? []}
        selected={category}
        onSelect={selectCategory}
      />
      {query.isPending ? (
        <StateView kind="loading" message="Chargement du catalogue" />
      ) : query.isError ? (
        <StateView
          kind="error"
          message="Impossible de charger le catalogue."
          onRetry={() => query.refetch()}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onAdd={(p: Product) =>
                addToCart.mutate({
                  product_id: p.id,
                  title: p.title,
                  price: p.price,
                  thumbnail: p.thumbnail,
                })
              }
            />
          )}
          contentContainerStyle={
            products.length === 0 ? styles.emptyContent : null
          }
          ListEmptyComponent={
            <StateView kind="empty" message="Aucun produit trouvé." />
          }
          ListFooterComponent={
            query.isFetchingNextPage ? (
              <ActivityIndicator style={styles.footer} />
            ) : null
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (query.hasNextPage && !query.isFetchingNextPage)
              query.fetchNextPage();
          }}
          refreshControl={
            <RefreshControl
              refreshing={query.isRefetching && !query.isFetchingNextPage}
              onRefresh={() => query.refetch()}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  search: {
    margin: 12,
    marginBottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#94a3b8",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  emptyContent: { flexGrow: 1 },
  footer: { paddingVertical: 16 },
});
