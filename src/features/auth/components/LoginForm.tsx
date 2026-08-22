"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User as UserIcon, Phone, AlertCircle, Sparkles } from "lucide-react";
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
    <Card className="w-full max-w-md border-purple-500/25 bg-brand-card/90 backdrop-blur-2xl shadow-2xl shadow-purple-950/70">
      <CardHeader className="space-y-3 text-center pb-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-purple-600/40">
          <span className="font-extrabold text-2xl tracking-wider">T</span>
        </div>
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <Sparkles className="h-3 w-3" /> Taghyeer Digital Systems
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight text-white">
            Welcome to Taghyeer
          </CardTitle>
          <CardDescription className="text-slate-400 text-xs md:text-sm">
            Enter your name and phone number to access real-time messaging
          </CardDescription>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {errorMessage && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-950/30 p-3 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="name" required>
              Your Name
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-400/60 z-10">
                <UserIcon className="h-4 w-4" />
              </div>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Jowel Ahmed"
                className="pl-10"
                error={!!errors.name}
                autoComplete="name"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-400 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" required>
              Phone Number
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-400/60 z-10">
                <Phone className="h-4 w-4" />
              </div>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="e.g. 01478523698"
                className="pl-10 font-mono"
                error={!!errors.phone}
                autoComplete="tel"
                {...register("phone", {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/[^0-9+\s-]/g, "");
                  },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400 font-medium">{errors.phone.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-2 flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold shadow-lg shadow-purple-950/70"
            isLoading={isPending}
          >
            {isPending ? "Connecting..." : "Continue to Chat"}
          </Button>
          <p className="text-[11px] text-center text-slate-500">
            Real-time 1-to-1 & Group Chat Experience
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
