const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./config/database');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Rotas para Clientes
// Listar todos os clientes
app.get('/api/clientes', (req, res) => {
  connection.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Buscar cliente por ID
app.get('/api/clientes/:id', (req, res) => {
  connection.query(
    'SELECT * FROM clientes WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results[0]);
    }
  );
});

// Criar novo cliente
app.post('/api/clientes', (req, res) => {
  const { nome, cpf, telefone, endereco, email } = req.body;
  connection.query(
    'INSERT INTO clientes (nome, cpf, telefone, endereco, email) VALUES (?, ?, ?, ?, ?)',
    [nome, cpf, telefone, endereco, email],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: results.insertId, ...req.body });
    }
  );
});

// Atualizar cliente
app.put('/api/clientes/:id', (req, res) => {
  const { nome, cpf, telefone, endereco, email } = req.body;
  connection.query(
    'UPDATE clientes SET nome = ?, cpf = ?, telefone = ?, endereco = ?, email = ? WHERE id = ?',
    [nome, cpf, telefone, endereco, email, req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

// Excluir cliente
app.delete('/api/clientes/:id', (req, res) => {
  connection.query(
    'DELETE FROM clientes WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Cliente excluído com sucesso' });
    }
  );
});

// Rotas para Veículos
app.get('/api/veiculos', (req, res) => {
  connection.query(
    `SELECT v.*, c.nome as cliente_nome 
     FROM veiculos v 
     JOIN clientes c ON v.cliente_id = c.id`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    }
  );
});

app.get('/api/veiculos/:id', (req, res) => {
  connection.query(
    'SELECT * FROM veiculos WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results[0]);
    }
  );
});

app.post('/api/veiculos', (req, res) => {
  const { cliente_id, placa, marca, modelo, ano, cor, chassi, observacoes } = req.body;
  connection.query(
    'INSERT INTO veiculos (cliente_id, placa, marca, modelo, ano, cor, chassi, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [cliente_id, placa, marca, modelo, ano, cor, chassi, observacoes],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: results.insertId, ...req.body });
    }
  );
});

app.put('/api/veiculos/:id', (req, res) => {
  const { cliente_id, placa, marca, modelo, ano, cor, chassi, observacoes } = req.body;
  connection.query(
    'UPDATE veiculos SET cliente_id = ?, placa = ?, marca = ?, modelo = ?, ano = ?, cor = ?, chassi = ?, observacoes = ? WHERE id = ?',
    [cliente_id, placa, marca, modelo, ano, cor, chassi, observacoes, req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

app.delete('/api/veiculos/:id', (req, res) => {
  connection.query(
    'DELETE FROM veiculos WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Veículo excluído com sucesso' });
    }
  );
});

// Rotas para Serviços
app.get('/api/servicos', (req, res) => {
  connection.query(
    `SELECT s.*, v.placa as veiculo_placa, v.marca as veiculo_marca, v.modelo as veiculo_modelo
     FROM servicos s
     JOIN veiculos v ON s.veiculo_id = v.id`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    }
  );
});

app.get('/api/servicos/:id', (req, res) => {
  connection.query(
    'SELECT * FROM servicos WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results[0]);
    }
  );
});

app.post('/api/servicos', (req, res) => {
  const { veiculo_id, data_servico, tipo_servico, origem, destino, valor, status, observacoes } = req.body;
  connection.query(
    'INSERT INTO servicos (veiculo_id, data_servico, tipo_servico, origem, destino, valor, status, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [veiculo_id, data_servico, tipo_servico, origem, destino, valor, status, observacoes],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: results.insertId, ...req.body });
    }
  );
});

app.put('/api/servicos/:id', (req, res) => {
  const { veiculo_id, data_servico, tipo_servico, origem, destino, valor, status, observacoes } = req.body;
  connection.query(
    'UPDATE servicos SET veiculo_id = ?, data_servico = ?, tipo_servico = ?, origem = ?, destino = ?, valor = ?, status = ?, observacoes = ? WHERE id = ?',
    [veiculo_id, data_servico, tipo_servico, origem, destino, valor, status, observacoes, req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

app.delete('/api/servicos/:id', (req, res) => {
  connection.query(
    'DELETE FROM servicos WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Serviço excluído com sucesso' });
    }
  );
});

// Rotas para Checklist de Serviço
app.get('/api/checklist/:servico_id', (req, res) => {
  connection.query(
    'SELECT * FROM checklist_servico WHERE servico_id = ?',
    [req.params.servico_id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results[0]);
    }
  );
});

