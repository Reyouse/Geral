const sql = require('./conexaoBanco');


async function verificaUsername(request, response){
    try {
        await sql.Conectar();
        const username = request.params.username;
        const consulta = `SELECT * FROM Usuario WHERE nomeUsuario = '${username}'`;
        const result = await sql.Query(consulta);
        
        if (result.recordset.length > 0) {
          response.send('Nome de usuário já registrado');
        } else {
          response.send('Nome de usuário disponível');
        }
    } catch (error) {
        response.status(500).send('Erro ao verificar o nome de usuário');
    }
}

async function verificaEmail(request, response){
    try {
        await sql.Conectar();
        const email = request.params.email;
        const consulta = `SELECT * FROM Usuario WHERE email = '${email}'`;
        const result = await sql.Query(consulta);
        
        if (result.recordset.length > 0) {
          response.send('Email já registrado');
        } else {
          response.send('Email disponível');
        }
    } catch (error) {
        response.status(500).send('Erro ao verificar o email');
    }
}

async function verificaCPF(request, response){
    try {
        await sql.Conectar();
        const cpf = request.params.cpf;
        const consulta = `SELECT * FROM Usuario WHERE cpf = '${cpf}'`;
        const result = await sql.Query(consulta);
        
        if (result.recordset.length > 0) {
          response.send('CPF já registrado');
        } else {
          response.send('CPF disponível');
        }
    } catch (error) {
        response.status(500).send('Erro ao verificar o CPF');
    }
}

async function validaCPF(request, response){
    const validador = require('./validadorCPF');
    try{
        if(validador.validaCPF(request.params.cpf)){
            response.send('CPF válido');
        }
        else{
            response.send('CPF inválido')
        }
    }catch(error){
        response.status(500).send('Erro ao verificar o CPF');
    }
}

async function cadastrar(request, response) {
    try {
      await sql.Conectar();
      const username = request.params.username;
      const email = request.params.email;
      const senha = request.params.senha;
      const nome = request.params.nome;
      const cpf = request.params.cpf;
      const celular = request.params.celular;
      const sexo = request.params.sexo;
  
      const consulta1 = `INSERT INTO Usuario (nomeUsuario, email, senha, cpf, celular, sexo) VALUES ('${username}', '${email}', '${senha}', '${cpf}', '${celular}', '${sexo}')`;
      const result1 = await sql.Query(consulta1);

      const consulta3 = `SELECT idUsuario FROM Usuario WHERE nomeUsuario = '${username}'`;
      const result3 = await sql.Query(consulta3);
      console.log(result3.recordset[0].idUsuario);

      const consulta2 = `INSERT INTO Perfil (idUsuario, nomePerfil) VALUES ('${parseInt(result3.recordset[0].idUsuario)}', '${nome}')`;
      const result2 = await sql.Query(consulta2);
  
      response.send(`Usuário ${username} cadastrado com sucesso.`);
    } catch (error) {
      response.status(500).send(`Erro ao cadastrar usuário: ${error}`);7
      console.error(error);
    }
  }

module.exports = {
    verificaUsername,
    verificaEmail,
    verificaCPF,
    validaCPF,
    cadastrar,
};