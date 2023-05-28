const produto = localStorage.getItem("produto");

function infoJogo(produto) {
    return fetch('https://reyouseback.azurewebsites.net/anuncio/' + produto)
        .then(response => response.json())
        .then(data => {

            var elemento = document.getElementById("conteudosJogo");
            var elementoEstado = document.getElementById("estadoHtml");
            var elementoPreco = document.getElementById("precoJogo");
            var elementoImg = document.getElementById("imgJogo");

            var titulo = elemento.getElementsByTagName("h5")[0];
            var paragrafo = elemento.querySelector("p");

            titulo.innerText = data[0].titulo

            if (data[0].descricao.length <= 531) {
                paragrafo.textContent = data[0].descricao;

            } else {
                paragrafo.textContent = data[0].descricao.substring(0, 531) + "...";
            }

            var preco = parseFloat(data[0].preco);
            var precoFormatado = preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            precoFormatado = "R$ " + precoFormatado.replace('.', ',');
            elementoPreco.innerHTML = precoFormatado;

            elementoImg.src = data[0].capa;
            elementoImg.alt = data[0].titulo

            if (data[0].estadoDeConservacao != undefined && data[0].estadoDeConservacao != null) {
                elementoEstado.innerText = data[0].estadoDeConservacao;
            }
            else {
                var divEstadoJogo = document.querySelector('.estadoJogo');
                divEstadoJogo.remove();
            }

            var paddingBottom = elemento.style.paddingBottom;
            var paddingTop = elemento.style.paddingTop;
            var aux = 1
            while ((elemento.scrollHeight + paddingBottom + paddingTop) < 480) {
                elemento.style.paddingBottom = aux + "px"
                aux++
            }

        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

function plataformasJogo(produto) {
    return fetch('https://reyouseback.azurewebsites.net/plataformasdojogo/' + produto)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item.nome == "Xbox") {
                    criarEstruturaXbox()
                }
                else if (item.nome === "PC") {
                    criarEstruturaPC()
                }
                else if (item.nome === "Playstation") {
                    criarEstruturaPlay()
                }
            })
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

function imagensJogo(produto) {
    return fetch('https://reyouseback.azurewebsites.net/banners/' + produto)
        .then(response => response.json())
        .then(data => {

            var numImg = data.length

            for (let i = 0; i < data.length; i++) {
                if (data[i].endereco == null) {
                    numImg--
                }
            }
            
            if (numImg > 3) {
                createCarousel(data, numImg)

            } else if (numImg > 0) {
                createCarouselDiv(data, numImg)
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

function criarEstruturaPlay() {
    // Cria a div principal
    var divPrincipal = document.createElement("div");
    divPrincipal.style.marginRight = "15px";
    divPrincipal.style.marginLeft = "15px";
    divPrincipal.className = "plataforma align-items-start";

    // Cria o botão
    var botao = document.createElement("button");
    botao.id = "btnPlataforma";

    // Cria o elemento SVG
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "30px");
    svg.setAttribute("height", "30px");
    svg.setAttribute("fill", "#7E838A");
    svg.setAttribute("viewBox", "0 0 32 32");

    // Cria o grupo de elementos path do SVG
    var pathGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    pathGroup.setAttribute("id", "SVGRepo_iconCarrier");

    // Cria o título do SVG
    var titulo = document.createElementNS("http://www.w3.org/2000/svg", "title");
    titulo.textContent = "playstation";

    // Cria o path do ícone
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M3.262 24.248c-2.374-0.681-2.767-2.084-1.69-2.899 0.776-0.51 1.668-0.954 2.612-1.288l0.087-0.027 7.017-2.516v2.89l-5.030 1.839c-0.881 0.339-1.031 0.79-0.299 1.032 0.365 0.093 0.783 0.147 1.214 0.147 0.615 0 1.204-0.109 1.749-0.308l-0.035 0.011 2.422-0.882v2.592c-0.15 0.037-0.32 0.055-0.487 0.091-0.775 0.136-1.667 0.214-2.577 0.214-1.778 0-3.486-0.298-5.078-0.846l0.11 0.033zM18.049 24.544l7.868-2.843c0.893-0.322 1.032-0.781 0.307-1.022-0.363-0.089-0.779-0.14-1.208-0.14-0.622 0-1.22 0.108-1.774 0.305l0.037-0.011-5.255 1.874v-2.983l0.3-0.106c1.050-0.349 2.284-0.62 3.557-0.761l0.083-0.008c0.468-0.050 1.010-0.078 1.559-0.078 1.877 0 3.677 0.331 5.343 0.939l-0.108-0.035c2.309 0.751 2.549 1.839 1.969 2.589-0.559 0.557-1.235 0.998-1.988 1.282l-0.039 0.013-10.677 3.883v-2.869zM12.231 4.248v21.927l4.892 1.576v-18.39c0-0.862 0.38-1.438 0.992-1.238 0.795 0.225 0.95 1.017 0.95 1.881v7.342c3.050 1.491 5.451-0.003 5.451-3.939 0-4.045-1.407-5.842-5.546-7.282-1.785-0.648-4.040-1.294-6.347-1.805l-0.389-0.072z"); // Coloque o valor do atributo "d" aqui

    // Adiciona o path ao grupo
    pathGroup.appendChild(path);

    // Adiciona o título e o grupo de path ao SVG
    svg.appendChild(titulo);
    svg.appendChild(pathGroup);

    // Adiciona o SVG ao botão
    botao.appendChild(svg);

    // Adiciona o botão à div principal
    divPrincipal.appendChild(botao);

    // Obtém a div alvo para inserir a nova estrutura
    var divAlvo = document.getElementById("plataformas");

    // Verifica se a div alvo existe
    if (divAlvo) {
        // Insere a div principal após a div alvo
        divAlvo.appendChild(divPrincipal);
    }
}

function criarEstruturaXbox() {
    // Cria a div externa
    var divExterna = document.createElement("div");
    divExterna.setAttribute("style", "margin-right: 15px;");
    divExterna.setAttribute("class", "plataforma");

    // Cria o botão
    var button = document.createElement("button");
    button.setAttribute("id", "btnPlataforma");

    // Cria o elemento SVG
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "25px");
    svg.setAttribute("height", "25px");
    svg.setAttribute("fill", "#7E838A");
    svg.setAttribute("viewBox", "0 0 32 32");
    svg.setAttribute("version", "1.1");

    // Cria o grupo de elementos do SVG
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("id", "SVGRepo_bgCarrier");
    g.setAttribute("stroke-width", "0");

    // Cria o segundo grupo de elementos do SVG
    var g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g2.setAttribute("id", "SVGRepo_tracerCarrier");
    g2.setAttribute("stroke-linecap", "round");
    g2.setAttribute("stroke-linejoin", "round");

    // Cria o terceiro grupo de elementos do SVG
    var g3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g3.setAttribute("id", "SVGRepo_iconCarrier");

    // Cria o título do ícone
    var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = "xbox";

    // Cria o caminho do ícone
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M16 5.425c-1.888-1.125-4.106-1.922-6.473-2.249l-0.092-0.010c-0.070-0.005-0.152-0.008-0.234-0.008-0.613 0-1.188 0.16-1.687 0.441l0.017-0.009c2.357-1.634 5.277-2.61 8.426-2.61 0.008 0 0.016 0 0.024 0h0.019c0.005 0 0.011 0 0.018 0 3.157 0 6.086 0.976 8.501 2.642l-0.050-0.033c-0.478-0.272-1.051-0.433-1.662-0.433-0.085 0-0.169 0.003-0.252 0.009l0.011-0.001c-2.459 0.336-4.677 1.13-6.648 2.297l0.082-0.045zM5.554 5.268c-0.041 0.014-0.077 0.032-0.11 0.054l0.002-0.001c-2.758 2.723-4.466 6.504-4.466 10.684 0 3.584 1.256 6.875 3.353 9.457l-0.022-0.028c-1.754-3.261 4.48-12.455 7.61-16.159-3.53-3.521-5.277-4.062-6.015-4.062-0.010-0-0.021-0.001-0.032-0.001-0.115 0-0.225 0.021-0.326 0.060l0.006-0.002zM20.083 9.275c3.129 3.706 9.367 12.908 7.605 16.161 2.075-2.554 3.332-5.845 3.332-9.43 0-4.181-1.709-7.962-4.467-10.684l-0.002-0.002c-0.029-0.021-0.063-0.039-0.1-0.052l-0.003-0.001c-0.1-0.036-0.216-0.056-0.336-0.056-0.005 0-0.011 0-0.016 0h0.001c-0.741-0-2.485 0.543-6.014 4.063zM6.114 27.306c2.627 2.306 6.093 3.714 9.888 3.714s7.261-1.407 9.905-3.728l-0.017 0.015c2.349-2.393-5.402-10.901-9.89-14.29-4.483 3.39-12.24 11.897-9.886 14.29z");

    // Adiciona o caminho ao grupo do ícone
    g3.appendChild(title);
    g3.appendChild(path);

    // Adiciona os grupos ao SVG
    svg.appendChild(g);
    svg.appendChild(g2);
    svg.appendChild(g3);

    // Adiciona o SVG ao botão
    button.appendChild(svg);

    // Adiciona o botão à div externa
    divExterna.appendChild(button);

    // Obtém a div pai
    var divPai = document.getElementById("plataformas");

    // Adiciona a div externa à div pai
    divPai.appendChild(divExterna);
}

function criarEstruturaPC() {
    // Cria a div externa
    var divExterna = document.createElement("div");
    divExterna.setAttribute("style", "margin-right: 15px;");
    divExterna.setAttribute("class", "plataforma");

    // Cria o botão
    var botao = document.createElement("button");
    botao.setAttribute("id", "btnPlataforma");

    // Cria o SVG
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "25px");
    svg.setAttribute("height", "25px");
    svg.setAttribute("fill", "#7E838A");
    svg.setAttribute("viewBox", "0 0 1920 1920");

    // Cria o grupo SVGRepo_iconCarrier
    var grupoIconCarrier = document.createElementNS("http://www.w3.org/2000/svg", "g");
    grupoIconCarrier.setAttribute("id", "SVGRepo_iconCarrier");

    // Cria o path dentro do grupo SVGRepo_iconCarrier
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M1863.53 1016.437c31.171 0 56.47 25.299 56.47 56.47v790.589c0 16.376-7.115 31.849-19.313 42.465-10.39 9.149-23.605 14.005-37.158 14.005-2.484 0-5.082-.113-7.567-.452l-903.53-123.331c-28.008-3.84-48.903-27.784-48.903-56.02v-667.256c0-31.171 25.3-56.47 56.471-56.47Zm-1129.412 0c31.171 0 56.47 25.299 56.47 56.47v634.504c0 16.376-7.115 31.85-19.426 42.579-10.39 9.035-23.491 13.891-37.044 13.891-2.485 0-5.196-.113-7.68-.564L48.79 1669.35C20.78 1665.51 0 1641.68 0 1613.444v-540.537c0-31.171 25.299-56.47 56.47-56.47Zm-7.726-859.855c16.151-2.372 32.415 2.597 44.725 13.327 12.424 10.73 19.426 26.315 19.426 42.579V846.99c0 31.285-25.186 56.47-56.47 56.47H56.424c-31.171 0-56.47-25.185-56.47-56.47V306.455c0-28.123 20.781-52.066 48.79-55.906ZM1855.974.474c16.15-2.033 32.414 2.71 44.724 13.44 12.198 10.73 19.313 26.203 19.313 42.466v790.588c0 31.285-25.299 56.471-56.47 56.471H960.01c-31.171 0-56.47-25.186-56.47-56.47V179.711c0-28.235 20.78-52.066 48.903-55.906Z");
    path.setAttribute("fill-rule", "evenodd");

    // Adiciona o path ao grupo SVGRepo_iconCarrier
    grupoIconCarrier.appendChild(path);

    // Adiciona o grupo SVGRepo_iconCarrier ao SVG
    svg.appendChild(grupoIconCarrier);

    // Adiciona o SVG ao botão
    botao.appendChild(svg);

    // Adiciona o botão à div externa
    divExterna.appendChild(botao);

    // Obtém a div pai
    var divPai = document.getElementById("plataformas");

    // Adiciona a div externa à div pai
    divPai.appendChild(divExterna);
}

function createCarouselDiv(data, numImg) {
    // Cria o elemento div
    var div = document.createElement('div');

    // Define os atributos da div
    div.id = 'carouselExampleControls';
    div.className = 'carousel carousel-dark slide';
    div.setAttribute('data-bs-ride', 'carousel');

    // Cria a div interna com a classe "carousel-inner"
    var innerDiv = document.createElement('div');
    innerDiv.className = 'carousel-inner';

    // Cria a div do primeiro item com a classe "carousel-item active"
    var itemDiv = document.createElement('div');
    itemDiv.className = 'carousel-item active d-flex justify-content-center align-items-center';

    // Cria a div "card-wrapper"
    console.log(data)
    var cardWrapperDiv = document.createElement('div');
    cardWrapperDiv.className = 'card-wrapper';
    for (var i = 0; i < numImg; i++) {
        console.log(data[i].endereco)
        if (data[i].endereco != null){
            var cardDiv = createCardDiv(data[i].endereco, 'openFullscreen(this)');
            cardWrapperDiv.appendChild(cardDiv);
        }
        else {
            numImg++
        }
    }

    // Adiciona a div "card-wrapper" à div do primeiro item
    itemDiv.appendChild(cardWrapperDiv);

    // Adiciona a div do primeiro item à div interna
    innerDiv.appendChild(itemDiv);

    // Adiciona a div interna à div principal
    div.appendChild(innerDiv);

    // Obtém a referência ao elemento "main"
    var mainElement = document.querySelector('main');

    // Adiciona a div principal como o último elemento dentro do "main"
    mainElement.appendChild(div);
}

function createCardDiv(imageSrc, onclickAction) {
    // Cria a div "card"
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    // Cria a tag "img" com os atributos src, alt e onclick
    var img = document.createElement('img');
    img.src = imageSrc;
    img.className = 'card-img-top zoom-image';
    img.alt = '...';
    img.setAttribute('onclick', onclickAction);

    // Adiciona a tag "img" à div "card"
    cardDiv.appendChild(img);

    return cardDiv;
}

function createCarousel(data, numImg) {
    // Cria a div do carousel
    var carouselDiv = document.createElement("div");
    carouselDiv.id = "carouselExampleControls";
    carouselDiv.className = "carousel carousel-dark slide";
    carouselDiv.setAttribute("data-bs-ride", "carousel");

    // Cria a div do carousel-inner
    var carouselInnerDiv = document.createElement("div");
    carouselInnerDiv.className = "carousel-inner";

    var imgIndex = 0;

    while (imgIndex < numImg) {
        // Cria um novo carousel-item
        var carouselItemDiv = document.createElement("div");
        carouselItemDiv.className = "carousel-item";

        if (imgIndex === 0) {
            carouselItemDiv.classList.add("active");
        }

        // Cria a div do card-wrapper
        var cardWrapperDiv = document.createElement("div");
        cardWrapperDiv.className = "card-wrapper d-flex justify-content-center align-items-center";

        // Cria os três cards com as respectivas imagens
        for (var i = 0; i < 3 && imgIndex < numImg; i++) {
            var cardDiv = document.createElement("div");
            cardDiv.className = "card";

            var img = document.createElement("img");
            img.src = data[imgIndex].endereco;
            img.className = "card-img-top zoom-image";
            img.alt = "...";
            img.setAttribute("onclick", "openFullscreen(this)");

            cardDiv.appendChild(img);
            cardWrapperDiv.appendChild(cardDiv);

            imgIndex++;
        }

        carouselItemDiv.appendChild(cardWrapperDiv);
        carouselInnerDiv.appendChild(carouselItemDiv);
    }

    carouselDiv.appendChild(carouselInnerDiv);

    // Cria o botão de controle "Previous"
    var prevButton = document.createElement("button");
    prevButton.className = "carousel-control-prev custom-carousel-btn";
    prevButton.type = "button";
    prevButton.setAttribute("data-bs-target", "#carouselExampleControls");
    prevButton.setAttribute("data-bs-slide", "prev");

    var prevButtonIcon = document.createElement("span");
    prevButtonIcon.id = "btnAnterior";
    prevButtonIcon.className = "carousel-control-prev-icon";
    prevButtonIcon.setAttribute("aria-hidden", "true");

    var prevButtonLabel = document.createElement("span");
    prevButtonLabel.className = "visually-hidden";
    prevButtonLabel.textContent = "Previous";

    prevButton.appendChild(prevButtonIcon);
    prevButton.appendChild(prevButtonLabel);
    carouselDiv.appendChild(prevButton);

    // Cria o botão de controle "Next"
    var nextButton = document.createElement("button");
    nextButton.className = "carousel-control-next custom-carousel-btn";
    nextButton.type = "button";
    nextButton.setAttribute("data-bs-target", "#carouselExampleControls");
    nextButton.setAttribute("data-bs-slide", "next");

    var nextButtonIcon = document.createElement("span");
    nextButtonIcon.id = "btnProximo";
    nextButtonIcon.className = "carousel-control-next-icon";
    nextButtonIcon.setAttribute("aria-hidden", "true");

    var nextButtonLabel = document.createElement("span");
    nextButtonLabel.className = "visually-hidden";
    nextButtonLabel.textContent = "Next";

    nextButton.appendChild(nextButtonIcon);
    nextButton.appendChild(nextButtonLabel);
    carouselDiv.appendChild(nextButton);

    // Obtém a referência ao elemento "main"
    var mainElement = document.querySelector("main");

    // Adiciona o carouselDiv como o último elemento dentro do elemento "main"
    mainElement.appendChild(carouselDiv);
}

infoJogo(produto)
plataformasJogo(produto)
imagensJogo(produto)