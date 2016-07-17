// Global Variables
var SOCKET_URL = 'wss://fierce-plains-17880.herokuapp.com/';
var TEAM_NAME  = 'artisan';
var socket; 
var mic;
var timeOfDay;
var yoff = 0;        // 2nd dimension of perlin noise
var waveScale;
var waveCountdown;
var shipX, shipColor;
var fish = [];
var bubbles = [];
var stars = [];
var glock1, glock2, glock3, glock4, glock5, glock6, glock7, glock8, glock9, glock10, glock11;
var guitar1, guitar2, guitar3, guitar4, guitar5, guitar6, guitar7, guitar8, guitar9, guitar10, guitar11;
var drum1, drum2, drum3, drum4, drum5, drum6, drum7, drum8, drum9, drum10, drum11;
var fishD, fishE, fishF, fishG, fishA, fishB, fishC2, fishD2, fishE2, fishF2;
var fishG1, fishG2, fishG3, fishG4, fishG5, fishG6, fishG7, fishG8, fishG9, fishG10, fishG11;
var fishDr1, fishDr2, fishDr3, fishDr4, fishDr5, fishDr6, fishDr7, fishDr8, fishDr9, fishDr10, fishDr11;
var shake, star1, star2, star3, star4, star5, star6, star7, star8;
var instrument;
var mode = {
    GLOCK: 0,
    GUITAR: 1,
    DRUM: 2
};

/*************************************************************************************
* Pre-load all the media
*************************************************************************************/
function preload() {
  glock1 = loadSound('assets/glockenspiel/G1.wav');
  glock2 = loadSound('assets/glockenspiel/G2.wav');
  glock3 = loadSound('assets/glockenspiel/G3.wav');
  glock4 = loadSound('assets/glockenspiel/G4.wav');
  glock5 = loadSound('assets/glockenspiel/G5.wav');
  glock6 = loadSound('assets/glockenspiel/G6.wav');
  glock7 = loadSound('assets/glockenspiel/G7.wav');
  glock8 = loadSound('assets/glockenspiel/G8.wav');
  glock9 = loadSound('assets/glockenspiel/G9.wav');
  glock10 = loadSound('assets/glockenspiel/G10.wav');
  glock11 = loadSound('assets/glockenspiel/G11.wav');
  guitar1 = loadSound('assets/guitar/Gu1.mp3');
  guitar2 = loadSound('assets/guitar/Gu2.mp3');
  guitar3 = loadSound('assets/guitar/Gu3.mp3');
  guitar4 = loadSound('assets/guitar/Gu4.mp3');
  guitar5 = loadSound('assets/guitar/Gu5.mp3');
  guitar6 = loadSound('assets/guitar/Gu6.mp3');
  guitar7 = loadSound('assets/guitar/Gu7.mp3');
  guitar8 = loadSound('assets/guitar/Gu8.mp3');
  guitar9 = loadSound('assets/guitar/Gu9.mp3');
  guitar10 = loadSound('assets/guitar/Gu10.mp3');
  guitar11 = loadSound('assets/guitar/Gu11.mp3');
  shake = loadSound('assets/stars/Splash.wav');
  shake.playMode('restart');
  star1 = loadSound('assets/stars/StarSound1.mp3');
  star2 = loadSound('assets/stars/StarSound2.wav');
  star3 = loadSound('assets/stars/StarSound3.mp3');
  star4 = loadSound('assets/stars/StarSound4.mp3');
  star5 = loadSound('assets/stars/StarSound5.mp3');
  star6 = loadSound('assets/stars/StarSound6.mp3');
  star7 = loadSound('assets/stars/StarSound7.mp3');
  star8 = loadSound('assets/stars/StarSound8.mp3');
  drum1 = loadSound('assets/drum/D1.wav');
  drum2 = loadSound('assets/drum/D2.mp3');
  drum3 = loadSound('assets/drum/D3.mp3');
  drum4 = loadSound('assets/drum/D4.wav');
  drum5 = loadSound('assets/drum/D5.wav');
  drum6 = loadSound('assets/drum/D6.wav');
  drum7 = loadSound('assets/drum/D7.wav');
  drum8 = loadSound('assets/drum/D8.wav');
  drum9 = loadSound('assets/drum/D9.wav');
  drum10 = loadSound('assets/drum/D10.wav');
  drum11 = loadSound('assets/drum/D11.wav');
  fishD = loadImage("assets/fish/P2.png");
  fishE = loadImage("assets/fish/P3.png");
  fishF = loadImage("assets/fish/P4.png");
  fishG = loadImage("assets/fish/P5.png");
  fishA = loadImage("assets/fish/P6.png");
  fishB = loadImage("assets/fish/P7.png");
  fishC2 = loadImage("assets/fish/P8.png");
  fishD2 = loadImage("assets/fish/P9.png");
  fishE2 = loadImage("assets/fish/P10.png");
  fishF2 = loadImage("assets/fish/P11.png");
  fishG1 = loadImage("assets/fish/G1.png");
  fishG2 = loadImage("assets/fish/G2.png");
  fishG3 = loadImage("assets/fish/G3.png");
  fishG4 = loadImage("assets/fish/G4.png");
  fishG5 = loadImage("assets/fish/G5.png");
  fishG6 = loadImage("assets/fish/G6.png");
  fishG7 = loadImage("assets/fish/G7.png");
  fishG8 = loadImage("assets/fish/G8.png");
  fishG9 = loadImage("assets/fish/G9.png");
  fishG10 = loadImage("assets/fish/G10.png");
  fishG11 = loadImage("assets/fish/G11.png");
  fishDr1 = loadImage("assets/fish/D1.png");
  fishDr2 = loadImage("assets/fish/D2.png");
  fishDr3 = loadImage("assets/fish/D3.png");
  fishDr4 = loadImage("assets/fish/D4.png");
  fishDr5 = loadImage("assets/fish/D5.png");
  fishDr6 = loadImage("assets/fish/D6.png");
  fishDr7 = loadImage("assets/fish/D7.png");
  fishDr8 = loadImage("assets/fish/D8.png");
  fishDr9 = loadImage("assets/fish/D9.png");
  fishDr10 = loadImage("assets/fish/D10.png");
  fishDr11 = loadImage("assets/fish/D11.png");
}

