"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useUsers } from "@/hooks/useUsers";

export default function UserManagementPage() {
  const { session, loading: loadingSession } = useSession();
  const {
    users,
    loading,
    error,
    success,
    fetchUsers,
    createUser,
    deleteUser,
    setSuccess,
  } = useUsers();
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.role === "ADMIN") fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (!loadingSession && session?.role !== "ADMIN") {
    return (
      <Box mt={6} display="flex" justifyContent="center">
        <Alert severity="error">Acesso restrito a administradores.</Alert>
      </Box>
    );
  }

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Tem certeza que deseja deletar este usuário?")) return;
    await deleteUser(userId);
  };

  const handleOpen = () => {
    setForm({ username: "", password: "" });
    setFormError(null);
    setSuccess(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(null);
    if (!form.username.trim() || !form.password.trim()) {
      setFormError("Preencha todos os campos.");
      return;
    }
    setCreating(true);
    await createUser(form.username, form.password);
    setOpen(false);
    setCreating(false);
  };

  return (
    <Box maxWidth={900} mx="auto">
      <Typography variant="h4" fontWeight={700} mb={3}>
        Gerenciamento de usuários
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ mb: 3 }}
      >
        Criar novo usuário
      </Button>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuário</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId || user?.userId || user.username}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(user.userId || user?.userId)}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar novo usuário</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleCreate} sx={{ mt: 1 }}>
            <TextField
              label="Usuário"
              name="username"
              value={form.username}
              onChange={handleFormChange}
              fullWidth
              sx={{ mb: 2 }}
              autoFocus
            />
            <TextField
              label="Senha"
              name="password"
              type="password"
              value={form.password}
              onChange={handleFormChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Alert severity="info" sx={{ mb: 2 }}>
              Todo novo usuário será criado com <b>role: BASIC</b>.
            </Alert>
            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
              </Alert>
            )}
            <DialogActions>
              <Button onClick={handleClose} disabled={creating}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" disabled={creating}>
                {creating ? <CircularProgress size={20} /> : "Criar"}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
