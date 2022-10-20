import Canvas from "./Canvas.js";


const canvas = document.getElementById("test")
if (canvas.getContext) {
    const canvas2d = canvas.getContext('2d');


    global.addEventListener('resize', () => {
        canvas2d.width = '1000px';
        canvas2d.height = '800px';
        }
    );

    let myCanvas = new Canvas(canvas2d);
    canvas.addEventListener('click', (event) => myCanvas.onMouseClick(event));
    canvas.addEventListener('mousemove', (event) => myCanvas.onMouseMove(event));
    myCanvas.Draw();
}


