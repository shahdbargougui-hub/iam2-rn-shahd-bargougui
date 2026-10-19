import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  kind: "loading" | "error" | "empty";
  message?: string;
  onRetry?: () => void;
};

export function StateView({ kind, message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      {kind === "loading" ? <ActivityIndicator size="large" /> : null}
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {kind === "error" && onRetry ? (
        <Pressable style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Réessayer</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  message: { fontSize: 16, color: "#475569", textAlign: "center" },
  button: {
    backgroundColor: "#1d4ed8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: "#ffffff", fontWeight: "600" },
});
