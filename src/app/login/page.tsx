"use client";
import { useRouter } from "next/navigation";
import { login, createUser } from "./actions";
import Image from "next/image";
import { useState } from "react";
import LoginForm, { SignFormProps } from "./fragments/SignForm/signForm";
import { Typography } from "@mui/material";
import { LoginContainer, SignFormBox, LoginIllustrationBox } from "./styles";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: SignFormProps) => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleSubmitRegisterUser = async (data: SignFormProps) => {
    const { username, password } = data;
    setIsLoading(true);
    setError("");
    try {
      await createUser(username, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado");
      }
    } finally {
      onSubmit({ username, password });
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginIllustrationBox>
        <Image
          src="/album.svg"
          alt="Ilustração Login"
          width={800}
          height={800}
          priority
        />
      </LoginIllustrationBox>
      <SignFormBox>
        <Typography variant="h2" fontWeight={700} color="primary">
          Bem-vindo!
        </Typography>
        <Typography color="#2d3a4a90" variant="subtitle2">
          Acesse ou crie sua conta para continuar
        </Typography>
        <LoginForm
          onSubmitSignIn={onSubmit}
          onSubmitSignUp={handleSubmitRegisterUser}
          isLoading={isLoading}
          error={error}
        />
      </SignFormBox>
    </LoginContainer>
  );
}
