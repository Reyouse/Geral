const ConexaoBanco = {
    Conectar: function(){
        const sql = require('mssql');

        const config = {
            user: 'reyouse',
            password: 'TIMPNpuc2023',
            server: 'reyouse.database.windows.net',
            database: 'reyouse'
        };
        
        sql.connect(config)
        .then(() => {
            console.log('Conexão estabelecida com o SQL Server.');
        })
        .catch(err => console.error('Erro ao conectar ao SQL Server.', err));
    }
}
module.exports = ConexaoBanco;