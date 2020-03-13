const shapes = (p) => {
    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');
    }

    p.draw = () => {
        p.background(0);
        p.normalMaterial();

        p.scale((p.windowWidth + p.windowHeight) / 2500);

        p.translate(-240, -100, 0);
        p.push();
        p.rotateZ(p.frameCount * 0.01);
        p.rotateX(p.frameCount * 0.01);
        p.rotateY(p.frameCount * 0.01);
        p.plane(70);
        p.pop();

        p.translate(240, 0, 0);
        p.push();
        p.rotateZ(p.frameCount * 0.01);
        p.rotateX(p.frameCount * 0.01);
        p.rotateY(p.frameCount * 0.01);
        p.box(70, 70, 70);
        p.pop();

        p.translate(240, 0, 0);
        p.push();
        p.rotateZ(p.frameCount * 0.01);
        p.rotateX(p.frameCount * 0.01);
        p.rotateY(p.frameCount * 0.01);
        p.cylinder(70, 70);
        p.pop();

        p.translate(-240 * 2, 200, 0);
        p.push();
        p.rotateZ(p.frameCount * 0.01);
        p.rotateX(p.frameCount * 0.01);
        p.rotateY(p.frameCount * 0.01);
        p.cone(70, 70);
        p.pop();

        p.translate(240, 0, 0);
        p.push();
        p.rotateZ(p.frameCount * 0.01);
        p.rotateX(p.frameCount * 0.01);
        p.rotateY(p.frameCount * 0.01);
        p.torus(70, 20);
        p.pop();

        p.translate(240, 0, 0);
        p.push();
        p.rotateZ(p.frameCount * 0.01);
        p.rotateX(p.frameCount * 0.01);
        p.rotateY(p.frameCount * 0.01);
        p.sphere(70);
        p.pop();
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

export default shapes;