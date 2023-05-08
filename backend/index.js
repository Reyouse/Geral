const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Azure Web App!');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
