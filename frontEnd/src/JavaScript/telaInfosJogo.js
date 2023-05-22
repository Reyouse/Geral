$(document).ready(function() {
  $('#cartAdd').click(function() {
    $('#cartAdd').hide();
    $('#cartCheck').show();

    setTimeout(function() {
      $('#cartAdd').show();
      $('#cartCheck').hide();
    }, 3000); // 3 segundos (3000 milissegundos)
  });
});

function openFullscreen(image) {
  if (image.requestFullscreen) {
    image.requestFullscreen();
  } else if (image.mozRequestFullScreen) { // Firefox
    image.mozRequestFullScreen();
  } else if (image.webkitRequestFullscreen) { // Chrome, Safari and Opera
    image.webkitRequestFullscreen();
  } else if (image.msRequestFullscreen) { // IE/Edge
    image.msRequestFullscreen();
  }
}