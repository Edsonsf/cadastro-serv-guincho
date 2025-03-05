import React from 'react';
import {
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Paper,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { ChecklistServico, EstadoPeca } from '../types/ChecklistServico';

interface ChecklistServicoProps {
  checklist: ChecklistServico;
  onChange: (checklist: ChecklistServico) => void;
}

interface ItemChecklistProps {
  label: string;
  estado: EstadoPeca;
  observacao: string | undefined;
  onEstadoChange: (estado: EstadoPeca) => void;
  onObservacaoChange: (observacao: string) => void;
}

const ItemChecklist: React.FC<ItemChecklistProps> = ({
  label,
  estado,
  observacao,
  onEstadoChange,
  onObservacaoChange,
}) => (
  <Box sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
    <Typography variant="subtitle1" gutterBottom>
      {label}
    </Typography>
    <RadioGroup
      row
      value={estado}
      onChange={(e) => onEstadoChange(e.target.value as EstadoPeca)}
    >
      <FormControlLabel
        value="ok"
        control={<Radio color="success" />}
        label="OK"
      />
      <FormControlLabel
        value="avariado"
        control={<Radio color="error" />}
        label="Avariado"
      />
      <FormControlLabel
        value="nao_verificado"
        control={<Radio />}
        label="Não Verificado"
      />
    </RadioGroup>
    <TextField
      fullWidth
      size="small"
      label="Observações"
      value={observacao || ''}
      onChange={(e) => onObservacaoChange(e.target.value)}
      margin="dense"
    />
  </Box>
);

const ChecklistServicoComponent: React.FC<ChecklistServicoProps> = ({
  checklist,
  onChange,
}) => {
  const handleEstadoChange = (campo: string) => (estado: EstadoPeca) => {
    onChange({
      ...checklist,
      [campo]: estado,
    });
  };

  const handleObservacaoChange = (campo: string) => (observacao: string) => {
    onChange({
      ...checklist,
      [campo]: observacao,
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Checklist de Peças e Componentes
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ItemChecklist
            label="Motor"
            estado={checklist.motor_estado}
            observacao={checklist.motor_obs}
            onEstadoChange={handleEstadoChange('motor_estado')}
            onObservacaoChange={handleObservacaoChange('motor_obs')}
          />
          <ItemChecklist
            label="Radiador"
            estado={checklist.radiador_estado}
            observacao={checklist.radiador_obs}
            onEstadoChange={handleEstadoChange('radiador_estado')}
            onObservacaoChange={handleObservacaoChange('radiador_obs')}
          />
          <ItemChecklist
            label="Freios"
            estado={checklist.freios_estado}
            observacao={checklist.freios_obs}
            onEstadoChange={handleEstadoChange('freios_estado')}
            onObservacaoChange={handleObservacaoChange('freios_obs')}
          />
          <ItemChecklist
            label="Suspensão"
            estado={checklist.suspensao_estado}
            observacao={checklist.suspensao_obs}
            onEstadoChange={handleEstadoChange('suspensao_estado')}
            onObservacaoChange={handleObservacaoChange('suspensao_obs')}
          />
          <ItemChecklist
            label="Pneus"
            estado={checklist.pneus_estado}
            observacao={checklist.pneus_obs}
            onEstadoChange={handleEstadoChange('pneus_estado')}
            onObservacaoChange={handleObservacaoChange('pneus_obs')}
          />
          <ItemChecklist
            label="Bateria"
            estado={checklist.bateria_estado}
            observacao={checklist.bateria_obs}
            onEstadoChange={handleEstadoChange('bateria_estado')}
            onObservacaoChange={handleObservacaoChange('bateria_obs')}
          />
          <ItemChecklist
            label="Óleo"
            estado={checklist.oleo_estado}
            observacao={checklist.oleo_obs}
            onEstadoChange={handleEstadoChange('oleo_estado')}
            onObservacaoChange={handleObservacaoChange('oleo_obs')}
          />
          <ItemChecklist
            label="Filtro de Ar"
            estado={checklist.filtro_ar_estado}
            observacao={checklist.filtro_ar_obs}
            onEstadoChange={handleEstadoChange('filtro_ar_estado')}
            onObservacaoChange={handleObservacaoChange('filtro_ar_obs')}
          />
          <ItemChecklist
            label="Filtro de Óleo"
            estado={checklist.filtro_oleo_estado}
            observacao={checklist.filtro_oleo_obs}
            onEstadoChange={handleEstadoChange('filtro_oleo_estado')}
            onObservacaoChange={handleObservacaoChange('filtro_oleo_obs')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ItemChecklist
            label="Filtro de Combustível"
            estado={checklist.filtro_combustivel_estado}
            observacao={checklist.filtro_combustivel_obs}
            onEstadoChange={handleEstadoChange('filtro_combustivel_estado')}
            onObservacaoChange={handleObservacaoChange('filtro_combustivel_obs')}
          />
          <ItemChecklist
            label="Correia Dentada"
            estado={checklist.correia_dentada_estado}
            observacao={checklist.correia_dentada_obs}
            onEstadoChange={handleEstadoChange('correia_dentada_estado')}
            onObservacaoChange={handleObservacaoChange('correia_dentada_obs')}
          />
          <ItemChecklist
            label="Velas"
            estado={checklist.velas_estado}
            observacao={checklist.velas_obs}
            onEstadoChange={handleEstadoChange('velas_estado')}
            onObservacaoChange={handleObservacaoChange('velas_obs')}
          />
          <ItemChecklist
            label="Cabos de Vela"
            estado={checklist.cabos_velas_estado}
            observacao={checklist.cabos_velas_obs}
            onEstadoChange={handleEstadoChange('cabos_velas_estado')}
            onObservacaoChange={handleObservacaoChange('cabos_velas_obs')}
          />
          <ItemChecklist
            label="Escapamento"
            estado={checklist.escapamento_estado}
            observacao={checklist.escapamento_obs}
            onEstadoChange={handleEstadoChange('escapamento_estado')}
            onObservacaoChange={handleObservacaoChange('escapamento_obs')}
          />
          <ItemChecklist
            label="Embreagem"
            estado={checklist.embreagem_estado}
            observacao={checklist.embreagem_obs}
            onEstadoChange={handleEstadoChange('embreagem_estado')}
            onObservacaoChange={handleObservacaoChange('embreagem_obs')}
          />
          <ItemChecklist
            label="Caixa de Câmbio"
            estado={checklist.caixa_cambio_estado}
            observacao={checklist.caixa_cambio_obs}
            onEstadoChange={handleEstadoChange('caixa_cambio_estado')}
            onObservacaoChange={handleObservacaoChange('caixa_cambio_obs')}
          />
          <ItemChecklist
            label="Direção Hidráulica"
            estado={checklist.direcao_hidraulica_estado}
            observacao={checklist.direcao_hidraulica_obs}
            onEstadoChange={handleEstadoChange('direcao_hidraulica_estado')}
            onObservacaoChange={handleObservacaoChange('direcao_hidraulica_obs')}
          />
          <ItemChecklist
            label="Ar Condicionado"
            estado={checklist.ar_condicionado_estado}
            observacao={checklist.ar_condicionado_obs}
            onEstadoChange={handleEstadoChange('ar_condicionado_estado')}
            onObservacaoChange={handleObservacaoChange('ar_condicionado_obs')}
          />
        </Grid>
      </Grid>
      <TextField
        fullWidth
        label="Observações Gerais do Checklist"
        multiline
        rows={4}
        value={checklist.observacoes_gerais || ''}
        onChange={(e) => handleObservacaoChange('observacoes_gerais')(e.target.value)}
        margin="normal"
      />
    </Paper>
  );
};

export default ChecklistServicoComponent; 