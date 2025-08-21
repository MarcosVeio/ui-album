import { Box, TextField, Button, Alert, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { schema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";

export type LoginFormProps = yup.InferType<typeof schema>;

interface PropsLoginForm {
  onSubmit: (data: LoginFormProps) => void;
  isLoading?: boolean;
  error?: string;
}

export default function LoginForm({
  onSubmit,
  isLoading,
  error,
}: Readonly<PropsLoginForm>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} flexDirection="column">
        <Grid size={12}>
          <TextField
            label="Username"
            variant="standard"
            size="small"
            fullWidth
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            autoComplete="username"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Senha"
            type="password"
            variant="standard"
            size="small"
            fullWidth
            sx={{ mb: 4 }}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="current-password"
          />
        </Grid>
      </Grid>
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
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </Box>
  );
}
