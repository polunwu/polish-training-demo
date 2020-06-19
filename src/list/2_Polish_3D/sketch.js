let polishman;

function preload() {
  polishman = loadModel('polish_man.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

let SCALE = 4.1;

let env = {
  x_pos: 40,
  x_off: 0,
  y_pos: 50,
  y_off: 1,
  z_pos: 0,
  z_off: 2,
  angle: 0,
  speed: 1
}
let man = {
  x: {
    angle: 180,
    speed: 0.15
  },
  y: {
    angle: 90,
    speed: 0.5
  },
  z: {
    angle: 15,
    speed: 0.15
  }
}

function draw() {
  background(0);
  scale(SCALE);
  env.x_off += 0.0025;
  env.y_off += 0.0025;
  env.z_off += 0.0025;
  env.x_pos = noise(env.x_off) * 100 - 50;
  env.y_pos = noise(env.y_off) * 60 - 10;
  translate(env.x_pos, env.y_pos, env.z_pos);
  rotateY(radians(env.angle)); // rotate environment

  push();
  rotateX(radians(man.x.angle));
  rotateZ(radians(man.z.angle));
  rotateY(radians(man.y.angle)); // rotate self
  normalMaterial();
  model(polishman);
  pop();

  if (man.z.angle > 90 || man.z.angle < -90) {
    man.z.speed = -1 * man.z.speed;
  }

  env.angle += env.speed;
  man.y.angle += man.y.speed;
  man.z.angle += man.z.speed;
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}