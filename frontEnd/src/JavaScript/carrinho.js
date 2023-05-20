
// botão de lixeira
var trashButton = document.querySelector("#itemCarrinho .fa-trash-alt");

trashButton.addEventListener("click", function() {
  // pega o item selecionado
  var itemCarrinho = this.closest("#itemCarrinho");

  // remove o item
  itemCarrinho.remove();
});



