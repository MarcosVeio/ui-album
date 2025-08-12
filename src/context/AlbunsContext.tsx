"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Album } from "@/constants/types";
import fetchWithAuth from "@/utils/fetchWithAuth";

interface AlbunsContextType {
  albuns: Album[];
  loading: boolean;
  error: string | null;
  createAlbum: (formData: {
    title: string;
    description: string;
    coverImage: string;
    file?: File | null;
  }) => Promise<void>;
  updateAlbum: (
    albumId: string,
    formData: {
      title: string;
      description: string;
      coverImage: string;
      file?: File | null;
    }
  ) => Promise<void>;
  deleteAlbum: (albumId: string) => Promise<void>;
  refetch: () => Promise<void>;
}

const AlbunsContext = createContext<AlbunsContextType | undefined>(undefined);

export const AlbunsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [albuns, setAlbuns] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbuns = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/albuns");
      const data = await res.json();
      setAlbuns(Array.isArray(data.albuns) ? data.albuns : []);
      setError(null);
    } catch {
      setError("Erro ao buscar álbuns");
      setAlbuns([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAlbuns();
  }, [fetchAlbuns]);

  const refetch = useCallback(async () => {
    await fetchAlbuns();
  }, [fetchAlbuns]);

  const createAlbum = useCallback(
    async (formData: {
      title: string;
      description: string;
      coverImage: string;
      file?: File | null;
    }) => {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      if (formData.file) {
        form.append("coverImage", formData.file);
      } else if (formData.coverImage) {
        form.append("coverImage", formData.coverImage);
      }
      await fetchWithAuth("/api/albuns", {
        method: "POST",
        body: form,
      });
      await refetch();
    },
    [refetch]
  );

  const updateAlbum = useCallback(
    async (
      albumId: string,
      formData: {
        title: string;
        description: string;
        coverImage: string;
        file?: File | null;
      }
    ) => {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      if (formData.file) {
        form.append("coverImage", formData.file);
      } else if (formData.coverImage) {
        form.append("coverImage", formData.coverImage);
      }
      await fetchWithAuth(`/api/albuns/${albumId}`, {
        method: "PUT",
        body: form,
      });
      await refetch();
    },
    [refetch]
  );

  const deleteAlbum = useCallback(
    async (albumId: string) => {
      await fetchWithAuth(`/api/albuns/${albumId}`, { method: "DELETE" });
      await refetch();
    },
    [refetch]
  );

  const contextValue = React.useMemo(
    () => ({
      albuns,
      loading,
      error,
      createAlbum,
      updateAlbum,
      deleteAlbum,
      refetch,
    }),
    [albuns, loading, error, createAlbum, updateAlbum, deleteAlbum, refetch]
  );
  return (
    <AlbunsContext.Provider value={contextValue}>
      {children}
    </AlbunsContext.Provider>
  );
};

export function useAlbuns() {
  const ctx = useContext(AlbunsContext);
  if (!ctx)
    throw new Error("useAlbuns deve ser usado dentro de AlbunsProvider");
  return ctx;
}
