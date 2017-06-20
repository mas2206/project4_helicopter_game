var playerIcon;
var pillarObstacle;

function newGame() {
  newCanvas.create();
  playerIcon = new shape(50, 50, "red", 50, 200); //width, height, colour, xCoord, yCoord
  pillarObstacle = new shape(50, 300, "green", 600, 100);
}

var newCanvas = {
  canvas: document.createElement("canvas"),

  create: function() {
    this.canvas.id = "main-canvas";
    this.canvas.width = 800;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.interval = setInterval(updateGame, 100);

    window.addEventListener("keydown", function(event) {
      newCanvas.key = event.keyCode;
    })
    window.addEventListener("keyup", function(event) {
      newCanvas.key = false;
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

function updateGame() {
  if (playerIcon.collide(pillarObstacle)) {
    newCanvas.stop();
    console.log("COLLISION DETECTED");
  } else {

  newCanvas.clear();
  pillarObstacle.xCoord -= 5;
  console.log("PILLAR OBSTACLE X: ", pillarObstacle.xCoord);
  console.log("PILLAR OBSTACLE Y: ", pillarObstacle.yCoord);

  playerIcon.xSpeed = 0;
  playerIcon.ySpeed = 0;

  //MOVE LEFT
  if (newCanvas.key == 37) {
    console.log("LEFT");
    playerIcon.xSpeed = -10;
  }

  //MOVE UP
  if (newCanvas.key == 38) {
    console.log("UP");
    playerIcon.ySpeed = -10;
  }

  //MOVE RIGHT
  if (newCanvas.key == 39) {
    console.log("RIGHT");
    playerIcon.xSpeed = 10;
  }

  //MOVE DOWN
  if (newCanvas.key == 40) {
    console.log("DOWN");
    playerIcon.ySpeed = 10;
  }

  playerIcon.newPosition();
  playerIcon.update();
  pillarObstacle.update();
}
}

window.addEventListener("load", newGame());