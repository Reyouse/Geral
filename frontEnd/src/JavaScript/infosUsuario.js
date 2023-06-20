const opcao = localStorage.getItem('opcao');
const idPerfil = localStorage.getItem('idPerfil');
var aux = ""

if (opcao) {
  showContainer(`${opcao}-container`)
  aux = document.getElementById(opcao);
  addClickListeners()
}

function addClickListeners() {
  var rectangles = document.getElementsByClassName('rectangle');

  // Adiciona o EventListener a cada div retangular
  for (var i = 1; i < rectangles.length; i++) {
    rectangles[i].addEventListener('click', function () {
      // Remove a classe "active" de todas as divs retangulares
      for (var j = 0; j < rectangles.length; j++) {
        rectangles[j].classList.remove('active');
      }

      // Adiciona a classe "active" apenas à div clicada
      this.classList.add('active');
    });
  }
  if (aux != "") {
    aux.classList.add('active');
    aux = ""
  }
}

function showContainer(containerId) {
  const containers = document.getElementsByClassName('content-container');
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.remove('active');
  }

  const container = document.getElementById(containerId);
  container.classList.add('active');
}

function attUser() {
  fetch(`https://reyouseback.azurewebsites.net/dadosperfil/${idPerfil}`)
    .then(response => response.json())
    .then(data => {
      var element = document.getElementById('welcome');
      element.innerText = "Olá, " + data[0].nomeUsuario

      var nameUser = document.getElementById('nameUser')
      nameUser.innerHTML = `<b>Nome de usuário: </b>${data[0].nomeUsuario}`

      var nameFull = document.getElementById('nameFull')
      nameFull.innerHTML = `<b>Nome completo: </b>${data[0].nomePerfil}`

      var sexo = 'Indefinido'
      if (data[0].sexo == 'M') {
        sexo = 'Masculino'
      } else if (data[0].sexo == 'F') {
        sexo = 'Feminino'
      }

      var campoSexo = document.getElementById('campoSexo')
      campoSexo.innerHTML = `<b>Sexo: </b>${sexo}`

      var campoEmail = document.getElementById('campoEmail')
      campoEmail.innerHTML = `<b>E-mail: </b>${data[0].email}`

      var cpf1 = data[0].cpf
      let cpfFormatado = cpf1.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
      var cpf = document.getElementById('cpf')
      cpf.innerHTML = `<b>CPF: </b>${cpfFormatado}`

      let phoneNumber = data[0].celular
      let formattedPhoneNumber = `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2)}`;

      var tel = document.getElementById('telefone')
      tel.innerHTML = `<b>Celular: </b>${formattedPhoneNumber}`
    })
    .catch(error => {
      alert('ERROR')
      console.error('Ocorreu um erro:', error);
    });
}

function attSaldo() {
  fetch(`https://reyouseback.azurewebsites.net/valorvendido/${idPerfil}`)
    .then(response => response.json())
    .then(data => {
      const elemento = document.querySelector('[name="valorVenda"]');
      let valorFormatado = data[0].valorVendido.toString().replace('.', ',');

      // Verifica se o valor possui duas casas decimais
      if (valorFormatado.indexOf(',') === -1) {
        valorFormatado += ',00'; // Adiciona duas casas decimais se não existirem
      } else {
        const decimais = valorFormatado.split(',')[1];
        if (decimais.length === 1) {
          valorFormatado += '0'; // Adiciona um zero se houver apenas uma casa decimal
        }
      }

      // Adiciona o prefixo "R$"
      valorFormatado = 'R$ ' + valorFormatado;

      elemento.textContent = valorFormatado
    })
    .catch(error => {
      alert('ERROR')
      console.error('Ocorreu um erro:', error);
    });
}

attUser()
attSaldo()
addClickListeners()