const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
