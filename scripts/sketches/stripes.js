import getRandomPalette from '../utils/getRandomPalette';

const stripesBW = (p) => {
    console.log("StripesBW by Kjetil Midtgarden Golid.");
    console.log("Link to project: https://github.com/kgolid/p5ycho/tree/master/stripesbw");

    let rows = 30 * 2;
    let radius = 350;
    let min_length = 10;
    let max_length = 100;
    let space = 10;
    let stripes = [];
    let tick = 0;
    let scale;
    let randomColor = getRandomPalette();

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        p.stroke(0);
        p.noFill();

        for (let i = 0; i < rows; i++) {
            let ypos = ((i + .5) / rows) * (radius * 2) - radius;
            let row_length = 2 * p.sqrt((radius * radius) - (ypos * ypos));

            add_stripe_row(ypos, row_length);
        }
    }

    p.draw = () => {
        p.clear();
        p.translate(p.width / 2, p.height / 2);
        p.rotate(-p.PI / 5);
        scale = p.windowWidth < p.windowHeight ? p.windowWidth / 1000 : p.windowHeight / 1000;
        p.scale(scale);

        for (let s in stripes) {
            let stripe = stripes[s];

            p.strokeWeight(12);
            p.stroke(randomColor);

            p.strokeWeight(p.max(0, p.noise(5000 + stripe.start / 100, 5000 - tick / 160 + stripe.y / 100, tick / 200) * 20 - 6));
            p.line(stripe.start, stripe.y, stripe.end, stripe.y);
        }
        tick++;
    }

    const add_stripe_row = (ypos, row_length) => {
        let length = p.random(min_length, max_length);
        let start = -.5 * row_length;
        let end = start + length;

        while (end < row_length / 2 - space - min_length) {
            stripes.push({
                y: ypos,
                start: start,
                end: end
            });

            length = p.random(min_length, max_length);
            start = end + space;
            end = start + length;
        }

        stripes.push({
            y: ypos,
            start: start,
            end: row_length / 2
        });
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

export default stripesBW;