/*************************************************************************************
* The setup function creates the canvas, sets the frame rate, and sets the inital hour.
*************************************************************************************/
function setup() {
  // set up canvas and framerate properties
  createCanvas(windowWidth, windowHeight);
  frameRate(15);
  // set up initial variable values
  timeOfDay = 0;
  shipX = 620;
  shipColor = color(255, 255, 255);
  instrument = mode.GLOCK;
  waveScale = 0;
  waveCountdown = 0;
  volume = 0;
  addStars();
  // start listening from the microphone
   mic = new p5.AudioIn()
   mic.start();
  // Open a socket connection to the server
  socket = io(SOCKET_URL + TEAM_NAME);
  // socket listens for other events on the network
  socket.on('fish', addFish);
  socket.on('ship', moveShip);
  socket.on('star', switchStar);
  socket.on('deviceShaken', deviceShaken);
  socket.emit('sense', {deviceShaken: true});
}

/*************************************************************************************
* The main draw function calls sub-functions to draw the sky, water, and sea creatures.
* It also increments the time of day (always between 0 and 23) each time it is called.
*************************************************************************************/
function draw() {
  detectAudio();
  drawSky();
  drawWater();
  drawFishArray();
  drawBubbles();
  drawText();
  // Increase time of day by .1 each time frame is refreshed.
  timeOfDay = (timeOfDay + .1) % 24;
  // Decrease wave countdown, set to 0 if not counting down
  if(waveCountdown === 3) {
    waveScale = 40;
    waveCountdown -= .1;
  }
  else if(waveCountdown > 0)
    waveCountdown -= .1;
  else
    waveScale = 0;
}

/*************************************************************************************
* Function makes wave amplitude increase
*************************************************************************************/
function deviceShaken() {
  shake.play();
  waveCountdown = 3;
}

/*************************************************************************************
* When a star is clicked, it changes color and starts or stops a music loop
*************************************************************************************/
function mouseClicked() {
  for(var i = 0; i < stars.length; ++i) {
    if(Math.abs(pmouseX - stars[i].y) < 13 && Math.abs(pmouseY - stars[i].x) < 13) {
      switchStar(i);
      socket.emit('star', i);
    }
  }
}

/*************************************************************************************
* Turns a star's active state on or off
*************************************************************************************/
function switchStar(i) {
  if(stars[i].active) {
    stars[i].active = false;
    stars[i].music.stop();
  }
  else {
    stars[i].active = true;
    stars[i].music.loop();
  }
}

/*************************************************************************************
* Add bubbles at cursor location, color of bubble depends on volume
*************************************************************************************/
function detectAudio() {
  var volume = mic.getLevel();

  if(mouseY > height * .25 && volume > 0.0166) {
    var r = Math.floor(255 * (volume * 3));
    var g = random() < 0.5 ? 150:200;
    var b = 240;
    addBubble(pmouseX, pmouseY, volume, r, g, b);
  }
}

