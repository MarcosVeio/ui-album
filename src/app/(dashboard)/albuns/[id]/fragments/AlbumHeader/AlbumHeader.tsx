import React from "react";
import Typography from "@mui/material/Typography";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  HeaderRoot,
  CoverImage,
  Overlay,
  CenterContent,
  BackButton,
  AddImageButton,
} from "./styles";

interface AlbumHeaderProps {
  cover: string;
  title: string;
  description: string;
  onBack: () => void;
  onAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AlbumHeader: React.FC<AlbumHeaderProps> = ({
  cover,
  title,
  description,
  onBack,
  onAddImage,
}) => (
  <HeaderRoot>
    <CoverImage src={cover} alt="Capa do Álbum" />
    <Overlay />
    <CenterContent>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700, fontSize: { xs: 28, sm: 36, md: 44 } }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          opacity: 0.92,
          fontWeight: 400,
          fontSize: { xs: 16, sm: 20, md: 24 },
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        {description}
      </Typography>
    </CenterContent>
    <BackButton variant="contained" color="secondary" onClick={onBack}>
      Voltar
    </BackButton>
    <AddImageButton
      variant="contained"
      startIcon={<AddPhotoAlternateIcon />}
      sx={{ position: "absolute", top: 16, right: 16, zIndex: 3 }}
    >
      <label
        style={{
          cursor: "pointer",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        Adicionar Imagem
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          multiple
          onChange={onAddImage}
        />
      </label>
    </AddImageButton>
  </HeaderRoot>
);
