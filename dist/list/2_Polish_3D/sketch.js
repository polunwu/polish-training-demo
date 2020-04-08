let polishman;

function preload() {
  polishman = loadModel('polish_man.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0);
  scale(1.8);
  rotateX(radians(180));
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  normalMaterial();
  model(polishman);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}