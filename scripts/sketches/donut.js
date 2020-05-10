const donut = (p) => {
    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');
    }

    p.draw = () => {
        p.clear();
        p.normalMaterial();

        p.scale(Math.max(p.windowWidth / 50, p.windowHeight / 50));

        p.translate(0, 0, 0);
        p.push();
        p.rotateZ(p.frameCount * 0.01);
        p.rotateX(p.frameCount * 0.01);
        p.rotateY(p.frameCount * 0.01);
        p.torus(75, 35);
        p.pop();
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

export default donut;