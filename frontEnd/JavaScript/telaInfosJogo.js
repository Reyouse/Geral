// Alterando ícone do carrinho
$(document).ready(function(){
  $('#cartCheck').hide();

  $('#cartAdd').click(function(){
    $('#cartAdd').hide();
    $('#cartCheck').show();
  });
});
