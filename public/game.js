var playerIcon;
var pillarObstacles = [];

function newGame() {
  newCanvas.create();
  playerIcon = new shape(50, 50, "red", 50, 200); //width, height, colour, xCoord, yCoord
}

var newCanvas = {
  canvas: document.createElement("canvas"),

  create: function() {
    this.canvas.id = "main-canvas";
    this.canvas.width = 800;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.frameNumber = 0;
    this.interval = setInterval(updateGame, 20);

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

function shape(width, height, colour, xCoord, yCoord) {
  this.width = width;
  this.height = height;
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.update = function() {
    ctx = newCanvas.context;
    ctx.fillStyle = colour;
    ctx.fillRect(this.xCoord, this.yCoord, this.width, this.height);
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

function updateGame() {
  var xCoord;
  var yCoord;
  for (i = 0; i < pillarObstacles.length; i++) {
    if (playerIcon.collide(pillarObstacles[i])) {
      newCanvas.stop();
      console.log("COLLISION DETECTED");
      return;
    }
  }
  playerIcon.xSpeed = 0;
  playerIcon.ySpeed = 0;

  //MOVE LEFT
  if (newCanvas.keys && newCanvas.keys[37]) {
    console.log("LEFT");
    playerIcon.xSpeed = -5;
  }

  //MOVE UP
  if (newCanvas.keys && newCanvas.keys[38]) {
    console.log("UP");
    playerIcon.ySpeed = -5;
  }

  //MOVE RIGHT
  if (newCanvas.keys && newCanvas.keys[39]) {
    console.log("RIGHT");
    playerIcon.xSpeed = 5;
  }

  //MOVE DOWN
  if (newCanvas.keys && newCanvas.keys[40]) {
    console.log("DOWN");
    playerIcon.ySpeed = 5;
  }

  newCanvas.clear();
  newCanvas.frameNumber += 1;
  if (newCanvas.frameNumber == 1 || perFrame(120)) {
    xCoord = newCanvas.canvas.width;
    yCoord = newCanvas.canvas.height - 400;
    pillarObstacles.push(new shape(80, 450, "green", xCoord, yCoord));
  }
  for (i = 0; i < pillarObstacles.length; i++) {
    pillarObstacles[i].xCoord -= 2;
    pillarObstacles[i].update();
  }
  playerIcon.newPosition();
  playerIcon.update();
}    

window.addEventListener("load", newGame());