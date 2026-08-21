"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { LoginPayload, User } from "../types/auth.types";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  setStoredUser,
  getStoredUser,
} from "@/lib/auth-token";

export const AUTH_QUERY_KEY = ["auth", "currentUser"];

export function useCurrentUser() {
  const token = typeof window !== "undefined" ? getAccessToken() : null;

  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      const user = await authService.getMe();
      setStoredUser(user);
      return user;
    },
    initialData: () => getStoredUser<User>() ?? undefined,
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      setAccessToken(data.token);
      setStoredUser(data.user);
      queryClient.setQueryData(AUTH_QUERY_KEY, data.user);
      router.push("/chat");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    removeAccessToken();
    queryClient.clear();
    router.push("/login");
  };
}
