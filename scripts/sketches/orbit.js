const globe = (p) => {
    console.log("Orbit Control from P5js.");
    console.log("Link to project: https://p5js.org/examples/3d-orbit-control.html");
    
    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');
    }

    p.draw = () => {
        let radius = 500;
        let size = 25;

        p.background(0);
        p.normalMaterial();

        p.scale(Math.min(p.windowWidth / 1000, p.windowHeight / 1000));

        p.rotateZ(p.frameCount * 0.002);
        p.rotateX(p.frameCount * 0.002);

        for (let i = 0; i <= 12; i++) {
            for (let j = 0; j <= 12; j++) {
                let a = (j / 12) * p.PI;
                let b = (i / 12) * p.PI;

                p.push();

                p.translate(
                    p.sin(2 * a) * radius * p.sin(b),
                    (p.cos(b) * radius),
                    p.cos(2 * a) * radius * p.sin(b)
                );

                if (j % 2 === 0) {
                    p.cone(size, size);
                } else {
                    p.box(size, size, size);
                }
                p.pop();
            }
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

export default globe;