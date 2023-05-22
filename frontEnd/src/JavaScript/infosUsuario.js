function showContainer(containerId) {
  const containers = document.getElementsByClassName('content-container');
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.remove('active');
  }

  const container = document.getElementById(containerId);
  container.classList.add('active');
}