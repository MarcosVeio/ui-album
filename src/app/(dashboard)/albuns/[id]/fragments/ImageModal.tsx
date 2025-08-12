"use client";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

interface ImageModalProps {
  open: boolean;
  imgUrl: string;
  onClose: () => void;
}

export default function ImageModal({ open, imgUrl, onClose }: ImageModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            src={imgUrl}
            alt="Imagem do álbum"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
