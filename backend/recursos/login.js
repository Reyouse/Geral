const sql = require('./conexaoBanco');

async function login(request, response){
    try{
        await sql.Conectar();
        const username = request.params.username;
        const senha = request.params.senha;
        const consultaUm = `SELECT * FROM Usuario WHERE nomeUsuario = '${username}'`
        const existe = await sql.Query(consultaUm);

        if(existe.recordset.length > 0){
            const consulta = `SELECT * FROM Usuario WHERE nomeUsuario = '${username}' AND senha = '${senha}'`;
            const result = await sql.Query(consulta);
            if (result.recordset.length > 0) {
                response.send('Usuário logado com sucesso');
                return 1;
            } else {
                response.send('Senha incorreta');
                return 0;
            }
        }else{
            response.send('Usuário não existe')
        }
    }catch(erro){
        response.status(500).send(`Erro: ${erro}`);
        console.log(erro);
    }
}

module.exports = {
    login,
}