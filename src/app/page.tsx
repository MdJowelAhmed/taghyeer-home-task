import { redirect } from "next/navigation";

/**
 * Root Application Page (Server Component).
 * Automatically handles server-side redirect to /chat.
 * Middleware intercepts unauthorized requests and redirects to /login.
 */
export default function RootPage() {
  redirect("/chat");
}
