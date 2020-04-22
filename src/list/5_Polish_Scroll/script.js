window.addEventListener('load', function () {
  // DOM Object
  const menuTrigger = document.getElementById('menu-trigger');
  const menu = document.getElementById('navigation__menu');
  const menuRight = document.getElementById('navigation__menu-right');

  // GSAP Timelines
  const showHeader = gsap.timeline();
  showHeader.from('.header-title', {
    delay: 0.1,
    duration: 1.2,
    stagger: 0.1,
    ease: "power1.out",
    y: 50,
    autoAlpha: 0
  });
  const fadeInMenuItems = gsap.timeline();
  fadeInMenuItems.from('.navigation-links__item', {
    delay: 0.7,
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.out",
    y: 30,
    opacity: 0
  });
  fadeInMenuItems.pause();
  const fadeOutMenuItems = gsap.timeline();
  fadeOutMenuItems.to('.navigation-links__item', {
    duration: 0.3,
    ease: "power4.out",
    y: "-=30",
    opacity: 0
  });
  fadeOutMenuItems.pause();

  menuTrigger.addEventListener('click', function () {
    if (menuTrigger.classList.contains('menu-trigger--active')) {
      fadeInMenuItems.pause();
      fadeOutMenuItems.restart();
    } else {
      fadeOutMenuItems.pause();
      fadeInMenuItems.restart();
    }
    menuTrigger.classList.toggle('menu-trigger--active');
    menu.classList.toggle('navigation__menu--open');
    menuRight.classList.toggle('navigation__menu-right--is-open');
  });

});