import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const HeaderRoot = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 320,
  minHeight: 220,
  marginBottom: theme.spacing(4),
  borderRadius:
    typeof theme.shape.borderRadius === "number"
      ? theme.shape.borderRadius * 3
      : 24,
  overflow: "hidden",
  boxShadow: theme.shadows[3],
}));

export const CoverImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.45)",
  zIndex: 1,
});

export const CenterContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  textShadow: "0 2px 8px #000a",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export const BackButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: 16,
  left: 16,
  zIndex: 3,
  backgroundColor: "rgba(0,0,0,0.6)",
  color: "#fff",
  fontWeight: 600,
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  borderRadius:
    typeof theme.shape.borderRadius === "number"
      ? theme.shape.borderRadius * 2
      : 16,
  boxShadow: theme.shadows[2],
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
}));

export const AddImageButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  zIndex: 3,
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  fontWeight: 600,
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  borderRadius:
    typeof theme.shape.borderRadius === "number"
      ? theme.shape.borderRadius * 2
      : 16,
  boxShadow: theme.shadows[2],
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
