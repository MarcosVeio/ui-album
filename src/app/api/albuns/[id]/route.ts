import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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
    return NextResponse.json(
      { error: "Falha ao deletar álbum" },
      { status: res.status }
    );
  }
  return NextResponse.json({ success: true });
}
