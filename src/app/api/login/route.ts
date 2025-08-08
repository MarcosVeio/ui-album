import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  // Validação com zod
  const body = await request.json();
  const schema = z.object({
    username: z.string().min(1, "Usuário obrigatório"),
    password: z.string().min(1, "Senha obrigatória"),
  });
  const parse = schema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json(
      { error: parse.error.issues[0].message },
      { status: 400 }
    );
  }
  const { username, password } = parse.data;

  // Chama a API externa de autenticação
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!apiRes.ok) {
    let errorMsg = "Login inválido";
    try {
      const contentType = apiRes.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const errData = await apiRes.json();
        errorMsg = errData.error || errorMsg;
      } else {
        const errText = await apiRes.text();
        if (errText) errorMsg = errText;
      }
    } catch {}
    return NextResponse.json({ error: errorMsg }, { status: 401 });
  }

  let data: { accessToken?: string; refreshToken?: string } = {};
  const contentType = apiRes.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    data = await apiRes.json();
  } else {
    return NextResponse.json(
      { error: "Resposta inesperada do servidor" },
      { status: 500 }
    );
  }
  const accessToken = data.accessToken;
  const refreshToken = data.refreshToken;
  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Token não recebido" }, { status: 500 });
  }
  // Seta os cookies HTTPOnly usando NextResponse
  const response = NextResponse.json({ success: true });
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 dia
  });
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias (ajuste conforme backend)
  });
  return response;
}
