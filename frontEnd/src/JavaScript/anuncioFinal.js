$(document).ready(function () {
    $('#postCheck').hide();

    $('#postConfirms').click(function (event) {
        event.preventDefault();
        $('#postJogo').hide();
        $('#postCheck').show();
        if(alterar == 'sim') {
            alterarAnun()
        }
        else {
            confirmar()
        }
    });
});

var NomePlataforma = localStorage.getItem('nomeDaPlataforma')
var tituloDoJogo = localStorage.getItem('nomeDoJogo')
var descricao = localStorage.getItem('descricao')
var capa = localStorage.getItem('capa')
var banner = localStorage.getItem('banner')
var prints = localStorage.getItem('prints')
var idPerfil = localStorage.getItem('idPerfil')
var preco = localStorage.getItem('preco')

var alterar = localStorage.getItem('alterar')
var idAlterar = localStorage.getItem('idAlterar')
var tipoJogo = localStorage.getItem('tipoJogo')


if (localStorage.getItem('acesso')) {
    var estado = localStorage.getItem('acesso')
    var tipoCad = 'cadastramidiavirtual'
}
else {
    var estado = localStorage.getItem('estado')
    var tipoCad = 'cadastramidiafisica'
}

function infoJogo() {

    var elemento = document.getElementById("conteudosJogo");
    var elementoImg = document.getElementById("imgJogo");
    var elementoPreco = document.getElementById("precoJogo")

    var titulo = elemento.getElementsByTagName("h5")[0];
    var paragrafo = elemento.querySelector("p");

    titulo.innerText = tituloDoJogo

    if (descricao.length <= 531) {
        paragrafo.textContent = descricao

    } else {
        paragrafo.textContent = descricao.substring(0, 531) + "...";
    }

    elementoImg.src = capa;
    elementoImg.alt = tituloDoJogo

    var paddingBottom = elemento.style.paddingBottom;
    var paddingTop = elemento.style.paddingTop;
    var aux = 1
    while ((elemento.scrollHeight + paddingBottom + paddingTop) < 480) {
        elemento.style.paddingBottom = aux + "px"
        aux++
    }
    var precoFormatado = parseFloat(preco)
    elementoPreco.innerText += " " + precoFormatado.toFixed(2).toString().replace('.', ',');

}

function confirmar() {
    var descricaoSemPontuacao = descricao.replace(/[,./'"?]/g, '');
    var novaCapa = capa.replace(/\//g, '*');
    var novoBanner = banner.replace(/\//g, '*');
    var novasPrints = prints.replace(/\//g, '*');
    tituloDoJogo = tituloDoJogo.replace(/[,./'"?]/g, '');

    fetch(`https://reyouseback.azurewebsites.net/${tipoCad}/${NomePlataforma}/${tituloDoJogo}/${descricaoSemPontuacao}/NULL/${novaCapa}/${novoBanner}/${novasPrints}/${idPerfil}/${preco}/${estado}`)
        .then(response => response.text())
        .then(data => {
            if (data == 'Anuncio cadastrado com sucesso!') {
                limparLocalStorage();
            }
            else {
                alert('ERROR')
            }
        })
        .catch(error => {
            alert('ERROR')
            console.error('Ocorreu um erro:', error);
        });
}

function alterarAnun() {
    var descricaoSemPontuacao = descricao.replace(/[,./'"?]/g, '');
    var novaCapa = capa.replace(/\//g, '*');
    var novoBanner = banner.replace(/\//g, '*');
    var novasPrints = prints.replace(/\//g, '*');
    tituloDoJogo = tituloDoJogo.replace(/[,./'"?]/g, '')

    var estadoDeCon = 'null'
    var formaDeAcesso = 'null'

    if (estado == 'Excelente' || estado == 'Muito Bom' || estado == 'Bom' || estado == 'Regular') {
        estadoDeCon = estado
    } else {
        formaDeAcesso = estado
    }

    if (tipoJogo == 'Fisica') {
        tipoJogo = 'fisica'
    }
    else if (tipoJogo == 'Virtual') {
        tipoJogo = 'virtual'
    }

    fetch(`https://reyouseback.azurewebsites.net/alteraanuncio/${idAlterar}/${tipoJogo}/${NomePlataforma}/${tituloDoJogo}/${descricaoSemPontuacao}/null/${novaCapa}/${novoBanner}/${novasPrints}/${idPerfil}/${preco}/${estadoDeCon}/${formaDeAcesso}`)
        .then(response => response.text())
        .then(data => {
            if (data == 'Anuncio cadastrado com sucesso!') {
                limparLocalStorage();
            }
            else {
                alert('ERROR')
            }
        })
        .catch(error => {
            alert('ERROR')
            console.error('Ocorreu um erro:', error);
        });
}

function limparLocalStorage() {
    localStorage.removeItem('nomeDaPlataforma');
    localStorage.removeItem('nomeDoJogo');
    localStorage.removeItem('descricao');
    localStorage.removeItem('capa');
    localStorage.removeItem('banner');
    localStorage.removeItem('prints');
    localStorage.removeItem('preco');
    localStorage.removeItem('estado');
    localStorage.removeItem('acesso');

    localStorage.removeItem('alterar');
    localStorage.removeItem('idAlterar');
    localStorage.removeItem('tipoJogo');
}

var botaoOkay = document.getElementById('postConfirms2')
botaoOkay.addEventListener('click', () => {
    window.location.href = "./infosUsuario.html";
});

infoJogo()