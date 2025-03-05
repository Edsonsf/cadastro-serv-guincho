import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
} from '@mui/material';
import { Cliente } from '../types/Cliente';

interface ClienteFormProps {
  cliente?: Cliente;
  onSubmit: (cliente: Cliente) => void;
  onCancel: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Cliente>({
    nome: '',
    cpf: '',
    telefone: '',
    endereco: '',
    email: '',
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          {cliente ? 'Editar Cliente' : 'Novo Cliente'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
            margin="normal"
            inputProps={{
              maxLength: 14,
              pattern: "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}"
            }}
          />
          <TextField
            fullWidth
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Endereço"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {cliente ? 'Atualizar' : 'Cadastrar'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ClienteForm; 