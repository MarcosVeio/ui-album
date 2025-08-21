import React from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../LoginForm/schema";
import * as yup from "yup";

export type RegisterFormProps = yup.InferType<typeof schema>;

interface RegisterModalProps {
  onSave: (data: RegisterFormProps) => void;
  initialData?: RegisterFormProps;
  isLoading: boolean;
  error: string | null;
}

export default function RegisterForm({
  onSave,
  initialData,
  isLoading,
  error,
}: Readonly<RegisterModalProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      username: "",
      password: "",
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSave)}>
      <TextField
        label="Username"
        {...register("username")}
        size="small"
        error={!!errors.username}
        sx={{ mb: 2 }}
        helperText={errors.username?.message}
        fullWidth
      />
      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete="current-password"
      />
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="small"
        disabled={isLoading}
        sx={{ fontWeight: 700, fontSize: 18 }}
      >
        {isLoading ? "Carregando..." : "Cadastrar"}
      </Button>
    </Box>
  );
}
