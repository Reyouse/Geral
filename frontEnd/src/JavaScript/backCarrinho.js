const idPerfil = localStorage.getItem('idPerfil');
var valorTotal = 0
var produtos = []

function createShoppingItem() {
    // Cria os elementos HTML
    var divItem = document.createElement("div");
    divItem.setAttribute("id", "itemCarrinho");
    divItem.setAttribute("class", "card mb-3");

    var divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    var divFlex = document.createElement("div");
    divFlex.setAttribute("class", "d-flex justify-content-between");

    var divLeft = document.createElement("div");
    divLeft.setAttribute("class", "d-flex flex-row align-items-center");

    var divImage = document.createElement("div");
    divImage.setAttribute("class", "justify-content-between align-items-start");

    var imgBanner = document.createElement("img");
    imgBanner.setAttribute("id", "bannerJogo");
    imgBanner.setAttribute("src", "../imgs/residentEvilCatalogo.jpg");
    imgBanner.setAttribute("class", "img-fluid rounded-3");
    imgBanner.setAttribute("alt", "Shopping item");

    var divContent = document.createElement("div");
    divContent.setAttribute("id", "conteudoJogo");
    divContent.setAttribute("class", "ms-3");

    var h5Title = document.createElement("h5");
    h5Title.innerText = "Resident Evil 4: Remake";

    var pPhysical = document.createElement("p");
    pPhysical.setAttribute("class", "small mb-0");
    pPhysical.innerText = "Físico";

    divContent.appendChild(h5Title);
    divContent.appendChild(pPhysical);

    divImage.appendChild(imgBanner);

    divLeft.appendChild(divImage);
    divLeft.appendChild(divContent);

    var divRight = document.createElement("div");
    divRight.setAttribute("class", "d-flex flex-row align-items-center");

    var divValue = document.createElement("div");
    divValue.setAttribute("id", "valorProduto");
    divValue.setAttribute("style", "width: 120px;");

    var h5Value = document.createElement("h5");
    h5Value.setAttribute("class", "mb-0");
    h5Value.innerText = "R$ 50,00";

    var aTrash = document.createElement("a");
    aTrash.setAttribute("href", "#!");
    aTrash.setAttribute("style", "color: #1B2838;");
    aTrash.setAttribute("id", "lixo")
    aTrash.addEventListener("click", function () {
        remover(aTrash.getAttribute("id"));
    });

    var iTrash = document.createElement("i");
    iTrash.setAttribute("class", "fas fa-trash-alt");

    aTrash.appendChild(iTrash);

    divValue.appendChild(h5Value);

    divRight.appendChild(divValue);
    divRight.appendChild(aTrash);

    divFlex.appendChild(divLeft);
    divFlex.appendChild(divRight);

    divCardBody.appendChild(divFlex);

    divItem.appendChild(divCardBody);

    return divItem;
}

