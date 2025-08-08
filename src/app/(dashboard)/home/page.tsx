"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import AlbumIcon from "@mui/icons-material/PhotoAlbum";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper
        elevation={4}
        sx={{ p: 5, maxWidth: 500, width: "100%", borderRadius: 4 }}
      >
        <Stack spacing={3} alignItems="center">
          <AlbumIcon color="primary" sx={{ fontSize: 60 }} />
          <Typography variant="h4" fontWeight={700} align="center">
            Álbum Online
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Criado a partir de uma API externa que salva as imagens em um bucket
            S3, com autenticação JWT.
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            Para começar, entre na aba <b>Álbuns</b> e comece criando seu álbum,
            ou navegue nos já criados.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            width="100%"
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => router.push("/albuns")}
            >
              Ir para Álbuns
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
