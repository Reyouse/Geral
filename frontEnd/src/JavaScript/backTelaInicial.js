function atualizarImagens() {
    fetch('https://reyouseback.azurewebsites.net/destaques')
        .then(response => response.json())
        .then(data => {
            const thumbnails = document.querySelectorAll('.thumbnail');
            const capas = document.querySelectorAll('#carroselimg');
            const titulosCarrossel = document.querySelectorAll('#carrosselGames .carousel-caption h1');
            const carrossel = document.querySelectorAll("#carrosselGames .carousel-caption p");

            // Iterar sobre as imagens e atualizar o atributo src
            thumbnails.forEach((imagem, index) => {
                imagem.src = data[index].banner;
            });

            capas.forEach((imagem, index) => {
                imagem.src = data[index].banner;
            });

            titulosCarrossel.forEach((titulos, index) => {
                titulos.textContent = data[index].titulo;
            });

            carrossel.forEach((desc, index) => {
                desc.textContent = data[index].descricao.substring(0, 500) + "...";
            });
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

atualizarImagens();