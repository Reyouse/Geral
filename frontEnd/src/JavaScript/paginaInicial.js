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
