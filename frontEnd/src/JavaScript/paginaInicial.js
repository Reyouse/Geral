document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('#thumbnails img');
        
        // adiciona um evento de click a cada imagem de thumb
        thumbnails.forEach((thumbnail) => {
            thumbnail.addEventListener('click', () => {
                // pega o indice da imagem clicada
                const index = Array.from(thumbnails).indexOf(thumbnail);
                
                // seleciona o carrossel
                const carousel = document.querySelector('#carouselExampleCaptions');
                
                // move o carrossel para o slide clicado
                const carouselBS = bootstrap.Carousel.getInstance(carousel);
                carouselBS.to(index);
            });
        });
});

// Funçao para alterar a imagem dos cards ao passar o mouse
function changeImage(card) {
    var cardImage = card.querySelector('.card-image');
        if (cardImage.src.includes('logotipo-do-xbox.png')){
            cardImage.src = '/Geral/frontEnd/src/imgs/logotipo-do-xbox-black.png';
        }
        else if (cardImage.src.includes('logotipo-do-playstation.png')) {
            cardImage.src = '/Geral/frontEnd/src/imgs/logotipo-do-playstation-black.png';
        }
        else if (cardImage.src.includes('pc.png')) {
            cardImage.src = '/Geral/frontEnd/src/imgs/pc-black.png';
        }
}

// Função para restaurar a imagem após retirar o mouse
function restoreImage(card) {
    var cardImage = card.querySelector('.card-image');
    if (cardImage.src.includes('logotipo-do-xbox-black.png')){
        cardImage.src = '/Geral/frontEnd/src/imgs/logotipo-do-xbox.png';
    }
    else if (cardImage.src.includes('logotipo-do-playstation-black.png')) {
        cardImage.src = '/Geral/frontEnd/src/imgs/logotipo-do-playstation.png';
    }
    else if (cardImage.src.includes('pc-black.png')) {
        cardImage.src = '/Geral/frontEnd/src/imgs/pc.png';
    }
  }


