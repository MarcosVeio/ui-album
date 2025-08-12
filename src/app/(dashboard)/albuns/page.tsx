"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { Album } from "@/constants/types";
import AlbumModal from "./fragments/albumModal";
import AlbumCard from "./fragments/albumCard";
import { Divider } from "@mui/material";
import { useAlbuns } from "@/context/AlbunsContext";

export default function AlbunsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editAlbum, setEditAlbum] = useState<Album | null>(null);
  const {
    albuns,
    loading: loadingAlbuns,
    error: albunsError,
    createAlbum,
    updateAlbum,
    deleteAlbum,
  } = useAlbuns();
  const router = useRouter();

  const handleOpenModal = () => {
    setEditAlbum(null);
    setModalOpen(true);
  };

  const handleEditAlbum = (album: Album) => {
    setEditAlbum(album);
    setModalOpen(true);
  };

  const handleSaveAlbum = async (formData: {
    title: string;
    description: string;
    coverImage: string;
    file?: File | null;
  }) => {
    if (editAlbum) {
      await updateAlbum(editAlbum.albumId, formData);
    } else {
      await createAlbum(formData);
    }
    setModalOpen(false);
    setEditAlbum(null);
  };

  const handleDeleteAlbum = async (id: string) => {
    await deleteAlbum(id);
  };

  return (
    <Box>
      {albunsError && (
        <Box mb={2}>
          <Alert severity="error">{albunsError}</Alert>
        </Box>
      )}
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
      <Divider sx={{ mb: 10 }} />
      {loadingAlbuns ? (
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
          {albuns?.map((album) => (
            <Grid key={album?.albumId}>
              <AlbumCard
                album={album}
                onClick={(id) => router.push(`/albuns/${id}`)}
                onEdit={handleEditAlbum}
                onDelete={handleDeleteAlbum}
              />
            </Grid>
          ))}
        </Grid>
      )}
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
