import getRandomPalette from '../utils/getRandomPalette';

const trunk = (p) => {
    console.log("Trunk by Kjetil Midtgarden Golid.");
    console.log("Link to project: https://github.com/kgolid/p5ycho/tree/master/trunk");

    let rings = 10;
    let dim_init = 10;
    let dim_delta = 15;

    let chaos_init = 0.2;
    let chaos_delta = 0.10;
    let chaos_mag = 25;

    let ox = 0;
    let oy = 0;
    let oz = 0;

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

        canvas.parent('stage');
        canvas.elt.style.position = "fixed";
        canvas.style('z-index', '-1');

        p.strokeWeight(0.5);
        p.stroke(getRandomPalette());
        p.smooth();
        p.noFill();
    }

    p.draw = () => {
        p.clear();
        p.translate(p.width / 2, p.height / 2);
        p.scale(Math.max(p.windowWidth / 250, p.windowHeight / 250));

        display();
    }

    const display = () => {
        oy -= 0.04;
        oz += 0.02;

        for (let i = 0; i < rings; i++) {
            p.beginShape();

            for (let angle = 0; angle < 360; angle += 3) {
                let radian = p.radians(angle);
                let radius = (chaos_mag * getNoiseWithTime(radian, chaos_delta * i + chaos_init, oz)) + (dim_delta * i + dim_init);
                p.vertex(radius * p.cos(radian), radius * p.sin(radian));
            }

            p.endShape(p.CLOSE);
        }
    }

    const getNoiseWithTime = (radian, dim, time) => {
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

export default trunk;