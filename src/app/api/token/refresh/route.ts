import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token não encontrado" },
      { status: 401 }
    );
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}token/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Falha ao renovar token" },
      { status: res.status }
    );
  }
  const data = await res.json();
  // Espera que a API retorne { accessToken, refreshToken }
  const response = NextResponse.json({ success: true });
  if (data.accessToken) {
    response.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      path: "/",
    });
  }
  if (data.refreshToken) {
    response.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      path: "/",
    });
  }
  return response;
}
