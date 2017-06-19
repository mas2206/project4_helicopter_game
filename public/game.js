var playerIcon;

function newGame() {
  newCanvas.create();
  playerIcon = new shape(50, 50, "red", 50, 200);
}

var newCanvas = {
  canvas: document.createElement("canvas"),

  create: function() {
    this.canvas.id = "main-canvas";
    this.canvas.width = 800;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.interval = setInterval(updateGame, 30);

    window.addEventListener("keydown", function(event) {
      newCanvas.key = event.keyCode;
    })
    window.addEventListener("keyup", function(event) {
      newCanvas.key = false;
    })
  },

  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    this.xCoord += this.xSpeed;
    this.yCoord += this.ySpeed;
  }
}

function updateGame() {
  newCanvas.clear();

  playerIcon.xSpeed = 0;
  playerIcon.ySpeed = 0;

  //MOVE LEFT
  if (newCanvas.key == 37) {
    playerIcon.xSpeed = -10;
  }

  //MOVE UP
  if (newCanvas.key == 38) {
    playerIcon.ySpeed = -10;
  }

  //MOVE RIGHT
  if (newCanvas.key == 39) {
    playerIcon.xSpeed = 10;
  }

  //MOVE DOWN
  if (newCanvas.key == 40) {
    playerIcon.ySpeed = 10;
  }

  playerIcon.newPosition();
  playerIcon.update();
}

window.addEventListener("load", newGame());