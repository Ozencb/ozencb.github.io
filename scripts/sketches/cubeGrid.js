const cubeGrid = (p) => {
    let tx, ty, tz, gap, rows, cols, depths, theta;
    let planeWidth, planeHeight, planeDepth;

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        let cube = 150;

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
    }

    p.draw = () => {
        p.background(0);

        p.stroke(240, 20);

        p.rotateZ(theta);
        p.rotateY(theta);
        p.rotateX(theta);

        p.translate(-planeWidth / 2, -planeHeight / 2, planeDepth / 2);

        p.noStroke();


        p.directionalLight(255, 0, 0, p.width, -p.height);
        p.directionalLight(0, 0, 255, -p.width, -p.height);
        p.directionalLight(0, 255, 0, -p.width, p.height);

        for (let i = 0; i < cols; i++) {
            p.push();
            p.translate(tx * i, 0, 0);

            for (let j = 0; j < rows; j++) {
                p.push();
                p.translate(0, ty * j, 0);

                for (let k = 0; k < depths; k++) {
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
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        setTimeout(() => {
            p.redraw();
        }, 1000);
    }
}

export default cubeGrid;