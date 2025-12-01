# InterWeg Automations – API de Seguradoras

API em Node.js usada pela InterWeg para centralizar a lista de seguradoras e
detectar automaticamente o nome da seguradora a partir de um texto livre
(mensagem do cliente, descrição de sinistro, etc.).  
Ela foi pensada para ser consumida por ferramentas de automação como **n8n**,
**ManyChat**, **DigiSac**, entre outras.

---

##  Funcionalidades

- Exposição de uma lista padronizada de seguradoras usadas pela InterWeg.
- Detecção de seguradora a partir de um texto (ex.: mensagem recebida no WhatsApp).
- Respostas em JSON, prontas para uso em automações.
- Projeto simples e desacoplado, fácil de versionar e evoluir.

---

##  Tecnologias

- Node.js
- Express (ou HTTP nativo, dependendo da implementação em `index.js`)
- JavaScript (CommonJS)

---

## 📁 Estrutura do projeto

```text
.
├── index.js         # Ponto de entrada da aplicação (servidor HTTP / rotas)
├── seguradoras.js   # Lista de seguradoras e funções utilitárias
├── package.json     # Metadados do projeto e scripts npm
├── package-lock.json
└── .gitignore
```

# 1. Clonar o repositório
git clone https://github.com/InterWeg-Seguros/interweg-automations.git

cd interweg-automations

# 2. Instalar dependências
npm install

# 3. Subir o servidor
npm start        # ou node index.js, dependendo do script definido no package.json

# GET /seguradoras
Retorna a lista de seguradoras configuradas no projeto.

Exemplo de requisição
curl http://localhost:3000/seguradoras

Exemplo de resposta

[
  "Porto Seguro",
  "Bradesco Seguros",
  "SulAmérica",
  "Allianz",
  "Tokio Marine"
]


