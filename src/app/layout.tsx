import type { Metadata, Viewport } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020618" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Taghyeer Chat | Real-time Digital Messaging",
    template: "%s | Taghyeer Digital Systems",
  },
  description:
    "Enterprise-grade real-time 1-to-1 and group chat application built for Taghyeer.",
  keywords: [
    "Taghyeer",
    "Real-time Chat",
    "Next.js Chat",
    "Digital Systems",
    "Socket.io",
  ],
  authors: [{ name: "Taghyeer Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * Root Layout wrapping the entire application with providers:
 * 1. ThemeProvider: Manages light/dark theme switching and persistence
 * 2. QueryProvider: Manages TanStack Query client caching and query synchronization
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <body className="h-full min-h-screen flex flex-col bg-brand-bg text-brand-text">
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