function carregar() {
    fetch(`https://reyouseback.azurewebsites.net/vercarrinho/${idPerfil}`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                var item = createShoppingItem();
                var divParent = document.querySelector(".col-lg-7");
                divParent.appendChild(item);
                produtos.push(data[i].idAnuncio)
            }

            const imgCard = document.querySelectorAll("#bannerJogo")
            const titCard = document.querySelectorAll("#conteudoJogo h5");
            const preCard = document.querySelectorAll("#valorProduto h5")
            const tipCard = document.querySelectorAll("#conteudoJogo p");
            const lixCard = document.querySelectorAll("#lixo");

            titCard.forEach((title, index) => {
                if (data[index]) {
                    title.textContent = data[index].titulo;

                    return fetch('https://reyouseback.azurewebsites.net/plataformasdojogo/' + data[index].idAnuncio)
                        .then(resposta => resposta.json())
                        .then(date => {
                            var aux = 0
                            date.forEach(item => {
                                var divPai = document.querySelectorAll('#conteudoJogo')[index];
                                if (item.nome === "Xbox") {
                                    if (aux > 0) {
                                        createXboxElement2(divPai)
                                    }
                                    createXboxElement(divPai);

                                } else if (item.nome === "PC") {
                                    if (aux > 0) {
                                        createXboxElement2(divPai)
                                    }
                                    createPCElement(divPai);

                                } else if (item.nome === "Playstation") {
                                    if (aux > 0) {
                                        createXboxElement2(divPai)
                                    }
                                    createPlayElement(divPai);
                                }
                                aux++
                            });
                        });

                }
            });

            imgCard.forEach((imagem, index) => {
                if (data[index]) {
                    imagem.src = data[index].capa;
                }
            });

            preCard.forEach((preco, index) => {
                if (data[index]) {
                    const precoFormatado = "R$ " + data[index].preco.toFixed(2).toString();
                    preco.textContent = precoFormatado;
                    valorTotal += data[index].preco

                }
            });

            tipCard.forEach((tipo, index) => {
                if (data[index]) {
                    return fetch('https://reyouseback.azurewebsites.net/anuncio/' + data[index].idAnuncio)
                        .then(resposta => resposta.json())
                        .then(datas => {
                            if (datas[0] && datas[0].tipo) {
                                if (datas[0].tipo == 'Fisica') {
                                    tipo.innerText = 'Física';
                                } else if (datas[0].tipo == 'Virtual') {
                                    tipo.innerText = 'Digital';
                                }
                            }
                        });
                }
            });

            lixCard.forEach((lixo, index) => {
                if (data[index]) {
                    lixo.id = data[index].idAnuncio;
                }
            })

            var totalCompraElement = document.querySelector('#totalCompra p:nth-of-type(2)');
            totalCompraElement.textContent = "R$ " + valorTotal.toFixed(2).toString()
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

function createPCElement(parentDiv) {
    var div = document.createElement('div');
    div.setAttribute('id', 'PC');
    div.className = 'game-card_cardIconWrapper__382_2 mr-10';

    var innerDiv = document.createElement('div');
    innerDiv.className = 'd-inline-flex justify-content-center align-items-center';
    innerDiv.setAttribute('style', 'width: 20px; height: 5px;');

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('fill', '#7E838A');
    svg.setAttribute('viewBox', '0 0 24 24');

    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'm9.84 12.663v9.39l-9.84-1.356v-8.034zm0-10.72v9.505h-9.84v-8.145zm14.16 10.72v11.337l-13.082-1.803v-9.534zm0-12.663v11.452h-13.082v-9.649z');

    svg.appendChild(path);

    innerDiv.appendChild(svg);

    div.appendChild(innerDiv);

    parentDiv.appendChild(div);
}

function createXboxElement(divPai) {
    var divFilha = document.createElement('div');
    divFilha.className = 'game-card_cardIconWrapper__382_2 mr-10';

    var divInterna1 = document.createElement('div');
    divInterna1.className = 'd-inline-flex justify-content-center align-items-center';
    divInterna1.style.width = '18px';
    divInterna1.style.height = '9px';

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '40');
    svg.setAttribute('height', '40');
    svg.setAttribute('fill', '#7E838A');
    svg.setAttribute('viewBox', '0 0 32 32');
    svg.setAttribute('version', '1.1');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('stroke', '#7E838A');

    var g1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g1.setAttribute('id', 'SVGRepo_bgCarrier');
    g1.setAttribute('stroke-width', '0');

    var g2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g2.setAttribute('id', 'SVGRepo_tracerCarrier');
    g2.setAttribute('stroke-linecap', 'round');
    g2.setAttribute('stroke-linejoin', 'round');

    var g3 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g3.setAttribute('id', 'SVGRepo_iconCarrier');

    var title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = 'xbox';

    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M16 5.425c-1.888-1.125-4.106-1.922-6.473-2.249l-0.092-0.010c-0.070-0.005-0.152-0.008-0.234-0.008-0.613 0-1.188 0.16-1.687 0.441l0.017-0.009c2.357-1.634 5.277-2.61 8.426-2.61 0.008 0 0.016 0 0.024 0h0.019c0.005 0 0.011 0 0.018 0 3.157 0 6.086 0.976 8.501 2.642l-0.050-0.033c-0.478-0.272-1.051-0.433-1.662-0.433-0.085 0-0.169 0.003-0.252 0.009l0.011-0.001c-2.459 0.336-4.677 1.13-6.648 2.297l0.082-0.045zM5.554 5.268c-0.041 0.014-0.077 0.032-0.11 0.054l0.002-0.001c-2.758 2.723-4.466 6.504-4.466 10.684 0 3.584 1.256 6.875 3.353 9.457l-0.022-0.028c-1.754-3.261 4.48-12.455 7.61-16.159-3.53-3.521-5.277-4.062-6.015-4.062-0.010-0-0.021-0.001-0.032-0.001-0.115 0-0.225 0.021-0.326 0.060l0.006-0.002zM20.083 9.275c3.129 3.706 9.367 12.908 7.605 16.161 2.075-2.554 3.332-5.845 3.332-9.43 0-4.181-1.709-7.962-4.467-10.684l-0.002-0.002c-0.029-0.021-0.063-0.039-0.1-0.052l-0.003-0.001c-0.1-0.036-0.216-0.056-0.336-0.056-0.005 0-0.011 0-0.016 0h0.001c-0.741-0-2.485 0.543-6.014 4.063zM6.114 27.306c2.627 2.306 6.093 3.714 9.888 3.714s7.261-1.407 9.905-3.728l-0.017 0.015c2.349-2.393-5.402-10.901-9.89-14.29-4.483 3.39-12.24 11.897-9.886 14.29z');

    g3.appendChild(title);
    g3.appendChild(path);
    svg.appendChild(g1);
    svg.appendChild(g2);
    svg.appendChild(g3);

    divInterna1.appendChild(svg);
    divFilha.appendChild(divInterna1);

    divPai.appendChild(divFilha);
}

