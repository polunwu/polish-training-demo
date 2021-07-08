// 隨機生成 0 到 (max-1) 的整數
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

window.addEventListener('load', () => {
  let loader = document.querySelector('#loader');
  let model = document.querySelector('#bowser-model');
  let modelPath = '';

  // 模型載入事件
  model.addEventListener('model-loaded', function () {
    console.log('model-loaded')
    setTimeout(() => {
      loader.classList.add('hide');
    }, 1000);
  })
  model.addEventListener('model-error', function () {
    console.log('model-loaded');
    loader.textContent = '錯誤';
    loader.classList.remove('hide');
  })
  
  // 隨機生成模型
  if(getRandomInt(2) === 0) { // 0, 1 隨機對應 model 路徑
    modelPath = "model/untitled/Untitled.gltf"
  } else {
    modelPath = "model/water/water.gltf"
  }
  console.log(modelPath)
  model.setAttribute('gltf-model', modelPath)
});
