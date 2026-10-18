import { StyleSheet, Text, View } from "react-native";

type Track = "IAM1" | "IAM2";

type Profile = {
  firstName: string;
  lastName: string;
  track: Track;
  email?: string;
};

// Replace with your own first name and last name.
const profile: Profile = {
  firstName: "Bargougui",
  lastName: "Shahd",
  track: "IAM2",
};

export default function ProfileScreen() {
  const initials =
    `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.name}>
        {profile.firstName} {profile.lastName}
      </Text>
      <Text style={styles.line}>Parcours : {profile.track}</Text>
      <Text style={styles.line}>
        E-mail : {profile.email ?? "shahdbargougui@gmail.com"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 24,
    backgroundColor: "#ffffff",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f2430",
    marginBottom: 8,
  },
  avatarText: { fontSize: 36, fontWeight: "700", color: "#ffffff" },
  name: { fontSize: 24, fontWeight: "700", color: "#1f2430" },
  line: { fontSize: 16, color: "#374151" },
});