function createXboxElement2(divPai) {
    var divFilha = document.createElement('div');
    divFilha.className = 'game-card_cardIconWrapper__382_2 mr-10';

    var divInterna1 = document.createElement('div');
    divInterna1.className = 'd-inline-flex justify-content-center align-items-center';
    divInterna1.style.width = '18px';
    divInterna1.style.height = '9px';

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '40');
    svg.setAttribute('height', '40');
    svg.setAttribute('fill', '#7E838A');
    svg.setAttribute('viewBox', '0 0 32 32');
    svg.setAttribute('version', '1.1');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('stroke', '#7E838A');

    var g1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g1.setAttribute('id', 'SVGRepo_bgCarrier');
    g1.setAttribute('stroke-width', '0');

    var g2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g2.setAttribute('id', 'SVGRepo_tracerCarrier');
    g2.setAttribute('stroke-linecap', 'round');
    g2.setAttribute('stroke-linejoin', 'round');

    var g3 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g3.setAttribute('id', 'SVGRepo_iconCarrier');

    var title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = 'xbox';

    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', '');

    g3.appendChild(title);
    g3.appendChild(path);
    svg.appendChild(g1);
    svg.appendChild(g2);
    svg.appendChild(g3);

    divInterna1.appendChild(svg);
    divFilha.appendChild(divInterna1);

    divPai.appendChild(divFilha);
}

function createPlayElement(divPai) {
    var divFilha = document.createElement('div');
    divFilha.className = 'game-card_cardIconWrapper__382_2 mr-10';

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "25");
    svg.setAttribute("height", "25");
    svg.setAttribute("fill", "#7E838A");
    svg.setAttribute("viewBox", "0 0 32 32");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M3.262 24.248c-2.374-0.681-2.767-2.084-1.69-2.899 0.776-0.51 1.668-0.954 2.612-1.288l0.087-0.027 7.017-2.516v2.89l-5.030 1.839c-0.881 0.339-1.031 0.79-0.299 1.032 0.365 0.093 0.783 0.147 1.214 0.147 0.615 0 1.204-0.109 1.749-0.308l-0.035 0.011 2.422-0.882v2.592c-0.15 0.037-0.32 0.055-0.487 0.091-0.775 0.136-1.667 0.214-2.577 0.214-1.778 0-3.486-0.298-5.078-0.846l0.11 0.033zM18.049 24.544l7.868-2.843c0.893-0.322 1.032-0.781 0.307-1.022-0.363-0.089-0.779-0.14-1.208-0.14-0.622 0-1.22 0.108-1.774 0.305l0.037-0.011-5.255 1.874v-2.983l0.3-0.106c1.050-0.349 2.284-0.62 3.557-0.761l0.083-0.008c0.468-0.050 1.010-0.078 1.559-0.078 1.877 0 3.677 0.331 5.343 0.939l-0.108-0.035c2.309 0.751 2.549 1.839 1.969 2.589-0.559 0.557-1.235 0.998-1.988 1.282l-0.039 0.013-10.677 3.883v-2.869zM12.231 4.248v21.927l4.892 1.576v-18.39c0-0.862 0.38-1.438 0.992-1.238 0.795 0.225 0.95 1.017 0.95 1.881v7.342c3.050 1.491 5.451-0.003 5.451-3.939 0-4.045-1.407-5.842-5.546-7.282-1.785-0.648-4.040-1.294-6.347-1.805l-0.389-0.072z");

    svg.appendChild(path);

    divFilha.appendChild(svg);

    divPai.appendChild(divFilha);
}

