import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { AlbumModalProps } from "@/constants/types";

export default function AlbumModal({
  open,
  onClose,
  onSave,
  initialData,
  isEdit,
}: Readonly<AlbumModalProps>) {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    coverImage: "",
  });
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setFile(null);
    } else {
      setForm({ title: "", description: "", coverImage: "" });
      setFile(null);
    }
    setLoading(false);
  }, [initialData, open]);

  const handleSave = () => {
    setLoading(true);
    try {
      onSave({ ...form, file });
    } finally {
      setLoading(false);
    }
  };

  let saveButtonText = "";
  if (loading) {
    saveButtonText = "Salvando...";
  } else if (isEdit) {
    saveButtonText = "Salvar";
  } else {
    saveButtonText = "Criar";
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Editar Álbum" : "Novo Álbum"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Título do álbum"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Descrição"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            fullWidth
            multiline
            minRows={2}
          />
          {/* Upload de imagem */}
          <Button variant="outlined" component="label">
            {file ? file.name : "Selecionar imagem de capa"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const selected = e.target.files?.[0] || null;
                setFile(selected);
              }}
            />
          </Button>
          {/* Exibir nome do arquivo ou url antiga se em edição */}
          {isEdit && !file && form.coverImage && (
            <span style={{ fontSize: 12, color: "#888" }}>
              Capa atual: {form.coverImage}
            </span>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={loading}>
          {saveButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
