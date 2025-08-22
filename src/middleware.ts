import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  if (!accessToken) {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/api/token/refresh", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/perfil/:path*",
    "/dashboard/:path*",
    "/albuns/:path*",
    "/config/:path*",
  ],
};
