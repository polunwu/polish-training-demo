// 隨機生成 0 到 (max-1) 的整數
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

window.addEventListener('load', () => {
  let model = document.querySelector('#bowser-model');
  let modelPath = '';
  
  if(getRandomInt(2) === 0) { // 0, 1 隨機對應 model 路徑
    modelPath = "model/untitled/Untitled.gltf"
  } else {
    modelPath = "model/water/water.gltf"
  }
  
  console.log(modelPath)
  model.setAttribute('gltf-model', modelPath)
});