/*************************************************************************************
* Keys are mapped to fish/keys or ship movement.
*************************************************************************************/
function keyPressed(event) {
  var code = event.keyCode;
  var myFish;
  var myLevel;

  switch(code) {
  case 37: // Left Arrow
    moveShip(-10);
    socket.emit("ship", -10);
    break;
  case 39: // Right Arrow
    moveShip(10);
    socket.emit("ship", 10);
    break;
  case 32: // Space
    changeMode((instrument + 1) % 3);
    break;
  case 49: // Number 1
  case 97: // Numpad 1
    if(instrument === mode.GLOCK) {
      myFish = "glock_1";
      myLevel = .85;
    }
    else if(instrument === mode.GUITAR) {
      myFish = "guitar_1";
      myLevel = .85;
    }
    else if(instrument === mode.DRUM) {
      myFish = "drum_1";
      myLevel = .9;
    }
    addFish(height * myLevel, timeOfDay, 1, myFish);
    socket.emit("fish", height * myLevel, timeOfDay, 1, myFish)
    break;
  case 50: // Number 2
  case 98: // Numpad 2
    if(instrument === mode.GLOCK) {
      myFish = "glock_2";
      myLevel = .78;
    }
    else if(instrument === mode.GUITAR) {
      myFish = "guitar_2";
      myLevel = .78;
    }
    else if(instrument === mode.DRUM) {
      myFish = "drum_2";
      myLevel = .91;
    }
    addFish(height * myLevel, timeOfDay, 1, myFish);
    socket.emit("fish", height * myLevel, timeOfDay, 1, myFish)
    break;
  case 51: // Number 3
  case 99: // Numpad 3
    if(instrument === mode.GLOCK) {
      myFish = "glock_3";
      myLevel = .73;
    }
    else if(instrument === mode.GUITAR) {
      myFish = "guitar_3";
      myLevel = .73;
    }
    else if(instrument === mode.DRUM) {
      myFish = "drum_3";
      myLevel = .9;
    }
    addFish(height * myLevel, timeOfDay, 1, myFish);
    socket.emit("fish", height * myLevel, timeOfDay, 1, myFish) 
    break;
  case 52:  // Number 4
  case 100: // Numpad 4
    if(instrument === mode.GLOCK) {
      myFish = "glock_4";
      myLevel = .68;
    }
    else if(instrument === mode.GUITAR) {
      myFish = "guitar_4";
      myLevel = .66;
    }
    else if(instrument === mode.DRUM) {
      myFish = "drum_4";
      myLevel = .92;
    }
    addFish(height * myLevel, timeOfDay, 1, myFish);
    socket.emit("fish", height * myLevel, timeOfDay, 1, myFish) 
    break;
  case 53:  // Number 5
  case 101: // Numpad 5
    if(instrument === mode.GLOCK) {
      myFish = "glock_5";
      myLevel = .63;
    }
    else if(instrument === mode.GUITAR) {
      myFish = "guitar_5";
      myLevel = .61;
    }
    else if(instrument === mode.DRUM) {
      myFish = "drum_5";
      myLevel = .92;
    }
    addFish(height * myLevel, timeOfDay, 1, myFish);
    socket.emit("fish", height * myLevel, timeOfDay, 1, myFish)
    break;
  case 54:  // Number 6
  case 102: // Numpad 6
    if(instrument === mode.GLOCK) {
      myFish = "glock_6";
      myLevel = .58;
    }
    else if(instrument === mode.GUITAR) {
      myFish = "guitar_6";
      myLevel = .58;
    }
    else if(instrument === mode.DRUM) {
      myFish = "drum_6";
      myLevel = .91;
    }
    addFish(height * myLevel, timeOfDay, 1, myFish);
    socket.emit("fish", height * myLevel, timeOfDay, 1, myFish)
    break;
  case 55:  // Number 7
  case 103: // Numpad 7
    if(instrument === mode.GLOCK) {
      myFish = "glock_7";
      myLevel = .53;
    }
    else if(instrument === mode.GUITAR) {
      myFish = "guitar_7";
      myLevel = .51;
    }
    else if(instrument === mode.DRUM) {
      myFish = "drum_7";
      myLevel = .9;
    }
    addFish(height * myLevel, timeOfDay, 1, myFish);
    socket.emit("fish", height * myLevel, timeOfDay, 1, myFish)
    break;
  case 56:  // Number 8
  case 104: // Numpad 8
    if(instrument === mode.GLOCK) {
      myFish = "glock_8";
      myLevel = .48;
    }
    else if(instrument === mode.GUITAR) {
      myFish = "guitar_8";
      myLevel = .46;
    }
    else if(instrument === mode.DRUM) {
      myFish = "drum_8";
      myLevel = .92;
    }
    addFish(height * myLevel, timeOfDay, 1, myFish);
    socket.emit("fish", height * myLevel, timeOfDay, 1, myFish) 
    break;
  case 57:  // Number 9
  case 105: // Numpad 9
    if(instrument === mode.GLOCK) {
      myFish = "glock_9";
      myLevel = .43;
    }
    else if(instrument === mode.GUITAR) {
      myFish = "guitar_9";
      myLevel = .43;
    }
    else if(instrument === mode.DRUM) {
      myFish = "drum_9";
      myLevel = .9;
    }
    addFish(height * myLevel, timeOfDay, 1, myFish);
    socket.emit("fish", height * myLevel, timeOfDay, 1, myFish)
    break;
  case 48: // Number 0
  case 96: // Numpad 0
    if(instrument === mode.GLOCK) {
      myFish = "glock_10";
      myLevel = .38;
    }
    else if(instrument === mode.GUITAR) {
      myFish = "guitar_10";
      myLevel = .35;
    }
    else if(instrument === mode.DRUM) {
      myFish = "drum_10";
      myLevel = .91;
    }
    addFish(height * myLevel, timeOfDay, 1, myFish);
    socket.emit("fish", height * myLevel, timeOfDay, 1, myFish)
    break;
  case 189:  // Enter
    if(instrument === mode.GLOCK) {
      myFish = "glock_11";
      myLevel = .30;
    }
    else if(instrument === mode.GUITAR) {
      myFish = "guitar_11";
      myLevel = .20;
    }
    else if(instrument === mode.DRUM) {
      myFish = "drum_11";
      myLevel = .9;
    }
    addFish(height * myLevel, timeOfDay, 1, myFish);
    socket.emit("fish", height * myLevel, timeOfDay, 1, myFish)
    break;
  default:
    // do nothing for keys that are not registered
  }
}

