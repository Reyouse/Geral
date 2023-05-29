function login() {
    var nome = document.querySelector('input[name="nome"]').value;
    var senha = document.querySelector('input[name="senha"]').value;

    fetch(`https://reyouseback.azurewebsites.net/login/${nome}/${senha}`)
        .then(response => response.text())
        .then(data => {
            if (data == "Usuário não existe") {
                alert(data)
            }
            else if (data == "Senha incorreta") {
                alert(data)
            }
            else {
                fetch(`https://reyouseback.azurewebsites.net/login/${nome}/${senha}`)
                    .then(resposta => resposta.json())
                    .then(date => {
                        localStorage.setItem('idPerfil', date[0].idPerfil)
                        localStorage.setItem('idUsuario', date[0].idUsuario)
                        window.location.href = '../HTML/index.html';
                    })
                    .catch(erro => {
                        console.error('Ocorreu um erro:', erro);
                    });
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

function irCadastro() {
    var email = document.querySelector('input[name="novoEmail"]').value;
    if (!validarEmail(email)) {
        alert("Por favor, digite um e-mail válido.");
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