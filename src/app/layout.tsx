import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono, Geist } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

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
    <html lang="en" className={cn("h-full", "antialiased", "dark", inter.variable, ibmPlexMono.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className={`${inter.className} h-full min-h-screen flex flex-col bg-brand-bg text-brand-text font-sans`}>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
