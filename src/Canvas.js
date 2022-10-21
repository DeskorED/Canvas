import Collision from "./Collision";

Array.prototype.remove = function (value) {
    this.splice(this.indexOf(value), 1);
}


class Canvas {
    constructor(cnc) {
        this.cnv = cnc;
        this.cnc = cnc.getContext('2d');
        this.start = false;
        this.durraion = 2000;
        this.lineArr = [];
        this.collapseArr = [];
        this.colisArr = [];
        this.Draw = this.Draw.bind(this);
        this.reDraw = this.reDraw.bind(this);
        this.mainLoop = this.mainLoop.bind(this);
        this.collapse = this.collapse.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
    }

    mainLoop(prev = 0) {
        let prevTime = prev;
        let curTime = (new Date()).getTime();
        let deltaTime = curTime - prevTime;
        if (this.collapseArr) {
            for (let i = 0; i < this.collapseArr.length; i++) {
                let middleX = Math.abs(this.collapseArr[i].x1 - this.collapseArr[i].x2) * 1.5;
                let middleY = Math.abs(this.collapseArr[i].y1 - this.collapseArr[i].y2) * 1.5;
                if (this.lineArr[i].collapseProgress <= 0) {
                    this.lineArr.remove(i);
                    this.collapseArr.remove(i)
                } else {
                    this.lineArr[i].collapseProgress -= (deltaTime / this.durraion);
                    if (this.lineArr[i].x1 < this.lineArr[i].x2) {
                        this.lineArr[i].x1 += middleX * (deltaTime / this.durraion);
                        this.lineArr[i].x2 -= middleX * (deltaTime / this.durraion);
                    } else {
                        this.lineArr[i].x1 -= middleX * (deltaTime / this.durraion);
                        this.lineArr[i].x2 += middleX * (deltaTime / this.durraion);
                    }
                    if (this.lineArr[i].y1 < this.lineArr[i].y2) {
                        this.lineArr[i].y1 += middleY * (deltaTime / this.durraion);
                        this.lineArr[i].y2 -= middleY * (deltaTime / this.durraion);
                    } else {
                        this.lineArr[i].y1 -= middleY * (deltaTime / this.durraion);
                        this.lineArr[i].y2 += middleY * (deltaTime / this.durraion);
                    }
                }
            }
        }
        this.reDraw();
        window.requestAnimationFrame(() => this.mainLoop(curTime));
    }

    getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    onMouseClick(event) {
        let mouse = this.getMousePos(this.cnv, event);
        this.Draw(mouse.x, mouse.y, 'onclick');

    }

    onMouseMove(event) {
        let mouse = this.getMousePos(this.cnv, event);
        this.Draw(mouse.x, mouse.y, 'onmousemove');
    }

    reDraw() {
        this.collision = new Collision(this.lineArr);
        this.colisArr = this.collision.getCollisionPoints();
        if (!this.lineArr) {
            return null;
        }
        this.cnc.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.cnc.strokeStyle = "black";
        this.cnc.beginPath();
        for (let elem of this.lineArr) {
            this.cnc.moveTo(elem.x1, elem.y1);
            this.cnc.lineTo(elem.x2, elem.y2)
        }
        if (this.colisArr !== []) {
            for (let elem of this.colisArr) {
                this.cnc.fillRect(elem.x - 5, elem.y - 5, 10, 10);
                this.cnc.fillStyle = "red";
            }
        }

        this.cnc.stroke();
    }

    Draw(x, y, eventType) {
        this.cnc.beginPath();
        this.reDraw();
        this.cnc.strokeStyle = "black";
        if (eventType === "onclick") {

            if (!this.start) {
                this.cnc.moveTo(x, y);
                this.lineArr.push({x1: x, y1: y, x2: x, y2: y, collapseProgress: 1})
                this.start = !this.start;
            } else {
                this.cnc.lineTo(x, y);
                this.lineArr[this.lineArr.length - 1].x2 = x;
                this.lineArr[this.lineArr.length - 1].y2 = y;
                this.start = !this.start;
            }
        } else {
            if (this.start) {
                this.cnc.lineTo(x, y);
                this.lineArr[this.lineArr.length - 1].x2 = x;
                this.lineArr[this.lineArr.length - 1].y2 = y;
            }
        }
        this.cnc.stroke();
    }

    collapse() {
        this.collapseArr = Array.from(new Set(this.lineArr));
    }

}

export default Canvas;