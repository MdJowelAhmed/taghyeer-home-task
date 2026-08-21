import { LoginForm } from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Taghyeer Chat",
  description: "Sign in with your phone and name to start chatting.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full flex justify-center z-10">
        <LoginForm />
      </div>
    </main>
  );
}
