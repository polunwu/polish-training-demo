window.addEventListener('load', function () {

  const navItems = document.querySelectorAll('.nav-item a');
  const previewImg = document.querySelector('.project-preview');
  const progressBar = document.querySelector('.progressbar');
  const body = document.body;
  const html = document.documentElement;
  let dheight = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
  let wheight = window.innerHeight;

  gsap.set('.project-preview', { scaleX: 0 });
  gsap.from('.nav-item', {
    duration: 0.5,
    stagger: 0.2,
    ease: "power1.out",
    y: "+=80",
    opacity: 0
  });

  window.addEventListener('scroll', event => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    let scrollPersent = scrollTop / (dheight - wheight);
    progressBar.style.transform = `scaleY(${scrollPersent})`;
  });

  navItems.forEach((navItem, index) => {
    navItem.addEventListener('mouseover', event => {
      previewImg.style.backgroundImage = `url('https://picsum.photos/400/600?random=${index}')`;
      showPreviewImg();
    });
    navItem.addEventListener('mouseout', event => {
      hidePreviewImg();
    });
  })

  document.addEventListener('mousemove', event => {
    MouseTrail(event);
  })

  function MouseTrail(event) {
    gsap.to('.cursor', {
      x: function () {
        return event.pageX + 10;
      },
      y: function () {
        return event.pageY;
      },
      stagger: 0.1
    })
  }
  function showPreviewImg() {
    gsap.to(previewImg, {
      duration: 0.8,
      ease: "expo.inOut",
      scaleX: 1
    });
  }
  function hidePreviewImg() {
    gsap.to(previewImg, {
      duration: 0.5,
      ease: "expo.inOut",
      scaleX: 0
    });
  }
});