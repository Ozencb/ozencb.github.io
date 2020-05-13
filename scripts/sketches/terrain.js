import SimplexNoise from 'simplex-noise';

import {
  drawLine,
} from '../utils/display';

const terrain = (p5) => {
  console.info('Topographic by Kjetil Midtgarden Golid.');
  console.info('Link to project: https://github.com/kgolid/topographic');

  const p = p5;

  const steps = 100;
  const delta = 1.3 / steps;
  const cellDim = 5;
  const scale = 2;
  let nHeight;
  let nWidth;

  const noiseDim = 0.002;
  const persistence = 0.4;

  let THE_SEED;
  let simplex;
  let noiseGrid;

  const strokeColor = '#F7347A';

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);

    canvas.parent('stage');
    canvas.position(0, 0);
    canvas.elt.style.position = 'fixed';
    canvas.style('z-index', '-1');

    p.stroke(strokeColor);
    p.strokeWeight(0.5);
  };

  const getNoise = (x, y) => noiseGrid[y][x];

  const sumOctave = (numIterations, x, y) => {
    let noise = 0;
    let maxAmp = 0;
    let amp = 1;
    let freq = noiseDim;

    for (let i = 0; i < numIterations; i += 1) {
      noise += simplex.noise2D(14.3 + x * freq, 5.71 + y * freq) * amp;
      maxAmp += amp;
      amp *= persistence;
      freq *= 2;
    }
    return noise / maxAmp;
  };

  const buildNoiseGrid = () => {
    const grid = [];
    for (let y = 0; y < nHeight + 1; y += 1) {
      const row = [];
      for (let x = 0; x < nWidth + 1; x += 1) {
        row.push(sumOctave(16, x, y));
      }
      grid.push(row);
    }
    return grid;
  };

  const setValues = () => {
    nHeight = (p.windowHeight / 5) / scale;
    nWidth = (p.windowWidth / 5) / scale;

    THE_SEED = p.floor(p.random(999));
    simplex = new SimplexNoise(THE_SEED);
    p.randomSeed(THE_SEED);

    noiseGrid = buildNoiseGrid();
  };

  const buildThresholdList = () => {
    const thresholds = [];
    for (let t = 0; t <= steps; t += 1) {
      thresholds.push({
        val: -1 + t * delta,
      });
    }
    return thresholds;
  };

  const processCell = (x, y, thresholds) => {
    const v1 = getNoise(x, y);
    const v2 = getNoise(x + 1, y);
    const v3 = getNoise(x + 1, y + 1);
    const v4 = getNoise(x, y + 1);

    const min = p.min([v1, v2, v3, v4]);
    const max = p.max([v1, v2, v3, v4]);
    const relevantThresholds = thresholds.filter(
      (t) => t.val >= min - delta && t.val <= max,
    );

    Object.values(relevantThresholds).forEach((t) => {
      const b1 = v1 > t.val ? 8 : 0;
      const b2 = v2 > t.val ? 4 : 0;
      const b3 = v3 > t.val ? 2 : 0;
      const b4 = v4 > t.val ? 1 : 0;

      const id = (b1 + b2 + b3 + b4);

      drawLine(p, id, v1, v2, v3, v4, t.val, cellDim);
    });
  };

  const processGrid = () => {
    const thresholds = buildThresholdList();

    p.push();
    for (let y = 0; y < nHeight; y += 1) {
      p.push();
      for (let x = 0; x < nWidth; x += 1) {
        processCell(x, y, thresholds, delta);
        p.translate(cellDim, 0);
      }
      p.pop();
      p.translate(0, cellDim);
    }
    p.pop();
  };

  const display = () => {
    setValues();
    p.noLoop();

    processGrid();
  };

  p.draw = () => {
    p.clear();
    p.scale(scale);

    console.time('initialized in:');
    display();
    console.timeEnd('initialized in:');
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    setTimeout(() => {
      p.redraw();
    }, 1000);
  };
};

export default terrain;
