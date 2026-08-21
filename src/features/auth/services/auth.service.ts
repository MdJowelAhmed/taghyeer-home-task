import { apiFetch } from "@/lib/api";
import { User, LoginResponse, LoginPayload } from "../types/auth.types";

export const authService = {
  login: (payload: LoginPayload) => {
    return apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: payload,
    });
  },

  getMe: () => {
    return apiFetch<User>("/auth/me");
  },
};
