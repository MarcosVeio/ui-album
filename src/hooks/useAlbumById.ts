import { useEffect, useState, useCallback } from "react";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { AlbumById } from "@/constants/types";
export function useAlbumById(id: string) {
  const [album, setAlbum] = useState<AlbumById | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbum = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth(`/api/albuns/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAlbum(data.data || null);
    } catch {
      setAlbum(null);
      setError("Erro ao buscar álbum");
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchAlbum();
  }, [fetchAlbum]);

  return { album, loading, error, refetch: fetchAlbum };
}
