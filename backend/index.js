const express = require('express');
const app = express();

// -------------------EXEMPLOS----------------------:

// AQUI ESTÁ UM EXEMPLO DE COMO IMPORTAR UMA FUNÇÃO QUE VOCÊ CRIOU EM OUTRO ARQUIVO (VERIFIQUE TAMBÉM A ESTRUTURA DO ARQUIVO conexaoBanco.js que está na pasta recursos):
const sql = require('./recursos/conexaoBanco.js');

// AQUI ESTÃO DOIS EXEMPLO DE COMO RETORNAR APENAS UMA MENSAGEM DE TEXTO PARA O FRONT UTILIZAR:
app.get('/', (req, res) => {
  const mensagem = `
    <style>
    body {
      background-color: #222;
      color: #fff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 20px;
      text-align: center;
    }
    
    h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }
    
    h2 {
      font-size: 24px;
      margin-bottom: 10px;
      color: #f39c12;
    }
    
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    li {
      font-size: 18px;
      margin-bottom: 10px;
      background-color: #34495e;
      padding: 10px;
      border-radius: 5px;
      width: 400px;
      text-align: left;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    li:hover {
      background-color: #2c3e50;
    }
    
    .item-title {
      font-weight: bold;
      color: #f39c12;
      margin-bottom: 5px;
    }
  </style>

  <h1>BEM VINDO AO BACKEND DA REYOUSE!</h1>
  <h2>ROTAS OFICIAIS</h2>
  <br>
  <h2>ROTAS DE EXEMPLO</h2>
  <ul>
    <li><span class="item-title">test:</span> Retorna a string "Teste"</li>
    <li><span class="item-title">exemploconsulta:</span> Retorna o que está dentro da tabela anúncio</li>
    <li><span class="item-title">exemplorecebendo(parametro1, parametro2):</span> Retorna uma string mostrando valor do parametro1 e do parametro2</li>
    <li><span class="item-title">exemplocompleto(parametro):</span> Pesquisa a tabela passada como parametro no banco e retorna o seu conteudo</li>
  </ul>
  `;


  res.send(mensagem);
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


// -------------- CRIA A PORTA DO BACKEND -----------------
app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});