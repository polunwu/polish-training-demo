window.addEventListener('load', function () {
  const menuTrigger = document.getElementById('menu-trigger');
  const menu = document.getElementById('navigation__menu');
  const menuRight = document.getElementById('navigation__menu-right');

  menuTrigger.addEventListener('click', function () {
    menuTrigger.classList.toggle('menu-trigger--active');
    menu.classList.toggle('navigation__menu--open');
    menuRight.classList.toggle('navigation__menu-right--is-open');
  })



});