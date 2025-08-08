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
    return NextResponse.json(
      { error: "Falha ao buscar álbuns" },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json({ albuns: data.albuns || data });
}

export async function POST(request: Request) {
  // Recebe multipart/form-data
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const coverImage = form.get("coverImage");

  // Validação manual (zod não suporta File no backend)
  if (!title || typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Título obrigatório" }, { status: 400 });
  }
  if (!description || typeof description !== "string" || !description.trim()) {
    return NextResponse.json(
      { error: "Descrição obrigatória" },
      { status: 400 }
    );
  }
  // coverImage pode ser File ou string (caso edição sem troca de imagem)
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
  if (coverImage instanceof File || typeof coverImage === "string") {
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
    return NextResponse.json(
      { error: "Falha ao criar álbum" },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json({ albuns: data.albuns || data });
}
