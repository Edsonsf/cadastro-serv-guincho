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
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    paralama_estado: 'nao_verificado',
    paralama_obs: '',
    capo_estado: 'nao_verificado',
    capo_obs: '',
    teto_estado: 'nao_verificado',
    teto_obs: '',
    macaco_estado: 'nao_verificado',
    macaco_obs: '',
    triangulo_estado: 'nao_verificado',
    triangulo_obs: '',
    extintor_estado: 'nao_verificado',
    extintor_obs: '',
    acessorios_internos_estado: 'nao_verificado',
    acessorios_internos_obs: '',
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
        // Após salvar com sucesso, gera o relatório
        handleGerarRelatorio(novoServicoId);
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

  const handleGerarRelatorio = async (servicoId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/servicos/${servicoId}/relatorio`);
      const data = response.data;

      const doc = new jsPDF();
      
      // Cabeçalho
      doc.setFontSize(20);
      doc.text('Relatório de Serviço', 105, 15, { align: 'center' });
      
      // Informações do Cliente
      doc.setFontSize(16);
      doc.text('Dados do Cliente', 14, 30);
      doc.setFontSize(12);
      doc.text(`Nome: ${data.cliente_nome}`, 14, 40);
      doc.text(`CPF: ${data.cliente_cpf}`, 14, 45);
      doc.text(`Telefone: ${data.cliente_telefone}`, 14, 50);
      doc.text(`Email: ${data.cliente_email}`, 14, 55);
      doc.text(`Endereço: ${data.cliente_endereco}`, 14, 60);

      // Informações do Veículo
      doc.setFontSize(16);
      doc.text('Dados do Veículo', 14, 75);
      doc.setFontSize(12);
      doc.text(`Placa: ${data.placa}`, 14, 85);
      doc.text(`Marca/Modelo: ${data.marca} ${data.modelo}`, 14, 90);
      doc.text(`Ano: ${data.ano}`, 14, 95);
      doc.text(`Cor: ${data.cor}`, 14, 100);
      doc.text(`Chassi: ${data.chassi}`, 14, 105);

      // Informações do Serviço
      doc.setFontSize(16);
      doc.text('Dados do Serviço', 14, 120);
      doc.setFontSize(12);
      doc.text(`Data: ${new Date(data.data_servico).toLocaleDateString()}`, 14, 130);
      doc.text(`Tipo: ${data.tipo_servico}`, 14, 135);
      doc.text(`Origem: ${data.origem}`, 14, 140);
      doc.text(`Destino: ${data.destino}`, 14, 145);
      doc.text(`Valor: R$ ${data.valor.toFixed(2)}`, 14, 150);
      doc.text(`Status: ${data.status}`, 14, 155);
      doc.text(`Observações: ${data.observacoes || '-'}`, 14, 160);

      // Checklist
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Checklist do Veículo', 105, 15, { align: 'center' });
      
      const checklistItems = [
        { item: 'Motor', estado: data.motor_estado, obs: data.motor_obs },
        { item: 'Radiador', estado: data.radiador_estado, obs: data.radiador_obs },
        { item: 'Freios', estado: data.freios_estado, obs: data.freios_obs },
        { item: 'Suspensão', estado: data.suspensao_estado, obs: data.suspensao_obs },
        { item: 'Pneus', estado: data.pneus_estado, obs: data.pneus_obs },
        { item: 'Bateria', estado: data.bateria_estado, obs: data.bateria_obs },
        { item: 'Óleo', estado: data.oleo_estado, obs: data.oleo_obs },
        { item: 'Filtro de Ar', estado: data.filtro_ar_estado, obs: data.filtro_ar_obs },
        { item: 'Filtro de Óleo', estado: data.filtro_oleo_estado, obs: data.filtro_oleo_obs },
        { item: 'Filtro de Combustível', estado: data.filtro_combustivel_estado, obs: data.filtro_combustivel_obs },
        { item: 'Correia Dentada', estado: data.correia_dentada_estado, obs: data.correia_dentada_obs },
        { item: 'Velas', estado: data.velas_estado, obs: data.velas_obs },
        { item: 'Cabos de Vela', estado: data.cabos_velas_estado, obs: data.cabos_velas_obs },
        { item: 'Escapamento', estado: data.escapamento_estado, obs: data.escapamento_obs },
        { item: 'Embreagem', estado: data.embreagem_estado, obs: data.embreagem_obs },
        { item: 'Caixa de Câmbio', estado: data.caixa_cambio_estado, obs: data.caixa_cambio_obs },
        { item: 'Direção Hidráulica', estado: data.direcao_hidraulica_estado, obs: data.direcao_hidraulica_obs },
        { item: 'Ar Condicionado', estado: data.ar_condicionado_estado, obs: data.ar_condicionado_obs },
        { item: 'Paralama', estado: data.paralama_estado, obs: data.paralama_obs },
        { item: 'Capô', estado: data.capo_estado, obs: data.capo_obs },
        { item: 'Teto', estado: data.teto_estado, obs: data.teto_obs },
        { item: 'Macaco', estado: data.macaco_estado, obs: data.macaco_obs },
        { item: 'Triângulo', estado: data.triangulo_estado, obs: data.triangulo_obs },
        { item: 'Extintor', estado: data.extintor_estado, obs: data.extintor_obs },
        { item: 'Acessórios Internos', estado: data.acessorios_internos_estado, obs: data.acessorios_internos_obs },
      ];

      autoTable(doc, {
        startY: 25,
        head: [['Item', 'Estado', 'Observações']],
        body: checklistItems.map(item => [
          item.item,
          item.estado === 'ok' ? 'OK' : item.estado === 'avariado' ? 'Avariado' : 'Não Verificado',
          item.obs || '-'
        ]),
        theme: 'grid',
        headStyles: { fillColor: [66, 66, 66] },
        styles: { fontSize: 10 },
      });

      // Observações Gerais do Checklist
      if (data.observacoes_gerais) {
        doc.addPage();
        doc.setFontSize(16);
        doc.text('Observações Gerais do Checklist', 14, 20);
        doc.setFontSize(12);
        doc.text(data.observacoes_gerais, 14, 30);
      }

      // Salva o PDF
      doc.save(`relatorio-servico-${servicoId}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      alert('Erro ao gerar o relatório. Por favor, tente novamente.');
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

          <Box sx={{ mt: 2, display: 'flex', gap: 2, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
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
            {servico && (
              <Button
                variant="contained"
                color="info"
                fullWidth
                onClick={() => handleGerarRelatorio(servico.id!)}
              >
                Gerar Relatório
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ServicoForm; 