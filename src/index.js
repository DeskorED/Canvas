import Canvas from "./Canvas.js";



const canvas = document.getElementById("test")

const clearButton = document.getElementById("clear");
let myCanvas = new Canvas(canvas);
canvas.addEventListener('click', (event) => myCanvas.onMouseClick(event));
canvas.addEventListener('mousemove', (event) => myCanvas.onMouseMove(event));
canvas.width = 800;
canvas.height = 800;
myCanvas.mainLoop();

clearButton.addEventListener('click', myCanvas.collapse);




