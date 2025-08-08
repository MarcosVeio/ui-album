import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // Lê o accessToken do cookie HTTPOnly
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  console.log("[api/me] accessToken:", accessToken);

  // Chama a API externa passando o token no header Authorization
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}api/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // Remove o cookie se o token for inválido/expirado
    const response = NextResponse.json(
      { error: "Token expirado ou inválido" },
      { status: 401 }
    );
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  const data = await res.json();
  // Espera que a resposta tenha { username: string }
  return NextResponse.json({ username: data.username });
}
