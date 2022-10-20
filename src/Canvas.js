class Canvas {
    constructor(cnc) {
        this.cnv = cnc;
        this.cnc = cnc.getContext('2d');
        cnc.width = 1000;
        cnc.height = 1000;
        this.start = false;
        this.lineArr = [
            {
                x: 100,
                y: 50,
                point: 'start'
            },
            {
                x: 30,
                y: 10,
                point: 'end'
            },
            {
                x: 20,
                y: 40,
                point: 'start'
            },
            {
                x: 100,
                y: 10,
                point: 'end'
            },
            {
                x: 50,
                y: 50,
                point: 'start'
            },
            {
                x: 200,
                y: 100,
                point: 'end'
            },
        ];
        this.Draw = this.Draw.bind(this);
        this.PreDraw = this.PreDraw.bind(this);
        this.Clear = this.Clear.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
    }

    onMouseClick(event) {
        let mouse = this.getMousePos(this.cnv, event);
        this.Draw(mouse.x, mouse.y, 'onclick');

    }

    getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    onMouseMove(event) {
        let mouse = this.getMousePos(this.cnv, event);
        window.requestAnimationFrame(() => this.Draw(mouse.x, mouse.y, 'onmousemove'));
    }

    PreDraw() {
        if (!this.lineArr) {
            return null;
        }
        this.cnc.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.cnc.strokeStyle = "black";
        this.cnc.beginPath();
        for (let elem of this.lineArr) {
            if (elem.point === "start") {

                this.cnc.moveTo(elem.x, elem.y);
            } else {
                this.cnc.lineTo(elem.x, elem.y)

            }
        }
        this.cnc.stroke();
    }

    Draw(x, y, eventType) {
        this.cnc.beginPath();
        this.PreDraw();
        this.cnc.strokeStyle = "black";
        if (eventType === "onclick") {

            if (!this.start) {
                this.cnc.moveTo(x, y);
                this.lineArr.push({x: x, y: y, point: 'start'})
                this.start = !this.start;
            } else {
                this.cnc.lineTo(x, y);
                this.lineArr.push({x: x, y: y, point: 'end'})
                this.start = !this.start;
            }
        } else {
            if (this.start) {
                this.cnc.lineTo(x, y);
            }
        }
        this.cnc.stroke();
    }

    Clear() {
        this.cnc.clearRect(0, 0, this.cnv.width, this.cnv.height);
        this.lineArr = [];
        this.PreDraw();
    }

}

export default Canvas;