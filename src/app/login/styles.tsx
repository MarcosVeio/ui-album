import { Box, styled } from "@mui/material";

export const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "stretch",
  background: theme.palette.background.paper,
}));

export const LoginIllustrationBox = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
}));

export const LoginFormBox = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(90deg, #fff 0%, #888888 100%)",
}));
