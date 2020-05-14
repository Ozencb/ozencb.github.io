import debounce from 'lodash.debounce';

const topography = (p5) => {
  console.info('Topography by Kjetil Midtgarden Golid.');
  console.info('Link to project: https://github.com/kgolid/p5ycho/tree/master/topography');

  const p = p5;

  const rings = 15;
  const dimInit = 1;

  const ox = p.random(10000);
  const oy = p.random(10000);

  const spacing = -10;
  const magnitude = 75;
  const noiseDelta = 15;
  const noiseRadius = 0.25;

  const coorX = p.randomGaussian(p.windowWidth / 2, 250);
  const coorY = p.randomGaussian(p.windowHeight / 2, 250);

  const cols = ['#996628', '#B28223', '#A68E2F', '#9A9A3B', '#769A76', '#6B828E'];


  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);

    canvas.parent('stage');
    canvas.position(0, 0);
    canvas.elt.style.position = 'fixed';
    canvas.style('z-index', '-1');

    p.background(0);
    p.strokeWeight(1);
    p.stroke(0);
    p.noLoop();
    p.smooth();
  };

  const getNoise = (radian, dim) => {
    let r = radian % p.TAU;

    if (r < 0.0) {
      r += p.TAU;
    }
    return p.noise(
      ox + p.cos(r) * (noiseRadius + dim / 200), oy + p.sin(r) * (noiseRadius + dim / 200), dim,
    );
  };

  const createInitialArray = () => {
    const array = [];
    for (let i = 0; i < 360; i += 1) {
      array.push(dimInit);
    }
    return array;
  };

  const display = () => {
    let arr = createInitialArray();
    for (let i = 0; i < rings; i += 1) {
      p.strokeWeight(i % 6 === 0 ? 2 : 1);

      p.fill(cols[p.floor((i / rings) * cols.length)]);

      const newArr = [];

      p.beginShape();
      Object.keys(arr).forEach((ang) => {
        const rad = p.radians(ang);
        const newRadius = spacing + arr[ang] + getNoise(rad, i * noiseDelta) * magnitude;

        p.vertex(newRadius * p.cos(rad), newRadius * p.sin(rad));
        newArr[ang] = newRadius;
      });
      p.beginContour();
      Object.keys(arr).forEach((ang) => {
        const rad = p.radians(359 - ang);
        p.vertex(arr[359 - ang] * p.cos(rad), arr[359 - ang] * p.sin(rad));
      });
      p.endContour();
      p.endShape(p.CLOSE);

      arr = newArr;
    }
  };

  const displayCrosses = () => {
    for (let i = 0; i < 50; i += 1) {
      p.push();
      p.translate(p.random(20, p.windowWidth - 20), p.random(20, p.windowHeight - 20));

      p.line(-5, 0, 5, 0);
      p.line(0, -5, 0, 5);
      p.pop();
    }
  };

  const displayGrid = () => {
    p.stroke(0, 80);
    p.strokeWeight(1);

    const gridSpace = 160;

    for (let i = gridSpace; i < p.windowHeight; i += gridSpace) {
      p.line(0, i, p.windowWidth, i);
    }

    for (let j = gridSpace; j < p.windowWidth; j += gridSpace) {
      p.line(j, 0, j, p.windowHeight);
    }
  };

  p.draw = () => {
    p.clear();
    p.push();
    p.translate(coorX, coorY);
    p.scale((p.windowWidth + p.windowHeight) / 1500);

    display();
    p.pop();
    displayCrosses();
    displayGrid();
  };

  const resizeCanvas = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.redraw();
  };

  const debounceResize = debounce(resizeCanvas, 100);

  p.windowResized = () => {
    debounceResize();
  };
};

export default topography;
