class Canvas {
    constructor(cnc) {
        this.cnc = cnc;
        this.start = false;
        this.lineArr = [
            {
                x: 10,
                y: 10
            },
            {
                x: 30,
                y: 50
            },
            {
                x: 20,
                y: 40
            },
            {
                x: 50,
                y: 30
            },
        ];
        this.Draw = this.Draw.bind(this);
    }

    onMouseClick(event) {
        this.Draw(event.x, event.y, !this.start);

    }

    onMouseMove(event) {

        window.requestAnimationFrame(() => this.Draw(event.x, event.y, this.start));
    }

    Draw(x, y, state) {
        const ctx = this.cnc;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.strokeStyle = 'black';

        if(state != this.start){
            this.start = state;
             this.cnc.lineTo(x, y);
        }
        for (let i = 0; i < this.lineArr.length; i+=2) {
            if(i+1 == this.lineArr.length){
                break;
            }
            ctx.beginPath();
            ctx.moveTo(this.lineArr.keys()[i], this.lineArr.values()[i]);
            ctx.lineTo(this.lineArr.keys()[i+1], this.lineArr.values()[i+1]);
            ctx.closePath();
        }
    }
}

export default Canvas;