// Utilitário para fetch autenticado com refresh automático de token
// Uso: import fetchWithAuth from "@/utils/fetchWithAuth"

export default async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit,
  retry = true
): Promise<Response> {
  let res = await fetch(input, init);
  if (res.status === 401 && retry) {
    // Tenta refresh
    const refreshRes = await fetch("/api/token/refresh", { method: "POST" });
    if (refreshRes.ok) {
      // Tenta novamente a requisição original
      res = await fetch(input, init);
      if (res.status !== 401) return res;
    }
    // Se falhar, faz logout (ou redireciona)
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Sessão expirada. Faça login novamente.");
  }
  return res;
}
