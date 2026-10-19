import { migrateDbIfNeeded } from "@/db/migrations";
import { AuthProvider } from "@/features/auth/AuthContext";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SQLiteProvider databaseName="shop.db" onInit={migrateDbIfNeeded}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="product/[id]" options={{ title: "Produit" }} />
          </Stack>
        </AuthProvider>
      </SQLiteProvider>
    </QueryClientProvider>
  );
}
