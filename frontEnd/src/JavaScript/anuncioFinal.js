$(document).ready(function () {
    $('#postCheck').hide();

    $('#postConfirms').click(function (event) {
        event.preventDefault();
        $('#postJogo').hide();
        $('#postCheck').show();
        confirmar()
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
var estadoDeConservacao = localStorage.getItem('estado')

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
    
    fetch(`https://reyouseback.azurewebsites.net/cadastramidiafisica/${NomePlataforma}/${tituloDoJogo}/${descricaoSemPontuacao}/ /${novaCapa}/${novoBanner}/${novasPrints}/${idPerfil}/${preco}/${estadoDeConservacao}`)
        .then(response => response.text())
        .then(data => {
            if (data = 'Anuncio cadastrado com sucesso!') {
                alert('Enviado')
                console.log(novoBanner)
                window.location.href = './infosUsuario.html'
            }
            else {
                alert('ERROR')
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

infoJogo()