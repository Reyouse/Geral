const ConexaoBanco = {
    Conectar: function() {
      const sql = require('mssql');
        const config = {
          user: 'reyouse',
          password: 'TIMPNpuc2023',
          server: 'reyouse.database.windows.net',
          database: 'reyouse'
        };
        
        return sql.connect(config)
          .then(() => {
            console.log('Conexão estabelecida com o SQL Server.');
          })
          .catch(err => console.error('Erro ao conectar ao SQL Server.', err));
      },
      
      Query: function(queryString) {
        const sql = require('mssql');
        return sql.query(queryString);
      },

      Query: function(queryString, string2) {
        const sql = require('mssql');
        return sql.query(queryString, string2);
      }
}
module.exports = ConexaoBanco;