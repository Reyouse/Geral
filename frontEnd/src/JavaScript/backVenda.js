function botaoHabilitar() {
    const form = document.querySelector('.boxx-anuncio');
    const inputs = form.querySelectorAll('input');
    const radios = form.querySelectorAll('input[type="radio"]');
    const btnDados = form.querySelector('#btnDados');

    function submitForm(event) {
        event.preventDefault();

        var nomeJogo = document.getElementById("nome_jogo").value.trim()
        var preco = document.getElementById("preco").value.trim()
        var plataformaSelecionada = document.querySelector('input[name="plataforma_jogo"]:checked').value.trim()
        var conservacaoSelecionada = document.querySelector('input[name="estado_conservacao"]:checked').value.trim()
        if(nomeJogo != '') {
            publicar(nomeJogo, preco, plataformaSelecionada, conservacaoSelecionada)
        }
        else {
            alert('Nome de Jogo Invalido!')
        }
        console.log(nomeJogo, preco, plataformaSelecionada, conservacaoSelecionada)
    }

    function checkFormValidity() {
        let allFilled = true;
        let allChecked = true;

        inputs.forEach(input => {
            if (input.type !== 'radio' && input.value === '') {
                allFilled = false;
            }
        });

        radios.forEach(radio => {
            const radioGroupName = radio.getAttribute('name');
            const checked = form.querySelector(`input[name="${radioGroupName}"]:checked`);

            if (!checked) {
                allChecked = false;
            }
        });

        if (allFilled && allChecked) {
            btnDados.removeAttribute('disabled');
        } else {
            btnDados.setAttribute('disabled', true);
        }
    }

    inputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });

    radios.forEach(radio => {
        radio.addEventListener('change', checkFormValidity);
    });

    btnDados.addEventListener('click', submitForm);
}

$(document).ready(function () {
    $("#nome_jogo").autocomplete({
        source: function (request, response) {
            var searchTerm = encodeURIComponent(request.term);

            var url = "https://reyouseback.azurewebsites.net/pesquisaigdb/" + searchTerm;

            $.ajax({
                url: url,
                dataType: "json",
                success: function (data) {
                    var options = data.map(function (item) {
                        return item.nome; // Extrai o nome do jogo do objeto JSON
                    });

                    response(options);
                }
            });
        }
    });
});

function validarPreco() {
    const inputPreco = document.getElementById("preco");

    inputPreco.addEventListener("input", function (e) {
        const inputValue = e.target.value.replace(/[^\d]/g, "");

        let numericValue = Number(inputValue);
        if (isNaN(numericValue)) {
            numericValue = 0;
        }

        const maxValue = 9999999999999.99;
        numericValue = Math.min(numericValue, maxValue);

        numericValue /= 100;

        const formattedValue = numericValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

        e.target.value = formattedValue;
    });
}

function publicar(nome, preco, plataforma, conservacao) {

    if(plataforma == 'XBOX') {
        plataforma = 'Xbox'
    }
    else if(plataforma == 'PlayStation') {
        plataforma = 'Playstation'
    }
    fetch(`https://reyouseback.azurewebsites.net/pesquisaigdb/${nome}`)
        .then(response => response.json())
        .then(data => {
            if (data[0]) {
                var capa = encodeURIComponent(data[0].capa);

                fetch(`https://reyouseback.azurewebsites.net/cadastramidiafisica/`)
                    .then(response => response.json())
                    .then(data => {
                        
                    })
                    .catch(error => {
                        console.error('Ocorreu um erro:', error);
                    });
            }
            else {
                alert('Nome de Jogo Invalido!');
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

botaoHabilitar()
validarPreco()