function newGame() {
  newCanvas.create();
}

var newCanvas = {
  canvas: document.createElement("canvas"),

  create: function() {
    this.canvas.id = "main-canvas";
    this.canvas.width = 800;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
  }
}

window.addEventListener("load", newGame());