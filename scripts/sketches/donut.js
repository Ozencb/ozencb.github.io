import debounce from 'lodash.debounce';

const donut = (p5) => {
  const p = p5;
  let theta = Math.random() * 1000;

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    canvas.parent('stage');
    canvas.position(0, 0);
    canvas.elt.style.position = 'fixed';
    canvas.style('z-index', '-1');

    p.rotateX(theta * Math.random());
    p.rotateY(theta * Math.random());
    p.rotateZ(theta * Math.random());
  };

  p.draw = () => {
    p.clear();
    p.normalMaterial();
    p.scale(Math.max(p.windowWidth / 50, p.windowHeight / 50));

    p.translate(0, 0, 0);
    p.push();
    p.rotateZ(theta);
    p.rotateX(theta);
    p.rotateY(theta);
    p.torus(75, 35);
    p.pop();
    theta += 0.003;
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
