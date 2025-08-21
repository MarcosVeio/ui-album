import { Session } from "@/hooks/useSession";
import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Collapse,
  CircularProgress,
  Box,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAlbuns } from "@/context/AlbunsContext";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { CustomListItem, CustomListItemIcon } from "./styles";

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
      <CustomListItem sx={{ pl: 4 }} disabled>
        <CircularProgress size={18} sx={{ mr: 2 }} />
        <ListItemText primary="Carregando..." />
      </CustomListItem>
    );
  } else if (albuns?.length === 0) {
    return (
      <CustomListItem sx={{ pl: 4 }} disabled>
        <ListItemText primary="Nenhum álbum" />
      </CustomListItem>
    );
  } else {
    return albuns?.map((album) => (
      <CustomListItem
        key={album.albumId}
        sx={{ pl: 4 }}
        selected={pathname === `/albuns/${album.albumId}`}
        onClick={() => router.push(`/albuns/${album.albumId}`)}
      >
        <CustomListItemIcon>
          <CustomListItemIcon
            selected={pathname === `/albuns/${album.albumId}`}
          >
            <InsertPhotoIcon />
          </CustomListItemIcon>
        </CustomListItemIcon>
        <ListItemText primary={album.title} />
      </CustomListItem>
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
        <Typography variant="h4" align="center" sx={{ my: 2 }}>
          Álbum Online
        </Typography>
        <Divider />
        <List>
          {menuItems.map((item) => {
            if (item.label === "Álbuns") {
              return (
                <React.Fragment key={item.label}>
                  <ListItem>
                    <Box width="100%">
                      <CustomListItem
                        onClick={handleAlbunsClick}
                        selected={pathname === item.path}
                      >
                        <CustomListItemIcon selected={pathname === item.path}>
                          {item.icon || <PhotoAlbumIcon />}
                        </CustomListItemIcon>
                        <ListItemText primary={item.label} />
                        {openAlbuns ? <ExpandLess /> : <ExpandMore />}
                      </CustomListItem>
                      <Collapse in={openAlbuns} timeout="auto" unmountOnExit>
                        <List component="div">
                          {albuns &&
                            renderAlbunsList({
                              albuns,
                              loadingAlbuns,
                              pathname,
                              router,
                            })}
                        </List>
                      </Collapse>
                    </Box>
                  </ListItem>
                </React.Fragment>
              );
            }
            const selected = pathname === item.path;
            return (
              <ListItem key={item.label}>
                <CustomListItem
                  selected={selected}
                  onClick={() => router.push(item.path)}
                >
                  <CustomListItemIcon selected={selected}>
                    {item.icon}
                  </CustomListItemIcon>
                  <ListItemText primary={item.label} />
                </CustomListItem>
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
