import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ROLE_LABELS, type Contact } from "@/features/contacts/contacts";

type Props = {
  contact: Contact;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export function ContactRow({ contact, isFavorite, onToggleFavorite }: Props) {
  const initial = contact.name.charAt(0).toUpperCase();

  return (
    <View style={styles.row}>
      <Link
        href={{ pathname: "/contact/[id]", params: { id: contact.id } }}
        asChild
      >
        <Pressable style={styles.main}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={styles.texts}>
            <Text style={styles.name}>{contact.name}</Text>
            <Text style={styles.role}>{ROLE_LABELS[contact.role]}</Text>
          </View>
        </Pressable>
      </Link>
      <Pressable
        style={[styles.favorite, isFavorite && styles.favoriteActive]}
        onPress={onToggleFavorite}
        accessibilityRole="button"
        accessibilityState={{ selected: isFavorite }}
      >
        <Text
          style={[styles.favoriteText, isFavorite && styles.favoriteTextActive]}
        >
          {isFavorite ? "Favori" : "Ajouter"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  main: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f2430",
  },
  avatarText: { fontSize: 16, fontWeight: "700", color: "#ffffff" },
  texts: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600", color: "#1f2430" },
  role: { fontSize: 14, color: "#6b7280", marginTop: 2 },
  favorite: {
    minWidth: 76,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#9ca3af",
  },
  favoriteActive: { backgroundColor: "#1f2430", borderColor: "#1f2430" },
  favoriteText: { fontSize: 13, fontWeight: "600", color: "#1f2430" },
  favoriteTextActive: { color: "#ffffff" },
});
