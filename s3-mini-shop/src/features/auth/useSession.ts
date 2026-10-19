import { api, ApiError } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./AuthContext";

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
};

type LoginResponse = User & { accessToken: string; refreshToken: string };

type Credentials = { username: string; password: string };

export function useLogin() {
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: (credentials: Credentials) =>
      api<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ ...credentials, expiresInMins: 60 }),
      }),
    onSuccess: (data) => signIn(data.accessToken),
  });
}

export function useMe() {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["me"],
    queryFn: () => api<User>("/auth/me", { token }),
    enabled: token !== null,
    retry: (failureCount, error) =>
      !(error instanceof ApiError && error.status === 401) && failureCount < 2,
  });
}

export function useLogout() {
  const { signOut } = useAuth();
  const queryClient = useQueryClient();
  return async () => {
    await signOut();
    queryClient.removeQueries({ queryKey: ["me"] });
  };
}

export function loginErrorMessage(error: Error): string {
  if (error instanceof ApiError && error.status === 400) {
    return "Identifiant ou mot de passe incorrect.";
  }
  return "Connexion impossible. Vérifiez le réseau puis réessayez.";
}
