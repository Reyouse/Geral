function atualizarImagens() {
    fetch('https://reyouseback.azurewebsites.net/destaques')
        .then(response => response.json())
        .then(data => {
            const thumbnails = document.querySelectorAll('.thumbnail');
            const capas = document.querySelectorAll('#carroselimg');
            const titulosCarrossel = document.querySelectorAll('#carrosselGames .carousel-caption h1');
            const carrossel = document.querySelectorAll("#carrosselGames .carousel-caption p");
            const botoes = document.querySelectorAll("#btnComprar")

            // Iterar sobre as imagens e atualizar o atributo src
            thumbnails.forEach((imagem, index) => {
                if (data[index]) {
                    imagem.src = data[index].banner;
                }
            });

            capas.forEach((imagem, index) => {
                if (data[index]) {
                    imagem.src = data[index].banner;
                }
            });

            titulosCarrossel.forEach((titulos, index) => {
                if (data[index]) {
                    titulos.textContent = data[index].titulo;
                }
            });

            carrossel.forEach((desc, index) => {
                if (data[index]) {
                    desc.textContent = data[index].descricao.substring(0, 500) + "...";
                }
            });

            botoes.forEach((botaos, index) => {
                if (data[index]) {
                    botaos.id = data[index].idAnuncio
                }
            })
        })
        .catch(error => {
            // Tratamento de erro, caso ocorra algum problema na requisição
            console.error('Ocorreu um erro:', error);
        });
}

function catalogo(produto) {
    localStorage.setItem('catalogo', produto)
    window.location.href = '../HTML/catalogo.html';
}

function passarID(valor) {
    localStorage.setItem('produto', valor)
    window.location.href = './telaInfosJogo.html';
}

atualizarImagens();