import debounce from 'lodash.debounce';

const donut = (p5) => {
  const p = p5;

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    canvas.parent('stage');
    canvas.position(0, 0);
    canvas.elt.style.position = 'fixed';
    canvas.style('z-index', '-1');
  };

  p.draw = () => {
    p.clear();
    p.normalMaterial();
    p.scale(Math.max(p.windowWidth / 50, p.windowHeight / 50));

    p.translate(0, 0, 0);
    p.push();
    p.rotateZ(p.frameCount * 0.003);
    p.rotateX(p.frameCount * 0.001);
    p.rotateY(p.frameCount * 0.007);
    p.torus(75, 35);
    p.pop();
  };

  const resizeCanvas = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  const debounceResize = debounce(resizeCanvas, 100);

  p.windowResized = () => {
    debounceResize();
  };
};

export default donut;
