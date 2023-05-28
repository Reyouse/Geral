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
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    // Verificar se a senha e a confirmação de senha são iguais
    if (senha.length > 20) {
        alert("Senha muito grande, por favor, escolha outra")
        return false
    }

    if (senha !== confirmarSenha) {
        alert("A senha e a confirmação de senha não correspondem.");
        return false;
    }

    // Valida E-mail
    if (email.length > 45) {
        alert("E-mail muito grande, por favor, insira outro");
        return false
    }

    if (!validarEmail(email)) {
        alert("Por favor, digite um e-mail válido.");
        return false
    }

    // Valida CPF
    cpf = cpf.replace("-", "")
    cpf = cpf.replace(/\./g, '')

    // Verificar o formato do celular
    var celularRegex = /^[0-9]{11}$/;
    celular = celular.replace("(", "").replace(")", "").replace("-", "")
    if (!celularRegex.test(celular)) {
        alert("Por favor, digite um número de celular válido (apenas números).");
        return false;
    }

    // Valida Username

    if (username.length > 20) {
        alert("Nome de usuário muito grande, por favor, escolha outro")
        return false
    }

    // Valida Nome
    if (nomeCompleto > 60) {
        alert("Nome muito grande!")
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
                alert("Email indisponível");
                return false;
            }
            fetch('https://reyouseback.azurewebsites.net/valida-cpf/' + cpf)
            .then(response => response.text())
            .then(data => {
                if (!(data === "CPF válido")) {
                    alert("CPF inválido");
                    return false;
                }
                fetch('https://reyouseback.azurewebsites.net/verifica-cpf/' + cpf)
                .then(response => response.text())
                .then(data => {
                    if (!(data === "CPF disponível")) {
                        alert("CPF indisponível");
                        return false;
                    }
                    fetch('https://reyouseback.azurewebsites.net/verifica-username/' + username)
                    .then(response => response.text())
                    .then(data => {
                        console.log(data);
                        if (!(data === "Nome de usuário disponível")) {
                            alert(data);
                            return false;
                        }
                        fetch(`https://reyouseback.azurewebsites.net/cadastro/${username}/${email}/${senha}/${nomeCompleto}/${cpf}/${celular}/${sexoUsuario}`)
                        .then(response => response.text())
                        .then(data => {
                            if (data === `Usuário ${username} cadastrado com sucesso.`) {
                                window.location.href = '../HTML/telaAutenticacao.html';
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