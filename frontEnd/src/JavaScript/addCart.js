const idPerfil = localStorage.getItem('idPerfil');
const idProduto = localStorage.getItem('produto');

function minhaFuncao() {
    var valid = true
    if (idPerfil) {
        fetch(`https://reyouseback.azurewebsites.net/vercarrinho/${idPerfil}`)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].idAnuncio == idProduto) {
                        var modalCart = document.getElementById('modalCarrinho')
                        modalCart.innerText = 'Produto Já Presente No Carrinho!'
                        valid = false
                        break
                    }
                }
                if (valid) {
                    fetch(`https://reyouseback.azurewebsites.net/addcarrinho/${idPerfil}/${idProduto}`)
                        .then(response => response.text())
                        .then(data => {
                            if (data == `Anúncio ${idProduto} adicionado ao carrinho.`) {
                            }
                        })
                        .catch(error => {
                            console.error('Ocorreu um erro:', error);
                        });
                }
                else {

                }
            })
            .catch(error => {
                console.error('Ocorreu um erro:', error);
            });

    } else {
        window.location.href = './telaAutenticacao.html'
    }
}

var botao = document.getElementById("cartAdd");
botao.addEventListener("click", minhaFuncao);