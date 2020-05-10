import SimplexNoise from 'simplex-noise';

import {
    draw_line,
    draw_poly
} from '../utils/display';

const terrain = (p) => {
    console.log("Topographic by Kjetil Midtgarden Golid.");
    console.log("Link to project: https://github.com/kgolid/topographic");

    const cell_dim = 5;
    let scale = 1;
    let nHeight;
    let nWidth;

    const noise_dim = 0.002;
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
    };

    p.draw = () => {
        p.clear();
        p.scale(scale);

        display();
    }

    const display = () => {
        setValues();
        p.noLoop();

        process_grid(0.3, 10, 0.7 / 10, [seaColor]);
        process_grid(-1, 120, 1.3 / 120, []);
    }

    const setValues = () => {
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

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        setTimeout(() => {
            p.redraw();
        }, 1000);
    }
}

export default terrain;