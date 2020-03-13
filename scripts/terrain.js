import SimplexNoise from 'simplex-noise';

const terrain = (p) => {
    const cell_dim = 5;
    let scale = 2;
    let nHeight;
    let nWidth;

    const noise_dim = 0.003;
    const persistence = 0.4;

    let THE_SEED;
    let simplex;
    let noise_grid;

    const bgColor = '#000';
    const strokeColor = '#F7347A';
    const seaColor = '#00FFFF';

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        p.background(bgColor);
    };

    p.draw = () => {
        p.clear();
        p.background(bgColor);
        p.scale(scale);

        display();
    }

    const display = () => {
        defineValues();
        p.noLoop();
        
        process_grid(0.3, 10, 0.7 / 10, [seaColor]);
        process_grid(-1, 120, 1.3 / 120, []);
    }

    const defineValues = () => {
        nHeight = (p.windowHeight / 5) / scale;
        nWidth = (p.windowWidth / 5) / scale;

        THE_SEED = p.floor(p.random(999));
        simplex = new SimplexNoise(THE_SEED);
        p.randomSeed(THE_SEED);

        noise_grid = build_noise_grid();
    }

    const process_grid = (init, steps, delta, fill_palette) => {
        const thresholds = build_threshold_list(init, steps, delta);
        const filled = fill_palette.length !== 0;

        p.push();
        for (let y = 0; y < nHeight; y++) {
            p.push();
            for (let x = 0; x < nWidth; x++) {
                process_cell(x, y, filled, thresholds, delta);
                p.translate(cell_dim, 0);
            }
            p.pop();
            p.translate(0, cell_dim);
        }
        p.pop();
    }

    const process_cell = (x, y, filled, thresholds, delta) => {
        const v1 = get_noise(x, y);
        const v2 = get_noise(x + 1, y);
        const v3 = get_noise(x + 1, y + 1);
        const v4 = get_noise(x, y + 1);

        const min = p.min([v1, v2, v3, v4]);
        const max = p.max([v1, v2, v3, v4]);
        const relevant_thresholds = thresholds.filter(
            t => t.val >= min - delta && t.val <= max
        );

        for (const t of relevant_thresholds) {
            const b1 = v1 > t.val ? 8 : 0;
            const b2 = v2 > t.val ? 4 : 0;
            const b3 = v3 > t.val ? 2 : 0;
            const b4 = v4 > t.val ? 1 : 0;

            const id = b1 + b2 + b3 + b4;

            if (filled) {
                p.fill(t.col);
                draw_poly(p, id, v1, v2, v3, v4, t.val, cell_dim);
            } else {
                p.stroke(strokeColor);
                draw_line(p, id, v1, v2, v3, v4, t.val, cell_dim);
            }
        }
    }

    const get_noise = (x, y) => {
        return noise_grid[y][x];
    }

    const build_noise_grid = () => {
        let grid = [];
        for (let y = 0; y < nHeight + 1; y++) {
            let row = [];
            for (let x = 0; x < nWidth + 1; x++) {
                row.push(sum_octave(16, x, y));
            }
            grid.push(row);
        }
        return grid;
    }

    const build_threshold_list = (init, steps, delta) => {
        let thresholds = [];
        for (let t = 0; t <= steps; t++) {
            let col = seaColor;
            thresholds.push({
                val: init + t * delta,
                col: col
            });
        }
        return thresholds;
    }

    const sum_octave = (num_iterations, x, y) => {
        let noise = 0;
        let maxAmp = 0;
        let amp = 1;
        let freq = noise_dim;

        for (let i = 0; i < num_iterations; i++) {
            noise += simplex.noise2D(14.3 + x * freq, 5.71 + y * freq) * amp;
            maxAmp += amp;
            amp *= persistence;
            freq *= 2;
        }
        return noise / maxAmp;
    }

    const draw_line = (p, id, nw, ne, se, sw, threshold, dim) => {
        const n = [p.map(threshold, nw, ne, 0, dim), 0];
        const e = [dim, p.map(threshold, ne, se, 0, dim)];
        const s = [p.map(threshold, sw, se, 0, dim), dim];
        const w = [0, p.map(threshold, nw, sw, 0, dim)];

        if (id === 1 || id === 14) p.line(...s, ...w);
        else if (id === 2 || id === 13) p.line(...e, ...s);
        else if (id === 3 || id === 12) p.line(...e, ...w);
        else if (id === 4 || id === 11) p.line(...n, ...e);
        else if (id === 6 || id === 9) p.line(...n, ...s);
        else if (id === 7 || id === 8) p.line(...w, ...n);
        else if (id === 5 || id == 10) {
            p.line(...e, ...s);
            p.line(...w, ...n);
        }
    }

    const draw_poly = (p, id, v1, v2, v3, v4, threshold, dim) => {
        const n = [p.map(threshold, v1, v2, 0, dim), 0];
        const e = [dim, p.map(threshold, v2, v3, 0, dim)];
        const s = [p.map(threshold, v4, v3, 0, dim), dim];
        const w = [0, p.map(threshold, v1, v4, 0, dim)];
        const nw = [0, 0];
        const ne = [dim, 0];
        const se = [dim, dim];
        const sw = [0, dim];

        p.noStroke();
        p.beginShape();

        if (id === 1) {
            p.vertex(...s);
            p.vertex(...w);
            p.vertex(...sw);
        } else if (id === 2) {
            p.vertex(...e);
            p.vertex(...s);
            p.vertex(...se);
        } else if (id === 3) {
            p.vertex(...e);
            p.vertex(...w);
            p.vertex(...sw);
            p.vertex(...se);
        } else if (id === 4) {
            p.vertex(...n);
            p.vertex(...e);
            p.vertex(...ne);
        } else if (id === 5) {
            p.vertex(...e);
            p.vertex(...s);
            p.vertex(...sw);
            p.vertex(...w);
            p.vertex(...n);
            p.vertex(...ne);
        } else if (id === 6) {
            p.vertex(...n);
            p.vertex(...s);
            p.vertex(...se);
            p.vertex(...ne);
        } else if (id === 7) {
            p.vertex(...w);
            p.vertex(...n);
            p.vertex(...ne);
            p.vertex(...se);
            p.vertex(...sw);
        } else if (id === 15) {
            p.vertex(...nw);
            p.vertex(...ne);
            p.vertex(...se);
            p.vertex(...sw);
        } else if (id === 14) {
            p.vertex(...s);
            p.vertex(...w);
            p.vertex(...nw);
            p.vertex(...ne);
            p.vertex(...se);
        } else if (id === 13) {
            p.vertex(...e);
            p.vertex(...s);
            p.vertex(...sw);
            p.vertex(...nw);
            p.vertex(...ne);
        } else if (id === 12) {
            p.vertex(...e);
            p.vertex(...w);
            p.vertex(...nw);
            p.vertex(...ne);
        } else if (id === 11) {
            p.vertex(...n);
            p.vertex(...e);
            p.vertex(...se);
            p.vertex(...sw);
            p.vertex(...nw);
        } else if (id === 10) {
            p.vertex(...e);
            p.vertex(...se);
            p.vertex(...s);
            p.vertex(...w);
            p.vertex(...nw);
            p.vertex(...n);
        } else if (id === 9) {
            p.vertex(...n);
            p.vertex(...s);
            p.vertex(...sw);
            p.vertex(...nw);
        } else if (id === 8) {
            p.vertex(...w);
            p.vertex(...n);
            p.vertex(...nw);
        }
        p.endShape(p.CLOSE);
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        setTimeout(() => {
            p.redraw();
        }, 1000);
    }
}

export default terrain;