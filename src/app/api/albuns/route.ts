import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}api/albums`, {
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
  return NextResponse.json({ albuns: data.albuns || data });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const coverImage = form.get("coverImage");

  if (!title || typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Título obrigatório" }, { status: 400 });
  }
  if (!description || typeof description !== "string" || !description.trim()) {
    return NextResponse.json(
      { error: "Descrição obrigatória" },
      { status: 400 }
    );
  }
  if (!coverImage || (typeof coverImage === "string" && !coverImage.trim())) {
    return NextResponse.json({ error: "Imagem obrigatória" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const proxyForm = new FormData();
  proxyForm.append("title", title);
  proxyForm.append("description", description);
  if (
    typeof coverImage === "string" ||
    (coverImage &&
      typeof coverImage === "object" &&
      typeof coverImage.arrayBuffer === "function")
  ) {
    proxyForm.append("coverImage", coverImage);
  }

  const res = await fetch(`${apiUrl}api/albums`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: proxyForm,
  });
  if (!res.ok) {
    let errorMsg = "Falha ao criar álbum";
    try {
      const err = await res.json();
      errorMsg = err?.message || err?.error || errorMsg;
    } catch {}
    return NextResponse.json({ error: errorMsg }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json({ albuns: data.albuns || data });
}
