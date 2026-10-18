import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import { migrateDbIfNeeded } from "@/db/migrations";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="expenses.db" onInit={migrateDbIfNeeded}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Dépenses" }} />
        <Stack.Screen
          name="expense/new"
          options={{ title: "Nouvelle dépense", headerBackTitle: "Retour" }}
        />
        <Stack.Screen
          name="expense/[id]"
          options={{ title: "Modifier la dépense" }}
        />
      </Stack>
    </SQLiteProvider>
  );
}
