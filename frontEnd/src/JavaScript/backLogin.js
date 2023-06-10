function login() {
    var nome = document.querySelector('input[name="nome"]').value;
    var senha = document.querySelector('input[name="senha"]').value;

    fetch(`https://reyouseback.azurewebsites.net/login/${nome}/${senha}`)
        .then(response => response.text())
        .then(data => {
            if (data == "Usuário não existe") {
                var modal = document.querySelector('.modalSenhaIncorreta');
                var modalH = document.querySelector('.modalSenhaIncorreta h5');
                modalH.innerHTML = '<b>USUÁRIO NÃO EXISTE!</b>'
                var modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();
            } else if (data == "Senha incorreta") {
                var modal = document.querySelector('.modalSenhaIncorreta');
                var modalH = document.querySelector('.modalSenhaIncorreta h5');
                modalH.innerHTML = '<b>SENHA INCORRETA!</b>'
                var modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();
            } else {
                fetch(`https://reyouseback.azurewebsites.net/login/${nome}/${senha}`)
                    .then(resposta => resposta.json())
                    .then(date => {
                        localStorage.setItem('idPerfil', date[0].idPerfil);
                        localStorage.setItem('idUsuario', date[0].idUsuario);
                        window.location.href = '../HTML/index.html';
                    })
                    .catch(erro => {
                        var modal = document.querySelector('.modalSenhaIncorreta');
                        var modalH = document.querySelector('.modalSenhaIncorreta h5');
                        modalH.innerHTML = '<b>POR FAVOR, PREENCHA TODOS OS CAMPOS!</b>'
                        var modalInstance = new bootstrap.Modal(modal);
                        modalInstance.show();
                        console.error('Ocorreu um erro:', error);
                        console.error('Ocorreu um erro:', erro);
                    });
            }
        })
        .catch(error => {
            var modal = document.querySelector('.modalSenhaIncorreta');
            var modalH = document.querySelector('.modalSenhaIncorreta h5');
            modalH.innerHTML = '<b>POR FAVOR, PREENCHA TODOS OS CAMPOS!</b>'
            var modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            console.error('Ocorreu um erro:', error);
        });
}


function irCadastro() {
    var email = document.querySelector('input[name="novoEmail"]').value;
    if (!validarEmail(email)) {
        var modal = document.querySelector('.modalSenhaIncorreta');
        var modalH = document.querySelector('.modalSenhaIncorreta h5');
        modalH.innerHTML = '<b>POR FAVOR, DIGITE UM E-MAIL VÁLIDO!</b>'
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }
    else {
        localStorage.setItem('email', email)
        window.location.href = '../HTML/telaCadastro.html';
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}