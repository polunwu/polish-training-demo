const selector = document.querySelector('.selector');

console.log(selector)
selector.addEventListener('change', (e) => {
  document.querySelector('.effect').style.mixBlendMode = e.target.value
})
