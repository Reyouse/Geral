const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Azure Web App!');
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 80');
});