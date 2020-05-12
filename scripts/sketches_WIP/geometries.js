const shapes = (p) => {
    console.log("Geometries from P5js.");
    console.log("Link to project: https://p5js.org/examples/3d-geometries.html");

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

        canvas.parent('stage');
        canvas.elt.style.position = "fixed";
        canvas.style('z-index', '-1');
    }

    p.draw = () => {
        p.clear();
        p.normalMaterial();

        p.scale((p.windowWidth + p.windowHeight) / 2000);

        p.translate(-240, 0, 0);
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
        p.torus(70, 20);
        p.pop();

        p.translate(240, 0, 0);
        p.push();
        p.rotateZ(p.frameCount * 0.01);
        p.rotateX(p.frameCount * 0.01);
        p.rotateY(p.frameCount * 0.01);
        p.cone(70, 70);
        p.pop();
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

export default shapes;