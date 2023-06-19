function criarDiv() {

    var jogos = []
    fetch(`https://reyouseback.azurewebsites.net/historicovenda/${idPerfil}`)
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                jogos.push(data[i].idAnuncio)
                var dataObj = new Date(data[i].dataCompra);
                var dia = dataObj.getDate() + 1
                var mes = dataObj.getMonth() + 1; // Os meses são indexados de 0 a 11
                var ano = dataObj.getFullYear();
                if (dia < 10) {
                    dia = "0" + dia;
                }
                if (mes < 10) {
                    mes = "0" + mes;
                }
                var dataFormatada = dia + '/' + mes + '/' + ano;

                var preco = data[i].preco;
                var precoFormatado = parseFloat(preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                var divContainer = document.createElement("div");
                divContainer.id = "pedidosAnuncios";
                divContainer.className = "card mb-3";
                divContainer.setAttribute("name", data[i].idAnuncio);

                // Criação da div filha - card-body
                var divCardBody = document.createElement("div");
                divCardBody.className = "card-body";

                // Criação da div filha - d-flex justify-content-between
                var divFlexContainer = document.createElement("div");
                divFlexContainer.className = "d-flex justify-content-between";

                // Criação da div filha - d-flex flex-row align-items-center (parte esquerda)
                var divLeft = document.createElement("div");
                divLeft.className = "d-flex flex-row align-items-center";

                // Criação da div filha - justify-content-between align-items-start
                var divStart = document.createElement("div");
                divStart.className = "justify-content-between align-items-start";

                // Criação da imagem
                var img = document.createElement("img");
                img.id = "bannerJogo";
                img.src = data[i].capa;
                img.className = "img-fluid rounded-3";
                img.alt = "Shopping item";

                // Criação da div filha - conteudoPedido
                var divContent = document.createElement("div");
                divContent.id = "conteudoPedido";
                divContent.className = "ms-3";

                // Criação do título h5
                var title = document.createElement("h5");
                title.textContent = data[i].titulo

                // Criação do tipo de mídia p
                var mediaType = document.createElement("p");
                mediaType.className = "mb-0";
                mediaType.textContent = `Tipo de mídia: ${data[i].tipo}`;

                if (data[i].entregue == 'sim' && data[i].comprado == 'sim') {
                    // Criação da data de anúncio p
                    var date = document.createElement("p");
                    date.className = "mb-0";
                    date.textContent = `Data de Venda: ${dataFormatada}`;
                    
                    var contato = document.createElement("p");
                    contato.className = "mb-0"
                    contato.id = "cont" + data[i].idAnuncio
                    contato.textContent = ``

                    // Adicionando os elementos na hierarquia correta
                    divStart.appendChild(img);
                    divContent.appendChild(title);
                    divContent.appendChild(mediaType);
                    divContent.appendChild(date);
                }
                else {
                    var contato = document.createElement("p");
                    contato.className = "mb-0"
                    contato.id = "cont" + data[i].idAnuncio
                    contato.textContent = ``

                    // Adicionando os elementos na hierarquia correta
                    divStart.appendChild(img);
                    divContent.appendChild(title);
                    divContent.appendChild(mediaType);
                }

                divContent.appendChild(contato);
                divLeft.appendChild(divStart);
                divLeft.appendChild(divContent);
                divFlexContainer.appendChild(divLeft);

                // Criação da div filha - d-flex flex-row align-items-center (parte direita)
                var divRight = document.createElement("div");
                divRight.className = "d-flex flex-row align-items-center";

                // Criação da div filha - valorProduto
                var divPrice = document.createElement("div");
                divPrice.id = "valorProduto";
                divPrice.style.width = "120px";

                // Criação do preço h5
                var price = document.createElement("h5");
                price.className = "mb-0";
                price.textContent = `R$ ${precoFormatado}`;

                if (data[i].entregue == 'nao' && data[i].comprado == 'nao') {
                    // Criação do botão de edição
                    var editButton = document.createElement("button");
                    editButton.className = "btn btn-link";
                    editButton.id = data[i].idAnuncio;
                    editButton.setAttribute("name", data[i].tipo);
                    editButton.setAttribute("nameJ", data[i].titulo);
                    editButton.style.cursor = "pointer";

                    // Criação do ícone de lápis
                    var editIcon = document.createElement("i");
                    editIcon.style.color = "#f7f7f7";
                    editIcon.className = "fas fa-pencil-alt";
                    editIcon.id = data[i].idAnuncio;
                    editIcon.setAttribute("name", data[i].tipo);
                    editIcon.setAttribute("nameJ", data[i].titulo);

                    editIcon.addEventListener('click', alterar);

                    function alterar(event) {
                        var numID = event.target.id;
                        var tip = event.target.getAttribute("name");
                        var jog = event.target.getAttribute("nameJ");
                        if (numID != "") {
                            if (tip == 'Virtual') {
                                showContainer("editar-anuncio-digital");
                                mudarDigital(jog, numID, tip)
                            } else if (tip == 'Fisica') {
                                showContainer("editar-anuncio-fisico");
                                mudarFisica(jog, numID, tip)
                            }
                        }
                    }

                    divPrice.appendChild(price);
                    editButton.appendChild(editIcon);
                    divRight.appendChild(divPrice);

                    editButton.addEventListener('click', alterar);
                    divRight.appendChild(editButton);
                    divFlexContainer.appendChild(divRight);
                }
                else {
                    divPrice.appendChild(price);
                    divRight.appendChild(divPrice);
                    divFlexContainer.appendChild(divRight);
                }


                // Adicionando os elementos na hierarquia correta
                divCardBody.appendChild(divFlexContainer);
                divContainer.appendChild(divCardBody);
                if (data[i].entregue == 'nao' && data[i].comprado == 'nao') {
                    // Criação do ícone de lixeira
                    var trashIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    trashIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                    trashIcon.setAttribute("width", "28");
                    trashIcon.setAttribute("height", "28");
                    trashIcon.setAttribute("fill", "currentColor");
                    trashIcon.setAttribute("class", "bi bi-trash");
                    trashIcon.setAttribute("viewBox", "0 0 16 16");
                    trashIcon.style.cursor = "pointer";

                    // Criação do primeiro path do ícone de lixeira
                    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path1.setAttribute("d", "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z");
                    path1.id = data[i].idAnuncio
                    path1.addEventListener('click', excluir);
                    // Criação do segundo path do ícone de lixeira
                    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path2.setAttribute("d", "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z");
                    path2.id = data[i].idAnuncio
                    path2.addEventListener('click', excluir);

                    // Adicionando os paths no ícone de lixeira
                    trashIcon.appendChild(path1);
                    trashIcon.appendChild(path2);

                    trashIcon.id = data[i].idAnuncio
                    trashIcon.addEventListener('click', excluir);

                    function excluir(event) {
                        var numID = event.target.id;
                        if (numID != "") {

                            $('#exampleModal3').modal('show');

                            $('#postConfirmsss').click(function () {
                                fetch(`https://reyouseback.azurewebsites.net/excluianuncio/${numID}`)
                                    .then(response => response.text())
                                    .then(data => {
                                        if (data == "Anuncio excluido com sucesso!") {
                                            var divs = document.querySelectorAll(`div[name="${numID}"]`);
                                            divs.forEach(div => {
                                                div.parentNode.removeChild(div);
                                            });
                                        }
                                        else {
                                            alert("ERROR")
                                        }
                                    })
                                    .catch(error => {
                                        alert('ERROR')
                                        console.error('Ocorreu um erro:', error);
                                    });
                            });

                        }
                    }

                    // Adicionando o ícone de lixeira na div pai
                    divContainer.appendChild(trashIcon);
                }

                // Encontrando a div com id "my-adverts-container"
                var advertsContainer = document.getElementById("my-adverts-container");

                // Adicionando a div criada como última filha
                advertsContainer.appendChild(divContainer);
            }
            jogos.forEach((index) => {
                fetch(`https://reyouseback.azurewebsites.net/contatocomprador/${index}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data != "") {
                            var contatos = document.getElementById("cont" + index)
                            contatos.innerHTML = `E-mail: ${data[0].email} <br> Telefone: ${data[0].celular}`;
                            console.log(1)
                        }
                    })
                    .catch(error => {
                        alert('ERROR')
                        console.error('Ocorreu um erro:', error);
                    });
            });
        })
        .catch(error => {
            alert('ERROR')
            console.error('Ocorreu um erro:', error);
        });

}

function mudarDigital(nomeJogo, idJogo, tipoJogo) {

    function validarPrecoD() {
        const inputPreco = document.getElementById("precoDi");

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
        var forms = document.querySelector('#formDi');
        var inputss = forms.querySelectorAll('input');
        var radioss = forms.querySelectorAll('input[type="radio"]');
        var btnDados3 = forms.querySelector('#btnDados3');

        function submitForm(event) {
            event.preventDefault();

            var preco = document.getElementById("precoDi").value.trim();
            var plataformaSelecionada = document.querySelector('input[name="plataforma_jogoDi"]:checked').value.trim();
            var email = document.getElementById("emails").value.trim();
            var senha = document.getElementById("senhas").value.trim();

            if (email !== '' && senha !== '') {
                var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                if (emailRegex.test(email)) {
                    publicarD(preco, plataformaSelecionada, email, senha);
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

            inputss.forEach(input => {
                if (input.type !== 'radio' && input.value === '') {
                    allFilled = false;
                }
            });

            radioss.forEach(radio => {
                const radioGroupName = radio.getAttribute('name');
                const checked = forms.querySelector(`input[name="${radioGroupName}"]:checked`);

                if (!checked) {
                    allChecked = false;
                }
            });

            if (allFilled && allChecked) {
                btnDados3.removeAttribute('disabled');
            } else {
                btnDados3.setAttribute('disabled', true);
            }
        }

        inputss.forEach(input => {
            input.addEventListener('input', checkFormValidity);
        });

        radioss.forEach(radio => {
            radio.addEventListener('change', checkFormValidity);
        });

        btnDados3.addEventListener('click', submitForm);
    }

    function publicarD(preco, plataforma, email, senha) {
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

        fetch(`https://reyouseback.azurewebsites.net/pesquisaigdb/${nomeJogo}`)
            .then(response => response.json())
            .then(data => {
                if (data[0]) {
                    var nomeDoJogo = nomeJogo
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
                        localStorage.setItem('alterar', 'sim')
                        localStorage.setItem('idAlterar', idJogo)
                        localStorage.setItem('tipoJogo', tipoJogo)
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

function mudarFisica(nomeJogo, idJogo, tipoJogo) {

    function validarPrecoF() {
        const inputPreco = document.getElementById("precoFi");

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

    function botaoHabilitarF() {
        var forms = document.querySelector('#formFi');
        var inputss = forms.querySelectorAll('input');
        var radioss = forms.querySelectorAll('input[type="radio"]');
        var btnDados4 = forms.querySelector('#btnDados4');

        function submitForm(event) {
            event.preventDefault();

            var preco = document.getElementById("precoFi").value.trim()
            var plataformaSelecionada = document.querySelector('input[name="plataforma_jogoFi"]:checked').value.trim()
            var conservacaoSelecionada = document.querySelector('input[name="estado_conservacaos"]:checked').value.trim()
            if (nomeJogo != '') {
                publicarF(preco, plataformaSelecionada, conservacaoSelecionada)
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

            inputss.forEach(input => {
                if (input.type !== 'radio' && input.value === '') {
                    allFilled = false;
                }
            });

            radioss.forEach(radio => {
                const radioGroupName = radio.getAttribute('name');
                const checked = forms.querySelector(`input[name="${radioGroupName}"]:checked`);

                if (!checked) {
                    allChecked = false;
                }
            });

            if (allFilled && allChecked) {
                btnDados4.removeAttribute('disabled');
            } else {
                btnDados4.setAttribute('disabled', true);
            }
        }

        inputss.forEach(input => {
            input.addEventListener('input', checkFormValidity);
        });

        radioss.forEach(radio => {
            radio.addEventListener('change', checkFormValidity);
        });

        btnDados4.addEventListener('click', submitForm);
    }

    function publicarF(preco, plataforma, conservacao) {

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

        fetch(`https://reyouseback.azurewebsites.net/pesquisaigdb/${nomeJogo}`)
            .then(response => response.json())
            .then(data => {
                if (data[0]) {
                    var nomeDoJogo = nomeJogo
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
                        localStorage.setItem('alterar', 'sim')
                        localStorage.setItem('idAlterar', idJogo)
                        localStorage.setItem('tipoJogo', tipoJogo)
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

    validarPrecoF()
    botaoHabilitarF()
}

criarDiv();