/*************************************************************************************
* Changes ship to a random color
*************************************************************************************/
function changeShipColor() {
  var r = random() < 0.5 ? 150:250;
  var g = random() < 0.5 ? 180:250;
  var b = 240;
  shipColor = color(r, g, b);
}

/*************************************************************************************
* Draws instrument mode text. Highlights mode based on fishMode value.
*************************************************************************************/
function drawText() {
  push()
  noStroke();
  textSize(30);
  fill(255, 255, 255)
  text("Mode", 30, 30);
  rect(10, 35, 160, 2);
  textSize(24);
  switch (instrument) {
  case mode.GLOCK:
    fill(255, 255, 255)
    text("glockenspiel", 30, 60);
    drawArrow(10, 52);

    fill(255, 255, 255, 150);
    text("guitar", 30, 90);
    text("percussion", 30, 121);
    break;
  case mode.GUITAR:
    fill(255, 255, 255, 150);
    text("glockenspiel", 30, 60);

    fill(255, 255, 255);
    text("guitar", 30, 90);
    drawArrow(10, 82);

    fill(255, 255, 255, 150);
    text("percussion", 30, 120);
    break;
  case mode.DRUM:
    fill(255, 255, 255, 150);
    text("glockenspiel", 30, 60);
    text("guitar", 30, 90);

    fill(255, 255, 255);
    text("percussion", 30, 120);
    drawArrow(10, 112);
  default:
    // do nothing for unrecognized modes
  }
  pop();
}

/*************************************************************************************
* Draws an arrow to indicate selected mode
*************************************************************************************/
function drawArrow(x, y) {
  push();
  noStroke();
  translate(x, y);
  beginShape();
  vertex(0, 0);
  vertex(8, 0);
  vertex(8, -4);
  vertex(16, 2);
  vertex(8, 8);
  vertex(8, 4);
  vertex(0, 4);
  endShape(CLOSE);
  pop();
}

/*************************************************************************************
* Changes the instrument mode
*************************************************************************************/
function changeMode(mode) {
  instrument = mode;
}

/*************************************************************************************
* Updates the value of shipX
*************************************************************************************/
function moveShip(moveX) {
  newShipX = shipX + moveX;
  if(newShipX < width - 50 && newShipX > 150)
    shipX = newShipX;
}

/*************************************************************************************
* Adds a new bubble to the bubble array. This happens when the mouse is moved.
*************************************************************************************/
function addBubble(x, y, volume, r, g, b) {
  bubbles.push({
    x: x,
    y: y,
    c: color('rgba(' + r + ',' + g + ',' + b + ', 100)'),
    scale: 1,
  });
}

/*************************************************************************************
* Draw bubbles. Bubbles increase in radius as they rise.
*************************************************************************************/
function drawBubbles() {
  push();
  var bubblesAlive = bubbles.length;
  var bubbleSize = 2;

  for (var i=0; i<bubblesAlive; ++i) {
    if (bubbles[i].y > height * .25) {
      // draw bubble
      stroke(bubbles[i].c);
      fill(bubbles[i].c);
      ellipse(bubbles[i].x, bubbles[i].y, 
        bubbleSize * bubbles[i].scale, bubbleSize * bubbles[i].scale);
      
      // modify coordinates and size
      bubbles[i].x += bubbleSize * random(-2, 2);
      bubbles[i].y -= 5;
      bubbles[i].scale += .1
    }
    else { // remove bubble if it has hit surface of water
      bubbles.shift();
      bubblesAlive--;
    }
  }
  pop();
}

/*************************************************************************************
* This function draws the background sky color. Sky color is based on time of day.
* The color smoothly changes by using gradients generated by Lerp Color.
* 
* Reference: http://p5js.org/reference/#/p5/lerpColor
*************************************************************************************/
function drawSky() {
  push();
  lerpAmount = (timeOfDay % 6) / 6.0;       // Determine percent of color gradient
  midnight = color(0, 0, 80);               // Midnight color: dark blue
  sunrise = color(180, 120, 110);           // Sunrise color: orange
  noon = color(102, 204, 255);              // Noon color: sky blue
  sunset = color(204, 153, 255);            // Sunset color: dusky purple

  /*** Determine sky color based on time of day - DEPRECATED ***
  if (timeOfDay >= 0 && timeOfDay < 6)
    var skyColor = lerpColor(midnight, sunrise, lerpAmount);
  else if (timeOfDay >= 6 && timeOfDay < 12)
    var skyColor = lerpColor(sunrise, noon, lerpAmount);
  else if (timeOfDay >= 12 && timeOfDay < 18)
    var skyColor = lerpColor(noon, sunset, lerpAmount);
  else if(timeOfDay >= 18 && timeOfDay < 24)
    var skyColor = lerpColor(sunset, midnight, lerpAmount);
  else
    var skyColor = noon;
  **************************************************************/
  var skyColor = midnight;
  background(skyColor);                 // set sky color

  // drawSunMoon();
  drawConstellation(timeOfDay);         // draw stars
  pop();
}

