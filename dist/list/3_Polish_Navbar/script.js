window.addEventListener('load', function () {
  const menuTrigger = document.getElementById('menu-trigger');
  const menu = document.getElementById('navigation__menu');

  menuTrigger.addEventListener('click', function () {
    menuTrigger.classList.toggle('menu-trigger--active');
    menu.classList.toggle('navigation__menu--open');
  })



});