function remover(id) {
    fetch(`https://reyouseback.azurewebsites.net/removecarrinho/${idPerfil}/${id}`)
        .then(response => response.text())
        .then(data => {
            if (data == `Anuncio ${id} removido`) {
                window.location.reload()
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

function cartoes() {

    var botao = document.getElementById('btnSalvarFormaDePagamento');
    if (botao) {
        botao.addEventListener('click', function () {
            var titular = document.getElementById('typeName').value.trim();
            var numeroCartao = document.getElementById('typeText').value.trim();
            var validade = document.getElementById('typeExp').value.trim();
            var cvv = document.getElementById('typeTextCvc').value.trim();

            if (titular.length < 3) {
                alert('Erro no campo "Titular"');
                document.getElementById('typeName').focus();
                return;
            }

            if (numeroCartao.length !== 19) {
                alert('Erro no campo "Número do Cartão"');
                document.getElementById('typeText').focus();
                return;
            }

            if (validade.length !== 7) {
                alert('Erro no campo "Validade"');
                document.getElementById('typeExp').focus();
                return;
            }

            if (cvv.length !== 3) {
                alert('Erro no campo "CVV"');
                document.getElementById('typeTextCvc').focus();
                return;
            }

            numeroCartao = numeroCartao.replace(/\s/g, "");

            var partes = validade.split('/');
            var novoValor = partes[1] + '-' + partes[0] + '-01';

            var val = true

            fetch(`https://reyouseback.azurewebsites.net/formaspagamento/${idPerfil}`)
                .then(response => response.json())
                .then(data => {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].numeroCartao == numeroCartao) {
                            alert("Cartao já cadastrado!");
                            val = false
                            break
                        }
                    }
                    if (val == true) {
                        if (titular != '' && numeroCartao != '' && cvv != '' && validade != '') {
                            fetch(`https://reyouseback.azurewebsites.net/salvapagamento/${idPerfil}/${titular}/${numeroCartao}/${cvv}/${novoValor}`)
                                .then(response => response.text())
                                .then(data => {
                                    if (data == 'Cartão registrado com sucesso') {
                                        alert(data)
                                    }
                                    else {
                                        alert(data)
                                    }
                                })
                                .catch(error => {
                                    console.error('Ocorreu um erro:', error);
                                });
                        }
                    }
                })
                .catch(error => {
                    console.error('Ocorreu um erro:', error);
                });
        }
        )
    }
    fetch(`https://reyouseback.azurewebsites.net/formaspagamento/${idPerfil}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                adicionarOpcoesDropdown(data)
            }
            else {
                var div = document.querySelector('.dropdown');
                if (div) {
                    div.parentNode.removeChild(div);
                }
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

function campos() {

    var typeNameInput = document.getElementById('typeName');
    typeNameInput.addEventListener('input', function () {
        var value = typeNameInput.value;
        var formattedValue = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
        if (formattedValue.length > 80) {
            formattedValue = formattedValue.slice(0, 80);
        }
        typeNameInput.value = formattedValue;
    });


    var typeTextInput = document.getElementById('typeText');
    typeTextInput.addEventListener('input', function () {
        var value = typeTextInput.value;
        var formattedValue = value.replace(/\D/g, '');
        formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
        typeTextInput.value = formattedValue;
    });

    var typeExpInput = document.getElementById('typeExp');
    typeExpInput.addEventListener('input', function () {
        var value = typeExpInput.value;
        var formattedValue = value.replace(/\D/g, '');
        formattedValue = formattedValue.replace(/^(\d{2})(\d{1,2})/, function (match, p1, p2) {
            if (p1 === '00') {
                p1 = '01';
            } else if (p1 > 12) {
                p1 = '12';
            } else if (p1.length === 1) {
                p1 = '0' + p1;
            }
            return p1 + '/' + p2;
        });
        var lastCharacter = value[value.length - 1];
        if (lastCharacter && lastCharacter !== '/' && value.length >= 7) {
            var yearDigits = formattedValue.substr(3);
            var year = parseInt(yearDigits);
            if (year < 2023) {
                formattedValue = formattedValue.substr(0, 3) + '2023';
            }
        }
        typeExpInput.value = formattedValue;
    });

    const cvvInput = document.getElementById("typeTextCvc");
    cvvInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
    });
}

function adicionarOpcoesDropdown(data) {
    var dropdownMenu = document.querySelector('#dropdowns');

    dropdownMenu.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
        // Cria o elemento li
        var li = document.createElement('li');

        var a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.href = '#';
        (function (index) {
            a.onclick = function () {
                selecionarCartao(index, data);
            };
        })(i);

        var icon = document.createElement('i');
        if (data[i].numeroCartao[0] == 5) {
            icon.classList.add('fab', 'fa-cc-mastercard', 'fa-1x', 'me-2');
        }
        else if (data[i].numeroCartao[0] == 3) {
            icon.classList.add('fab', 'fa-cc-amex', 'fa-1x', 'me-2');
        }
        else if (data[i].numeroCartao[0] == 4) {
            icon.classList.add('fab', 'fa-cc-visa', 'fa-1x', 'me-2');
        }
        else if (data[i].numeroCartao[0] == 6) {
            icon.classList.add('fab', 'fa-cc-discover', 'fa-1x', 'me-2');
        }

        var texto = document.createTextNode('Cartão ' + (i + 1));

        a.appendChild(icon);
        a.appendChild(texto);

        li.appendChild(a);

        dropdownMenu.appendChild(li);
    }
}

function selecionarCartao(index, data) {
    document.getElementById('typeName').value = data[index].nomeCartao
    document.getElementById('typeText').value = data[index].numeroCartao.replace(/(\d{4})/g, '$1 ').trim()
    var validade = data[index].validade;
    var partes = validade.split('-');
    var mes = partes[1];
    var ano = partes[0];

    var formatoValidade = mes + '/' + ano;
    document.getElementById('typeExp').value = formatoValidade;

    document.getElementById('typeTextCvc').value = data[index].cvv
}

document.getElementById('btnFinalizarCompra').addEventListener('click', function () {
    var titular = document.getElementById('typeName').value.trim();
    var numero = document.getElementById('typeText').value.trim();
    var validade = document.getElementById('typeExp').value.trim();
    var cvv = document.getElementById('typeTextCvc').value.trim();

    if (titular.length < 4 || numero.length < 19 || validade.length < 7 || cvv.length < 3) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    suaFuncaoDePagamento();
});

function suaFuncaoDePagamento() {
    var data = new Date();

    var dia = data.getDate();
    var mes = data.getMonth() + 1; // Os meses começam a partir de zero, então somamos 1
    var ano = data.getFullYear();

    for (var i = 0; i < produtos.length; i++) {
        remover(produtos[i])
        fetch(`https://reyouseback.azurewebsites.net/compra/${produtos[i]}/${ano}-${mes}-${dia}/${idPerfil}`)
            .then(response => response.text())
            .then(data => {
                if (data = 'Compra finalizada com sucesso') {
                    console.log(data);
                    alert("Compra Bem Sucedida!")
                    var divs = document.querySelectorAll('div[id="itemCarrinho"]');
                    for (var i = 0; i < divs.length; i++) {
                        divs[i].parentNode.removeChild(divs[i]);
                    }
                }
                else {
                    alert('ERROR')
                }
            })
            .catch(error => {
                console.error('Ocorreu um erro:', error);
            });
    }
}

campos()
cartoes()
carregar()