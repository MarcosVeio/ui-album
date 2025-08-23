"use client";
import React, { useState } from "react";
import { useSession } from "@/hooks/useSession";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import { useRouter, usePathname } from "next/navigation";
import { DrawerContent } from "./Fragments/DrawerContent/DrawerContent";
import { MenuItems as BaseMenuItems } from "./Constants/MenuItems";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { DashboardLayoutProps } from "./Constants/types";

const drawerWidth = 270;

export default function DashboardLayout(props: Readonly<DashboardLayoutProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { session, loading, error } = useSession();

  const menuItems = [
    ...BaseMenuItems,
    ...(session?.role === "ADMIN"
      ? [
          {
            label: "Gerenciar Usuários",
            icon: <GroupAddIcon />,
            path: "/config",
          },
        ]
      : []),
  ];

  const { children } = props;

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
        <Box width={400}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f7fafd" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
          <DrawerContent
            session={session}
            menuItems={menuItems}
            pathname={pathname}
            router={router}
          />
        </Drawer>
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
          <DrawerContent
            session={session}
            menuItems={menuItems}
            pathname={pathname}
            router={router}
          />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 5,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Container
          sx={{
            bgcolor: "#b9b9b95c",
            borderRadius: 2,
            p: 2,
          }}
          maxWidth="lg"
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}
