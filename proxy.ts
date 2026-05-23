import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "./lib/strapi";

const protectedRoutes = new Set(["/dashboard", "/profile", "/settings"]);

export async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const isProtectedRoute = Array.from(protectedRoutes).some(
    (route) => currentPath === route || currentPath.startsWith(`${route}/`),
  );

  if (!isProtectedRoute) return NextResponse.next();

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", currentPath);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const response = await fetch(`${BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const nextResponse = NextResponse.redirect(
        new URL("/login", request.url),
      );
      nextResponse.cookies.delete("jwt");
      return nextResponse;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error en enlace con Strapi desde Middleware:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|placeholder.svg).*)",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
