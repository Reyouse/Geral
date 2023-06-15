function vendaFisica() {
    function botaoHabilitarF() {
        const form = document.querySelector('#formF');
        const inputs = form.querySelectorAll('input');
        const radios = form.querySelectorAll('input[type="radio"]');
        const btnDados = form.querySelector('#btnDados');

        function submitForm(event) {
            event.preventDefault();

            var nomeJogo = document.getElementById("nome_jogoF").value.trim()
            var preco = document.getElementById("precoF").value.trim()
            var plataformaSelecionada = document.querySelector('input[name="plataforma_jogoF"]:checked').value.trim()
            var conservacaoSelecionada = document.querySelector('input[name="estado_conservacao"]:checked').value.trim()
            if (nomeJogo != '') {
                publicarF(nomeJogo, preco, plataformaSelecionada, conservacaoSelecionada)
            }
            else {
                var modal = document.querySelector('.modalSenhaIncorreta');
                var modalH = document.querySelector('.modalSenhaIncorreta h5');
                modalH.innerHTML = '<b>NOME DE JOGO INVALIDO!</b>';
                var modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();
            }
        }

        function checkFormValidity() {
            let allFilled = true;
            let allChecked = true;

            inputs.forEach(input => {
                if (input.type !== 'radio' && input.value === '') {
                    allFilled = false;
                }
            });

            radios.forEach(radio => {
                const radioGroupName = radio.getAttribute('name');
                const checked = form.querySelector(`input[name="${radioGroupName}"]:checked`);

                if (!checked) {
                    allChecked = false;
                }
            });

            if (allFilled && allChecked) {
                btnDados.removeAttribute('disabled');
            } else {
                btnDados.setAttribute('disabled', true);
            }
        }

        inputs.forEach(input => {
            input.addEventListener('input', checkFormValidity);
        });

        radios.forEach(radio => {
            radio.addEventListener('change', checkFormValidity);
        });

        btnDados.addEventListener('click', submitForm);
    }

    $(document).ready(function () {
        $("#nome_jogoF").autocomplete({
            source: function (request, response) {
                var searchTerm = encodeURIComponent(request.term);

                var url = "https://reyouseback.azurewebsites.net/pesquisaigdb/" + searchTerm;

                $(".spinner-border").removeClass("d-none");
                $("#naoAchouF").addClass("d-none");

                if (searchTerm === "") {
                    $("#naoAchouF").removeClass("d-none");
                    $(".spinner-border").addClass("d-none");
                    return;
                }

                $.ajax({
                    url: url,
                    dataType: "json",
                    success: function (data) {
                        $(".spinner-border").addClass("d-none");

                        if (data.length === 0) {
                            $("#naoAchouF").removeClass("d-none");
                        } else {
                            $("#naoAchouF").addClass("d-none");
                            var options = data.map(function (item) {
                                return item.nome;
                            });

                            response(options);
                        }
                    },
                    error: function () {
                        $(".spinner-border").addClass("d-none");
                        $("#naoAchouF").removeClass("d-none");
                    }
                });
            }
        });
    });

    function validarPrecoF() {
        const inputPreco = document.getElementById("precoF");

        inputPreco.addEventListener("input", function (e) {
            const inputValue = e.target.value.replace(/[^\d]/g, "");

            let numericValue = Number(inputValue);
            if (isNaN(numericValue)) {
                numericValue = 0;
            }

            const maxValue = 9999999999999.99;
            numericValue = Math.min(numericValue, maxValue);

            numericValue /= 100;

            const formattedValue = numericValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

            e.target.value = formattedValue;
        });
    }

    function publicarF(nome, preco, plataforma, conservacao) {

        if (plataforma == 'XBOX') {
            plataforma = 'Xbox'
        }
        else if (plataforma == 'PlayStation') {
            plataforma = 'Playstation'
        }

        if (conservacao == 'excelente') {
            conservacao = 'Excelente'
        }
        else if (conservacao == 'muito_bom') {
            conservacao = 'Muito Bom'
        }
        else if (conservacao == 'bom') {
            conservacao = 'Bom'
        }
        else if (conservacao == 'regular') {
            conservacao = 'Regular'
        }

        preco = preco.replace(',', '.');
        preco = preco.replace('R$', ''); // Remove the currency symbol
        preco = decodeURIComponent(preco.replace(/%C2%A0/g, ''));
        var numericValue = parseFloat(preco);

        fetch(`https://reyouseback.azurewebsites.net/pesquisaigdb/${nome}`)
            .then(response => response.json())
            .then(data => {
                if (data[0]) {
                    var nomeDoJogo = nome
                    var valid = false
                    var j = 0
                    for (var i = 0; i < data.length; i++) {
                        if (nomeDoJogo == data[i].nome) {
                            j = i
                            valid = true;
                            break
                        }
                    }
                    if (valid) {
                        var descricao = data[j].descricao;

                        var banner = "NULL"
                        if (JSON.stringify(data[j].banner) != '{}' && (JSON.stringify(data[j].banner) != '{ }')) {
                            banner = data[j].banner
                        }
                        var imagemCapa = "//i.imgur.com/YavjSRr.jpg"
                        if (JSON.stringify(data[j].capa) != '{}' && (JSON.stringify(data[j].capa) != '{ }')) {
                            imagemCapa = data[j].capa
                        }

                        var print = data[j].screenshots;
                        var stringPrint = print.join(',');
                        stringPrint = stringPrint

                        localStorage.setItem('nomeDoJogo', nomeDoJogo);
                        localStorage.setItem('nomeDaPlataforma', plataforma)
                        localStorage.setItem('descricao', descricao);
                        localStorage.setItem('capa', imagemCapa)
                        localStorage.setItem('banner', banner)
                        localStorage.setItem('prints', stringPrint)
                        localStorage.setItem('preco', numericValue)
                        localStorage.setItem('estado', conservacao)
                        window.location.href = '../HTML/anuncioFinal.html';
                    }
                    else {
                        var modal = document.querySelector('.modalSenhaIncorreta');
                        var modalH = document.querySelector('.modalSenhaIncorreta h5');
                        modalH.innerHTML = '<b>NOME DE JOGO INVALIDO!</b>';
                        var modalInstance = new bootstrap.Modal(modal);
                        modalInstance.show();
                    }
                }
                else {
                    var modal = document.querySelector('.modalSenhaIncorreta');
                    var modalH = document.querySelector('.modalSenhaIncorreta h5');
                    modalH.innerHTML = '<b>NOME DE JOGO INVALIDO!</b>';
                    var modalInstance = new bootstrap.Modal(modal);
                    modalInstance.show();
                }
            })
            .catch(error => {
                console.error('Ocorreu um erro:', error);
            });
    }

    botaoHabilitarF()
    validarPrecoF()
}

