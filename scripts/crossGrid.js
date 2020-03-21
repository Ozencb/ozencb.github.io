const crossGrid = (p) => {
    console.log("Cross Grid by Kjetil Midtgarden Golid.");
    console.log("Link to project: https://github.com/kgolid/p5ycho/tree/master/lab/cross-grid");

    let tick;

    let cross_dim = 10;
    let grid_size = 25;
    let cell_dim = 25;
    let nheight = 1.5;
    let nzoom = 25;
    let scale;

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        p.stroke(255);

        tick = 0;
    };

    p.draw = () => {
        p.background(0);
        p.translate(p.width / 2, p.height / 2);

        scale = p.windowWidth < p.windowHeight ? p.windowWidth / 1000 : p.windowHeight / 1000;
        p.scale(scale);

        draw_grid();

        tick += 0.005;
    };

    const draw_grid = () => {
        for (let j = 0; j < grid_size; j++) {
            for (let i = 0; i < grid_size; i++) {
                p.push();
                p.scale(p.map(p.noise(i / nzoom + tick, j / nzoom), 0, 1, 1 / nheight, nheight));
                draw_cross((i - grid_size / 2) * cell_dim, (j - grid_size / 2) * cell_dim);
                p.pop();
            }
        }
    }

    const draw_cross = (x, y) => {
        p.push();
        p.translate(x, y);
        p.line(-cross_dim / 2, 0, cross_dim / 2, 0);
        p.line(0, -cross_dim / 2, 0, cross_dim / 2);
        p.pop();
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

export default crossGrid;