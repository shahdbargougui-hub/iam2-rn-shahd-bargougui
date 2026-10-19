import { useCart } from "@/features/cart/useCart";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { count } = useCart();
  return (
    <Tabs
      screenOptions={{
        tabBarIconStyle: { display: "none" },
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Catalogue" }} />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Panier",
          tabBarBadge: count > 0 ? count : undefined,
        }}
      />
    </Tabs>
  );
}
