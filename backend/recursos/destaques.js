const sql = require('./conexaoBanco');

async function destaques(request, response){
    try{
        const consulta = `SELECT TOP 5 Jogo.titulo, Anuncio.preco, Jogo.descricao, Jogo.capa FROM Anuncio JOIN Jogo ON Anuncio.idJogo = Jogo.idJogo ORDER BY Anuncio.preco ASC`
        await sql.Conectar();
        const result = await sql.Query(consulta);
        response.send(result.recordset);
    }catch(error){
        response.status(500).send(error);
        console.log(error);
    }
}

module.exports = {
    destaques,
}