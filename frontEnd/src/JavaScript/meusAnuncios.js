function criarDiv() {

    fetch(`https://reyouseback.azurewebsites.net/historicovenda/${idPerfil}`)
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
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

                // Criação da data de anúncio p
                var date = document.createElement("p");
                date.className = "mb-0";
                date.textContent = `Data de anúncio: ${dataFormatada}`;

                // Adicionando os elementos na hierarquia correta
                divStart.appendChild(img);
                divContent.appendChild(title);
                divContent.appendChild(mediaType);
                divContent.appendChild(date);
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

                if (data[i].entregue == 'nao') {
                    // Criação do botão de edição
                    var editButton = document.createElement("button");
                    editButton.className = "btn btn-link";
                    editButton.onclick = function () {
                        showContainer("editar-anuncio-fisico");
                    };

                    // Criação do ícone de lápis
                    var editIcon = document.createElement("i");
                    editIcon.style.color = "#f7f7f7";
                    editIcon.className = "fas fa-pencil-alt";

                    // Adicionando os elementos na hierarquia correta
                    divPrice.appendChild(price);
                    editButton.appendChild(editIcon);
                    divRight.appendChild(divPrice);
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
                if (data[i].entregue == 'nao') {
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

                    // Criação do segundo path do ícone de lixeira
                    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path2.setAttribute("d", "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z");

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
        })
        .catch(error => {
            alert('ERROR')
            console.error('Ocorreu um erro:', error);
        });



}

criarDiv();
