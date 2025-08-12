"use client";

import { useState, use } from "react";
import Alert from "@mui/material/Alert";
import { useImages } from "@/hooks/useImages";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ImageModal from "./fragments/ImageModal";
import { AlbumImages } from "./fragments/AlbumImages";
import { AlbumHeader } from "./fragments/AlbumHeader/AlbumHeader";

import { useAlbumById } from "@/hooks/useAlbumById";
import { useRouter } from "next/navigation";

type AlbumPageProps = {
  params: Promise<{ readonly id: string }> | { readonly id: string };
};

export default function AlbumPage(props: Readonly<AlbumPageProps>) {
  const params = props.params;
  const { id } =
    typeof params === "object" && "then" in params ? use(params) : params;
  const { album, loading: loadingAlbum } = useAlbumById(id);
  const {
    images,
    loading: loadingImages,
    error: imagesError,
    refetch: refetchImages,
    addImages,
    deleteImage,
  } = useImages(album?.albumId ?? null);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const router = useRouter();

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !album) return;
    try {
      await addImages(e.target.files);
      refetchImages();
    } catch {
      alert("Erro ao adicionar imagens");
    }
    e.target.value = "";
  };

  const handleBack = () => {
    setModalImg(null);
    router.push("/albuns");
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!album?.albumId) return;
    await deleteImage(album.albumId, imageId);
  };

  if (loadingAlbum) {
    return (
      <Typography color="text.secondary" mt={4}>
        Carregando álbum...
      </Typography>
    );
  }
  if (!album) {
    return (
      <Typography color="error" mt={4}>
        Álbum não encontrado
      </Typography>
    );
  }

  return (
    <Box mx="auto">
      {imagesError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {imagesError}
        </Alert>
      )}
      <AlbumHeader
        cover={album?.coverImage?.imgUrl || "/default-cover.png"}
        title={album.title}
        description={album.description}
        onBack={handleBack}
        onAddImage={handleAddImages}
      />
      <AlbumImages
        images={images}
        onDelete={handleDeleteImage}
        onOpenModal={setModalImg}
        deletingId={null}
        loading={loadingImages}
      />
      {modalImg && (
        <ImageModal
          open={true}
          imgUrl={modalImg}
          onClose={() => setModalImg(null)}
        />
      )}
    </Box>
  );
}
