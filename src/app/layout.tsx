import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taghyeer Chat",
  description: "Real-time 1-to-1 and group chat application",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
