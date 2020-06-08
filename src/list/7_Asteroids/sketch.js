const FPS               = 30;  // frames per second
const FRICTION          = 0.7; // friction coefficient of space (0 = none friction, 1 = lots)
const GAME_LIVES        = 3;   // starting number of lives
const LASER_MAX         = 10;  // maximum number of lasers on screen at once
const LASER_DIST        = 0.5; // maximum distance laser can travel as fraction of screen width
const LASER_SPD         = 500; // speed of lasers in pixels per second
const LASER_EXPLODE_DUR = 0.2; // duration of the laser's explosion in seconds
const ROIDS_NUM         = 1;   // starting number of astroids
const ROIDS_JAG         = 0.4; // jaggedness of astroids (0 = none, 1 = lots)
const ROIDS_SIZE        = 100; // starting size of astroids in pixels
const ROIDS_SPD         = 30;  // max starting speed of astroids in pixels pre second
const ROIDS_VERT        = 10;  // average number of vertices on each astroid
const SHIP_EXPLODE_DUR  = 0.5; // duration of the ship's explosion in seconds
const SHIP_BLINK_DUR    = 0.1; // duration of the ship's blink during invisibilityin seconds
const SHIP_INV_DUR      = 3;   // duration of the ship's invisibility in seconds
const SHIP_SIZE         = 30;  // ship height in pixels
const SHIP_THRUST       = 5;   // accerletation of the ship in pixels per second per second
const TURN_SPEED        = 360; // turn speed in degrees per second
const SHOW_BOUNDING     = false; // show or hide collision bounding
const SHOW_CENTER_DOT   = false; // show or hide ship center dot
const TEXT_FADE_TIME    = 2.5;  // text fade time in seconds
const TEXT_SIZE         = 40;   // text font height in pixels

/** @type {HTMLCanvasDocument} */
let canv = document.getElementById('gameCanvas');
let ctx = canv.getContext('2d');

// set up the game parameters
let level, roids, ship, text, textAlpha;
newGame();

// set up event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// set up the game loop
setInterval(update, 1000 / FPS);

function createAsteroidBelt() {
  roids = [];
  let x, y;
  for (let i = 0; i < ROIDS_NUM + level; i++) {
    do {
      x = Math.floor(Math.random() * canv.width);
      y = Math.floor(Math.random() * canv.height);
    } while (distBetweenPoints(ship.x, ship.y, x, y) < ship.r + ROIDS_SIZE * 2);
    roids.push(newAstreroid(x, y, Math.ceil(ROIDS_SIZE / 2)));
  }
}

function destroyAsteroids(index) {
  let x = roids[index].x;
  let y = roids[index].y;
  let r = roids[index].r;

  // split the asteroid in two if necessary
  if (r == Math.ceil(ROIDS_SIZE / 2)) {
    roids.push(newAstreroid(x, y, Math.ceil(ROIDS_SIZE / 4)));
    roids.push(newAstreroid(x, y, Math.ceil(ROIDS_SIZE / 4)));
  } else if (r == Math.ceil(ROIDS_SIZE / 4)) {
    roids.push(newAstreroid(x, y, Math.ceil(ROIDS_SIZE / 8)));
    roids.push(newAstreroid(x, y, Math.ceil(ROIDS_SIZE / 8)));
  }

  // destroy the original asteroids
  roids.splice(index, 1);

  // new level when no more asteroids
  if (roids.length == 0) {
    console.log('new');
    level++;
    newLevel();
  }
}

function distBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function explodeShip() {
  ship.explodTime = Math.ceil(SHIP_EXPLODE_DUR * FPS);
}

function gameOver() {
  ship.dead = true;
  text = "GAME OVER";
  textAlpha = 1.0;
}

