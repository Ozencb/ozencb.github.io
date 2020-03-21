const stripes = (p) => {
    console.log("Stripes by Kjetil Midtgarden Golid.");
    console.log("Link to project: https://github.com/kgolid/p5ycho/tree/master/stripes");

    let rows = 20;
    let radius = 250;
    let scale;
    let min_length = 35;
    let max_length = 85;
    let space = 15;
    let stripes = [];
    
    const colors = [
        p.color(142, 192, 124),
        p.color(250, 189, 47),
        p.color(251, 71, 44),
        p.color(211, 134, 147),
        p.color(49, 69, 80)
    ];

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('stage');

        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        p.stroke(255);
        p.strokeWeight(10);



        for (let i = 0; i < rows; i++) {
            let ypos = ((i + .5) / rows) * (radius * 2) - radius;
            let row_length = get_row_length(ypos);

            add_stripe_row(ypos, row_length);
        }
    }

    p.draw = () => {
        p.clear();
        p.translate(p.width / 2, p.height / 2);
        scale = p.windowWidth < p.windowHeight ? p.windowWidth / 1000 : p.windowHeight / 1000;
        p.scale(scale);

        for (let row in stripes) {
            for (let s in stripes[row]) {
                let stripe = stripes[row][s];
                let length = get_row_length(stripe.y);

                if (!is_outside_circle(stripe, length)) {
                    p.stroke(stripe.color);
                    p.line(p.max((stripe.start + space), -length), stripe.y, p.min((stripe.end - space), length), stripe.y);
                } else if (stripe.start > length) {
                    stripes[row].splice(s, 1);

                    let s_length = p.random(min_length, max_length);
                    let end = stripes[row][0].start;
                    let start = end - s_length;

                    stripes[row].unshift({
                        y: stripe.y,
                        start: start,
                        end: end,
                        color: colors[p.floor(p.random(5))]
                    });
                }

                let startx = p.constrain(stripe.start, -length, length);
                let endx = p.constrain(stripe.end, -length, length);
                let startspeed = p.sqrt(2) - p.sqrt(stripe.y * stripe.y + startx * startx) / radius;
                let endspeed = p.sqrt(2) - p.sqrt(stripe.y * stripe.y + endx * endx) / radius;

                stripe.start += startspeed;
                stripe.end += endspeed;
            }
        }
    }

    const get_row_length = (ypos) => {
        if ((radius * radius) < (ypos * ypos)) return 0;
        return p.sqrt((radius * radius) - (ypos * ypos));
    }

    const is_outside_circle = (stripe, length) => {
        return stripe.end - space < -length || stripe.start + space > length;
    }

    const add_stripe_row = (ypos, row_length) => {
        let row = [];
        let length = p.random(min_length, max_length);
        let start = -1000 + p.random(min_length, max_length);
        let end = start + length;

        while (end < -row_length) {
            row.push({
                y: ypos,
                start: start,
                end: end,
                color: colors[p.floor(p.random(5))]
            });

            length = p.random(min_length, max_length);
            start = end;
            end = start + length;
        }
        stripes.push(row);
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

export default stripes;