function carregar() {
    var jogos = []
    var virtual = []
    fetch(`https://reyouseback.azurewebsites.net/historicocompra/${idPerfil}`)
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                jogos.push(data[i].idAnuncio);
                // Cria a div com id "pedidosAnuncios"

                var divPedidosAnuncios = document.createElement('div');
                divPedidosAnuncios.id = 'pedidosAnuncios';
                divPedidosAnuncios.className = 'card mb-3';

                // Cria a div com classe "card-body"
                var divCardBody = document.createElement('div');
                divCardBody.className = 'card-body';

                // Cria a div com classe "d-flex justify-content-between"
                var divFlexContainer = document.createElement('div');
                divFlexContainer.className = 'd-flex justify-content-between';

                // Cria a primeira div com classe "d-flex flex-row align-items-center"
                var divFlexRow1 = document.createElement('div');
                divFlexRow1.className = 'd-flex flex-row align-items-center';

                // Cria a div para a imagem
                var divImagem = document.createElement('div');
                divImagem.className = 'justify-content-between align-items-start';

                // Cria a imagem
                var imagem = document.createElement('img');
                imagem.id = 'bannerJogo';
                imagem.src = data[i].capa
                imagem.className = 'img-fluid rounded-3';
                imagem.alt = 'Shopping item';

                // Adiciona a imagem à div
                divImagem.appendChild(imagem);

                // Cria a div para o conteúdo do pedido
                var divConteudoPedido = document.createElement('div');
                divConteudoPedido.id = 'conteudoPedido';
                divConteudoPedido.className = 'ms-3';

                // Cria o título
                var titulo = document.createElement('h5');
                titulo.textContent = data[i].titulo

                // Cria as informações adicionais
                var tipoMidia = document.createElement('p');
                tipoMidia.className = 'mb-0';
                tipoMidia.textContent = `Tipo de mídia: ${data[i].tipo}`;
                if (data[i].tipo == 'Virtual') {
                    virtual.push(data[i].idAnuncio)
                }

                var vendedor = document.createElement('p');
                vendedor.className = 'mb-0';
                vendedor.id = 'vendedor' + data[i].idAnuncio

                var dataCompra = document.createElement('p');
                dataCompra.className = 'mb-0';
                var dataOriginal = data[i].dataCompra
                var dataObjeto = new Date(dataOriginal);
                var dia = dataObjeto.getDate() + 1
                var mes = dataObjeto.getMonth() + 1; // Lembrando que os meses são indexados de 0 a 11
                var ano = dataObjeto.getFullYear();

                // Formatação com dois dígitos para dia e mês
                if (dia < 10) {
                    dia = "0" + dia;
                }
                if (mes < 10) {
                    mes = "0" + mes;
                }

                var dataFormatada = dia + "/" + mes + "/" + ano;

                dataCompra.textContent = `Data da compra: ${dataFormatada}`;

                // Adiciona as informações à div
                divConteudoPedido.appendChild(titulo);
                divConteudoPedido.appendChild(tipoMidia);
                divConteudoPedido.appendChild(vendedor);
                divConteudoPedido.appendChild(dataCompra);

                // Adiciona as duas divs à primeira div flexível
                divFlexRow1.appendChild(divImagem);
                divFlexRow1.appendChild(divConteudoPedido);

                // Cria a segunda div com classe "d-flex flex-row align-items-center"
                var divFlexRow2 = document.createElement('div');
                divFlexRow2.className = 'd-flex flex-row align-items-center';

                // Cria a div para o valor do produto
                var divValorProduto = document.createElement('div');
                divValorProduto.id = 'valorProduto';
                divValorProduto.style.width = '120px';

                // Cria o valor do produto
                var valor = document.createElement('h5');
                valor.className = 'mb-0';
                var precoJogo = data[i].preco.toFixed(2).replace('.', ',');
                valor.textContent = `R$ ${precoJogo}`;

                // Adiciona o valor do produto à div
                divValorProduto.appendChild(valor);

                // Adiciona a div à segunda div flexível
                divFlexRow2.appendChild(divValorProduto);

                // Adiciona as duas divs flexíveis à div do corpo do cartão
                divCardBody.appendChild(divFlexContainer);
                divFlexContainer.appendChild(divFlexRow1);
                divFlexContainer.appendChild(divFlexRow2);

                // Adiciona a div do corpo do cartão à div principal
                divPedidosAnuncios.appendChild(divCardBody);

                // Encontra a div "my-orders-container"
                var myOrdersContainer = document.getElementById('my-orders-container');

                if (data[i].tipo == 'Virtual') {
                    // Adiciona a div criada como a última filha de "my-orders-container"
                    myOrdersContainer.appendChild(divPedidosAnuncios);

                    // Create and append the additional elements
                    var emailDiv = document.createElement('div');
                    emailDiv.style.marginBottom = '20px';
                    emailDiv.style.marginLeft = '20px';
                    emailDiv.className = 'd-flex flex-row align-items-center';

                    var emailText = document.createElement('p');
                    emailText.className = 'mb-0';
                    emailText.id = 'emailCampo' + data[i].idAnuncio
                    emailText.innerHTML = '';

                    emailDiv.appendChild(emailText);
                    divPedidosAnuncios.appendChild(emailDiv);

                    if (data[i].entregue == 'nao') {
                        var buttonsDiv = document.createElement('div');
                        buttonsDiv.style.marginBottom = '20px';
                        buttonsDiv.style.marginLeft = '20px';
                        buttonsDiv.className = 'd-flex flex-row align-items-center';

                        var button1 = document.createElement('button');
                        button1.id = 'btnDadosConfirmar';
                        button1.type = 'submit';
                        button1.className = 'btn';
                        button1.innerHTML = 'Forma de acesso funcionou';
                        button1.name = data[i].idAnuncio

                        button1.addEventListener('click', handleClick);

                        var button2 = document.createElement('button');
                        button2.id = 'btnDados';
                        button2.type = 'submit';
                        button2.className = 'btn';
                        button2.innerHTML = 'Forma de acesso não funcionou';
                        button2.name = data[i].idAnuncio

                        button2.addEventListener('click', handleClick2);

                        var button3 = document.createElement('button');
                        button3.id = 'btnDados';
                        button3.type = 'submit';
                        button3.className = 'btn';
                        button3.innerHTML = 'Abrir Disputa';
                        button3.name = data[i].idAnuncio

                        button3.addEventListener('click', handleClick3);

                        function handleClick(event) {
                            var buttonId = event.target.name;

                            // Abrir o modal
                            $('#exampleModal2').modal('show');

                            // Evento de clique no botão de confirmação
                            $('#postConfirmss').click(function () {
                                fetch(`https://reyouseback.azurewebsites.net/confirmarecebimento/${buttonId}`)
                                    .then(responses => responses.text())
                                    .then(datas => {
                                        if (datas == `Anuncio ${buttonId} marcado como recebido`) {
                                            window.location.reload();
                                        }
                                        console.log(datas);
                                    })
                                    .catch(error => {
                                        console.error('Ocorreu um erro:', error);
                                    });
                            });


                        }
                        function handleClick2(event) {
                            var buttonId = event.target.name;
                            fetch(`https://reyouseback.azurewebsites.net/contatovendedor/${buttonId}`)
                                .then(responses => responses.json())
                                .then(datas => {
                                    var modal = document.querySelector('.modalSenhaIncorreta');
                                    var modalH = document.querySelector('.modalSenhaIncorreta h5');
                                    modalH.innerHTML = `<b>Email: ${datas[0].email}</b><h5 style="color: #F8AF40;" class="modal-title"><b>Celular: ${datas[0].celular}</b></h5>`;
                                    var modalInstance = new bootstrap.Modal(modal);
                                    modalInstance.show();
                                })
                                .catch(error => {
                                    console.error('Ocorreu um erro:', error);
                                })
                        }

                        function handleClick3(event) {
                            var buttonId = event.target.name;
                            alert('Funcionalidade em Produção')
                        }

                        buttonsDiv.appendChild(button1);
                        buttonsDiv.appendChild(button2);
                        buttonsDiv.appendChild(button3);
                        divPedidosAnuncios.appendChild(buttonsDiv);
                    }
                }
                else if (data[i].tipo == 'Fisica' && data[i].entregue == 'nao') {
                    myOrdersContainer.appendChild(divPedidosAnuncios);
                    var buttonsDiv = document.createElement('div');
                    buttonsDiv.style.marginBottom = '20px';
                    buttonsDiv.style.marginLeft = '20px';
                    buttonsDiv.className = 'd-flex flex-row align-items-center';

                    var button1 = document.createElement('button');
                    button1.id = 'btnDadosConfirmar';
                    button1.type = 'submit';
                    button1.className = 'btn';
                    button1.innerHTML = 'Confirmar Recebimento';
                    button1.name = data[i].idAnuncio

                    button1.addEventListener('click', handleClick);

                    var button2 = document.createElement('button');
                    button2.id = 'btnDados';
                    button2.type = 'submit';
                    button2.className = 'btn';
                    button2.innerHTML = 'Contatar Vendedor';
                    button2.name = data[i].idAnuncio

                    button2.addEventListener('click', handleClick2);

                    var button3 = document.createElement('button');
                    button3.id = 'btnDados';
                    button3.type = 'submit';
                    button3.className = 'btn';
                    button3.innerHTML = 'Abrir Disputa';
                    button3.name = data[i].idAnuncio

                    button3.addEventListener('click', handleClick3);

                    function handleClick(event) {
                        var buttonId = event.target.name;

                        // Abrir o modal
                        $('#exampleModal2').modal('show');

                        // Evento de clique no botão de confirmação
                        $('#postConfirmss').click(function () {
                            fetch(`https://reyouseback.azurewebsites.net/confirmarecebimento/${buttonId}`)
                                .then(responses => responses.text())
                                .then(datas => {
                                    if (datas == `Anuncio ${buttonId} marcado como recebido`) {
                                        window.location.reload();
                                    }
                                    console.log(datas);
                                })
                                .catch(error => {
                                    console.error('Ocorreu um erro:', error);
                                });
                        });
                    }

                    function handleClick2(event) {
                        var buttonId = event.target.name;
                        fetch(`https://reyouseback.azurewebsites.net/contatovendedor/${buttonId}`)
                            .then(responses => responses.json())
                            .then(datas => {
                                var modal = document.querySelector('.modalSenhaIncorreta');
                                var modalH = document.querySelector('.modalSenhaIncorreta h5');
                                modalH.innerHTML = `<b>Email: ${datas[0].email}</b><h5 style="color: #F8AF40;" class="modal-title"><b>Celular: ${datas[0].celular}</b></h5>`;
                                var modalInstance = new bootstrap.Modal(modal);
                                modalInstance.show();

                            })
                            .catch(error => {
                                console.error('Ocorreu um erro:', error);
                            })
                    }

                    function handleClick3(event) {
                        var buttonId = event.target.name;
                        alert('Funcionalidade em Produção')
                    }

                    buttonsDiv.appendChild(button1);
                    buttonsDiv.appendChild(button2);
                    buttonsDiv.appendChild(button3);
                    divPedidosAnuncios.appendChild(buttonsDiv);
                }

                // Adiciona a div criada como a última filha de "my-orders-container"
                myOrdersContainer.appendChild(divPedidosAnuncios);

            }

            jogos.forEach(element => {
                fetch(`https://reyouseback.azurewebsites.net/contatovendedor/${element}`)
                    .then(responses => responses.json())
                    .then(datas => {
                        var vendedor = document.querySelector('#vendedor' + element);
                        vendedor.textContent = "Vendedor: " + datas[0].nomePerfil
                    })
                    .catch(error => {
                        console.error('Ocorreu um erro:', error);
                    });
            });

            virtual.forEach(element => {
                fetch(`https://reyouseback.azurewebsites.net/formadeacesso/${element}`)
                    .then(responses => responses.json())
                    .then(datas => {
                        var emailCampo = document.querySelector('#emailCampo' + element);
                        let inputString = datas[0].formaDeAcesso;
                        let emailMatch = inputString.match(/(.*?)(?= -)/);
                        let senhaMatch = inputString.match(/- (\w+)/);

                        if (emailMatch && senhaMatch) {
                            let email = emailMatch[1];
                            let senha = senhaMatch[1];
                            let outputString = `E-mail: ${email} <br> Senha: ${senha}`;
                            emailCampo.innerHTML = outputString;
                        } else {
                            emailCampo.innerHTML = datas[0].formaDeAcesso;
                        }
                    })
                    .catch(error => {
                        console.error('Ocorreu um erro:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

carregar()