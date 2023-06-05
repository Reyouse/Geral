$(document).ready(function () {
    $('#postCheck').hide();

    $('#postConfirm').click(function(){
        $('#postJogo').hide();
        $('#postCheck').show();
    });
});

const btnConfirmar = document.getElementById('postConfirm')
btnConfirmar.addEventListener('click', ()=>{
    window.location.href = 'index.html';
});

