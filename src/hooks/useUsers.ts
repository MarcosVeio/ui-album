import { useCallback, useState } from "react";
import { User } from "@/constants/types";
import { RegisterFormProps } from "@/app/login/fragments/RegisterForm/registerForm";

interface RoleFromApi {
  id: number;
  name: string;
}

interface UserFromApi {
  userId: string;
  username: string;
  roles: RoleFromApi[];
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao buscar usuários");
      const users = data.users.map((user: UserFromApi) => ({
        userId: user.userId,
        username: user.username,
        role: user.roles?.[0]?.name,
      }));
      setUsers(users);
    } catch (err: unknown) {
      setError((err as Error).message || "Erro ao buscar usuários");
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(
    async (dataForm: RegisterFormProps) => {
      setError(null);
      setSuccess(null);
      setLoading(true);
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erro ao criar usuário");
        setSuccess("Usuário criado com sucesso!");
      } catch (err: unknown) {
        setError((err as Error).message || "Erro ao criar usuário");
      } finally {
        await fetchUsers();
        setLoading(false);
      }
    },
    [fetchUsers]
  );

  const deleteUser = useCallback(
    async (userId: string) => {
      setError(null);
      setSuccess(null);
      setLoading(true);
      try {
        const res = await fetch("/api/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erro ao deletar usuário");
        setSuccess("Usuário deletado com sucesso");
        await fetchUsers();
      } catch (err: unknown) {
        setError((err as Error).message || "Erro ao deletar usuário");
      } finally {
        setLoading(false);
      }
    },
    [fetchUsers]
  );

  return {
    users,
    loading,
    error,
    success,
    fetchUsers,
    createUser,
    deleteUser,
    setError,
    setSuccess,
  };
}
