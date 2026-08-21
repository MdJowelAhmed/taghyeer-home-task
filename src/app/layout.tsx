import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

export const metadata: Metadata = {
  title: "Taghyeer Chat",
  description: "Real-time 1-to-1 and group chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-50 text-slate-900 antialiased">
      <body className="h-full min-h-screen flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