/*************************************************************************************
* DEPRECATED.
* This function draws the Sun and Moon based on time of day.
*************************************************************************************/
function drawSunMoon()
{
  push();
  noStroke();
  fill(255, 255, 153);                  // fill is yellow
  translate(600, 1200);                 // set the center of axis
  rotate(TWO_PI * (timeOfDay) / 24);    // rotate axis based on time of day
  translate(0, 1200);                   // move some distance away from the center
  ellipse(0, 0, 50, 50);                // draw sun at this radius distance away from center
  pop();

  push();
  noStroke();
  fill(255, 255, 255);                // fill is white
  translate(600, 1200);               // set center axis
  rotate(TWO_PI * (timeOfDay - 12) / 24); // rotate axis based on time of day (offset by 12 hours)
  translate(0, 1200);                 // move some distance away from the center
  ellipse(0, 0, 50, 50);              // draw moon at this radius distance away from center
  pop();
}

/*************************************************************************************
* This function adds all the stars to the star array
*************************************************************************************/
function addStars() {
  addStar(80, 280, 99, 184, 255, star1);
  addStar(40, 390, 225, 110, 180, star2);
  addStar(90, 500, 255, 48, 48, star3);
  addStar(100, 780, 0, 250, 154, star4);
  addStar(50, 880, 155, 48, 255, star5);
  addStar(90, 1000, 255, 153, 18, star6);
  addStar(20, 1125, 255, 255, 0, star7);
  addStar(75, 1250, 0, 206, 209, star8);
}

/*************************************************************************************
* This function adds a single star to the star array
*************************************************************************************/
function addStar(x, y, r, g, b, m) {
    stars.push({
    x: x,
    y: y,
    r: r,
    g: g,
    b: b,
    active: false,
    music: m
  });
}

/*************************************************************************************
* This function specifies where to draw each star in the sky, and also determines
* whether the stars should be visible or not based on time of day.
*************************************************************************************/
function drawConstellation(timeOfDay) {
  /*** DEPRECATED ***********************
  var opacity;
  if(timeOfDay < 5)
    opacity = (15 - timeOfDay) * 10;  // during early morning, star opacity decreases
  else if(timeOfDay > 20)
    opacity = (timeOfDay - 10) * 10;  // during evening, star opacity increases
  else
    opacity = 0;                      // during daytime, stars are not visible
  *************************************/
  for (var i = 0; i < stars.length; ++i) {
    drawSkyStar(i)
  }
}

/*************************************************************************************
* This function draws a star in the sky. The star rotates and ocsillates.
*************************************************************************************/
function drawSkyStar(starIndex)
{
  push();
  noStroke();
  if(stars[starIndex].active)
    fill(stars[starIndex].r, stars[starIndex].g, stars[starIndex].b);
  else
    fill(255, 255, 255, 240);
  translate(stars[starIndex].y, stars[starIndex].x);
  rotate(timeOfDay);
  drawStar(0, 0, 5, random(12, 13), 5);
  pop();
}

/*************************************************************************************
* This function draws a star shape.
* It is used for drawing the sky stars, and previously starfish and sea urchins.
* It was adapted from: http://p5js.org/examples/examples/Form_Star.php
*************************************************************************************/
function drawStar(x, y, radius1, radius2, npoints) {
  push();
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}

/*****************************************************************************
* This function draws the water as layers of waves with varying hues.
* The waves are semi-opaque so that they very slightly 'reflect' the background
* sky color as it changes.
******************************************************************************/
function drawWater() {
  push();

  fill(50, 170, 190, 190);    // top two waves are cyan
  noStroke();
  drawShipWave(height * .29, height * .22, .2, shipX);

  stroke(100, 200, 200);
  drawWave(height * .35, height * .3, .2);

  fill(22, 100, 185, 100);    // middle two waves are light blue
  drawWave(height * .45, height * .4, .4);
  drawWave(height * .55, height * .5, .6);

  fill(40, 40, 162, 100);     // bottom two waves are medium blue
  drawWave(height * .65, height * .6, .8);
  drawWave(height * .75, height * .7, .10);

  fill(40, 40, 100, 50);      // darker blue areas indicating underwater
  noStroke();
  drawWave(height * .85, height * .80, .10);
  fill(30, 30, 80, 50);
  drawWave(height * .9, height * .85, .10);

  pop();
}

