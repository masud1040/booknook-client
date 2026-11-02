import { authClient } from "@/lib/auth-client";

export async function getTokenFromClient() {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Failed to get authentication token!");
  }

  return data.token;
}