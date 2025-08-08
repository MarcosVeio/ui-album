"use client";
import React, { useState } from "react";
import { useSession } from "@/hooks/useSession";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";

import Container from "@mui/material/Container";
import ProfileMenu from "@/components/DashboardLayout/Fragments/ProfileMenu";

const drawerWidth = 240;

export interface DashboardLayoutProps {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly menuItems?: {
    label: string;
    icon?: React.ReactNode;
    path: string;
  }[];
  readonly headerContent?: React.ReactNode;
}

import { useRouter, usePathname } from "next/navigation";
export default function DashboardLayout(props: DashboardLayoutProps) {
  const {
    children,
    title = "Tela inicial",
    menuItems = [
      { label: "Home", icon: <InboxIcon />, path: "/home" },
      { label: "Fotos", icon: <MailIcon />, path: "/fotos" },
      { label: "Álbuns", icon: <InboxIcon />, path: "/albuns" },
      { label: "Configurações", icon: <MailIcon />, path: "/configuracoes" },
    ],
    headerContent,
  } = props;
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { session, loading, error } = useSession();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6">Carregando sessão...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Typography variant="h5" align="center" sx={{ my: 2 }}>
        Álbum Online
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
        {session?.username || "Usuário"}
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => {
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
    </div>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f7fafd" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {/* Menu de perfil */}
          {session?.username && (
            <ProfileMenu
              onLogout={async () => {
                await fetch("/api/logout", { method: "POST" });
                router.push("/login");
              }}
              userName={session.username}
            />
          )}
          {headerContent}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Drawer para mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Drawer para desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
}
