let balls = [];

// config
const BALL_COUNT = 150;
const BALL_MIN_SIZE = 5;
const BALL_MAX_SIZE = 170;
const BALL_MAX_RADIUS = BALL_MAX_SIZE / 2;
const BALL_SPEED = 1;
// end of config

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < BALL_COUNT; i++) {
    let x = random(BALL_MAX_RADIUS, width - BALL_MAX_RADIUS);
    let y = random(BALL_MAX_RADIUS, height - BALL_MAX_RADIUS);
    balls.push(new Ball(x, y));
  }
}

function draw() {
  background(0);
  for (let ball of balls) {
    ball.init();
  }
}

function mousePressed() {
  for (let ball of balls) {
    ball.clicked(mouseX, mouseY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpeed = random(-BALL_SPEED, BALL_SPEED);
    this.ySpeed = random(-BALL_SPEED, BALL_SPEED);
    this.size = random(BALL_MIN_SIZE, BALL_MAX_SIZE);
  }

  clicked(x, y) {
    let d = dist(x, y, this.x, this.y);
    if (d < this.size / 2) {
      this.size = 5;
      this.xSpeed = random(-0.25, 0.25);
      this.ySpeed = random(-0.25, 0.25);
    }
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  bounce() {
    if (this.x > width - this.size / 2 || this.x < 0 + this.size / 2) {
      this.xSpeed *= -1;
    }
    if (this.y > height - this.size / 2 || this.y < 0 + this.size / 2) {
      this.ySpeed *= -1;
    }
  }
  show() {
    ellipse(this.x, this.y, this.size);
  }
  init() {
    this.move();
    this.bounce();
    this.show();
  }
}