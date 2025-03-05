import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { Servico } from '../types/Servico';
import { Veiculo } from '../types/Veiculo';
import { ChecklistServico } from '../types/ChecklistServico';
import ChecklistServicoComponent from './ChecklistServico';
import axios from 'axios';

interface ServicoFormProps {
  servico?: Servico;
  veiculos: Veiculo[];
  onSubmit: (servico: Servico) => void;
  onCancel: () => void;
}

const ServicoForm: React.FC<ServicoFormProps> = ({
  servico,
  veiculos,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Servico>({
    veiculo_id: 0,
    data_servico: new Date().toISOString().split('T')[0],
    tipo_servico: '',
    origem: '',
    destino: '',
    valor: 0,
    status: 'pendente',
    observacoes: '',
  });

  const [checklistData, setChecklistData] = useState<ChecklistServico>({
    servico_id: 0,
    motor_estado: 'nao_verificado',
    motor_obs: '',
    radiador_estado: 'nao_verificado',
    radiador_obs: '',
    freios_estado: 'nao_verificado',
    freios_obs: '',
    suspensao_estado: 'nao_verificado',
    suspensao_obs: '',
    pneus_estado: 'nao_verificado',
    pneus_obs: '',
    bateria_estado: 'nao_verificado',
    bateria_obs: '',
    oleo_estado: 'nao_verificado',
    oleo_obs: '',
    filtro_ar_estado: 'nao_verificado',
    filtro_ar_obs: '',
    filtro_oleo_estado: 'nao_verificado',
    filtro_oleo_obs: '',
    filtro_combustivel_estado: 'nao_verificado',
    filtro_combustivel_obs: '',
    correia_dentada_estado: 'nao_verificado',
    correia_dentada_obs: '',
    velas_estado: 'nao_verificado',
    velas_obs: '',
    cabos_velas_estado: 'nao_verificado',
    cabos_velas_obs: '',
    escapamento_estado: 'nao_verificado',
    escapamento_obs: '',
    embreagem_estado: 'nao_verificado',
    embreagem_obs: '',
    caixa_cambio_estado: 'nao_verificado',
    caixa_cambio_obs: '',
    direcao_hidraulica_estado: 'nao_verificado',
    direcao_hidraulica_obs: '',
    ar_condicionado_estado: 'nao_verificado',
    ar_condicionado_obs: '',
    observacoes_gerais: '',
  });

  useEffect(() => {
    if (servico) {
      setFormData(servico);
      // Carregar checklist se existir
      fetchChecklist(servico.id);
    }
  }, [servico]);

  const fetchChecklist = async (servicoId: number | undefined) => {
    if (servicoId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/checklist/${servicoId}`);
        if (response.data) {
          setChecklistData(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar checklist:', error);
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'valor' ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'veiculo_id' ? Number(value) : value,
    }));
  };

  const handleChecklistChange = (newChecklist: ChecklistServico) => {
    setChecklistData(newChecklist);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Primeiro salva o serviço
      const servicoResponse = await axios.post('http://localhost:5000/api/servicos', formData);
      const novoServicoId = servicoResponse.data.id;

      // Depois salva o checklist
      const checklistToSave = {
        ...checklistData,
        servico_id: novoServicoId,
      };

      try {
        await axios.post('http://localhost:5000/api/checklist', checklistToSave);
        onSubmit(servicoResponse.data);
      } catch (checklistError) {
        console.error('Erro ao salvar checklist:', checklistError);
        // Se falhar ao salvar o checklist, exclui o serviço para manter consistência
        await axios.delete(`http://localhost:5000/api/servicos/${novoServicoId}`);
        throw checklistError;
      }
    } catch (error) {
      console.error('Erro ao salvar serviço e checklist:', error);
      alert('Erro ao salvar o serviço. Por favor, tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          {servico ? 'Editar Serviço' : 'Novo Serviço'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Veículo</InputLabel>
            <Select
              value={String(formData.veiculo_id)}
              label="Veículo"
              name="veiculo_id"
              onChange={handleSelectChange}
              required
            >
              {veiculos.map((veiculo) => (
                <MenuItem key={veiculo.id} value={String(veiculo.id)}>
                  {veiculo.placa} - {veiculo.marca} {veiculo.modelo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Data do Serviço"
            name="data_servico"
            type="date"
            value={formData.data_servico}
            onChange={handleTextChange}
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Tipo de Serviço"
            name="tipo_servico"
            value={formData.tipo_servico}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Origem"
            name="origem"
            value={formData.origem}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Destino"
            name="destino"
            value={formData.destino}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Valor"
            name="valor"
            type="number"
            value={formData.valor}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              name="status"
              onChange={handleSelectChange}
              required
            >
              <MenuItem value="pendente">Pendente</MenuItem>
              <MenuItem value="em_andamento">Em Andamento</MenuItem>
              <MenuItem value="concluido">Concluído</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Observações"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleTextChange}
            multiline
            rows={3}
            margin="normal"
          />
          
          <ChecklistServicoComponent
            checklist={checklistData}
            onChange={handleChecklistChange}
          />

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {servico ? 'Atualizar' : 'Cadastrar'}
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

export default ServicoForm; 