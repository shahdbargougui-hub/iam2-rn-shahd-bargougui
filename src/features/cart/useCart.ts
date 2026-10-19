import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

export type CartItem = {
  product_id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

export type CartInput = Omit<CartItem, "quantity">;

export function useCartItems() {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      db.getAllAsync<CartItem>("SELECT * FROM cart_items ORDER BY title"),
  });
}

export function useCart() {
  const query = useCartItems();
  const items = query.data ?? [];
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return { items, count, total, isPending: query.isPending };
}

export function useAddToCart() {
  const db = useSQLiteContext();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: CartInput) => {
      await db.runAsync(
        `INSERT INTO cart_items (product_id, title, price, thumbnail, quantity)
         VALUES (?, ?, ?, ?, 1)
         ON CONFLICT(product_id) DO UPDATE SET quantity = quantity + 1`,
        p.product_id,
        p.title,
        p.price,
        p.thumbnail,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useRemoveFromCart() {
  const db = useSQLiteContext();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      await db.runAsync("DELETE FROM cart_items WHERE product_id = ?", productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}
