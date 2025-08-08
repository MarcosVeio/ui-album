"use client";
import { useRouter } from "next/navigation";
import { login } from "./actions";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { schema } from "./schema";

type LoginForm = yup.InferType<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("");
    try {
      await login(data.username, data.password);
      router.push("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
        background: "linear-gradient(90deg, #eaf1fb 60%, #fff 100%)",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#eaf1fb",
        }}
      >
        <Image
          src="/login-illustration.svg"
          alt="Ilustração Login"
          width={800}
          height={660}
          priority
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: 340,
            p: 5,
            borderRadius: 2,
            background: "#fff",
          }}
        >
          <Typography variant="h4" fontWeight={700} color="#2d3a4a" mb={1}>
            Bem-vindo!
          </Typography>
          <Typography color="#6b7a90" mb={4}>
            Acesse sua conta para continuar
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Usuário"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              autoComplete="username"
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="current-password"
            />
            {error && (
              <Typography color="error" mb={2} fontSize={14}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ fontWeight: 700, fontSize: 18 }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
