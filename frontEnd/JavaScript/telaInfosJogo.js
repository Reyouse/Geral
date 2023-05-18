// Alterando a opacidade do site ao abrir o modal
$('.openModal').click(function() {
    $('.modal').show();
    $('body').css('overflow', 'hidden');
  });
  
// Fechando o modal ao clicar no x
$('.close').click(function(){
    $('.modal').hide();
});