class Collision {
    constructor(dots) {
        this.dots = dots;
        this.getCollisionPoints = this.getCollisionPoints.bind(this);
    }

    cross(x1, y1, x2, y2, x3, y3, x4, y4) {

        if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
            return false
        }

        let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))


        if (denominator === 0) {
            return false
        }

        let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
        let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator


        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
            return false
        }


        let x = x1 + ua * (x2 - x1)
        let y = y1 + ua * (y2 - y1)

        return {x, y, stat: 1}
    }

    getCollisionPoints() {
        if (this.dots === []) {
            return [];
        }
        let collPoints = [];
        for (let i = 0; i < this.dots.length; i++) {
            for (let j = 0; j < this.dots.length; j++) {
                if (i === j) continue;
                let result = this.cross(
                    this.dots[i].x1, this.dots[i].y1,
                    this.dots[i].x2, this.dots[i].y2,
                    this.dots[j].x1, this.dots[j].y1,
                    this.dots[j].x2, this.dots[j].y2,
                );
                if (result.stat === 1) {
                    collPoints.push({x: result.x, y: result.y});
                }
            }
        }
        return collPoints;
    }

}

export default Collision;