function validaCPF(cpf) {
    // Removendo caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
  
    // Verificando se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }
  
    // Verificando se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }
  
    // Calculando o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let primeiroDigito = (soma * 10) % 11;
    if (primeiroDigito === 10) {
      primeiroDigito = 0;
    }
  
    // Verificando o primeiro dígito verificador
    if (parseInt(cpf.charAt(9)) !== primeiroDigito) {
      return false;
    }
  
    // Calculando o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let segundoDigito = (soma * 10) % 11;
    if (segundoDigito === 10) {
      segundoDigito = 0;
    }
  
    // Verificando o segundo dígito verificador
    if (parseInt(cpf.charAt(10)) !== segundoDigito) {
      return false;
    }
  
    // CPF válido
    return true;
}

module.exports = {
    validaCPF,
}