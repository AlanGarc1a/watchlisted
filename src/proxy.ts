import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const sessionToken =
    req.cookies.get("authjs.session-token") ??
    req.cookies.get("__Secure-authjs.session-token") ??
    req.cookies.get("next-auth.session-token") ??
    req.cookies.get("__Secure-next-auth.session-token");

  const isLoggedIn = !!sessionToken;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isDashboardPage =
    pathname.startsWith("/discover") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/movie") ||
    pathname.startsWith("/media") ||
    pathname.startsWith("/watchlist");

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const isLandingPage = pathname === "/";

  if (!isLoggedIn && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/discover", req.url));
  }

  if (isLoggedIn && isLandingPage) {
    return NextResponse.redirect(new URL("/discover", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
