import debounce from 'lodash.debounce';

const cubeGrid = (p5) => {
  const p = p5;

  let tx;
  let ty;
  let tz;
  let gap;
  let rows;
  let cols;
  let depths;
  let theta;
  let planeWidth;
  let planeHeight;
  let planeDepth;

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    canvas.parent('stage');
    canvas.position(0, 0);
    canvas.elt.style.position = 'fixed';
    canvas.style('z-index', '-1');

    const cube = 150;

    tx = cube;
    ty = cube;
    tz = cube;

    gap = 50;

    rows = 3;
    cols = 3;
    depths = 3;

    theta = 0;

    planeWidth = tx * (cols - 1);
    planeHeight = ty * (rows - 1);
    planeDepth = tz * (depths - 1);
  };

  p.draw = () => {
    p.clear();
    p.scale(Math.min(p.windowWidth / 1000, p.windowHeight / 1000));
    p.stroke(240, 20);

    p.rotateZ(theta);
    p.rotateY(theta);
    p.rotateX(theta);

    p.translate(-planeWidth / 2, -planeHeight / 2, planeDepth / 2);

    p.noStroke();


    p.directionalLight(255, 0, 0, p.width, -p.height);
    p.directionalLight(0, 0, 255, -p.width, -p.height);
    p.directionalLight(0, 255, 0, -p.width, p.height);

    for (let i = 0; i < cols; i += 1) {
      p.push();
      p.translate(tx * i, 0, 0);

      for (let j = 0; j < rows; j += 1) {
        p.push();
        p.translate(0, ty * j, 0);

        for (let k = 0; k < depths; k += 1) {
          p.push();
          p.translate(0, 0, (tz * k) - planeDepth);

          p.specularMaterial(250);
          p.box(tx - gap, ty - gap, tz - gap);

          p.pop();
        }
        p.pop();
      }
      p.pop();
    }
    theta += 0.01;
  };

  const resizeCanvas = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  const debounceResize = debounce(resizeCanvas, 100);

  p.windowResized = () => {
    debounceResize();
  };
};

export default cubeGrid;
