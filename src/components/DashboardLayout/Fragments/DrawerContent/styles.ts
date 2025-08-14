import { ListItemButton, ListItemIcon, styled } from "@mui/material";

export const CustomListItem = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: 8,
  color: theme.palette.grey[800],
  "&.Mui-selected": {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.grey[500],
    },
  },
}));

export const CustomListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  minWidth: 40,
  color: selected ? theme.palette.background.paper : theme.palette.grey[800],
}));
