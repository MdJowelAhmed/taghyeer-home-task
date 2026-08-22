import { ChatPageClient } from "@/features/chat/components/ChatPageClient";

/**
 * Main Chat Application Page (Server Component).
 * Authentication protection and redirects are enforced on the server via middleware.ts.
 */
export default function ChatPage() {
  return <ChatPageClient />;
}
