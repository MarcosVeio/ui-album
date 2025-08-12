import { useEffect, useState, useCallback } from "react";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { ImageByAlbumId } from "@/constants/types";
export function useImages(albumId: string | null) {
  const [images, setImages] = useState<ImageByAlbumId[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    if (!albumId) {
      setImages([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/api/images/${albumId}`);
      const data = await res.json();
      setImages(Array.isArray(data.data) ? data.data : []);
      setError(null);
    } catch (err) {
      let msg = "Erro ao buscar imagens";
      if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      setImages([]);
    }
    setLoading(false);
  }, [albumId]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const refetch = useCallback(() => {
    fetchImages();
  }, [fetchImages]);

  const addImages = useCallback(
    async (files: FileList | File[]) => {
      setLoading(true);
      setError(null);
      if (!albumId || !files || files.length === 0) {
        setError("Álbum ou arquivos inválidos");
        setLoading(false);
        return null;
      }
      try {
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("files", file);
        });
        const res = await fetchWithAuth(`/api/images/${albumId}`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(
            data?.error || data?.message || "Erro ao adicionar imagens"
          );
        }
        const imgs = await res.json();
        setImages((prev) => [
          ...prev,
          ...(Array.isArray(imgs) ? imgs : [imgs]),
        ]);
        setError(null);
        setLoading(false);
        return imgs;
      } catch (err) {
        let msg = "Erro ao adicionar imagens";
        if (err instanceof Error) {
          msg = err.message;
        }
        setError(msg);
        setLoading(false);
        return null;
      }
    },
    [albumId]
  );

  const deleteImage = useCallback(
    async (albumId: string, imageId: string) => {
      if (!albumId || !imageId) {
        setError("Álbum ou imagem inválida");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetchWithAuth(`/api/images/${albumId}/${imageId}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(
            data?.error || data?.message || "Erro ao deletar imagem"
          );
        }
        refetch();
        setError(null);
      } catch (err) {
        let msg = "Erro ao deletar imagem";
        if (err instanceof Error) {
          msg = err.message;
        }
        setError(msg);
      }
      setLoading(false);
    },
    [refetch]
  );

  return { images, loading, error, refetch, addImages, deleteImage };
}
