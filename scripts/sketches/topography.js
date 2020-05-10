const topography = (p) => {
    console.log("Topography by Kjetil Midtgarden Golid.");
    console.log("Link to project: https://github.com/kgolid/p5ycho/tree/master/topography");

    let rings = 15;
    let dim_init = 1;

    let ox = p.random(10000);
    let oy = p.random(10000);

    let arr = [];
    let spacing = -10;
    let magnitude = 75;
    let noise_delta = 15;
    let noise_radius = 0.25;

    let coorX = p.randomGaussian(p.windowWidth / 2, 250);
    let coorY = p.randomGaussian(p.windowHeight / 2, 250);

    let cols = ['#996628', '#B28223', '#A68E2F', '#9A9A3B', '#769A76', '#6B828E'];

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        p.background(0);
        p.strokeWeight(1);
        p.stroke(0);
        p.noLoop();
        p.smooth();

        arr = createInitialArray();
    };

    p.draw = () => {
        p.clear();
        p.push();
        p.translate(coorX, coorY);
        p.scale((p.windowWidth + p.windowHeight) / 1500);

        display();
        p.pop();
        display_crosses();
        display_grid();
    };

    const display = () => {
        for (let i = 0; i < rings; i++) {
            p.strokeWeight(i % 6 == 0 ? 2 : 1);

            p.fill(cols[p.floor(i / rings * cols.length)]);

            let new_arr = [];

            p.beginShape();
            for (const ang in arr) {
                let rad = p.radians(ang);
                let new_radius = spacing + arr[ang] + getNoise(rad, i * noise_delta) * magnitude;

                p.vertex(new_radius * p.cos(rad), new_radius * p.sin(rad));
                new_arr[ang] = new_radius;
            }
            p.beginContour();
            for (const ang in arr) {
                let rad = p.radians(359 - ang);
                p.vertex(arr[359 - ang] * p.cos(rad), arr[359 - ang] * p.sin(rad));
            }
            p.endContour();

            p.endShape(p.CLOSE);

            arr = new_arr;
        }
    }

    const createInitialArray = () => {
        let array = [];
        for (let i = 0; i < 360; i++) {
            array.push(dim_init);
        }
        return array;
    }

    const display_crosses = () => {
        for (let i = 0; i < 50; i++) {
            p.push();
            p.translate(p.random(20, p.windowWidth - 20), p.random(20, p.windowHeight - 20));

            p.line(-5, 0, 5, 0);
            p.line(0, -5, 0, 5);
            p.pop();
        }
    }

    const display_grid = () => {
        p.stroke(0, 80);
        p.strokeWeight(1);

        let grid_space = 160;

        for (let i = grid_space; i < p.windowHeight; i += grid_space) {
            p.line(0, i, p.windowWidth, i);
        }

        for (let j = grid_space; j < p.windowWidth; j += grid_space) {
            p.line(j, 0, j, p.windowHeight);
        }
    }

    const getNoise = (radian, dim) => {
        let r = radian % p.TAU;

        if (r < 0.0) {
            r += p.TAU;
        }
        return p.noise(ox + p.cos(r) * (noise_radius + dim / 200), oy + p.sin(r) * (noise_radius + dim / 200), dim);
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        arr = createInitialArray();
        p.redraw();
    }
};

export default topography;