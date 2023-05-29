// Deixando CPF no formato correto
const campoCpf = document.getElementById('cpf');
campoCpf.addEventListener('input', function () {
  let cpf = campoCpf.value;

  // Impedindo que o usuário digite caracteres que não sejam números
  cpf = cpf.replace(/\D/g, ''); // Esses caracteres são substituídos por um espaço vazio

  // Aplicando máscara para deixar o CPF no formato correto
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  campoCpf.value = cpf;
});

// Deixando número de telefone no formato correto
const campoCel = document.getElementById('celular');
campoCel.addEventListener('input', function () {
  let cel = campoCel.value;

  // Impedindo que o usuário digite caracteres que não sejam números
  cel = cel.replace(/\D/g, ''); // Esses caracteres são substituídos por um espaço vazio

  // Aplicando máscara para deixar o número de telefone no formato correto
  cel = cel.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');

  campoCel.value = cel;
});