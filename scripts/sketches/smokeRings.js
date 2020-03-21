import getRandomPalette from '../utils/getRandomPalette';

const smokeRings = (p) => {
    console.log("Smoke Rings by Kjetil Midtgarden Golid.");
    console.log("Link to project: https://github.com/kgolid/p5ycho/tree/master/smokerings");

    let ox = p.random(10000);
    let oy = p.random(10000);
    let oz = p.random(10000);

    let rings = 25;

    let scale;

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        p.stroke(getRandomPalette());
        p.strokeWeight(2);
        p.smooth();
        p.noFill();
    }

    p.draw = () => {
        p.clear();
        p.translate(p.width / 2, p.height / 2);
        scale = p.windowWidth < p.windowHeight ? p.windowWidth / 1000 : p.windowHeight / 1000;
        p.scale(scale);


        display();
    }

    const display = () => {
        ox += 0.01;
        oy += 0.01;
        oz += 0.007;

        for (let i = 0; i < rings; i++) {
            p.beginShape();
            for (let angle = 0; angle < 360; angle += 3) {
                let radian = p.radians(angle);
                let radius = 250 + p.map(getNoise(radian, 0.35, 0.02 * i), 0, 1, -150, 150);
                p.vertex(radius * p.cos(radian), radius * p.sin(radian));
            }
            p.endShape(p.CLOSE);
        }
    }

    const getNoise = (radian, dim, time) => {
        let r = radian % p.TWO_PI;

        if (r < 0.0) {
            r += p.TWO_PI;
        }
        return p.noise(ox + p.cos(r) * dim, oy + p.sin(r) * dim, oz + time);
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

export default smokeRings;