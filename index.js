const express = require('express');
const cors = require('cors');
const seguradoras = require('./seguradoras');

const app = express();
app.use(express.json());
app.use(cors());

// Rota que retorna uma seguradora pelo nome (querystring)
app.get('/seguradora', (req, res) => {
  const nomeParam = (req.query.nome || "").toLowerCase().trim();

  let seguradoraNome = "";

  for (const nome in seguradoras) {
    const nomeNorm = nome.toLowerCase();
    const base = nomeNorm.replace("seguros", "").trim();

    if (nomeParam.includes(nomeNorm) || nomeParam.includes(base)) {
      seguradoraNome = nome;
      break;
    }
  }

  if (!seguradoraNome) {
    return res.status(404).json({ ok: 0, mensagem: "Seguradora não encontrada" });
  }

  const dados = seguradoras[seguradoraNome];

  return res.json({
    ok: 1,
    nome: seguradoraNome,
    assistencia: dados.assistencia,
    sinistro: dados.sinistro,
    vidros: dados.vidros || null,
  });
});

// Rota que detecta seguradora baseado no texto do usuário
app.post('/detect', (req, res) => {
  const texto = (req.body.text || "").toLowerCase().trim();

  let seguradoraNome = "";

  for (const nome in seguradoras) {
    const nomeNorm = nome.toLowerCase();
    const base = nomeNorm.replace("seguros", "").trim();

    if (texto.includes(nomeNorm) || texto.includes(base)) {
      seguradoraNome = nome;
      break;
    }
  }

  if (!seguradoraNome) {
    return res.json({
      encontrada: false,
      mensagem: "Nenhuma seguradora encontrada no texto."
    });
  }

  const dados = seguradoras[seguradoraNome];

  return res.json({
    encontrada: true,
    seguradora: seguradoraNome,
    assistencia: dados.assistencia,
    sinistro: dados.sinistro,
    vidros: dados.vidros, //  incluído aqui
    mensagemAssistencia:
      `Seguradora: ${seguradoraNome}\n` +
      `Assistência 24h:\n` +
      `• Capital: ${dados.assistencia.capital}\n` +
      `• Interior: ${dados.assistencia.interior}`,
    mensagemVidros: dados.vidros
      ? `Vidros:\n• Capital: ${dados.vidros.capital}\n• Interior: ${dados.vidros.interior}`
      : "Esta seguradora não possui atendimento de vidros cadastrado."
  });
});

// Porta do servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API InterWeg rodando na porta ${port}`);
});