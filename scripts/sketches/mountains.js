import getRandomPalette from '../utils/getRandomPalette';

const mountains = (p5) => {
  console.info('Perlin Mountains by Owen McAteer.');
  console.info('Link to project: https://owenmcateer.github.io/Motus-Art');

  const p = p5;

  const canvasSize = 500;

  const points = [];
  const size = 10;
  const gridSize = Math.ceil((canvasSize * 0.8) / size) + 1;
  const maxHeight = 100;

  const noiseScale = 0.1;
  let noiseOffsetX = 0;
  let noiseOffsetY = 0;

  const setPoints = () => {
    for (let y = 0; y < gridSize; y += 1) {
      for (let x = 0; x < gridSize; x += 1) {
        points.push({
          posX: x,
          posY: y,
          x: (x * size),
          y: (y * size),
          noise: 0,
        });
      }
    }
  };

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);

    canvas.parent('stage');
    canvas.position(0, 0);
    canvas.elt.style.position = 'fixed';
    canvas.style('z-index', '-1');

    p.noFill();
    p.stroke(getRandomPalette());
    p.strokeWeight(0.5);

    setPoints();
  };

  p.draw = () => {
    p.clear();
    p.scale(Math.min(p.windowWidth / 100, p.windowHeight / 100));

    noiseOffsetX += 0.05;
    noiseOffsetY = 0;

    points.forEach((pnt) => {
      pnt.noise = p.constrain(
        p.noise(
          (pnt.posX - noiseOffsetX) * noiseScale, (pnt.posY + noiseOffsetY) * noiseScale,
        ), 0.5, 1,
      ) * maxHeight - (maxHeight / 2);
      pnt.noiseyY = pnt.y - pnt.noise;
    });

    for (let i = 0; i < points.length; i += 1) {
      const thisPoint = points[i];
      const connect = points.find((pnt) => pnt.posX === thisPoint.posX + 1
          && pnt.posY === thisPoint.posY - 1);

      if (connect) {
        p.line(points[i].x, points[i].noiseyY, connect.x, connect.noiseyY);
      }
    }
  };


  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.clear();
    p.redraw();
  };
};

export default mountains;
