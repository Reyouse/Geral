const catalogo = localStorage.getItem("catalogo");

var elementoTitulo = document.getElementById("catalogoTit");
elementoTitulo.innerText = catalogo;

document.getElementById("todos").addEventListener("click", funcMidiaT);
document.getElementById("fisica").addEventListener("click", funcMidiaF);
document.getElementById("digital").addEventListener("click", funcMidiaD);

var tipo = ""

function pesquisaCatalogo() {
  var param1 = ""
  var param2 = ""
  var param3 = ""
  if (catalogo == "Xbox" || catalogo == "PC" || catalogo == "Playstation") {
    if (tipo != "") {
      param1 = "filtro"
      param2 = catalogo
      param3 = `/${tipo}`
    }
    else {
      param1 = "catalogo"
      param2 = catalogo
    }
  } else if (tipo != "") {
    param1 = "filtropesquisa"
    param2 = catalogo
    param3 = `/${tipo}`
  } else {
    param1 = "pesquisa"
    param2 = catalogo
  }

  fetch(`https://reyouseback.azurewebsites.net/${param1}/${param2}${param3}`)
    .then(response => response.json())
    .then(data => {

      if (data.length <= 0) {
        var card = document.createElement("div");
        card.id = "cardErro"

        // Define as propriedades do card
        card.style.width = "300px";
        card.style.height = "200px";
        card.style.background = "white";
        card.style.border = "1px solid #ccc";
        card.style.borderRadius = "5px";
        card.style.display = "flex";
        card.style.alignItems = "center";
        card.style.justifyContent = "center";
        card.style.position = "relative"; // Alterado para position: relative
        card.style.top = "50%"; // Ajuste a posição vertical
        card.style.margin = "0 auto"; // Centraliza horizontalmente

        // Cria o elemento de mensagem dentro do card
        var mensagem = document.createElement("p");
        mensagem.innerText = "Não foi possível encontrar jogos relacionados";
        mensagem.style.color = "darkred";
        mensagem.style.margin = "0";
        mensagem.style.padding = "10px";
        mensagem.style.textAlign = "center";
        mensagem.style.fontWeight = "bold"; // Define o texto em negrito
        mensagem.style.fontSize = "20px";

        // Adiciona a mensagem ao card
        card.appendChild(mensagem);

        // Obtém a div "catalogo"
        var catalogoDiv = document.getElementById("catalogo");

        // Insere o card de aviso abaixo da div "catalogo"
        catalogoDiv.parentNode.insertBefore(card, catalogoDiv.nextSibling);
      }

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
            card.setAttribute("id", "numProduto")
            card.style.cursor = "pointer";

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

            var aICon = document.createElement("a");
            aICon.id = 'cartAdd'

            // Cria o ícone do carrinho
            var cartIcon = document.createElement("i");
            cartIcon.setAttribute("class", "add-to-cart fas fa-shopping-cart");
            cartIcon.setAttribute("id", "cardCart")
            cartIcon.style.cursor = "pointer";

            aICon.appendChild(cartIcon)

            // Adiciona o ícone do carrinho à div de conteúdo do cartão
            contentDiv.appendChild(aICon);

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

      criarEstrutura();

      const cardImg = document.querySelectorAll(".card-img-top");
      const cardTitle = document.querySelectorAll("#tituloCard");
      const cardProco = document.querySelectorAll("#cardPreco");
      const cardClick = document.querySelectorAll("#numProduto");
      const cardCart = document.querySelectorAll('#cartAdd')

      cardTitle.forEach((title, index) => {
        if (data[index]) {
          title.textContent = data[index].titulo;

          return fetch('https://reyouseback.azurewebsites.net/plataformasdojogo/' + data[index].idAnuncio)
            .then(resposta => resposta.json())
            .then(date => {
              date.forEach(item => {
                if (item.nome === "Xbox") {

                  const divPai = document.querySelectorAll('.game-card_cardIcon.align-items-start.mt-10.d-flex')[index];
                  createXboxElement(divPai);

                } else if (item.nome === "PC") {
                  const pcElement = createPCElement();
                  const parentElement = document.querySelectorAll('.d-flex.justify-content-between.align-items-start')[index];
                  parentElement.parentNode.insertBefore(pcElement, parentElement.nextSibling);
                  if (date.length === 1) {
                    const divPai = document.querySelectorAll('.game-card_cardIcon.align-items-start.mt-10.d-flex')[index];
                    createXboxElement2(divPai);
                  }

                } else if (item.nome === "Playstation") {

                  const divPai = document.querySelectorAll('.game-card_cardIcon.align-items-start.mt-10.d-flex')[index];
                  createPlayElement(divPai);
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

      cardClick.forEach((fullCard, index) => {
        if (data[index]) {
          fullCard.id = data[index].idAnuncio;
          fullCard.addEventListener("click", function () {
            handleClick(fullCard.id);
          });
        }
      });

      cardCart.forEach((id, index) => {
        if (data[index]) {
          id.id = data[index].idAnuncio;
          id.addEventListener("click", function (event) {
            event.stopPropagation();
            chamarFuncao(id.id, id);
          });
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

  var divInterna1 = document.createElement("div");
  divInterna1.className = "d-inline-flex justify-content-center align-items-center";
  divInterna1.style.width = "42px";
  divInterna1.style.height = "9px";

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "25");
  svg.setAttribute("height", "25");
  svg.setAttribute("fill", "#7E838A");
  svg.setAttribute("viewBox", "0 0 32 32");

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M3.262 24.248c-2.374-0.681-2.767-2.084-1.69-2.899 0.776-0.51 1.668-0.954 2.612-1.288l0.087-0.027 7.017-2.516v2.89l-5.030 1.839c-0.881 0.339-1.031 0.79-0.299 1.032 0.365 0.093 0.783 0.147 1.214 0.147 0.615 0 1.204-0.109 1.749-0.308l-0.035 0.011 2.422-0.882v2.592c-0.15 0.037-0.32 0.055-0.487 0.091-0.775 0.136-1.667 0.214-2.577 0.214-1.778 0-3.486-0.298-5.078-0.846l0.11 0.033zM18.049 24.544l7.868-2.843c0.893-0.322 1.032-0.781 0.307-1.022-0.363-0.089-0.779-0.14-1.208-0.14-0.622 0-1.22 0.108-1.774 0.305l0.037-0.011-5.255 1.874v-2.983l0.3-0.106c1.050-0.349 2.284-0.62 3.557-0.761l0.083-0.008c0.468-0.050 1.010-0.078 1.559-0.078 1.877 0 3.677 0.331 5.343 0.939l-0.108-0.035c2.309 0.751 2.549 1.839 1.969 2.589-0.559 0.557-1.235 0.998-1.988 1.282l-0.039 0.013-10.677 3.883v-2.869zM12.231 4.248v21.927l4.892 1.576v-18.39c0-0.862 0.38-1.438 0.992-1.238 0.795 0.225 0.95 1.017 0.95 1.881v7.342c3.050 1.491 5.451-0.003 5.451-3.939 0-4.045-1.407-5.842-5.546-7.282-1.785-0.648-4.040-1.294-6.347-1.805l-0.389-0.072z");

  svg.appendChild(path);

  divInterna1.appendChild(svg);

  divFilha.appendChild(divInterna1);

  divPai.appendChild(divFilha);
}

function handleClick(valor) {
  localStorage.setItem('produto', valor)
  window.location.href = './telaInfosJogo.html';
}

function funcMidiaT() {
  tipo = ""
  removerDivs()
  pesquisaCatalogo()
}

function funcMidiaF() {
  tipo = "fisica"
  removerDivs()
  pesquisaCatalogo()
}

function funcMidiaD() {
  tipo = "virtual"
  removerDivs()
  pesquisaCatalogo()
}

function removerDivs() {
  var divs = document.querySelectorAll('#jogosCatalogo');
  var div2 = document.getElementById('cardErro');

  if (divs.length > 0) {
    divs.forEach(function (div) {
      while (div.firstChild) {
        div.firstChild.remove();
      }
      div.remove();
    });
  }

  if (div2) {
    while (div2.firstChild) {
      div2.firstChild.remove();
    }
    div2.remove();
  }
}

const dropdownItems = document.querySelectorAll('.dropdown-item');
const dropdownButton = document.getElementById('dropdownMenuButton');

dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    dropdownButton.textContent = `Categoria: ${item.textContent}`;
  });
});

function chamarFuncao(idProduto, id) {
  var valid = true
  const idPerfil = localStorage.getItem('idPerfil');
  if (idPerfil) {
    fetch(`https://reyouseback.azurewebsites.net/vercarrinho/${idPerfil}`)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].idAnuncio == idProduto) {
            alert('Produto já presente no carrinho')
            valid = false
            break
          }
        }
        if (valid) {
          fetch(`https://reyouseback.azurewebsites.net/addcarrinho/${idPerfil}/${idProduto}`)
            .then(response => response.text())
            .then(data => {
              if (data == `Anúncio ${idProduto} adicionado ao carrinho.`) {
                alert('Produto adicionado no carrinho');
                const filho = id.querySelector('#cardCart');
                filho.className += 'fa-solid fa-check';
              }
            })
            .catch(error => {
              console.error('Ocorreu um erro:', error);
            });
        }
        else {
          const filho = id.querySelector('#cardCart');
          filho.className += 'fa-solid fa-check';
        }
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });

  } else {
    window.location.href = './telaAutenticacao.html'
  }
}

pesquisaCatalogo();