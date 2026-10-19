import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { ContactRow } from "@/components/ContactRow";
import { CONTACTS } from "@/features/contacts/contacts";

function Separator() {
  return <View style={styles.separator} />;
}

export default function ContactsScreen() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    console.log(`Favorites: ${favoriteIds.length}`);
  }, [favoriteIds]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  };

  return (
    <FlatList
      style={styles.list}
      data={CONTACTS}
      extraData={favoriteIds}
      keyExtractor={(contact) => contact.id}
      renderItem={({ item }) => (
        <ContactRow
          contact={item}
          isFavorite={favoriteIds.includes(item.id)}
          onToggleFavorite={() => toggleFavorite(item.id)}
        />
      )}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={
        <Text style={styles.header}>
          Favoris : {favoriteIds.length} sur {CONTACTS.length}
        </Text>
      }
      ListEmptyComponent={<Text style={styles.empty}>Aucun contact.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  separator: { height: 1, backgroundColor: "#e5e7eb", marginLeft: 68 },
  empty: { padding: 24, textAlign: "center", color: "#6b7280" },
});
