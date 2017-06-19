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
  this.update = function() {
    ctx = newCanvas.context;
    ctx.fillStyle = colour;
    ctx.fillRect(this.xCoord, this.yCoord, this.width, this.height);
  }
}

function updateGame() {
  newCanvas.clear();
  // playerIcon.xCoord += 1;
  playerIcon.update();
}

window.addEventListener("load", newGame());