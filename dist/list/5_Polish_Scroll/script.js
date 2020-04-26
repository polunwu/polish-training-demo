window.addEventListener('load', function () {
  // DOM Object
  const menuTrigger = document.getElementById('menu-trigger');
  const menu = document.getElementById('navigation__menu');
  const menuRight = document.getElementById('navigation__menu-right');

  // GSAP Timelines
  // - header
  const showHeader = gsap.timeline();
  showHeader.from('.header-title', {
    delay: 0.1,
    duration: 1.2,
    stagger: 0.1,
    ease: "power1.out",
    y: 50,
    autoAlpha: 0
  });
  // - menu
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

  // ScrollMagic
  const controller = new ScrollMagic.Controller();
  // - featureWork title **only once**
  document.querySelectorAll('.js-showFeatureTitle').forEach(function (element, i) {
    gsap.set(element, { opacity: 0, y: "50%", skewY: "-2.5deg" });
    let tl = new gsap.timeline();
    tl.to(element, {
      duration: 1.2,
      opacity: 1,
      y: "0%",
      skewY: "0deg",
      ease: "expo.out"
    });
    new ScrollMagic.Scene({
      triggerElement: element.parentElement,
      triggerHook: 0.85,
      reverse: false,
      offset: i == 0 ? -50 : 150
    })
      .setTween(tl)
      // .addIndicators({
      //   name: 'revealTitle ' + i,
      //   colorStart: "#ddd",
      //   colorEnd: "#ddd",
      //   colorTrigger: "#ddd"
      // })
      .addTo(controller);
  });
  // - reveal mask
  gsap.set('.js-revealMask', { x: 0 });
  let revealMask = gsap.to('.js-revealMask', {
    duration: 0.8,
    xPercent: 100,
    ease: "expo.inOut"
  })
  new ScrollMagic.Scene({
    triggerElement: '.js-feature-work__preview',
    triggerHook: 0.5
  })
    .setTween(revealMask)
    // .addIndicators({
    //   name: 'revealMask',
    //   colorStart: "#ddd",
    //   colorEnd: "#ddd",
    //   colorTrigger: "#ddd"
    // })
    .addTo(controller);
  // - bg color timeline
  /*gsap.set('.js-preview-bg', { backgroundColor: "rgb(255,90,0)" });
  changeBgColor.to('.js-preview-bg', { backgroundColor: "rgb(57,59,118)" })
    .to('.js-preview-bg', { backgroundColor: "rgb(31,35,83)" });*/
  gsap.set('.js-preview-bg', { backgroundColor: "rgb(242,218,53)" });
  let changeBgColor = new gsap.timeline();
  changeBgColor.to('.js-preview-bg', { backgroundColor: "rgb(124,229,250)" })
    .to('.js-preview-bg', { backgroundColor: "rgb(23,156,119)" });
  new ScrollMagic.Scene({
    triggerElement: '.js-preview-spacer',
    triggerHook: 'onLeave',
    duration: "200%"
  })
    .setPin('.js-preview-spacer')
    .setTween(changeBgColor)
    // .addIndicators({
    //   name: 'changeBgColor & Pin d=200%',
    //   colorStart: "#ddd",
    //   colorEnd: "#ddd",
    //   colorTrigger: "#ddd"
    // })
    .addTo(controller);
  // - reveal entire preview images list 
  gsap.set('.js-preview-list', { opacity: 0 });
  let revealPreviewList = new gsap.timeline();
  revealPreviewList.to('.js-preview-list', {
    duration: 0.4,
    opacity: 1,
    ease: "expo.inOut"
  });
  new ScrollMagic.Scene({
    triggerElement: '.js-preview-spacer',
    triggerHook: 0.2
  })
    .setTween(revealPreviewList)
    // .addIndicators({
    //   name: 'revealPreviewList',
    //   colorStart: "#ddd",
    //   colorEnd: "#ddd",
    //   colorTrigger: "#ddd",
    //   indent: 500
    // })
    .addTo(controller);
  // - slide preview images list 
  gsap.set('.js-preview-list', { x: 0 });
  let slidePreviewList = new gsap.timeline();
  slidePreviewList.to('.js-preview-list', {
    x: "-500%",
    ease: "none"
  });
  new ScrollMagic.Scene({
    triggerElement: '.js-preview-spacer',
    triggerHook: 0.2,
    duration: "230%"
  })
    .setTween(slidePreviewList)
    // .addIndicators({
    //   name: 'slidePreviewList',
    //   colorStart: "#ddd",
    //   colorEnd: "#ddd",
    //   colorTrigger: "#ddd",
    //   indent: 700
    // })
    .addTo(controller);


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