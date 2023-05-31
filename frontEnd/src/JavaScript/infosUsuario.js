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

addClickListeners()