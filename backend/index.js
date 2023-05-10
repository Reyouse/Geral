const express = require('express');
const app = express();
const sql = require('mssql');

const config = {
  user: 'reyouse',
  password: 'TIMPNpuc2023',
  server: 'https://reyouse.database.windows.net',
  database: 'reyouse'
};

sql.connect(config)
.then(() => {
    console.log('Conexão estabelecida com o SQL Server.');
})
.catch(err => console.error('Erro ao conectar ao SQL Server.', err));

app.get('/', (req, res) => {
  res.send('Hello, Azure Web App!');
});

app.get('/test', (req, res) => {
  res.send('Teste');
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 80');
});