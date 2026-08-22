import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Server-side Authentication Middleware for Taghyeer Chat.
 * Protects routes before page rendering begins on the server.
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get("chatapp_token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const destination = token ? "/chat" : "/login";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (pathname.startsWith("/chat") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/chat/:path*", "/login"],
};
