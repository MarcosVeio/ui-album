"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AlbumModal from "./Fragments/AlbumModal";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import AlbumCard from "./Fragments/AlbumCard";
import { Album } from "./types";
import fetchWithAuth from "@/utils/fetchWithAuth";

export default function AlbunsPage() {
  const [albuns, setAlbuns] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAlbum, setEditAlbum] = useState<Album | null>(null);
  const router = useRouter();

  // Buscar álbuns
  useEffect(() => {
    async function fetchAlbuns() {
      setLoading(true);
      try {
        const res = await fetchWithAuth("/api/albuns");
        const data = await res.json();
        setAlbuns(data.albuns || []);
      } catch {
        setAlbuns([]);
      }
      setLoading(false);
    }
    fetchAlbuns();
  }, []);

  // Abrir modal para criar novo álbum
  const handleOpenModal = () => {
    setEditAlbum(null);
    setModalOpen(true);
  };

  // Abrir modal para editar álbum
  const handleEditAlbum = (album: Album) => {
    setEditAlbum(album);
    setModalOpen(true);
  };

  // Salvar/criar álbum
  const handleSaveAlbum = async (formData: {
    title: string;
    description: string;
    coverImage: string;
    file?: File | null;
  }) => {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    // Se for edição e não trocar a imagem, enviar coverImage (url/id), senão enviar o arquivo
    if (formData.file) {
      form.append("coverImage", formData.file);
    } else if (formData.coverImage) {
      form.append("coverImage", formData.coverImage);
    }
    if (editAlbum) {
      // Editar álbum
      await fetchWithAuth(`/api/albuns/${editAlbum.albumId}`, {
        method: "PUT",
        body: form,
      });
    } else {
      // Criar álbum
      await fetchWithAuth("/api/albuns", {
        method: "POST",
        body: form,
      });
    }
    setModalOpen(false);
    setEditAlbum(null);
    // Recarregar álbuns
    setLoading(true);
    const res = await fetchWithAuth("/api/albuns");
    const data = await res.json();
    setAlbuns(data.albuns || []);
    setLoading(false);
  };

  // Deletar álbum
  const handleDeleteAlbum = async (id: string) => {
    await fetchWithAuth(`/api/albuns/${id}`, { method: "DELETE" });
    // Recarregar álbuns
    setLoading(true);
    const res = await fetchWithAuth("/api/albuns");
    const data = await res.json();
    setAlbuns(data.albuns || []);
    setLoading(false);
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Álbuns</Typography>
        <Tooltip title="Novo Álbum">
          <Fab color="primary" onClick={handleOpenModal} size="medium">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Stack>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={200}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {albuns.map((album) => (
            <Grid key={album.albumId}>
              <AlbumCard
                album={album}
                onClick={(id) => router.push(`/album/${id}`)}
                onEdit={handleEditAlbum}
                onDelete={handleDeleteAlbum}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {/* Modal de criação/edição */}
      <AlbumModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAlbum}
        initialData={
          editAlbum
            ? {
                title: editAlbum.title,
                description: editAlbum.description,
                coverImage: editAlbum.coverImage.imgUrl,
              }
            : undefined
        }
        isEdit={!!editAlbum}
      />
    </Box>
  );
}
