var test = document.getElementById('myInput')
test.addEventListener('keypress', pesquisarEnter);

function createNav() {
    // Cria o elemento nav
    var nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg';

    // Cria o elemento div com a classe container-fluid
    var container = document.createElement('div');
    container.className = 'container-fluid';

    // Cria o elemento div com a classe navbar-header
    var header = document.createElement('div');
    header.className = 'navbar-header';

    // Cria o elemento a com o link para o index.html e a imagem do logo
    var logoLink = document.createElement('a');
    logoLink.href = './index.html';
    var logoImg = document.createElement('img');
    logoImg.id = 'logo_Reyouse';
    logoImg.src = '../imgs/LogoReyouse-Controle.png';
    logoImg.alt = 'Reyouse';
    logoLink.appendChild(logoImg);
    header.appendChild(logoLink);

    // Cria o elemento div com a classe collapse navbar-collapse mx-auto
    var collapseDiv = document.createElement('div');
    collapseDiv.className = 'collapse navbar-collapse mx-auto';
    collapseDiv.id = 'navbarSupportedContent';

    // Cria o elemento div com a classe d-flex justify-content-center
    var formDiv = document.createElement('div');
    formDiv.className = 'd-flex justify-content-center';

    // Cria o elemento form com a classe d-flex
    var form = document.createElement('form');
    form.className = 'd-flex';

    // Cria o elemento input com a classe form-control me-2
    var input = document.createElement('input');
    input.className = 'form-control me-2';
    input.type = 'search';
    input.placeholder = 'Pesquisar';
    input.id = 'myInput'
    input.setAttribute('aria-label', 'Search');
    form.appendChild(input);

    // Cria o elemento button com o id btnPesquisar
    var button = document.createElement('button');
    button.id = 'btnPesquisar';
    button.type = 'button';
    button.onclick = pesquisar;

    // Cria o elemento i com as classes fa-solid e fa-magnifying-glass
    var icon = document.createElement('i');
    icon.className = 'fa-solid fa-magnifying-glass';
    button.appendChild(icon);
    form.appendChild(button);

    formDiv.appendChild(form);
    collapseDiv.appendChild(formDiv);

    // Cria o elemento ul com a classe navbar-nav ms-auto
    var ul = document.createElement('ul');
    ul.className = 'navbar-nav ms-auto';

    // Cria o elemento li com a classe nav-item dropdown
    var dropdownLi = document.createElement('li');
    dropdownLi.className = 'nav-item dropdown';

    // Cria o elemento button com a classe navbar-icon e os atributos data-bs-toggle e aria-expanded
    var dropdownButton = document.createElement('button');
    dropdownButton.className = 'navbar-icon';
    dropdownButton.type = 'button';
    dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
    dropdownButton.setAttribute('aria-expanded', 'false');

    // Cria o elemento i com as classes fas, fa-user e navbar-icon
    var userIcon = document.createElement('i');
    userIcon.style.color = '#fff';
    userIcon.className = 'fas fa-user navbar-icon';
    dropdownButton.appendChild(userIcon);
    dropdownLi.appendChild(dropdownButton);

    // Cria o elemento ul com as classes dropdown-menu e dropdown-menu-end
    var dropdownUl = document.createElement('ul');
    dropdownUl.className = 'dropdown-menu dropdown-menu-end';

    // Cria os elementos li e a para cada item do dropdown
    var dropdownItems = ['Minha conta', 'Anunciar', 'Meus pedidos', 'Sair'];
    for (var i = 0; i < dropdownItems.length; i++) {
        var dropdownLiItem = document.createElement('li');
        var dropdownLink = document.createElement('a');
        dropdownLink.id = "idOpcoes"

        if (i === 3) {
            dropdownLink.onclick = sairUser;
            dropdownLink.href = "./index.html";
        }

        dropdownLink.className = 'dropdown-item dropdown-button';
        dropdownLink.textContent = dropdownItems[i];

        dropdownLiItem.appendChild(dropdownLink);
        dropdownUl.appendChild(dropdownLiItem);
    }

    dropdownLi.appendChild(dropdownUl);
    ul.appendChild(dropdownLi);

    // Cria o elemento li com a classe nav-item
    var cartLi = document.createElement('li');
    cartLi.className = 'nav-item';

    // Cria o elemento button com a classe navbar-icon
    var cartButton = document.createElement('button');
    cartButton.className = 'navbar-icon';
    cartButton.type = 'button';

    // Cria o elemento i com as classes fas, fa-shopping-cart e navbar-icon
    var cartLink = document.createElement('a');
    var cartIcon = document.createElement('i');
    cartIcon.style.color = '#fff';
    cartIcon.className = 'fas fa-shopping-cart navbar-icon';
    cartLink.href = "./carrinho.html"
    cartLink.appendChild(cartIcon);
    cartButton.appendChild(cartLink);
    cartLi.appendChild(cartButton);
    ul.appendChild(cartLi);

    collapseDiv.appendChild(ul);
    container.appendChild(header);
    container.appendChild(collapseDiv);
    nav.appendChild(container);

    // Adiciona o nav como o primeiro filho do body
    document.body.insertBefore(nav, document.body.firstChild);
    var test = document.getElementById('myInput')
    test.addEventListener('keypress', pesquisarEnter);

    var dropdownButtons = document.getElementsByClassName('dropdown-button');

    for (var j = 0; j < dropdownButtons.length; j++) {
        dropdownButtons[j].addEventListener('click', buttonClicked);
    }
}

function excluirNav() {
    var nav = document.querySelector('.navbar');
    if (nav) {
        nav.parentNode.removeChild(nav);
    }
}

function attLogin() {
    var idPerfil = localStorage.getItem('idPerfil')
    if (!(idPerfil == null)) {
        excluirNav()
        createNav()
    }
}

function sairUser() {
    localStorage.removeItem('idPerfil');
    localStorage.removeItem('idUsuario');
    attLogin();
}

function pesquisarEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        pesquisar()
    }
}

function pesquisar() {
    var input = document.getElementById('myInput');

    if (input.value.length > 0 && (input.value.trim() != '')) {
        localStorage.setItem("catalogo", input.value);
        window.location.href = './catalogo.html';
    }
}

function buttonClicked(event) {
    var buttonText = event.target.textContent;

    if (buttonText === 'Minha conta') {
        localStorage.setItem('opcao', 'my-account')
        window.location.href = './infosUsuario.html';
    } else if (buttonText === 'Anunciar') {
        localStorage.setItem('opcao', 'anuncio')
        window.location.href = './infosUsuario.html';
    } else if (buttonText === 'Meus pedidos') {
        localStorage.setItem('opcao', 'my-orders')
        window.location.href = './infosUsuario.html';
    }
}


attLogin();