/*************************************************************************************
*   This function draws waves using Perlin Noise random sequence generator to generate
*   a "noise" value that creates a natural pattern for the y-values of the wave points.
*
*   It was adapted from: http://p5js.org/examples/examples/Math_Noise_Wave.php
*   More info about noise functions: http://p5js.org/reference/#/p5/noise
*************************************************************************************/
function drawWave(waveTop, waveBottom, xoff) {
  push();
  // We are going to draw a polygon out of the wave points
  beginShape(); 
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 10) {
     // Calculate a y value according to noise, map to 2D Noise
     var y = map(noise(xoff, yoff), 0, 1, waveTop + (waveScale * waveCountdown), waveBottom - (waveScale * waveCountdown));
     // Set the vertex
     vertex(x, y); 
     // Increment x dimension for noise
     xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, y);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  pop();
}

/*************************************************************************************
*   This is the same wave drawing function as before, but this one also features a ship
*   bobbing on the water. The y values of the ship change based on the y value changes
*   of a single point along the wave.
*************************************************************************************/
function drawShipWave(waveTop, waveBottom, xoff, xShip) {
  push();
  // We are going to draw a polygon out of the wave points
  beginShape(); 
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 10) {
     // Calculate a y value according to noise, map to 2D Noise
     var y = map(noise(xoff, yoff), 0, 1, waveTop + (waveScale * waveCountdown), waveBottom - (waveScale * waveCountdown));
     // Set the vertex
     vertex(x, y); 
     // Set ship
     if (x === xShip) {
       var yShip = y;
     }
     // Increment x dimension for noise
     xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, y);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Draw the ship
  drawShip(xShip, yShip); 
  pop();
}

/*************************************************************************************
* This function draws the ship by creating a filled shape out of vertexes.
* Reference: http://p5js.org/reference/#/p5/beginShape
*************************************************************************************/
function drawShip(x, y) {
  push();
  //fill(255, 255, 255);
  fill(shipColor);
  noStroke();

  beginShape();
  vertex (x, y);              // ship body bottom center
  vertex (x - 20, y);         // ship body bottom left
  vertex (x - 60, y - 30);    // ship body top left
  vertex (x - 10, y - 30);    // left flag bottom
  vertex (x - 50, y - 40);    // left flag tip
  vertex (x - 5, y - 120);   // left flag top
  vertex (x - 5, y - 30);    // return to center
  vertex (x, y - 150);        // flag top
  vertex (x + 60, y - 40);    // flag tip
  vertex (x, y - 30);         // right flag bottom
  vertex (x + 60, y - 30);   // ship body top right
  vertex (x + 20, y);         // ship body bottom right
  endShape(CLOSE);
  pop();
}

/*************************************************************************************
* This function adds a new fish. It is called each time a key mapped to a fish is pressed.
*************************************************************************************/
function addFish(y, timePressed, speed, type) {
  fish.push({
    fishX: width,
    fishY: y,
    fishTime: timePressed,
    fishSpeed: speed,
    fishType: type
  });
  changeShipColor();
  playNote(type);
}

function playNote(type) {
  switch(type) {
    case "glock_1":
      glock1.play();
      break;
    case "glock_2":
      glock2.play();
      break;
    case "glock_3":
      glock3.play();
      break;
    case "glock_4":
      glock4.play();
      break;
    case "glock_5":
      glock5.play();
      break;
    case "glock_6":
      glock6.play();
      break;
    case "glock_7":
      glock7.play();
      break;
    case "glock_8":
      glock8.play();
      break;
    case "glock_9":
      glock9.play();
      break;
    case "glock_10":
      glock10.play();
      break;
    case "glock_11":
      glock11.play();
      break;
    case "guitar_1":
      guitar1.play();
      break;
    case "guitar_2":
      guitar2.play();
      break;
    case "guitar_3":
      guitar3.play();
      break;
    case "guitar_4":
      guitar4.play();
      break;
    case "guitar_5":
      guitar5.play();
      break;
    case "guitar_6":
      guitar6.play();
      break;
    case "guitar_7":
      guitar7.play();
      break;
    case "guitar_8":
      guitar8.play();
      break;
    case "guitar_9":
      guitar9.play();
      break;
    case "guitar_10":
      guitar10.play();
      break;
    case "guitar_11":
      guitar11.play();
      break;
    case "drum_1":
      drum1.play();
      break;
    case "drum_2":
      drum2.play();
      break;
    case "drum_3":
      drum3.play();
      break;
    case "drum_4":
      drum4.play();
      break;
    case "drum_5":
      drum5.play();
      break;
    case "drum_6":
      drum6.play();
      break;
    case "drum_7":
      drum7.play();
      break;
    case "drum_8":
      drum8.play();
      break;
    case "drum_9":
      drum9.play();
      break;
    case "drum_10":
      drum10.play();
      break;
    case "drum_11":
      drum11.play();
      break;
    default:
      // do nothing for invalid types
  }
}

/*************************************************************************************
* This function calls the function to draw fish, then updates its position.
* Fish that leave the screen completely are removed from the array.
*************************************************************************************/
function drawFishArray() {
  var fishAlive = fish.length;
  // draw fish in array
  for (var i=0; i<fishAlive; ++i) {
    // draw fish
    drawFish(i, fish[i].fishX, fish[i].fishY, fish[i].fishTime, fish[i].fishSpeed, 
      fish[i].fishType, fish[i].newFish);

    // calculate new x coordinates as a function of speed
    var newFishX = fish[i].fishX - fish[i].fishSpeed * (width / 100);
    if (newFishX > -500)
      fish[i].fishX = newFishX;
    else { 
    // remove fish that have left the screen
      fish.shift();
      fishAlive--;
    }
  }
}


