import type { SQLiteDatabase } from "expo-sqlite";

export type CartItem = {
  product_id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

export type NewCartItem = Omit<CartItem, "quantity">;

export const cartRepo = (db: SQLiteDatabase) => ({
  all: () =>
    db.getAllAsync<CartItem>("SELECT * FROM cart_items ORDER BY title"),
  add: (item: NewCartItem) =>
    db.runAsync(
      `INSERT INTO cart_items (product_id, title, price, thumbnail, quantity)
       VALUES (?, ?, ?, ?, 1)
       ON CONFLICT(product_id) DO UPDATE SET quantity = quantity + 1`,
      item.product_id,
      item.title,
      item.price,
      item.thumbnail,
    ),
  remove: (productId: number) =>
    db.runAsync("DELETE FROM cart_items WHERE product_id = ?", productId),
  clear: () => db.runAsync("DELETE FROM cart_items"),
});
