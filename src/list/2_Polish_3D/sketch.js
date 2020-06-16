let polishman;

function preload() {
  polishman = loadModel('polish_man.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0);
  scale(2.8);
  rotateY(frameCount * 0.03); // rotate environment

  push();
  rotateX(radians(180));
  rotateZ(radians(15));
  rotateY(frameCount * 0.01); // rotate self
  // rotateX(frameCount * 0.01);
  // rotateZ(frameCount * 0.01);
  normalMaterial();
  model(polishman);
  pop();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}