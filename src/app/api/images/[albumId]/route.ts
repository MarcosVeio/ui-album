import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  context: { params: Promise<{ albumId: string }> | { albumId: string } }
) {
  // Suporte a params como Promise ou objeto direto
  const params =
    typeof context.params === "object" && "then" in context.params
      ? await context.params
      : context.params;
  const { albumId } = params;

  // Autenticação
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  // Monta headers para proxy seguro
  const proxyHeaders: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
  };
  // Repassa todos os headers do request original, exceto os problemáticos
  req.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (
      ![
        "content-length",
        "host",
        "connection",
        "accept-encoding",
        "authorization",
        "origin",
      ].includes(lower)
    ) {
      proxyHeaders[key] = value;
    }
  });

  // Proxy puro do body (stream) para a API externa
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const apiRes = await fetch(`${apiUrl}api/images/${albumId}`, {
      method: "POST",
      headers: proxyHeaders,
      body: req.body,
      duplex: "half",
    } as RequestInit & { duplex: "half" });
    if (!apiRes.ok) {
      const error = await apiRes.text();
      return NextResponse.json({ error }, { status: apiRes.status });
    }
    // Retorna a resposta da API externa (pode ser string ou objeto)
    const contentType = apiRes.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await apiRes.json();
      return NextResponse.json(data);
    } else {
      const text = await apiRes.text();
      return NextResponse.json({ message: text });
    }
  } catch (err) {
    console.error("Erro ao adicionar imagens:", err);
    return NextResponse.json(
      { error: "Erro ao adicionar imagens", details: String(err) },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ albumId: string }> | { albumId: string } }
) {
  // Suporte a params como Promise ou objeto direto
  const params =
    typeof context.params === "object" && "then" in context.params
      ? await context.params
      : context.params;
  const { albumId } = params;
  // Proxy para a API externa
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}api/images/${albumId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Falha ao buscar imagens" },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json({ data });
}
