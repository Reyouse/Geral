function criarDiv() {

    fetch(`https://reyouseback.azurewebsites.net/historicovenda/${idPerfil}`)
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                var divElement = document.createElement('div');
                divElement.id = 'pedidosAnuncios';
                divElement.className = 'card mb-3';

                var dataObj = new Date(data[i].dataCompra);
                var dia = dataObj.getDate();
                var mes = dataObj.getMonth() + 1; // Os meses são indexados de 0 a 11
                var ano = dataObj.getFullYear();
                if (dia < 10) {
                    dia = "0" + dia;
                }
                if (mes < 10) {
                    mes = "0" + mes;
                }
                var dataFormatada = dia + '/' + mes + '/' + ano;

                var preco = data[i].preco;
                var precoFormatado = parseFloat(preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


                // Conteúdo interno da div
                var innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <div class="justify-content-between align-items-start">
              <img id="bannerJogo" src="${data[i].capa}" class="img-fluid rounded-3" alt="Shopping item">
            </div>
            <div id="conteudoPedido" class="ms-3">
              <h5>${data[i].titulo}</h5>
              <p class="mb-0">Tipo de mídia: ${data[i].tipo}</p>
              <p class="mb-0">Data de anúncio: ${dataFormatada}</p>
            </div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <div id="valorProduto" style="width: 120px;">
              <h5 class="mb-0">R$ ${precoFormatado}</h5>
            </div>
            <div onclick="showContainer('editar-anuncio-fisico')" class="ms-3">
              <button class="btn btn-link">
                <i style="color: #f7f7f7;" class="fas fa-pencil-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
      </svg>
    `;
                // Define o conteúdo interno da div
                divElement.innerHTML = innerHTML;

                // Obtém a div com o ID "my-adverts-container"
                var containerDiv = document.getElementById('my-adverts-container');

                // Verifica se a div existe
                if (containerDiv) {
                    // Adiciona a nova div como última filha da div container
                    containerDiv.appendChild(divElement);
                } else {
                    console.log('A div com o ID "my-adverts-container" não foi encontrada.');
                }
            }
        })
        .catch(error => {
            alert('ERROR')
            console.error('Ocorreu um erro:', error);
        });



}

criarDiv();
