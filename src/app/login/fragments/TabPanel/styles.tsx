import { Box, Paper, styled } from "@mui/material";

export const HeaderForm = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  flexDirection: "column",
}));

export const PaperCustom = styled(Paper)(() => ({
  width: "100%",
  maxWidth: 500,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
