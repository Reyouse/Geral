const sql = require('./conexaoBanco');

async function catalogo(request, response){
    try{
        await sql.Conectar();
        const plataforma = request.params.plataforma;
        const consulta = `SELECT Anuncio.idAnuncio, Jogo.capa, Anuncio.preco FROM Anuncio JOIN Jogo ON Anuncio.idJogo = Jogo.idJogo JOIN plataforma ON Anuncio.idPlataforma = Plataforma.idPlataforma AND Plataforma.nome = '${plataforma}'`;
        const result = await sql.Query(consulta);
        response.send(result.recordset);
    }catch(erro){
        response.send(erro);
        console.log(erro);
    }
}

module.exports = {
    catalogo,
}
