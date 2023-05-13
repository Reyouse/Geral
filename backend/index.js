const express = require('express');
const app = express();
const destaques = require('./recursos/destaques');

// -------------------EXEMPLOS----------------------:

// AQUI ESTÁ UM EXEMPLO DE COMO IMPORTAR UMA FUNÇÃO QUE VOCÊ CRIOU EM OUTRO ARQUIVO (VERIFIQUE TAMBÉM A ESTRUTURA DO ARQUIVO conexaoBanco.js que está na pasta recursos):
const sql = require('./recursos/conexaoBanco.js');

// AQUI ESTÃO DOIS EXEMPLO DE COMO RETORNAR APENAS UMA MENSAGEM DE TEXTO PARA O FRONT UTILIZAR:
app.get('/', (req, res) => {
  const mensagem = require('./recursos/mensagemInicial.js');
  res.send(mensagem.EnviarMensagem());
});

app.get('/test', (req, res) => {
  res.send('Teste');
});

// AQUI ESTÁ UM EXEMPLO DE COMO FAZER UMA CONSULTA SIMPLES NO BANCO E RETORNAR PARA O FRONT USAR
app.get('/exemploconsulta', (req, res) => {
  // USE O OBJETO SQL PARA CONECTAR AO SERVIDOR
  sql.Conectar().then(() => {
    // DENTRO DE `` DEPOIS DE QUERY, INSIRA A CONSULTA EM SQL
    return sql.Query(`SELECT * From Anuncio`);
  }).then(result => {
    // RETORNA PARA O FRONT
    res.json(result.recordset);
  }).catch(err => {
    // RETORNA ERRO CASO A CONSULTA NÃO FUNCIONE
    console.error('Erro ao executar consulta:', err);
    res.status(500).json({ error: 'Erro ao executar consulta' });
  });
});

// AQUI ESTÁ UM EXEMPLO DE COMO RECEBER UM PARÂMETRO DO FRONTEND
app.get('/exemplorecebendo/:parametro1/:parametro2', (req, res) => {
  res.send(`Parâmetro 1: ${req.params.parametro1} e parâmetro 2: ${req.params.parametro2}`);
  //repare que a página mostra os parâmetros que você escreveu após as '/' da url
});

// POR ULTIMO, RECEBENDO UM PARÂMETRO, FAZENDO UMA CONSULTA COM ELE E RETORNANDO UMA RESPOSTA
app.get('/exemplocompleto/:parametro', (req, res) => {
  sql.Conectar().then(() => {
    //Pega o parâmetro passado
    const tabela = req.params.parametro;
    //Cria uma consulta com o parâmetro
    const query = `SELECT * FROM ${tabela}`;
    //Executa a consulta
    return sql.Query(query);
  }).then(result => {
    //Retorna o valor para o front
    res.json(result.recordset);
  }).catch(err => {
    console.error('Erro ao executar consulta:', err);
    res.status(500).json({ error: 'Erro ao executar consulta' });
  });
});


// -------------- ROTAS DO BACKEND -----------------
app.get('/destaques', destaques.destaques);

// -------------- CRIA A PORTA DO BACKEND -----------------
app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});