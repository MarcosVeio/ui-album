import { Session } from "@/hooks/useSession";
import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  CircularProgress,
  Box,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import StarBorder from "@mui/icons-material/StarBorder";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAlbuns } from "@/context/AlbunsContext";
import ProfileMenu from "./ProfileMenu";

interface DrawerProps {
  session: Session | null;
  menuItems: {
    label: string;
    icon?: React.ReactNode;
    path: string;
  }[];
  pathname: string;
  router: AppRouterInstance;
}

function renderAlbunsList({
  albuns,
  loadingAlbuns,
  pathname,
  router,
}: {
  albuns: { albumId: string; title: string }[] | undefined;
  loadingAlbuns: boolean;
  pathname: string;
  router: AppRouterInstance;
}) {
  if (loadingAlbuns) {
    return (
      <ListItemButton sx={{ pl: 4 }} disabled>
        <CircularProgress size={18} sx={{ mr: 2 }} />
        <ListItemText primary="Carregando..." />
      </ListItemButton>
    );
  } else if (albuns?.length === 0) {
    return (
      <ListItemButton sx={{ pl: 4 }} disabled>
        <ListItemText primary="Nenhum álbum" />
      </ListItemButton>
    );
  } else {
    return albuns?.map((album) => (
      <ListItemButton
        key={album.albumId}
        sx={{ pl: 4 }}
        selected={pathname === `/albuns/${album.albumId}`}
        onClick={() => router.push(`/albuns/${album.albumId}`)}
      >
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary={album.title} />
      </ListItemButton>
    ));
  }
}

export const DrawerContent = ({
  session,
  menuItems,
  pathname,
  router,
}: DrawerProps) => {
  const [openAlbuns, setOpenAlbuns] = React.useState(false);
  const { albuns, loading: loadingAlbuns } = useAlbuns();

  const handleAlbunsClick = () => {
    if (pathname !== "/albuns") {
      router.push("/albuns");
    }
    setOpenAlbuns((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
    >
      <Box>
        <Typography variant="h5" align="center" sx={{ my: 2 }}>
          Álbum Online
        </Typography>
        <Divider />
        <List>
          {menuItems.map((item) => {
            if (item.label === "Álbuns") {
              return (
                <React.Fragment key={item.label}>
                  <ListItemButton
                    onClick={handleAlbunsClick}
                    selected={pathname === item.path}
                  >
                    <ListItemIcon>
                      {item.icon || <PhotoAlbumIcon />}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                    {openAlbuns ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openAlbuns} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {albuns &&
                        renderAlbunsList({
                          albuns,
                          loadingAlbuns,
                          pathname,
                          router,
                        })}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            }
            // Itens normais
            const selected = pathname === item.path;
            return (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={selected}
                  onClick={() => router.push(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#f0f0f0"
      >
        <Typography variant="subtitle1" align="center" color="text.secondary">
          {session?.username || "Usuário"}
        </Typography>
        <Box>
          {session?.username && (
            <ProfileMenu
              onLogout={async () => {
                await fetch("/api/logout", { method: "POST" });
                router.push("/login");
              }}
              userName={session.username}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
