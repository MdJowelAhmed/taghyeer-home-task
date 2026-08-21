import { z } from "zod";

export interface User {
  _id: string;
  name: string;
  phone: string;
  createdAt?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  phone: string;
  name: string;
}

export const loginSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
  phone: z
    .string()
    .min(6, "Phone number must be at least 6 digits")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+()-\s]+$/, "Please enter a valid phone number")
    .trim(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
