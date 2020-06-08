window.locale = "tw";
window.i18n = function(string) {
  return window.translations[`${window.locale}`][`${string}`];
}
window.translations = {
  "tw": {
    "header": "你好啊",
    "apple": "我是蘋果",
    "banana": "我是香蕉",
    "guava": "我是芭樂",
    "submit": "提交",
    "paragraph": "來到士林夜市，好奇的Meghan大膽的嘗遍豬血糕、藥燉排骨、滷肉飯、小籠包等小吃，就連讓許多外國人怯步的臭豆腐她都欣然嘗試。意想不到的是，她嚐過後竟讚不絕口，說道：「它吃起來的味道跟聞起來完全不同！好希望能在吃一次。」"
  },
  "en": {
    "header": "Hello there",
    "apple": "I am Apple",
    "banana": "I am Banana",
    "guava": "I am Guava",
    "submit": "SUBMIT",
    "paragraph": "At the Shilin Night Market, curiosity leads her to boldly taste snacks such as pig’s blood cake, stewed pork ribs, braised pork rice, soup dumplings, and even the stinky tofu that makes many foreigners cringe. Surprisingly, after tasting it, she loved it, saying: “It tastes completely different from the smell! I want to try it again.”"
  }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    // determine & set current language
    if (window.locale !== e.target.dataset.lang) {

      window.locale = e.target.dataset.lang;
      
      // translate all text feilds
      document.querySelectorAll('[data-field]').forEach(el => {
        el.innerText = i18n(el.dataset.field.toLowerCase());
      });

    }

    // toggle active styles
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('lang-btn--active');
    })
    e.target.classList.add('lang-btn--active');
  })
})


