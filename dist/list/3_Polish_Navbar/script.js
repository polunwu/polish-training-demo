window.addEventListener('load', function () {
  const menuTrigger = document.getElementById('menu-trigger');
  const menu = document.getElementById('navigation__menu');
  const menuRight = document.getElementById('navigation__menu-right');

  menuTrigger.addEventListener('click', function () {
    if (menuTrigger.classList.contains('menu-trigger--active')) {
      fadeOutMenuItems();
    } else {
      fadeInMenuItems();
    }
    menuTrigger.classList.toggle('menu-trigger--active');
    menu.classList.toggle('navigation__menu--open');
    menuRight.classList.toggle('navigation__menu-right--is-open');

  })

  function fadeInMenuItems() {
    gsap.from('.navigation-links__item', {
      delay: 0.7,
      duration: 0.5,
      stagger: 0.1,
      ease: "power1.out",
      y: "+=30",
      opacity: 0
    });
  }

  function fadeOutMenuItems() {
    gsap.to('.navigation-links__item', {
      duration: 0.3,
      ease: "power4.out",
      y: "-=30",
      opacity: 0,
      onComplete: function () {
        gsap.to('.navigation-links__item', {
          duration: 0.5,
          delay: 0.7,
          y: "+=30",
          opacity: 1,
        });
      }
    })
  }

});