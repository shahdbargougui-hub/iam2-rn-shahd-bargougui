import { StateView } from "@/components/StateView";
import { useAuth } from "@/features/auth/AuthContext";
import {
    loginErrorMessage,
    useLogin,
    useLogout,
    useMe,
} from "@/features/auth/useSession";
import { useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function AccountScreen() {
  const { token, isRestoring } = useAuth();

  if (isRestoring) {
    return <StateView kind="loading" />;
  }
  return token === null ? <LoginForm /> : <Profile />;
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const canSubmit =
    username.trim() !== "" && password !== "" && !login.isPending;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Connexion</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Identifiant"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        secureTextEntry
      />
      {login.isError ? (
        <Text style={styles.error}>{loginErrorMessage(login.error)}</Text>
      ) : null}
      <Pressable
        style={[styles.button, canSubmit ? null : styles.buttonDisabled]}
        disabled={!canSubmit}
        onPress={() => login.mutate({ username: username.trim(), password })}
      >
        <Text style={styles.buttonText}>
          {login.isPending ? "Connexion en cours" : "Se connecter"}
        </Text>
      </Pressable>
    </View>
  );
}

function Profile() {
  const me = useMe();
  const logout = useLogout();

  if (me.isPending) {
    return <StateView kind="loading" message="Chargement du profil" />;
  }

  return (
    <View style={styles.container}>
      {me.isError ? (
        <Text style={styles.error}>
          Session expirée ou réseau indisponible.
        </Text>
      ) : (
        <>
          <Image source={{ uri: me.data.image }} style={styles.avatar} />
          <Text style={styles.heading}>
            {me.data.firstName} {me.data.lastName}
          </Text>
          <Text style={styles.meta}>{me.data.email}</Text>
        </>
      )}
      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12, backgroundColor: "#f8fafc" },
  heading: { fontSize: 22, fontWeight: "700", color: "#0f172a" },
  meta: { fontSize: 16, color: "#64748b" },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#94a3b8",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#e2e8f0",
  },
  error: { color: "#b91c1c" },
  button: {
    backgroundColor: "#1d4ed8",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
});
