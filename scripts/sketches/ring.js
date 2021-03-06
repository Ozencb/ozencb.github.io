import debounce from 'lodash.debounce';
import getRandomPalette from '../utils/getRandomPalette';

const rings = (p5) => {
  const p = p5;

  let ox = 0;
  let oy = 0;
  let oz = 0;

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);

    canvas.parent('stage');
    canvas.position(0, 0);
    canvas.elt.style.position = 'fixed';
    canvas.style('z-index', '-1');

    p.strokeWeight(1);
    p.smooth();
    p.noFill();
  };

  const getNoise = (radian, dim, time) => {
    let r = radian % p.TWO_PI;
    if (r < 0.0) {
      r += p.TWO_PI;
    }
    return p.noise(ox + p.cos(r) * dim, oy + p.sin(r) * dim, oz + time);
  };

  const display = () => {
    p.stroke(getRandomPalette());

    ox += 0.01;
    oy += 0.01;
    oz += 0.01;

    for (let i = 0; i < 1; i += 1) {
      p.beginShape();
      for (let angle = 0; angle < 360; angle += 2) {
        const radian = p.radians(angle);
        const radius = 250 + p.map(getNoise(radian, 0.15, 1 * i), 0, 1, -150, 150);
        p.vertex(radius * p.cos(radian), radius * p.sin(radian));
      }
      p.endShape(p.CLOSE);
    }
  };

  p.draw = () => {
    p.clear();
    p.translate(p.width / 2, p.height / 2);
    p.scale(Math.max(p.windowWidth / 600, p.windowHeight / 600));

    display();
  };

  const resizeCanvas = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  const debounceResize = debounce(resizeCanvas, 100);

  p.windowResized = () => {
    debounceResize();
  };
};

export default rings;
