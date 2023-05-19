var quantity = 2; // valor inicial

  // botão de incremento
  document.getElementById("incrementBtn").addEventListener("click", function() {
    quantity++;
    document.getElementById("quantityValue").innerText = quantity;
  });

  // botão de decremento
  document.getElementById("decrementBtn").addEventListener("click", function() {
    if (quantity > 0) {
      quantity--;
      document.getElementById("quantityValue").innerText = quantity;
    }
  });

// botão de lixeira
var trashButton = document.querySelector("#itemCarrinho .fa-trash-alt");

trashButton.addEventListener("click", function() {
  // pega o item selecionado
  var itemCarrinho = this.closest("#itemCarrinho");

  // remove o item
  itemCarrinho.remove();
});



