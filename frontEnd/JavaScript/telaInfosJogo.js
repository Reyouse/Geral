// Alterando a opacidade do site ao abrir o modal
$('.openModal').click(function() {
    $('.modal').show();

    // Corpo transparente
    $('main').css({
        'opacity': '50%'
    });

    // Cabeçalho transparente
    $('header').css({
        'opacity': '50%'
    });

    // Rodapé transparente
  });
  
// Fechando o modal ao clicar no x
$('.close').click(function(){
    $('.modal').hide();
    $('body').css('opacity', '100%');
});