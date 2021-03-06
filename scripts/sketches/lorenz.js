import debounce from 'lodash.debounce';

const lorenz = (p5) => {
  console.info('Lorenz Attractor');
  console.info('Link to project: https://editor.p5js.org/Bixbite/sketches/S10aGSejQ');

  const p = p5;

  const SIGMA = 10;
  const RHO = 28;
  const BETA = 8 / 3;
  const DT = 1 / 60;
  const MAX_LEN = 100;

  let offset = 0;

  let point;
  const path = [];


  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    canvas.parent('stage');
    canvas.position(0, 0);
    canvas.elt.style.position = 'fixed';
    canvas.style('z-index', '-1');

    p.colorMode(p.HSB, 100);

    point = p.createVector(1, 1, 1);
  };

  p.draw = () => {
    p.clear();
    p.scale(Math.min(p.windowWidth / 50, p.windowHeight / 50));
    p.rotateZ(p.frameCount * 0.002);

    const delta = p.createVector(
      SIGMA * (point.y - point.x),
      point.x * (RHO - point.z) - point.y,
      point.x * point.y - BETA * point.z,
    );

    delta.mult(DT);

    point.add(delta);
    path.push(point.copy());

    if (path.length > MAX_LEN) {
      path.splice(0, 1);
      offset += 1;
    }

    p.strokeWeight(5);
    p.stroke(255);
    p.noFill();

    let prev = path[0];

    for (let i = 1; i < path.length; i += 1) {
      const next = path[i];

      p.stroke(((i + offset) * 0.1) % 100, 100, 100 - (path.length - i) * (100 / MAX_LEN));
      p.line(prev.x, prev.y, prev.z, next.x, next.y, next.z);
      prev = next;
    }
  };

  const resizeCanvas = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  const debounceResize = debounce(resizeCanvas, 100);

  p.windowResized = () => {
    debounceResize();
  };
};

export default lorenz;
