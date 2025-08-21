import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { AlbumImageWithLoading } from "@/components/AlbumImageWithLoading";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Album } from "@/constants/types";

interface AlbumCardProps {
  readonly album: Album;
  readonly onClick: (id: string) => void;
  readonly onEdit: (album: Album) => void;
  readonly onDelete: (id: string) => void;
}

export default function AlbumCard({
  album,
  onClick,
  onEdit,
  onDelete,
}: AlbumCardProps) {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        height: "100%",
        width: "350px",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => onClick(album?.albumId)}
    >
      <AlbumImageWithLoading
        src={album?.coverImage?.imgUrl || "/default-cover.jpg"}
        alt={album?.title}
        width={320}
        height={160}
        style={{ width: "100%", height: 160, objectFit: "cover" }}
        priority={false}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {album?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {album?.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ justifyContent: "flex-end" }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              onEdit(album);
              handleMenuClose();
            }}
          >
            Editar
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete(album.albumId);
              handleMenuClose();
            }}
            sx={{ color: "error.main" }}
          >
            Deletar
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
}
