import Canvas from "./Canvas.js";


const canvas = document.getElementById("test")

const clearButton = document.getElementById("clear");
let myCanvas = new Canvas(canvas);
canvas.addEventListener('click', (event) => myCanvas.onMouseClick(event));
canvas.addEventListener('mousemove', (event) => myCanvas.onMouseMove(event));
myCanvas.PreDraw();

clearButton.addEventListener('click', myCanvas.Clear);




