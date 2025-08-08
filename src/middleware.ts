import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Exemplo: verifica se existe accessToken no cookie
  const token = request.cookies.get("accessToken");
  if (!token) {
    // Redireciona para a página de login se não estiver autenticado
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// Defina as rotas protegidas
export const config = {
  matcher: ["/home/:path*", "/perfil/:path*"], // ajuste para suas rotas protegidas
};
