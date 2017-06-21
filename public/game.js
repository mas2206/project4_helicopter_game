var playerIcon;
var pillarObstacles = [];
var playerScore;
var crashSound;
var backgroundMusic;

function newGame() {
  newCanvas.create();
  playerIcon = new shape(80, 50, "/images/red_copter.png", 50, 200, "image");
  playerScore = new shape("40px", "Andale Mono", "hotpink", 280, 40, "text");
  crashSound = new sound("/sounds/crash.mp3");
  backgroundMusic = new sound("/sounds/background_music.mp3");
  backgroundMusic.playSound();
}

var newCanvas = {
  canvas: document.createElement("canvas"),

  create: function() {
    this.canvas.id = "main-canvas";
    this.canvas.width = 800;
    this.canvas.height = 500;
    this.canvas.style = "background: url(/images/clouds_background.png)";
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.frameNumber = 0;
    this.interval = setInterval(updateGame, 16); //set frame rate

    window.addEventListener("keydown", function(event) {
      newCanvas.keys = (newCanvas.keys || []);
      newCanvas.keys[event.keyCode] = true;
    })
    window.addEventListener("keyup", function(event) {
      newCanvas.keys[event.keyCode] = false;
    })
  },

  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  stop: function() {
    clearInterval(this.interval);
  }
}

function shape(width, height, colour, xCoord, yCoord, type) {
  this.width = width;
  this.height = height;
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.xSpeed = 0;
  this.ySpeed = 0;

  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = colour;
  }
  this.update = function() {
    ctx = newCanvas.context;

    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = colour;
      ctx.fillText(this.text, this.xCoord, this.yCoord);
    }
    if (type == "image") {
      ctx.drawImage(this.image, this.xCoord, this.yCoord, this.width, this.height);
    } else {
      ctx.fillStyle = colour;
      ctx.fillRect(this.xCoord, this.yCoord, this.width, this.height);
    }
  }
  this.newPosition = function() {
    console.log("PLAYER ICON X: ", playerIcon.xCoord);
    console.log("PLAYER ICON Y: ", playerIcon.yCoord);
    this.xCoord += this.xSpeed;
    this.yCoord += this.ySpeed;

    //player icon cannot go out of bounds anywhere on the canvas
    if (this.xCoord < 0) {
      this.xCoord = 0;
    }
    if (this.yCoord < 0) {
      this.yCoord = 0;
    }
    if (this.xCoord > 750) {
      this.xCoord = 750;
    }
    if (this.yCoord > 450) {
      this.yCoord = 450;
    }
  }
  //COLLISION DETECTION
  this.collide = function(otherObject) {
    var playerIconLeft = this.xCoord;
    var playerIconRight = (this.xCoord + this.width);
    var playerIconTop = this.yCoord;
    var playerIconBottom = (this.yCoord + this.height);
    var otherObjectLeft = otherObject.xCoord;
    var otherObjectRight = (otherObject.xCoord + otherObject.width);
    var otherObjectTop = otherObject.yCoord;
    var otherObjectBottom = (otherObject.yCoord + otherObject.height);
    var collision = true;
    if ((playerIconBottom < otherObjectTop) || (playerIconTop > otherObjectBottom) || (playerIconRight < otherObjectLeft) || (playerIconLeft > otherObjectRight)) {
      collision = false;
    }
    return collision;
  }
}

function perFrame(number) {
  if ((newCanvas.frameNumber / number) % 1 == 0) {
    return true;
  } else {
    return false;
  }
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  this.playSound = function() {
    this.sound.play();
  }

  this.stopSound = function() {
    this.sound.pause();
  }
}

function updateGame() {
  for (i = 0; i < pillarObstacles.length; i++) {
    if (playerIcon.collide(pillarObstacles[i])) {
      backgroundMusic.stopSound();
      crashSound.playSound();
      newCanvas.stop();
      return;
    }
  }
  playerIcon.xSpeed = 0;
  playerIcon.ySpeed = 0;

  //MOVE LEFT
  if (newCanvas.keys && newCanvas.keys[37]) {
    console.log("LEFT");
    playerIcon.xSpeed = -4;
  }

  //MOVE UP
  if (newCanvas.keys && newCanvas.keys[38]) {
    console.log("UP");
    playerIcon.ySpeed = -4;
  }

  //MOVE RIGHT
  if (newCanvas.keys && newCanvas.keys[39]) {
    console.log("RIGHT");
    playerIcon.xSpeed = 4;
  }

  //MOVE DOWN
  if (newCanvas.keys && newCanvas.keys[40]) {
    console.log("DOWN");
    playerIcon.ySpeed = 4;
  }

  newCanvas.clear();
  newCanvas.frameNumber += 1;
  if (newCanvas.frameNumber == 1 || perFrame(60)) {
    xCoord = newCanvas.canvas.width;

    minHeight = 20;
    maxHeight = 300;
    height = Math.floor(Math.random() * (maxHeight - (minHeight + 1)) + minHeight); 

    minGap = 90;
    maxGap = 150;
    gap = Math.floor(Math.random() * (maxGap - (minGap + 1)) + minGap);

    pillarObstacles.push(new shape(50, height, "blue", xCoord, 0));
    pillarObstacles.push(new shape(50, (xCoord - height - gap), "blue", xCoord, (height + gap)));
  }
  for (i = 0; i < pillarObstacles.length; i++) {
    pillarObstacles[i].xCoord -= 5;
    pillarObstacles[i].update();
  }
  playerScore.text="SCORE: " + Math.round(newCanvas.frameNumber / 2);
  playerScore.update();
  playerIcon.newPosition();
  playerIcon.update();
}

window.addEventListener("load", newGame());