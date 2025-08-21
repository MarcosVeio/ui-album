import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  let data = null;
  const text = await res.text();
  data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    return NextResponse.json(
      { error: data?.message || "Erro ao criar usuário" },
      { status: res.status }
    );
  }
  return NextResponse.json(data);
}

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}api/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    let errorMsg = "Falha ao buscar usuários";
    try {
      const err = await res.json();
      errorMsg = err?.message || err?.error || errorMsg;
    } catch {}
    return NextResponse.json({ error: errorMsg }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json({ users: data.users || data });
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const { userId } = await request.json();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}api/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    let errorMsg = "Falha ao deletar usuário";
    try {
      const err = await res.json();
      errorMsg = err?.message || err?.error || errorMsg;
    } catch {}
    return NextResponse.json({ error: errorMsg }, { status: res.status });
  }
  return NextResponse.json({ success: true });
}
