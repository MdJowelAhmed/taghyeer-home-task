"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User as UserIcon, Phone, MessageSquare, AlertCircle } from "lucide-react";
import { loginSchema, LoginFormValues } from "../types/auth.types";
import { useLogin } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function LoginForm() {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values);
  };

  const errorMessage =
    error instanceof Error ? error.message : error ? "Login failed. Please check your credentials." : null;

  return (
    <Card className="w-full max-w-md shadow-xl border-slate-200/80 bg-white/95 backdrop-blur-md">
      <CardHeader className="space-y-3 text-center pb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <MessageSquare className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome to Taghyeer Chat
          </CardTitle>
          <CardDescription className="text-slate-500 text-sm">
            Enter your name and phone number to start chatting
          </CardDescription>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {errorMessage && (
            <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="name" required>
              Your Name
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <UserIcon className="h-4 w-4" />
              </div>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Jowel Ahmed"
                className="pl-9"
                error={!!errors.name}
                autoComplete="name"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" required>
              Phone Number
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Phone className="h-4 w-4" />
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g. 01478523698"
                className="pl-9"
                error={!!errors.phone}
                autoComplete="tel"
                {...register("phone")}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-2 flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold shadow-indigo-200"
            isLoading={isPending}
          >
            {isPending ? "Connecting..." : "Continue to Chat"}
          </Button>
          <p className="text-xs text-center text-slate-400">
            Real-time 1-to-1 and Group Chat Experience
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
