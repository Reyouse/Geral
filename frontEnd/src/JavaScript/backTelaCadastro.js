var aux = 0
var email = localStorage.getItem('email')
document.getElementById("email").value = email

function validarCampos() {
    var username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("confirmarSenha").value;
    var nomeCompleto = document.getElementById("nomeCompleto").value;
    var cpf = document.getElementById("cpf").value;
    var celular = document.getElementById("celular").value;
    var sexoUsuario = document.getElementById("sexoUsuario").value;

    // Verificar se os campos estão vazios
    if (
        username === "" ||
        email === "" ||
        senha === "" ||
        confirmarSenha === "" ||
        nomeCompleto === "" ||
        cpf === "" ||
        celular === "" ||
        sexoUsuario === ""
    ) {
        var modal = document.querySelector('.modalSenhaIncorreta');
        var modalH = document.querySelector('.modalSenhaIncorreta h5');
        modalH.innerHTML = '<b>POR FAVOR, PREENCHA TODOS OS CAMPOS OBRIGATÓRIOS!</b>'
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        return false;
    }

    // Verificar se a senha e a confirmação de senha são iguais
    if (senha.length > 20) {
        var modal = document.querySelector('.modalSenhaIncorreta');
        var modalH = document.querySelector('.modalSenhaIncorreta h5');
        modalH.innerHTML = '<b>SENHA MUITO GRANDE, POR FAVOR, ESCOLHA OUTRA!</b>'
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        return false
    }

    if (senha !== confirmarSenha) {
        var modal = document.querySelector('.modalSenhaIncorreta');
        var modalH = document.querySelector('.modalSenhaIncorreta h5');
        modalH.innerHTML = '<b>A SENHA E A CONFIRMAÇÃO DE SENHA NÃO CORRESPONDEM!</b>'
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        return false;
    }

    // Valida E-mail
    if (email.length > 45) {
        var modal = document.querySelector('.modalSenhaIncorreta');
        var modalH = document.querySelector('.modalSenhaIncorreta h5');
        modalH.innerHTML = '<b>E-MAIL MUITO GRANDE, POR FAVOR, INSIRA OUTRO!</b>'
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        return false
    }

    if (!validarEmail(email)) {
        var modal = document.querySelector('.modalSenhaIncorreta');
        var modalH = document.querySelector('.modalSenhaIncorreta h5');
        modalH.innerHTML = '<b>POR FAVOR, DIGITE UM E-MAIL VÁLIDO!</b>'
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        return false
    }

    // Valida CPF
    cpf = cpf.replace("-", "")
    cpf = cpf.replace(/\./g, '')

    // Verificar o formato do celular
    var celularRegex = /^[0-9]{11}$/;
    celular = celular.replace("(", "").replace(")", "").replace("-", "")
    if (!celularRegex.test(celular)) {
        var modal = document.querySelector('.modalSenhaIncorreta');
        var modalH = document.querySelector('.modalSenhaIncorreta h5');
        modalH.innerHTML = '<b>POR FAVOR, DIGITE UM NÚMERO DE CELULAR VÁLIDO (APENAS NÚMEROS)!</b>'
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        return false;
    }

    // Valida Username

    if (username.length > 20) {
        var modal = document.querySelector('.modalSenhaIncorreta');
        var modalH = document.querySelector('.modalSenhaIncorreta h5');
        modalH.innerHTML = '<b>NOME DE USUÁRIO MUITO GRANDE, POR FAVOR, ESCOLHA OUTRO!</b>'
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        return false
    }

    // Valida Nome
    if (nomeCompleto > 60) {
        var modal = document.querySelector('.modalSenhaIncorreta');
        var modalH = document.querySelector('.modalSenhaIncorreta h5');
        modalH.innerHTML = '<b>NOME MUITO GRANDE, POR FAVOR, RETIRE NOMES COMPOSTOS!</b>'
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        return false
    }

    if (sexoUsuario === "masculino") {
        sexoUsuario = "m"
    }
    else if (sexoUsuario === "feminino") {
        sexoUsuario = "f"
    }
    else if (sexoUsuario === "naoInformado") {
        sexoUsuario = "n"
    }

    fetch('https://reyouseback.azurewebsites.net/verifica-email/' + email)
        .then(response => response.text())
        .then(data => {
            if (!(data === "Email disponível")) {
                var modal = document.querySelector('.modalSenhaIncorreta');
                var modalH = document.querySelector('.modalSenhaIncorreta h5');
                modalH.innerHTML = '<b>E-MAIL INDISPONÍVEL, POR FAVOR, INSIRA OUTRO!</b>'
                var modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();
                return false;
            }
            fetch('https://reyouseback.azurewebsites.net/valida-cpf/' + cpf)
                .then(response => response.text())
                .then(data => {
                    if (!(data === "CPF válido")) {
                        var modal = document.querySelector('.modalSenhaIncorreta');
                        var modalH = document.querySelector('.modalSenhaIncorreta h5');
                        modalH.innerHTML = '<b>CPF INVÁLIDO, POR FAVOR, CONFIRA E INSIRA NOVAMENTE!</b>'
                        var modalInstance = new bootstrap.Modal(modal);
                        modalInstance.show();
                        return false;
                    }
                    fetch('https://reyouseback.azurewebsites.net/verifica-cpf/' + cpf)
                        .then(response => response.text())
                        .then(data => {
                            if (!(data === "CPF disponível")) {
                                var modal = document.querySelector('.modalSenhaIncorreta');
                                var modalH = document.querySelector('.modalSenhaIncorreta h5');
                                modalH.innerHTML = '<b>CPF INDISPONÍVEL, POR FAVOR, INSIRA OUTRO!</b>'
                                var modalInstance = new bootstrap.Modal(modal);
                                modalInstance.show();
                                return false;
                            }
                            fetch('https://reyouseback.azurewebsites.net/verifica-username/' + username)
                                .then(response => response.text())
                                .then(data => {
                                    console.log(data);
                                    if (!(data === "Nome de usuário disponível")) {
                                        var modal = document.querySelector('.modalSenhaIncorreta');
                                        var modalH = document.querySelector('.modalSenhaIncorreta h5');
                                        modalH.innerHTML = '<b>NOME DE USUÁRIO INDISPONÍVEL, POR FAVOR, INSIRA OUTRO!</b>'
                                        var modalInstance = new bootstrap.Modal(modal);
                                        modalInstance.show();
                                        return false;
                                    }
                                    fetch(`https://reyouseback.azurewebsites.net/cadastro/${username}/${email}/${senha}/${nomeCompleto}/${cpf}/${celular}/${sexoUsuario}`)
                                        .then(response => response.text())
                                        .then(data => {
                                            if (data === `Usuário ${username} cadastrado com sucesso.`) {
                                                var modal = document.querySelector('.modalSenhaIncorreta');
                                                var modalH = document.querySelector('.modalSenhaIncorreta h5');
                                                modalH.innerHTML = '<b>USUÁRIO CRIADO COM SUCESSO</b>';
                                                var modalInstance = new bootstrap.Modal(modal);
                                                modalInstance.show();

                                                var btnOK = document.getElementById('postConfirms');
                                                btnOK.addEventListener('click', function () {
                                                    window.location.href = '../HTML/telaAutenticacao.html';
                                                });

                                            }
                                            else {
                                                alert(data)
                                            }
                                        })
                                        .catch(error => {
                                            console.log('Ocorreu um erro:', error);
                                        });

                                })
                                .catch(error => {
                                    console.log('Ocorreu um erro:', error);
                                    return false;
                                });
                        })
                        .catch(error => {
                            console.log('Ocorreu um erro:', error);
                            return false;
                        });
                })
                .catch(error => {
                    alert(error);
                    console.log('Ocorreu um erro:', error);
                    return false;
                });
        })
        .catch(error => {
            console.log('Ocorreu um erro:', error);
            return false;
        });

    return false
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}