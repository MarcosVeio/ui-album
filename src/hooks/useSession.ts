import { useEffect, useState } from "react";
import fetchWithAuth from "@/utils/fetchWithAuth";

export interface Session {
  username: string;
  role: string;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function checkSession() {
      setLoading(true);
      try {
        const res = await fetchWithAuth("/api/me");
        if (!res.ok) throw new Error("Sessão inválida");
        const data = await res.json();
        if (isMounted) setSession(data);
      } catch {
        if (isMounted) {
          setSession(null);
          setError("Sessão expirada. Faça login novamente.");
        }
        // Redireciona para login se não autenticado
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    checkSession();
    return () => {
      isMounted = false;
    };
  }, []);

  return { session, loading, error };
}