function keyDown(/** @type {KeyboardEvent} */ ev) {
  if (ship.dead) return;
  switch (ev.keyCode) {
    case 32: // space bar (shoot laser)
      shootLaser();
      break;
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
  if (ship.dead) return;
  switch (ev.keyCode) {
    case 32: // space bar (allow shooting)
      ship.canShoot = true;
      break;
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

function newAstreroid(x, y, r) {
  let lvlMult = 1 + 0.1 * level;
  let roid = {
    x: x,
    y: y,
    xv: Math.random() * ROIDS_SPD * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1), // with + or - direction
    yv: Math.random() * ROIDS_SPD * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
    r: r,
    a: Math.random() * 2 * Math.PI, // in radius
    vert: Math.floor(Math.random() * (ROIDS_VERT + 1) + ROIDS_VERT / 2),
    offs: []
  };
  // create the vertex offsets array
  for (let i = 0; i < roid.vert; i++) {
    roid.offs.push(Math.random() * ROIDS_JAG * 2 + 1 - ROIDS_JAG)
  }

  return roid;
}

function newGame() {
  level = 0;
  lives = GAME_LIVES;
  // set up ship object
  ship = newShip();
  newLevel();
}

function newLevel() {
  text = "Level " + (level + 1);
  textAlpha = 1.0;
  createAsteroidBelt();
}

function newShip() {
  return {
    x: canv.width / 2,
    y: canv.height / 2,
    r: SHIP_SIZE / 2,
    a: 90 / 180 * Math.PI, // 90 degrees covert to radius
    blinkNum: Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR),
    blinkTime: Math.ceil(SHIP_BLINK_DUR * FPS),
    canShoot: true,
    dead: false,
    explodTime: 0,
    lasers: [],
    rot: 0,
    thrusting: false,
    thrust: {
      x: 0,
      y: 0
    }
  }
}

function shootLaser() {
  // create the laser object
  if (ship.canShoot && ship.lasers.length < LASER_MAX) {
    ship.lasers.push({ // shoot from the nose of ship
      x: ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
      y: ship.y - 4 / 3 * ship.r * Math.sin(ship.a),
      xv: LASER_SPD * Math.cos(ship.a) / FPS,
      yv: -LASER_SPD * Math.sin(ship.a) / FPS,
      dist: 0,
      explodTime: 0
    })
  }
  // prevent further shooting
  ship.canShoot = false;
}

function update() {
  let blinkOn = ship.blinkNum % 2 == 0;
  let exploding = ship.explodTime > 0;

  // draw space
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canv.width, canv.height);

  // thrust the ship
  if (ship.thrusting && !ship.dead) {
    ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
    ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
    // draw the thruster
    if (!exploding && blinkOn) {
      drawThruster();
    }
  } else {
    ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
    ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
  }

  // draw a triangular ship
  if (!exploding) {
    if (blinkOn && !ship.dead) {
      drawShip(ship.x, ship.y, ship.a);
    }

    // handle blinking
    if (ship.blinkNum > 0) {
      // reduce the blink time
      ship.blinkTime--;
      // reduce the blink num
      if (ship.blinkTime == 0) {
        ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
        ship.blinkNum--;
      }
    }
  } else {
    // draw the explosion
    drawExplosion();
  }

  // draw the lasers
  for (let i = 0; i < ship.lasers.length; i++) {
    if (ship.lasers[i].explodTime == 0) {
      ctx.fillStyle = 'salmon';
      ctx.beginPath();
      ctx.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
      ctx.fill();
    } else {
      // draw the explosion
      ctx.fillStyle = 'orangered';
      ctx.beginPath();
      ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.75, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.fillStyle = 'salmon';
      ctx.beginPath();
      ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.5, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.fillStyle = 'pink';
      ctx.beginPath();
      ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.25, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }

  // draw the game text
  if(textAlpha > 0) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `rgba(255, 255, 255, ${textAlpha})`;
    ctx.font = `small-caps ${TEXT_SIZE}px dejavu sans mono`;
    ctx.fillText(text, canv.width / 2, canv.height * 0.7);
    textAlpha -= (1.0 / TEXT_FADE_TIME / FPS);
  } else if (ship.dead) {
    newGame();
  }

  // draw the lives
  let lifeColor;
  for (let i = 0; i < lives; i++) {
    lifeColor = (exploding && i == lives - 1) ? "red" : "white";
    drawShip(SHIP_SIZE + i * SHIP_SIZE * 1.2, SHIP_SIZE, 0.5 * Math.PI, lifeColor);
  }

  // detect lasers hits on asteroids
  let ax, ay, ar, lx, ly;
  for (let i = roids.length - 1; i >= 0; i--) {
    
    // grab the roid properties
    ax = roids[i].x;
    ay = roids[i].y;
    ar = roids[i].r;

    // loop over the lasers
    for (let j = ship.lasers.length - 1; j >= 0; j--) { 

      // grab the laser properties
      lx = ship.lasers[j].x;
      ly = ship.lasers[j].y;

      // detect hits
      if(ship.lasers[j].explodTime == 0 && distBetweenPoints(ax, ay, lx, ly) < ar) {

        // remove the asteroid & activate the laser explosion
        destroyAsteroids(i);
        ship.lasers[j].explodTime = Math.ceil(LASER_EXPLODE_DUR * FPS);
        break;
      }
    }

  }


  // draw the asteroids
  let x, y, r, a, vert, offs;
  for (let i = 0; i < roids.length; i++) {
    ctx.strokeStyle = 'slategrey';
    ctx.lineWidth = SHIP_SIZE / 20;
    
    // get the properties of asteroids
    x = roids[i].x;
    y = roids[i].y;
    a = roids[i].a;
    r = roids[i].r;
    vert = roids[i].vert;
    offs = roids[i].offs;

    // draw a path
    ctx.beginPath();
    ctx.moveTo(
      x + r * offs[0] * Math.cos(a),
      y + r * offs[0] * Math.sin(a)
    );
    
    // draw the polygon
    for (let j = 1; j < vert; j++) {
      ctx.lineTo(
        x + r * offs[j] * Math.cos(a + j * Math.PI * 2  / vert),
        y + r * offs[j] * Math.sin(a + j * Math.PI * 2  / vert)
      );
    }
    ctx.closePath();
    ctx.stroke();

    // draw bounding
    if (SHOW_BOUNDING) {
      ctx.strokeStyle = 'lime';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, false);
      ctx.stroke();
    }
  }

  if (!exploding) {
    if (ship.blinkNum == 0 && !ship.dead) {
      // check for asteroids collisions
      for (let i = 0; i < roids.length; i++) {
        if (distBetweenPoints(ship.x, ship.y, roids[i].x, roids[i].y) < ship.r + roids[i].r) {
          explodeShip();
          destroyAsteroids(i);
          break;
        }
      }
    }

    // rotate ship
    ship.a += ship.rot;

    // move ship
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;

  } else {
    // reduce the explode time
    ship.explodTime--;

    // reset the ship after the explosion has finished
    if (ship.explodTime == 0) {
      lives--;
      if (lives == 0) { gameOver(); } 
      else { ship = newShip(); }
    }
      
  }

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

  // move the lasers
  for (let i = ship.lasers.length - 1; i >= 0; i--) {
    //check distance travelled
    if(ship.lasers[i].dist > LASER_DIST * canv.width) {
      ship.lasers.splice(i, 1);
      continue;
    }

    // handle the explosion
    if(ship.lasers[i].explodTime > 0) {
      ship.lasers[i].explodTime--;

      // destroy the laser after the duration is up
      if(ship.lasers[i].explodTime == 0) {
        ship.lasers.splice(i, 1);
        continue;
      }
    } else {
      // move laser
      ship.lasers[i].x += ship.lasers[i].xv;
      ship.lasers[i].y += ship.lasers[i].yv;

      // calculate the distance travelled
      ship.lasers[i].dist += Math.sqrt(Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2));
    }

    // handle edge of screen on each laser
    if (ship.lasers[i].x < 0) {
      ship.lasers[i].x = canv.width;
    } else if (ship.lasers[i].x > canv.width) {
      ship.lasers[i].x = 0;
    }
    if (ship.lasers[i].y < 0) {
      ship.lasers[i].y = canv.height;
    } else if (ship.lasers[i].y > canv.height) {
      ship.lasers[i].y = 0;
    }
  }

  // move the asteroids
  for (let i = 0; i < roids.length; i++) {
    roids[i].x += roids[i].xv;
    roids[i].y += roids[i].yv;

    // handle edge of screen on each asteroid
    if (roids[i].x < 0 - roids[i].r) {
      roids[i].x = canv.width + roids[i].r;
    } else if (roids[i].x > canv.width + roids[i].r) {
      roids[i].x = 0 - roids[i].r;
    }
    if (roids[i].y < 0 - roids[i].r) {
      roids[i].y = canv.height + roids[i].r;
    } else if (roids[i].y > canv.height + roids[i].r) {
      roids[i].y = 0 - roids[i].r;
    }
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

function drawShip(x, y, a, colour = "white") {
  // draw a triangular ship
  ctx.strokeStyle = colour;
  ctx.lineWidth = SHIP_SIZE / 20;
  ctx.beginPath();
  ctx.moveTo( // nose of th ship
    x + 4 / 3 * ship.r * Math.cos(a),
    y - 4 / 3 * ship.r * Math.sin(a)
  )
  ctx.lineTo( // rear left
    x - ship.r * (2 / 3 * Math.cos(a) + Math.sin(a)),
    y + ship.r * (2 / 3 * Math.sin(a) - Math.cos(a))
  )
  ctx.lineTo( // rear right
    x - ship.r * (2 / 3 * Math.cos(a) - Math.sin(a)),
    y + ship.r * (2 / 3 * Math.sin(a) + Math.cos(a))
  )
  ctx.closePath();
  ctx.stroke();
  // draw center dot
  if (SHOW_CENTER_DOT) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x - 1, y - 1, 2, 2);
  }
  if (SHOW_BOUNDING) {
    ctx.strokeStyle = 'lime';
    ctx.beginPath();
    ctx.arc(x, y, ship.r, 0, Math.PI * 2, false);
    ctx.stroke();
  }
}

function drawExplosion() {
  ctx.fillStyle = 'darkred';
  ctx.beginPath();
  ctx.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.fillStyle = 'orange';
  ctx.beginPath();
  ctx.arc(ship.x, ship.y, ship.r * 1.1, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(ship.x, ship.y, ship.r * 0.8, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(ship.x, ship.y, ship.r * 0.5, 0, Math.PI * 2, false);
  ctx.fill();
}