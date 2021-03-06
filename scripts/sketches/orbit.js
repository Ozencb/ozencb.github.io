import debounce from 'lodash.debounce';

const globe = (p5) => {
  const p = p5;

  const radius = 1000;
  const size = 3;

  let theta = Math.random() * 1000;
  let rotationDirection = Math.random() >= 0.5;

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    canvas.parent('stage');
    canvas.position(0, 0);
    canvas.elt.style.position = 'fixed';
    canvas.style('z-index', '-1');
    
    theta = p.random();
    
    p.rotateX(theta * Math.random());
    p.rotateY(theta * Math.random());
    p.rotateZ(theta * Math.random());
  };

  p.draw = () => {
    p.clear();
    p.scale(Math.min(p.windowWidth / 1000, p.windowHeight / 1000));

    p.normalMaterial();

    p.rotateX(theta);
    if(rotationDirection) {
      p.rotateZ(theta);
    } else {
      p.rotateY(theta);
    }

    for (let i = 0; i <= 12; i += 1) {
      for (let j = 0; j <= 12; j += 1) {
        const a = (j / 12) * p.PI;
        const b = (i / 12) * p.PI;

        p.push();

        p.translate(
          p.sin(2 * a) * radius * p.sin(b),
          (p.cos(b) * radius),
          p.cos(2 * a) * radius * p.sin(b),
        );

        p.sphere(size);
        p.pop();
      }
    }
    theta += 0.001;
  };

  const resizeCanvas = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  const debounceResize = debounce(resizeCanvas, 100);

  p.windowResized = () => {
    debounceResize();
  };
};

export default globe;
