const catalogo = localStorage.getItem("catalogo");

var elementoTitulo = document.getElementById("catalogoTit");
elementoTitulo.innerText = catalogo;

function pesquisaCatalogo(catalogo) {
  return fetch('https://reyouseback.azurewebsites.net/catalogo/' + catalogo)
    .then(response => response.json())
    .then(data => {

      function criarEstrutura() {

        for (var j = 0; j < Math.ceil(data.length / 4); j++) {
          var jogosCatalogo = document.createElement("div");
          jogosCatalogo.setAttribute("id", "jogosCatalogo");
          jogosCatalogo.setAttribute("class", "container");

          var row = document.createElement("div");
          row.setAttribute("class", "row row-cols-md-4");

          // Cria as colunas e cartões
          for (var i = j * 4; i < (j * 4) + 4 && i < data.length; i++) {
            var col = document.createElement("div");
            col.setAttribute("class", "col");

            // Cria o cartão com a classe "wide-card"
            var card = document.createElement("div");
            card.setAttribute("class", "card wide-card");

            // Cria a sobreposição da imagem do cartão
            var cardImgOverlay = document.createElement("div");
            cardImgOverlay.setAttribute("class", "card-img-overlay");

            // Cria a div para aplicar o efeito de zoom na imagem
            var zoomImg = document.createElement("div");
            zoomImg.setAttribute("class", "zoom-img");

            // Cria a imagem do cartão
            var img = document.createElement("img");
            img.setAttribute("src", "");
            img.setAttribute("class", "card-img-top");
            img.setAttribute("alt", "Produto " + i);

            // Adiciona a imagem à div de zoom
            zoomImg.appendChild(img);

            // Adiciona a div de zoom à sobreposição da imagem do cartão
            cardImgOverlay.appendChild(zoomImg);

            // Adiciona a sobreposição da imagem do cartão ao cartão
            card.appendChild(cardImgOverlay);

            // Cria o corpo do cartão
            var cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");

            // Cria a div para o título do cartão
            var titleDiv = document.createElement("div");
            titleDiv.setAttribute("class", "d-flex justify-content-between align-items-start");

            // Cria o título do cartão
            var title = document.createElement("h5");
            title.setAttribute("id", "tituloCard");
            title.setAttribute("class", "card-title card-title-single-line");

            // Adiciona o título à div do título do cartão
            titleDiv.appendChild(title);

            // Adiciona a div do título do cartão ao corpo do cartão
            cardBody.appendChild(titleDiv);

            // Cria a div para os ícones do cartão
            var iconDiv = document.createElement("div");
            iconDiv.setAttribute("class", "game-card_cardIcon align-items-start mt-10 d-flex");

            // Adiciona a div dos ícones ao corpo do cartão
            cardBody.appendChild(iconDiv);

            // Cria a div para o conteúdo do cartão
            var contentDiv = document.createElement("div");
            contentDiv.setAttribute("id", "conteudoCard");
            contentDiv.setAttribute("class", "d-flex justify-content-between align-items-center");

            // Cria o preço do cartão
            var price = document.createElement("p");
            price.setAttribute("class", "card-price card-text");
            price.setAttribute("id", "cardPreco");
            price.setAttribute("style", "margin-bottom: 0;");

            // Adiciona o preço à div de conteúdo do cartão
            contentDiv.appendChild(price);

            // Cria o ícone do carrinho
            var cartIcon = document.createElement("i");
            cartIcon.setAttribute("class", "add-to-cart fas fa-shopping-cart");

            // Adiciona o ícone do carrinho à div de conteúdo do cartão
            contentDiv.appendChild(cartIcon);

            // Adiciona a div de conteúdo do cartão ao corpo do cartão
            cardBody.appendChild(contentDiv);

            // Adiciona o corpo do cartão ao cartão
            card.appendChild(cardBody);

            // Adiciona o cartão à coluna
            col.appendChild(card);

            // Adiciona a coluna à linha
            row.appendChild(col);
          }

          var elementoReferencia = document.getElementById("rodape");

          if (!elementoReferencia) {
            console.error("Elemento de referência não encontrado.");
            return;
          }

          elementoReferencia.insertAdjacentElement("beforebegin", jogosCatalogo);
          jogosCatalogo.appendChild(row);
        }
      }

      criarEstrutura("catalogo");

      const cardImg = document.querySelectorAll(".card-img-top");
      const cardTitle = document.querySelectorAll("#tituloCard");
      const cardProco = document.querySelectorAll("#cardPreco");

      cardTitle.forEach((title, index) => {
        if (data[index]) {
          title.textContent = data[index].titulo;

          return fetch('https://reyouseback.azurewebsites.net/plataformasdojogo/' + data[index].idAnuncio)
            .then(resposta => resposta.json())
            .then(date => {
              date.forEach(item => {
                if (item.nome === "Xbox") {

                  const divPai = document.querySelectorAll('.game-card_cardIcon.align-items-start.mt-10.d-flex')[index];
                  criarDiv(divPai);

                } else if (item.nome === "PC") {
                  const pcElement = createPCElement();
                  const parentElement = document.querySelectorAll('.d-flex.justify-content-between.align-items-start')[index];
                  parentElement.parentNode.insertBefore(pcElement, parentElement.nextSibling);
                  if (date.length === 1) {
                    const divPai = document.querySelectorAll('.game-card_cardIcon.align-items-start.mt-10.d-flex')[index];
                    criarDiv2(divPai);
                  }

                } else if (item.nome === "Playstation") {

                  const divPai = document.querySelectorAll('.game-card_cardIcon.align-items-start.mt-10.d-flex')[index];
                  createGameCard(divPai);

                }
              });
            });
        }
      });

      cardImg.forEach((imagem, index) => {
        if (data[index]) {
          imagem.src = data[index].capa;
        }
      });

      cardProco.forEach((preco, index) => {
        if (data[index]) {
          const precoFormatado = "R$ " + data[index].preco.toFixed(2).toString().replace('.', ',');
          preco.textContent = precoFormatado;
        }
      });

    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}


function createPCElement() {
  // Cria o elemento div principal
  const div = document.createElement('div');
  div.setAttribute('id', 'PC');
  div.setAttribute('class', 'game-card_cardIconWrapper__382_2 mr-10');

  // Cria o elemento div interno
  const innerDiv = document.createElement('div');
  innerDiv.setAttribute('class', 'd-inline-flex justify-content-center align-items-center');
  innerDiv.setAttribute('style', 'width: 20px; height: 5px;');

  // Cria o elemento svg
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('fill', '#7E838A');
  svg.setAttribute('viewBox', '0 0 24 24');

  // Cria o elemento path dentro do svg
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'm9.84 12.663v9.39l-9.84-1.356v-8.034zm0-10.72v9.505h-9.84v-8.145zm14.16 10.72v11.337l-13.082-1.803v-9.534zm0-12.663v11.452h-13.082v-9.649z');

  // Adiciona o path ao svg
  svg.appendChild(path);

  // Adiciona o svg ao div interno
  innerDiv.appendChild(svg);

  // Adiciona o div interno ao div principal
  div.appendChild(innerDiv);

  // Retorna o elemento div completo
  return div;
}

function criarDiv(divPai) {
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

function criarDiv2(divPai) {
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

function createGameCard(divPai) {
  var divFilha = document.createElement('div');
  divFilha.className = 'game-card_cardIconWrapper__382_2 mr-10';

  var divInterna1 = document.createElement("div");
  divInterna1.className = "d-inline-flex justify-content-center align-items-center";
  divInterna1.style.width = "42px";
  divInterna1.style.height = "9px";

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "40");
  svg.setAttribute("height", "40");
  svg.setAttribute("fill", "#7E838A");
  svg.setAttribute("viewBox", "0 0 32 32");

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M8.063 15.555c0.572-0.005 1.034-0.47 1.034-1.043s-0.462-1.038-1.033-1.043h-7.014c-0.025-0.001-0.045-0.021-0.045-0.047 0 0 0-0 0-0v0-0.595c0 0 0 0 0-0 0-0.025 0.020-0.045 0.045-0.045 0 0 0 0 0 0h7.689c0.934 0.026 1.682 0.79 1.682 1.729s-0.747 1.702-1.68 1.729l-0.002 0h-5.319c-0.575 0-1.041 0.466-1.041 1.041 0 0 0 0.001 0 0.001v-0 1.891c0 0.025-0.020 0.045-0.045 0.045 0 0 0 0 0 0h-1.283c-0 0-0 0-0 0-0.025 0-0.045-0.020-0.045-0.045 0-0.002 0-0.003 0-0.005l-0 0v-1.891c0.004-0.952 0.776-1.722 1.728-1.722 0.001 0 0.001 0 0.002 0h-0zM21.617 15.197v-2.37c0-0.025 0.020-0.045 0.045-0.045h9.132c0.025 0 0.046 0.020 0.047 0.045v0.595c-0.001 0.025-0.021 0.046-0.047 0.047h-7.759c-0.025 0-0.045 0.020-0.045 0.045 0 0 0 0 0 0v0 1.544c0 0.001 0 0.002 0 0.003 0 0.273 0.221 0.494 0.494 0.494 0 0 0.001 0 0.001 0h5.777c0.969 0.052 1.734 0.851 1.734 1.828s-0.766 1.775-1.73 1.827l-0.005 0h-7.599c0 0 0 0-0 0-0.025 0-0.045-0.020-0.045-0.045 0 0 0 0 0-0v0-0.592c0-0.025 0.020-0.045 0.045-0.045h6.911c0.010 0 0.022 0 0.034 0 0.632 0 1.145-0.512 1.145-1.145s-0.512-1.145-1.145-1.145c-0.015 0-0.030 0-0.045 0.001l0.002-0h-5.907c-0.575 0-1.041-0.466-1.041-1.041 0-0 0-0.001 0-0.001v0zM14.063 19.21c0.954 0 1.728-0.774 1.728-1.728v0-2.972c0-0.575 0.466-1.041 1.041-1.041 0 0 0.001 0 0.001 0h3.354c0.025-0.001 0.045-0.021 0.045-0.047 0 0 0-0 0-0v0-0.595c0-0.025-0.020-0.045-0.045-0.045h-4.041c-0 0-0.001 0-0.001 0-0.954 0-1.728 0.774-1.728 1.728v0 2.975c0 0.575-0.466 1.042-1.041 1.042h-3.307c-0.025 0-0.045 0.020-0.045 0.045v0 0.595c0 0.025 0.020 0.045 0.045 0.045 0 0 0 0 0 0v0z");

  svg.appendChild(path);

  divInterna1.appendChild(svg);

  divFilha.appendChild(divInterna1);

  divPai.appendChild(divFilha);
}


pesquisaCatalogo(catalogo);