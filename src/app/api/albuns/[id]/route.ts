import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  // Suporte a params como Promise ou objeto direto
  const params =
    typeof context.params === "object" && "then" in context.params
      ? await context.params
      : context.params;
  // Proxy para a API externa
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}api/albums/${params.id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    let errorMsg = "Falha ao buscar álbuns";
    try {
      const err = await res.json();
      errorMsg = err?.message || err?.error || errorMsg;
    } catch {}
    return NextResponse.json({ error: errorMsg }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json({ data });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}api/albums/${params.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    let errorMsg = "Falha ao deletar álbum";
    try {
      const err = await res.json();
      errorMsg = err?.message || err?.error || errorMsg;
    } catch {}
    return NextResponse.json({ error: errorMsg }, { status: res.status });
  }
  return NextResponse.json({ success: true });
}