function vendaDigital() {
    $(document).ready(function () {
        $("#nome_jogoD").autocomplete({
            source: function (request, response) {
                var searchTerm = encodeURIComponent(request.term);

                var url = "https://reyouseback.azurewebsites.net/pesquisaigdb/" + searchTerm;

                $(".spinner-border").removeClass("d-none");
                $("#naoAchouD").addClass("d-none");

                if (searchTerm === "") {
                    $("#naoAchouD").removeClass("d-none");
                    $(".spinner-border").addClass("d-none");
                    return;
                }

                $.ajax({
                    url: url,
                    dataType: "json",
                    success: function (data) {
                        $(".spinner-border").addClass("d-none");

                        if (data.length === 0) {
                            $("#naoAchouD").removeClass("d-none");
                        } else {
                            $("#naoAchouD").addClass("d-none");
                            var options = data.map(function (item) {
                                return item.nome;
                            });

                            response(options);
                        }
                    },
                    error: function () {
                        $(".spinner-border").addClass("d-none");
                        $("#naoAchouD").removeClass("d-none");
                    }
                });
            }
        });
    });

    function validarPrecoD() {
        const inputPreco = document.getElementById("precoD");

        inputPreco.addEventListener("input", function (e) {
            const inputValue = e.target.value.replace(/[^\d]/g, "");

            let numericValue = Number(inputValue);
            if (isNaN(numericValue)) {
                numericValue = 0;
            }

            const maxValue = 9999999999999.99;
            numericValue = Math.min(numericValue, maxValue);

            numericValue /= 100;

            const formattedValue = numericValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

            e.target.value = formattedValue;
        });
    }

    function botaoHabilitarD() {
        const form = document.querySelector('#formD');
        const inputs = form.querySelectorAll('input');
        const radios = form.querySelectorAll('input[type="radio"]');
        const btnDados2 = form.querySelector('#btnDados2');

        function submitForm(event) {
            event.preventDefault();

            var nomeJogo = document.getElementById("nome_jogoD").value.trim();
            var preco = document.getElementById("precoD").value.trim();
            var plataformaSelecionada = document.querySelector('input[name="plataforma_jogoD"]:checked').value.trim();
            var email = document.getElementById("email").value.trim();
            var senha = document.getElementById("senha").value.trim();

            if (nomeJogo !== '' && email !== '' && senha !== '') {
                var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                if (emailRegex.test(email)) {
                    publicarD(nomeJogo, preco, plataformaSelecionada, email, senha);
                } else {
                    var modal = document.querySelector('.modalSenhaIncorreta');
                    var modalH = document.querySelector('.modalSenhaIncorreta h5');
                    modalH.innerHTML = '<b>O E-MAIL É INVÁLIDO!</b>';
                    var modalInstance = new bootstrap.Modal(modal);
                    modalInstance.show();
                }
            } else {
                var modal = document.querySelector('.modalSenhaIncorreta');
                var modalH = document.querySelector('.modalSenhaIncorreta h5');
                modalH.innerHTML = '<b>PREENCHA TODOS OS CAMPOS OBRIGATÓRIOS!</b>';
                var modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();
            }
        }

        function checkFormValidity() {
            let allFilled = true;
            let allChecked = true;

            inputs.forEach(input => {
                if (input.type !== 'radio' && input.value === '') {
                    allFilled = false;
                }
            });

            radios.forEach(radio => {
                const radioGroupName = radio.getAttribute('name');
                const checked = form.querySelector(`input[name="${radioGroupName}"]:checked`);

                if (!checked) {
                    allChecked = false;
                }
            });

            if (allFilled && allChecked) {
                btnDados2.removeAttribute('disabled');
            } else {
                btnDados2.setAttribute('disabled', true);
            }
        }

        inputs.forEach(input => {
            input.addEventListener('input', checkFormValidity);
        });

        radios.forEach(radio => {
            radio.addEventListener('change', checkFormValidity);
        });

        btnDados2.addEventListener('click', submitForm);
    }

    function publicarD(nome, preco, plataforma, email, senha) {

        if (plataforma == 'XBOX') {
            plataforma = 'Xbox'
        }
        else if (plataforma == 'PlayStation') {
            plataforma = 'Playstation'
        }

        preco = preco.replace(',', '.');
        preco = preco.replace('R$', ''); // Remove the currency symbol
        preco = decodeURIComponent(preco.replace(/%C2%A0/g, ''));
        var numericValue = parseFloat(preco);

        fetch(`https://reyouseback.azurewebsites.net/pesquisaigdb/${nome}`)
            .then(response => response.json())
            .then(data => {
                if (data[0]) {
                    var nomeDoJogo = nome
                    var valid = false
                    var j = 0
                    for (var i = 0; i < data.length; i++) {
                        if (nomeDoJogo == data[i].nome) {
                            j = i
                            valid = true;
                            break
                        }
                    }
                    if (valid) {
                        var descricao = data[j].descricao;

                        var banner = "NULL"
                        if (JSON.stringify(data[j].banner) != '{}' && (JSON.stringify(data[j].banner) != '{ }')) {
                            banner = data[j].banner
                        }
                        var imagemCapa = "//i.imgur.com/YavjSRr.jpg"
                        if (JSON.stringify(data[j].capa) != '{}' && (JSON.stringify(data[j].capa) != '{ }')) {
                            imagemCapa = data[j].capa
                        }

                        var print = data[j].screenshots;
                        var stringPrint = print.join(',');
                        stringPrint = stringPrint

                        localStorage.setItem('nomeDoJogo', nomeDoJogo);
                        localStorage.setItem('nomeDaPlataforma', plataforma)
                        localStorage.setItem('descricao', descricao);
                        localStorage.setItem('capa', imagemCapa)
                        localStorage.setItem('banner', banner)
                        localStorage.setItem('prints', stringPrint)
                        localStorage.setItem('preco', numericValue)
                        localStorage.setItem('acesso', `${email} - ${senha}`)
                        window.location.href = '../HTML/anuncioFinal.html';
                    }
                    else {
                        var modal = document.querySelector('.modalSenhaIncorreta');
                        var modalH = document.querySelector('.modalSenhaIncorreta h5');
                        modalH.innerHTML = '<b>NOME DE JOGO INVALIDO!</b>';
                        var modalInstance = new bootstrap.Modal(modal);
                        modalInstance.show();
                    }
                }
                else {
                    var modal = document.querySelector('.modalSenhaIncorreta');
                    var modalH = document.querySelector('.modalSenhaIncorreta h5');
                    modalH.innerHTML = '<b>NOME DE JOGO INVALIDO!</b>';
                    var modalInstance = new bootstrap.Modal(modal);
                    modalInstance.show();
                }
            })
            .catch(error => {
                console.error('Ocorreu um erro:', error);
            });
    }
    botaoHabilitarD()
    validarPrecoD()
}

vendaDigital()
vendaFisica()