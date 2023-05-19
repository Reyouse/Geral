// Alterando a opacidade do site ao abrir o modal
$('.openModal').click(function() {
    $('.modal').show();
    $('body').css('overflow', 'hidden');
  });
  
// Fechando o modal ao clicar no x
$('.btn-close').click(function(){
    $('.modal').hide();
    $('body').css('overflow-y', 'auto');
});

const id = '03o8at3jgk7vr2ob6iux3hrjqqya0g';
const secret = 'j3ddf1zvjn1s8r5e98xw4pqfsavzx6';
const token = 'ikxnw58wdz2ux847egryqas114flhx';

const baseEndpoint = 'https://api.igdb.com/v4/games';

// Configurar as opções da requisição
const requestOptions = {
  method: 'GET',
  headers: {
    'Client-ID': id,
    'Authorization': `Bearer ${token}`,
  },
};

// Fazer a requisição à API
fetch(baseEndpoint, requestOptions)
  .then(response => response.json())
  .then(gameData => {
    console.log(gameData);
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });