import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value;
  const path = request.nextUrl.pathname;

  // Protect /abc/admin and all nested routes
  if (path.startsWith("/abc/admin")) {
    if (sessionToken !== "miskatul-masabi-session-2026") {
      const loginUrl = new URL("/abc", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Prevent logged in user from visiting login page /abc
  if (path === "/abc") {
    if (sessionToken === "miskatul-masabi-session-2026") {
      const adminUrl = new URL("/abc/admin", request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/abc", "/abc/admin/:path*"],
};