app.post('/api/checklist', (req, res) => {
  const {
    servico_id,
    motor_estado,
    motor_obs,
    radiador_estado,
    radiador_obs,
    freios_estado,
    freios_obs,
    suspensao_estado,
    suspensao_obs,
    pneus_estado,
    pneus_obs,
    bateria_estado,
    bateria_obs,
    oleo_estado,
    oleo_obs,
    filtro_ar_estado,
    filtro_ar_obs,
    filtro_oleo_estado,
    filtro_oleo_obs,
    filtro_combustivel_estado,
    filtro_combustivel_obs,
    correia_dentada_estado,
    correia_dentada_obs,
    velas_estado,
    velas_obs,
    cabos_velas_estado,
    cabos_velas_obs,
    escapamento_estado,
    escapamento_obs,
    embreagem_estado,
    embreagem_obs,
    caixa_cambio_estado,
    caixa_cambio_obs,
    direcao_hidraulica_estado,
    direcao_hidraulica_obs,
    ar_condicionado_estado,
    ar_condicionado_obs,
    observacoes_gerais
  } = req.body;

  const query = `
    INSERT INTO checklist_servico (
      servico_id,
      motor_estado, motor_obs,
      radiador_estado, radiador_obs,
      freios_estado, freios_obs,
      suspensao_estado, suspensao_obs,
      pneus_estado, pneus_obs,
      bateria_estado, bateria_obs,
      oleo_estado, oleo_obs,
      filtro_ar_estado, filtro_ar_obs,
      filtro_oleo_estado, filtro_oleo_obs,
      filtro_combustivel_estado, filtro_combustivel_obs,
      correia_dentada_estado, correia_dentada_obs,
      velas_estado, velas_obs,
      cabos_velas_estado, cabos_velas_obs,
      escapamento_estado, escapamento_obs,
      embreagem_estado, embreagem_obs,
      caixa_cambio_estado, caixa_cambio_obs,
      direcao_hidraulica_estado, direcao_hidraulica_obs,
      ar_condicionado_estado, ar_condicionado_obs,
      observacoes_gerais
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    servico_id,
    motor_estado, motor_obs,
    radiador_estado, radiador_obs,
    freios_estado, freios_obs,
    suspensao_estado, suspensao_obs,
    pneus_estado, pneus_obs,
    bateria_estado, bateria_obs,
    oleo_estado, oleo_obs,
    filtro_ar_estado, filtro_ar_obs,
    filtro_oleo_estado, filtro_oleo_obs,
    filtro_combustivel_estado, filtro_combustivel_obs,
    correia_dentada_estado, correia_dentada_obs,
    velas_estado, velas_obs,
    cabos_velas_estado, cabos_velas_obs,
    escapamento_estado, escapamento_obs,
    embreagem_estado, embreagem_obs,
    caixa_cambio_estado, caixa_cambio_obs,
    direcao_hidraulica_estado, direcao_hidraulica_obs,
    ar_condicionado_estado, ar_condicionado_obs,
    observacoes_gerais
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao salvar checklist:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: results.insertId, ...req.body });
  });
});

app.put('/api/checklist/:servico_id', (req, res) => {
  const {
    motor_estado,
    motor_obs,
    radiador_estado,
    radiador_obs,
    freios_estado,
    freios_obs,
    suspensao_estado,
    suspensao_obs,
    pneus_estado,
    pneus_obs,
    bateria_estado,
    bateria_obs,
    oleo_estado,
    oleo_obs,
    filtro_ar_estado,
    filtro_ar_obs,
    filtro_oleo_estado,
    filtro_oleo_obs,
    filtro_combustivel_estado,
    filtro_combustivel_obs,
    correia_dentada_estado,
    correia_dentada_obs,
    velas_estado,
    velas_obs,
    cabos_velas_estado,
    cabos_velas_obs,
    escapamento_estado,
    escapamento_obs,
    embreagem_estado,
    embreagem_obs,
    caixa_cambio_estado,
    caixa_cambio_obs,
    direcao_hidraulica_estado,
    direcao_hidraulica_obs,
    ar_condicionado_estado,
    ar_condicionado_obs,
    observacoes_gerais
  } = req.body;

  const query = `
    UPDATE checklist_servico SET
      motor_estado = ?, motor_obs = ?,
      radiador_estado = ?, radiador_obs = ?,
      freios_estado = ?, freios_obs = ?,
      suspensao_estado = ?, suspensao_obs = ?,
      pneus_estado = ?, pneus_obs = ?,
      bateria_estado = ?, bateria_obs = ?,
      oleo_estado = ?, oleo_obs = ?,
      filtro_ar_estado = ?, filtro_ar_obs = ?,
      filtro_oleo_estado = ?, filtro_oleo_obs = ?,
      filtro_combustivel_estado = ?, filtro_combustivel_obs = ?,
      correia_dentada_estado = ?, correia_dentada_obs = ?,
      velas_estado = ?, velas_obs = ?,
      cabos_velas_estado = ?, cabos_velas_obs = ?,
      escapamento_estado = ?, escapamento_obs = ?,
      embreagem_estado = ?, embreagem_obs = ?,
      caixa_cambio_estado = ?, caixa_cambio_obs = ?,
      direcao_hidraulica_estado = ?, direcao_hidraulica_obs = ?,
      ar_condicionado_estado = ?, ar_condicionado_obs = ?,
      observacoes_gerais = ?
    WHERE servico_id = ?`;

  const values = [
    motor_estado, motor_obs,
    radiador_estado, radiador_obs,
    freios_estado, freios_obs,
    suspensao_estado, suspensao_obs,
    pneus_estado, pneus_obs,
    bateria_estado, bateria_obs,
    oleo_estado, oleo_obs,
    filtro_ar_estado, filtro_ar_obs,
    filtro_oleo_estado, filtro_oleo_obs,
    filtro_combustivel_estado, filtro_combustivel_obs,
    correia_dentada_estado, correia_dentada_obs,
    velas_estado, velas_obs,
    cabos_velas_estado, cabos_velas_obs,
    escapamento_estado, escapamento_obs,
    embreagem_estado, embreagem_obs,
    caixa_cambio_estado, caixa_cambio_obs,
    direcao_hidraulica_estado, direcao_hidraulica_obs,
    ar_condicionado_estado, ar_condicionado_obs,
    observacoes_gerais,
    req.params.servico_id
  ];

  connection.query(query, values, (err) => {
    if (err) {
      console.error('Erro ao atualizar checklist:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ servico_id: req.params.servico_id, ...req.body });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 