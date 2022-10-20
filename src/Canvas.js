class Canvas {
    constructor(cnc) {
        this.cnc = cnc;
        this.start = false;
        this.lineArr = [
            {
                x: 10,
                y: 10,
                point: 'start'
            },
            {
                x: 30,
                y: 50,
                point: 'end'
            },
            {
                x: 20,
                y: 40,
                point: 'start'
            },
            {
                x: 50,
                y: 30,
                point: 'end'
            },
        ];
        this.Draw = this.Draw.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.Clear = this.Clear.bind(this);

    }

    onMouseClick(event) {
        this.Draw(event.offsetX, event.offsetY, 'onclick');

    }

    onMouseMove(event) {
        window.requestAnimationFrame(() => this.Draw(event.offsetX, event.offsetY, 'onmousemove'));
    }

    PreDraw() {
        if (this.lineArr) {
            return null;
        }
        const ctx = this.cnc;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.strokeStyle = 'black';
        const elemArr = this.lineArr;
        for (let elem of elemArr) {
            if (elem.point === "start") {
                ctx.beginPath();
                ctx.moveTo(elem.x, elem.y);
            } else {

            }
        }
        return ctx;
    }

    Draw(x, y, eventType) {
        const ctx = this.PreDraw();
        if (ctx) {
            if (eventType === "onclick") {

                if (this.start !== true) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    this.lineArr.push({x: x, y: y, point: 'start'})
                    this.start = !this.start;
                } else {
                    ctx.lineTo(x, y);
                    ctx.closePath();
                    this.lineArr.push({x: x, y: y, point: 'end'})
                    this.start = !this.start;
                }
            } else {
                if (this.start === true) {
                    ctx.lineTo(x, y);
                }
            }
        }
    }

    Clear() {
        this.cnc.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.lineArr.clear();
    }

}

export default Canvas;