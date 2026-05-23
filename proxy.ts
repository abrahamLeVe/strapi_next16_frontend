import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = new Set(["/dashboard", "/profile", "/settings"]);

export async function middleware(request: NextRequest) {
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

  // 2. SOLUCIÓN: Lee la constante directamente aquí usando la nueva URL de producción
  const MIDDLEWARE_BASE_URL =
    process.env.STRAPI_BASE_URL ||
    "https://secure-desk-ba9bf7e12c.strapiapp.com";

  try {
    const response = await fetch(`${MIDDLEWARE_BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
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
  ],
};
