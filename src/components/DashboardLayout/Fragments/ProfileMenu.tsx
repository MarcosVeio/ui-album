"use client";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

interface ProfileMenuProps {
  onLogout: () => void;
  userName?: string;
}

export default function ProfileMenu({ onLogout, userName }: ProfileMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="Meu perfil">
        <IconButton onClick={handleOpen} size="small" sx={{ ml: 2 }}>
          <Avatar>{userName ? userName[0].toUpperCase() : "U"}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled>{userName || "Usuário"}</MenuItem>
        <MenuItem onClick={handleClose}>Meu Perfil</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
