CREATE DATABASE IF NOT EXISTS guincho_db;
USE guincho_db;

CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  telefone VARCHAR(20) NOT NULL,
  endereco TEXT NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS veiculos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  placa VARCHAR(10) NOT NULL,
  marca VARCHAR(50) NOT NULL,
  modelo VARCHAR(50) NOT NULL,
  ano VARCHAR(4) NOT NULL,
  cor VARCHAR(30) NOT NULL,
  chassi VARCHAR(50) NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS servicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  veiculo_id INT NOT NULL,
  data_servico DATE NOT NULL,
  tipo_servico VARCHAR(100) NOT NULL,
  origem VARCHAR(200) NOT NULL,
  destino VARCHAR(200) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  status ENUM('pendente', 'em_andamento', 'concluido') DEFAULT 'pendente',
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS fotos_servico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  servico_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS checklist_servico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  servico_id INT NOT NULL,
  motor_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  motor_obs TEXT,
  radiador_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  radiador_obs TEXT,
  freios_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  freios_obs TEXT,
  suspensao_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  suspensao_obs TEXT,
  pneus_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  pneus_obs TEXT,
  bateria_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  bateria_obs TEXT,
  oleo_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  oleo_obs TEXT,
  filtro_ar_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  filtro_ar_obs TEXT,
  filtro_oleo_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  filtro_oleo_obs TEXT,
  filtro_combustivel_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  filtro_combustivel_obs TEXT,
  correia_dentada_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  correia_dentada_obs TEXT,
  velas_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  velas_obs TEXT,
  cabos_velas_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  cabos_velas_obs TEXT,
  escapamento_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  escapamento_obs TEXT,
  embreagem_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  embreagem_obs TEXT,
  caixa_cambio_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  caixa_cambio_obs TEXT,
  direcao_hidraulica_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  direcao_hidraulica_obs TEXT,
  ar_condicionado_estado ENUM('ok', 'avariado', 'nao_verificado') DEFAULT 'nao_verificado',
  ar_condicionado_obs TEXT,
  observacoes_gerais TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE
); 