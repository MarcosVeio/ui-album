import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlbumImageWithLoading } from "@/components/AlbumImageWithLoading";

import { ImageByAlbumId } from "@/constants/types";

interface AlbumImagesProps {
  images: ImageByAlbumId[];
  onDelete: (imageId: string) => void;
  onOpenModal: (imgUrl: string) => void;
  deletingId: string | null;
  loading: boolean;
}

export function AlbumImages({
  images,
  onDelete,
  onOpenModal,
  deletingId,
  loading,
}: AlbumImagesProps) {
  if (loading) {
    return (
      <Box display="flex" flexWrap="wrap" gap={2}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={`skeleton-${i}`}
            variant="rectangular"
            width={180}
            height={180}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Box>
    );
  }
  if (!images.length) {
    return (
      <Typography color="text.secondary">
        Nenhuma imagem neste álbum.
      </Typography>
    );
  }
  return (
    <Box display="flex" mt={10} justifyContent="center" flexWrap="wrap" gap={4}>
      {images.map((img) => {
        return (
          <Box
            key={img.imageId}
            position="relative"
            borderRadius={2}
            overflow="hidden"
            boxShadow={2}
          >
            <button
              type="button"
              aria-label="Abrir imagem em tela cheia"
              onClick={() => onOpenModal(img.imgUrl)}
              style={{
                width: 180,
                height: 180,
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
                display: "block",
              }}
            >
              <AlbumImageWithLoading
                src={img.imgUrl}
                alt="Imagem do álbum"
                width={180}
                height={180}
                sizes="180px"
                priority={false}
              />
            </button>
            <IconButton
              size="small"
              onClick={() => onDelete(img.imageId)}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                bgcolor: "rgba(255,255,255,0.7)",
              }}
              disabled={deletingId === img.imageId}
            >
              {deletingId === img.imageId ? (
                <CircularProgress size={20} />
              ) : (
                <DeleteIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
}