/*************************************************************************************
* This function draws fish.
*************************************************************************************/
function drawFish(fishIndex, fishX, fishY, timeStart, speed, type, newFish) {
  push();

  translate(fishX, fishY);

  // fish angles shift slightly as they move, to simulate swimming movement.
  if(timeOfDay - Math.floor(timeOfDay) < 0.5) {
    if(Math.round(timeOfDay) % 2 === 0)
      rotate (.1 + (.1 * waveCountdown));
    else
      rotate (-.1 - (.1 * waveCountdown));
  } else {
    if(Math.round(timeOfDay) % 2 === 0)
      translate(0, -5 - waveCountdown);
    else
      translate(0, 5 + waveCountdown);
  }

  // DEPRECATED: Set color based on size///////////////////////////////////////////////////
  switch(type) {
  case "large":     // large fish are blue, that randomly flash in brightness as they move
    var r = 100;
    var g = 80;
    var b = random() < 0.5 ? 220:240;
    var scale = 0.4;
    drawSimpleFish(scale, r, g, b);
    break;
  case "medium":    // medium fish are green, that randomly flash in brightness as they move
    var r = 100;
    var g = random() < 0.5 ? 170: 200;
    var b = 100;
    var scale = 0.3;
    drawSimpleFish(scale, r, g, b);
    break;
  case "small":     // small fish are red, that randomly flash in brightness as they move
    var r = random() < 0.5 ? 200 : 220;
    var g = 50;
    var b = 100;
    var scale = 0.2;
    drawSimpleFish(scale, r, g, b);
    break;
  //////////////////////////////////////////////////////////////////////////////////////////
  // Fish
  case "glock_2":
  case "glock_3":
  case "glock_4":
  case "glock_5":
  case "glock_6":
  case "glock_7":
  case "glock_8":
  case "glock_9":
  case "glock_10":
  case "glock_11":
  case "guitar_1":
  case "guitar_2":
  case "guitar_3":
  case "guitar_4":
  case "guitar_5":
  case "guitar_6":
  case "guitar_7":
  case "guitar_8":
  case "guitar_9":
  case "guitar_10":
  case "guitar_11":
  case "drum_1":
  case "drum_2":
  case "drum_3":
  case "drum_4":
  case "drum_5":
  case "drum_6":
  case "drum_7":
  case "drum_8":
  case "drum_9":
  case "drum_10":
  case "drum_11":
    var scale = 0.75
    drawImgFish(scale, type);
    break;
  // Crab
  case "glock_1":
    var r = random() < 0.5 ? 200 : 220;
    var g = 50;
    var b = 100;
    var scale = 0.4;
    drawCrab(scale);
    break;
  default:
    var r = random() < 0.5 ? 150 : 200;
    var g = random() < 0.5 ? 150 : 200;
    var b = random() < 0.5 ? 150 : 200;
    drawSimpleFish(scale, r, g, b);
  }

  pop();
}

/*************************************************************************************
* DEPRECATED
* Draw simple fish. This function should not be called at all if the program code
* is working correctly. It is still here for backup.
*************************************************************************************/
function drawSimpleFish(scale, r, g, b) {
  push();
  fill(r, g, b);
  // draw the fish out of an ellipse (body), triangles (fins), and shape (tail).
  noStroke();
  ellipse(0, 0, 100 * scale, 60 * scale);
  triangle (-20 * scale, -15 * scale, 15 * scale, -35 * scale, 5 * scale, -15 * scale);
  triangle (-5 * scale, 15 * scale, 20 * scale, 30 * scale, 10 * scale, 15 * scale);
  beginShape();
  vertex (50 * scale, 0);
  vertex (75 * scale, -15 * scale);
  vertex (60 * scale, 0);
  vertex (75 * scale, 15 * scale);
  endShape(CLOSE);
  pop();
}

