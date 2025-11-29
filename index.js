const express = require('express');
const cors = require('cors');
const seguradoras = require('./seguradoras');

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 1) Rota que retorna todas as seguradoras
app.get('/seguradoras', (req, res) => {
  res.json({
    total: Object.keys(seguradoras).length,
    seguradoras
  });
});

// 🔹 2) Rota que detecta seguradora baseado no texto do usuário
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
    mensagemAssistencia: 
      `Seguradora: ${seguradoraNome}\n` +
      `Assistência 24h:\n` +
      `• Capital: ${dados.assistencia.capital}\n` +
      `• Interior: ${dados.assistencia.interior}`
  });
});

// porta do servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API InterWeg rodando na porta ${port}`);
});
