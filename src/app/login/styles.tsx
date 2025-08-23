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
  width: "70%",
  background: "linear-gradient(90deg, #29517e 40%, #6188cf 100%)",
}));

export const SignFormBox = styled(Box)(() => ({
  flex: 0.8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));
