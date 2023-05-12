const MensagemInicial = {
    EnviarMensagem: function(){
        return `
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
      <ul>
        <li><span class="item-title">cadastro(username, email, senha, nome, cpf, celular, sexo):</span> Cadastra o usuário informado nos parâmetros no banco de dados</li>
        <li><span class="item-title">verifica-username(username)</span> Verifica se o username passado por parâmetro está ou não disponível (existe ou não no banco)</li>
        <li><span class="item-title">verifica-email(email)</span> Verifica se o email passado por parâmetro está ou não disponível (existe ou não no banco)</li>
        <li><span class="item-title">verifica-cpf(cpf)</span> Verifica se o cpf passado por parâmetro está ou não disponível (existe ou não no banco)</li>
        <li><span class="item-title">valida-cpf(cpf)</span> Verifica se o cpf passado por parâmetro é um cpf válido</li>
        <li><span class="item-title">login(username, senha)</span> Verifica se o usuário está cadastrado e se a senha está correta e então retorna uma resposta informando se o login ocorreu ou não</li>
      </ul>
      <br>
      <h2>ROTAS DE EXEMPLO</h2>
      <ul>
        <li><span class="item-title">test:</span> Retorna a string "Teste"</li>
        <li><span class="item-title">exemploconsulta:</span> Retorna o que está dentro da tabela anúncio</li>
        <li><span class="item-title">exemplorecebendo(parametro1, parametro2):</span> Retorna uma string mostrando valor do parametro1 e do parametro2</li>
        <li><span class="item-title">exemplocompleto(parametro):</span> Pesquisa a tabela passada como parametro no banco e retorna o seu conteudo</li>
      </ul>
      `
    }
}
module.exports = MensagemInicial;