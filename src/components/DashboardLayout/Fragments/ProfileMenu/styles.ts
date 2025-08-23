import { Avatar, styled } from "@mui/material";

export const CustomAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  width: 42,
  height: 42,
}));
