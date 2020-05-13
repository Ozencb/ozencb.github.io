const crossGrid = (p5) => {
  console.info('Cross Grid by Kjetil Midtgarden Golid.');
  console.info('Link to project: https://github.com/kgolid/p5ycho/tree/master/lab/cross-grid');
  const p = p5;

  let tick;

  const crossDim = 5;
  const gridSize = 25;
  const cellDim = 25;
  const nheight = 1.5;
  const nzoom = 25;

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);

    canvas.parent('stage');
    canvas.position(0, 0);
    canvas.elt.style.position = 'fixed';
    canvas.style('z-index', '-1');

    p.stroke(50);

    tick = 0;
  };

  const drawCross = (x, y) => {
    p.push();
    p.translate(x, y);
    p.line(-crossDim / 2, 0, crossDim / 2, 0);
    p.line(0, -crossDim / 2, 0, crossDim / 2);
    p.pop();
  };

  const drawGrid = () => {
    for (let j = 0; j < gridSize; j += 1) {
      for (let i = 0; i < gridSize; i += 1) {
        p.push();
        p.scale(p.map(p.noise(i / nzoom + tick, j / nzoom), 0, 1, 1 / nheight, nheight));
        drawCross((i - gridSize / 2) * cellDim, (j - gridSize / 2) * cellDim);
        p.pop();
      }
    }
  };

  p.draw = () => {
    p.clear();
    p.translate(p.width / 2, p.height / 2);
    p.scale(Math.max(p.windowWidth / 500, p.windowHeight / 500));

    drawGrid();

    tick += 0.005;
  };


  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

export default crossGrid;
