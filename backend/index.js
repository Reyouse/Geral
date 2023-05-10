const express = require('express');
const app = express();
const sql = require('./recursos/conexaoBanco.js');
sql.Conectar();

app.get('/', (req, res) => {
  res.send('Hello, Azure Web App!');
});

app.get('/test', (req, res) => {
  res.send('Teste');
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});