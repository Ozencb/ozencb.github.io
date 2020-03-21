import SimplexNoise from 'simplex-noise';
import getRandomPalette from './util/getRandomPalette';
import {
    draw_poly
} from './util/display';

const topographic = (p) => {
    console.log("Topographic by Kjetil Midtgarden Golid.");
    console.log("Link to project: https://github.com/kgolid/topographic");

    const cell_dim = 5;
    let scale = 1;
    let nHeight;
    let nWidth;

    const noise_scale = 300;
    const noise_persistence = 0.3;
    const sigm = 2;

    let THE_SEED;
    let simplex;
    let noise_grid;

    const palette = getRandomPalette(5);

    const line_density = 50;

    const bgColor = '#000';
    const strokeColor = '#F7347A';


    p.setup = function () {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

    };

    const setValues = () => {
        nHeight = (p.windowHeight / 5) / scale;
        nWidth = (p.windowWidth / 5) / scale;

        THE_SEED = p.floor(p.random(999));
        simplex = new SimplexNoise(THE_SEED);
        p.randomSeed(THE_SEED);

        noise_grid = build_noise_grid();
    }

    p.draw = () => {
        p.clear();
        p.scale(scale);
        p.background(bgColor);

        display();
    }

    const display = () => {
        setValues();
        p.noLoop();
        process_grid(-1, 2 * line_density, 1 / line_density, palette);
        p.pop();
    }

    const process_grid = (init, steps, delta, fill_palette) => {
        const thresholds = build_threshold_list(init, steps, delta, fill_palette);
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

    function build_threshold_list(init, steps, delta, colors) {
        const thresholds = [];
        for (let t = 0; t <= steps; t++) {
            let col = colors.length === 0 ? '#fff' : colors[p.floor(p.random(colors.length))];
            thresholds.push({
                val: init + t * delta,
                col: col
            });
        }
        return thresholds;
    }

    function sum_octave(num_iterations, x, y) {
        let noise = 0;
        let maxAmp = 0;
        let amp = 1;
        let freq = 1 / noise_scale;

        for (let i = 0; i < num_iterations; i++) {
            noise += simplex.noise3D(x * freq, y * freq, i) * amp;
            maxAmp += amp;
            amp *= noise_persistence;
            freq *= 2;
        }
        var output = apply_sigmoid(noise / maxAmp, sigm);
        return output;
    }

    function apply_sigmoid(value, intensity) {
        if (intensity === 0) return value;
        return 2 * sigmoid(value * intensity) - 1;
    }

    function sigmoid(x) {
        return 1 / (1 + p.exp(-x));
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        setTimeout(() => {
            p.redraw();
        }, 1000);
    }
}

export default topographic;