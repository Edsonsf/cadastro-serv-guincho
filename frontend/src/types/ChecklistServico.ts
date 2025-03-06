export type EstadoPeca = 'ok' | 'avariado' | 'nao_verificado';

export interface ChecklistServico {
  id?: number;
  servico_id: number;
  motor_estado: EstadoPeca;
  motor_obs?: string;
  radiador_estado: EstadoPeca;
  radiador_obs?: string;
  freios_estado: EstadoPeca;
  freios_obs?: string;
  suspensao_estado: EstadoPeca;
  suspensao_obs?: string;
  pneus_estado: EstadoPeca;
  pneus_obs?: string;
  bateria_estado: EstadoPeca;
  bateria_obs?: string;
  oleo_estado: EstadoPeca;
  oleo_obs?: string;
  filtro_ar_estado: EstadoPeca;
  filtro_ar_obs?: string;
  filtro_oleo_estado: EstadoPeca;
  filtro_oleo_obs?: string;
  filtro_combustivel_estado: EstadoPeca;
  filtro_combustivel_obs?: string;
  correia_dentada_estado: EstadoPeca;
  correia_dentada_obs?: string;
  velas_estado: EstadoPeca;
  velas_obs?: string;
  cabos_velas_estado: EstadoPeca;
  cabos_velas_obs?: string;
  escapamento_estado: EstadoPeca;
  escapamento_obs?: string;
  embreagem_estado: EstadoPeca;
  embreagem_obs?: string;
  caixa_cambio_estado: EstadoPeca;
  caixa_cambio_obs?: string;
  direcao_hidraulica_estado: EstadoPeca;
  direcao_hidraulica_obs?: string;
  ar_condicionado_estado: EstadoPeca;
  ar_condicionado_obs?: string;
  paralama_estado: EstadoPeca;
  paralama_obs?: string;
  capo_estado: EstadoPeca;
  capo_obs?: string;
  teto_estado: EstadoPeca;
  teto_obs?: string;
  macaco_estado: EstadoPeca;
  macaco_obs?: string;
  triangulo_estado: EstadoPeca;
  triangulo_obs?: string;
  extintor_estado: EstadoPeca;
  extintor_obs?: string;
  acessorios_internos_estado: EstadoPeca;
  acessorios_internos_obs?: string;
  observacoes_gerais?: string;
} 