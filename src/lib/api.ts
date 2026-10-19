const BASE_URL = "https://dummyjson.com";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ApiOptions = RequestInit & { token?: string | null };

export async function api<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { token, headers, ...rest } = options;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });
  if (!res.ok) {
    throw new ApiError(res.status, `HTTP ${res.status} on ${path}`);
  }
  return (await res.json()) as T;
}
