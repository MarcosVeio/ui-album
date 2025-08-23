import {
  Box,
  Button,
  Alert,
  Grid,
  Typography,
  InputLabel,
  InputAdornment,
  IconButton,
  FilledInput,
  FormHelperText,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { schema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";

export type SignFormProps = yup.InferType<typeof schema>;

interface PropsLoginForm {
  onSubmitSignIn: (data: SignFormProps) => void;
  onSubmitSignUp: (data: SignFormProps) => void;
  isLoading?: boolean;
  error?: string;
}

export default function LoginForm({
  onSubmitSignIn,
  onSubmitSignUp,
  isLoading,
  error,
}: Readonly<PropsLoginForm>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignFormProps>({
    resolver: yupResolver(schema),
  });

  return (
    <Box
      component="form"
      mt={8}
      onSubmit={handleSubmit(isSignUp ? onSubmitSignUp : onSubmitSignIn)}
    >
      <Grid container spacing={2} width={350}>
        <Grid size={12}>
          <InputLabel htmlFor="outlined-adornment-password">
            Username
          </InputLabel>
          <FilledInput
            size="small"
            placeholder="admin"
            fullWidth
            {...register("username")}
            error={!!errors.username}
            autoComplete="username"
            endAdornment={
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            }
          />
          <FormHelperText id="filled-weight-helper-text">
            {errors.username?.message}
          </FormHelperText>
        </Grid>
        <Grid size={12}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <FilledInput
            type={showPassword ? "text" : "password"}
            size="small"
            placeholder="*******"
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...register("password")}
            error={!!errors.password}
            autoComplete="current-password"
          />
          <FormHelperText id="filled-weight-helper-text">
            {errors.password?.message}
          </FormHelperText>
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
        loading={isLoading}
        disabled={isLoading}
        sx={{ fontWeight: 700, fontSize: 18, mt: 2 }}
      >
        {isSignUp ? "Cadastrar" : "Entrar"}
      </Button>
      <Grid mt={2} display="flex" justifyContent="flex-end">
        <Typography component="span" mr={1} variant="body2" color="#6b7a90">
          {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}
        </Typography>
        <Link
          component="button"
          type="button"
          variant="body2"
          underline="hover"
          onClick={() => setIsSignUp((prev) => !prev)}
        >
          {isSignUp ? "Entrar" : "Inscrever-se"}
        </Link>
      </Grid>
    </Box>
  );
}
