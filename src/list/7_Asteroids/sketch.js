const FPS         = 30;  // frames per second
const FRICTION    = 0.7; // friction coefficient of space (0 = no friction)
const SHIP_SIZE   = 30;  // ship height in pixels
const SHIP_THRUST = 5;   // accerletation of the ship in pixels per second per second
const TURN_SPEED  = 360; // turn speed in degrees per second

/** @type {HTMLCanvasDocument} */
let canv = document.getElementById('gameCanvas');
let ctx = canv.getContext('2d');

let ship = {
  x: canv.width / 2,
  y: canv.height / 2,
  r: SHIP_SIZE / 2,
  a: 90 / 180 * Math.PI, // 90 degrees covert to radius
  rot: 0,
  thrusting: false,
  thrust: {
    x: 0,
    y: 0
  }
}

// set up event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// set up the game loop
setInterval(update, 1000 / FPS);

function keyDown(/** @type {KeyboardEvent} */ ev) {
  switch (ev.keyCode) {
    case 37: // arrow left (rotate ship left)
      ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
      break;
    case 38: // arrow up (thrust the ship forward)
      ship.thrusting = true;
      break;
    case 39: // arrow right (rotate ship right)
      ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
      break;

    default:
      break;
  }
}

function keyUp(/** @type {KeyboardEvent} */ ev) {
  switch (ev.keyCode) {
    case 37: // stop rotating left
      ship.rot = 0
      break;
    case 38: // stop thrusting forward)
      ship.thrusting = false;
      break;
    case 39: // stop rotating right
      ship.rot = 0
      break;

    default:
      break;
  }
}

function update() {
  // draw space
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canv.width, canv.height);

  // thrust the ship
  if (ship.thrusting) {
    ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
    ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
    // draw the thruster
    drawThruster();
  } else {
    ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
    ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
  }

  // draw a triangular ship
  drawShip();

  // rotate ship
  ship.a += ship.rot;

  // move ship
  ship.x += ship.thrust.x;
  ship.y += ship.thrust.y;

  // handle edge of screen
  if (ship.x < 0 - ship.r) {
    ship.x = canv.width + ship.r;
  } else if (ship.x > canv.width + ship.r) {
    ship.x = 0 - ship.r;
  }
  if (ship.y < 0 - ship.r) {
    ship.y = canv.height + ship.r;
  } else if (ship.y > canv.height + ship.r) {
    ship.y = 0 - ship.r;
  }
}

function drawThruster() {
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'yellow';
  ctx.lineWidth = SHIP_SIZE / 10;
  ctx.beginPath();
  ctx.moveTo( // rear left of th ship
    ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
    ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
  )
  ctx.lineTo( // rear center behind the ship
    ship.x - ship.r * 6 / 3 * Math.cos(ship.a),
    ship.y + ship.r * 6 / 3 * Math.sin(ship.a)
  )
  ctx.lineTo( // rear rigth
    ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
    ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
  )
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawShip() {
  // draw a triangular ship
  ctx.strokeStyle = 'white';
  ctx.lineWidth = SHIP_SIZE / 20;
  ctx.beginPath();
  ctx.moveTo( // nose of th ship
    ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
    ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
  )
  ctx.lineTo( // rear left
    ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
    ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
  )
  ctx.lineTo( // rear right
    ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
    ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
  )
  ctx.closePath();
  ctx.stroke();
  // draw center dot
  ctx.fillStyle = 'red';
  ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
}