/*************************************************************************************
* Draw the appropriate fish that has already been pre-loaded from an image file.
*************************************************************************************/
function drawImgFish(scale, type) {
  push();
  switch(type) {
  case "glock_2":
    image(fishD, 0, -25, fishD.width * scale, fishD.height * scale);
    break;
  case "glock_3":
    image(fishE, 0, -25, fishE.width * scale, fishE.height * scale);
    break;
  case "glock_4":
    image(fishF, 0, -25, fishF.width * scale, fishF.height * scale);
    break;
  case "glock_5":
    image(fishG, 0, -25, fishG.width * scale, fishG.height * scale);
    break;
  case "glock_6":
    image(fishA, 0, -25, fishA.width * scale, fishA.height * scale);
    break;
  case "glock_7":
    image(fishB, 0, -25, fishB.width * scale, fishB.height * scale);
    break;
  case "glock_8":
    image(fishC2, 0, -25, fishC2.width * scale, fishC2.height * scale);
    break;
  case "glock_9":
    image(fishD2, 0, -25, fishD2.width * scale, fishD2.height * scale);
    break;
  case "glock_10":
    image(fishE2, 0, -25, fishE2.width * scale, fishE2.height * scale);
    break;
  case "glock_11":
    image(fishF2, 0, -25, fishF2.width * scale, fishF2.height * scale);
    break;
  case "guitar_1":
    image(fishG1, 0, -25, fishG1.width * scale, fishG1.height * scale);
    break;
  case "guitar_2":
    image(fishG2, 0, -25, fishG2.width * scale, fishG2.height * scale);
    break;
  case "guitar_3":
    image(fishG3, 0, -25, fishG3.width * scale, fishG3.height * scale);
    break;
  case "guitar_4":
    image(fishG4, 0, -25, fishG4.width * scale, fishG4.height * scale);
    break;
  case "guitar_5":
    image(fishG5, 0, -25, fishG5.width * scale, fishG5.height * scale);
    break;
  case "guitar_6":
    image(fishG6, 0, -25, fishG6.width * scale, fishG6.height * scale);
    break;
  case "guitar_7":
    image(fishG7, 0, -25, fishG7.width * scale, fishG7.height * scale);
    break;
  case "guitar_8":
    image(fishG8, 0, -25, fishG8.width * scale, fishG8.height * scale);
    break;
  case "guitar_9":
    image(fishG9, 0, -25, fishG9.width * scale, fishG9.height * scale);
    break;
  case "guitar_10":
    image(fishG10, 0, -25, fishG10.width * scale, fishG10.height * scale);
    break;
  case "guitar_11":
    image(fishG11, 0, -25, fishG11.width * scale, fishG11.height * scale);
    break;
  case "drum_1":
    image(fishDr1, 0, -25, fishDr1.width * scale, fishDr1.height * scale);
    break;
  case "drum_2":
    image(fishDr2, 0, -25, fishDr2.width * scale, fishDr2.height * scale);
    break;
  case "drum_3":
    image(fishDr3, 0, -25, fishDr3.width * scale, fishDr3.height * scale);
    break;
  case "drum_4":
    image(fishDr4, 0, -25, fishDr4.width * scale, fishDr4.height * scale);
    break;
  case "drum_5":
    image(fishDr5, 0, -25, fishDr5.width * scale, fishDr5.height * scale);
    break;
  case "drum_6":
    image(fishDr6, 0, -25, fishDr6.width * scale, fishDr6.height * scale);
    break;
  case "drum_7":
    image(fishDr7, 0, -25, fishDr7.width * scale, fishDr7.height * scale);
    break;
  case "drum_8":
    image(fishDr8, 0, -25, fishDr8.width * scale, fishDr8.height * scale);
    break;
  case "drum_9":
    image(fishDr9, 0, -25, fishDr9.width * scale, fishDr9.height * scale);
    break;
  case "drum_10":
    image(fishDr10, 0, -25, fishDr10.width * scale, fishDr10.height * scale);
    break;
  case "drum_11":
    image(fishDr11, 0, -25, fishDr11.width * scale, fishDr11.height * scale);
    break;
  default:
    var r = random() < 0.5 ? 150 : 200;
    var g = random() < 0.5 ? 150 : 200;
    var b = random() < 0.5 ? 150 : 200;
    drawSimpleFish(scale, r, g, b);
  }
  pop();
}

/*************************************************************************************
* This function draws a crab.
*************************************************************************************/
function drawCrab(scale) {
  push();
  fill(200, 50, 50);
  noStroke();
  // Base
  ellipse(0, 0, 105 * scale, 105 * scale);
  //Eye-white
  fill(255, 255, 255);
  ellipse(25 * scale, -10 * scale, 40 * scale, 40 * scale);
  fill(255, 255, 255);
  ellipse(-25 * scale, -25 * scale, 40 * scale, 40 * scale);
  //Eye-ball
  fill(0, 0, 0);
  ellipse(20 * scale, -10 * scale, 10 * scale, 10 * scale);
  fill(0, 0, 0);
  ellipse(-20 * scale, -20 * scale, 10 * scale, 10 * scale);
  // claws
  drawClaw(scale);
  // legs
  fill(180, 100, 100);
  ellipse(50 * scale,  100 * scale, 20 * scale, 10 * scale);
  ellipse(52 * scale,  120 * scale, 20 * scale, 10 * scale);
  ellipse(55 * scale,  140 * scale, 20 * scale, 10 * scale);
  ellipse(200 * scale,  130 * scale, 20 * scale, 10 * scale);
  ellipse(192 * scale,  150 * scale, 20 * scale, 10 * scale);
  ellipse(180 * scale,  170 * scale, 20 * scale, 10 * scale);
  pop();
}

/*************************************************************************************
* Draws crab claws.
*************************************************************************************/
function drawClaw(scale) {
  fill('rgb(201, 100, 100)');
  translate(-50, -50);
  arc(25, 25, 50 * scale, 50 * scale, 80, PI+QUARTER_PI, PIE);
  arc(82, 38, 50 * scale, 50 * scale, 0, PI+HALF_PI+QUARTER_PI, PIE);
}

