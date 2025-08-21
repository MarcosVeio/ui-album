"use client";
import { useRouter } from "next/navigation";
import { login, createUser } from "./actions";
import Image from "next/image";
import { useState } from "react";
import LoginForm, { LoginFormProps } from "./fragments/LoginForm/loginForm";
import RegisterForm, {
  RegisterFormProps,
} from "./fragments/RegisterForm/registerForm";
import TabPanelComponent from "./fragments/TabPanel";
import { LoginContainer, LoginFormBox, LoginIllustrationBox } from "./styles";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: LoginFormProps) => {
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

  const handleSubmitRegisterUser = async (data: RegisterFormProps) => {
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
          src="/login-illustration.png"
          alt="Ilustração Login"
          width={800}
          height={600}
          priority
        />
      </LoginIllustrationBox>
      <LoginFormBox>
        <TabPanelComponent
          loginForm={
            <LoginForm
              onSubmit={onSubmit}
              isLoading={isLoading}
              error={error}
            />
          }
          registerForm={
            <RegisterForm
              onSave={handleSubmitRegisterUser}
              isLoading={isLoading}
              error={error}
            />
          }
        />
      </LoginFormBox>
    </LoginContainer>
  );
}
