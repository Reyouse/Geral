const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Azure Web App!');
});

app.listen(80, () => {
  console.log('Servidor rodando na porta 3000');
});
