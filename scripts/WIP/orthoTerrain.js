const orthoTerrain = (p) => {
    console.log("Ortho Terrain by monobasic");
    console.log("Project link: https://editor.p5js.org/monobasic/sketches/Syx9HEk37");

    let h;
    let w = 50;
    let terrain = [];
    let vx = 0;
    let vz = 0;
    let speed = 0.01;
    let canvasDim = 800

    let scale;

    p.setup = () => {
        let canvas = p.createCanvas(canvasDim, canvasDim, p.WEBGL);

        canvas.parent('stage');
        let x = (p.windowWidth - p.width) / 2;
        let y = (p.windowHeight - p.height) / 2;
        canvas.position(x, y);
        canvas.style('z-index', '-1');

        p.ortho(-p.width, p.width, -p.height, p.height, -500, 1500);

    }

    p.draw = () => {
        p.background(0);
        p.rotateX(-p.PI / 6);
        p.rotateY(p.PI / 4);

        p.frameRate(60);

        scale = p.windowWidth < p.windowHeight ? p.windowWidth / 1000 : p.windowHeight / 1000;
        p.scale(scale);

        speed = 0.01;

        vx += speed;
        vz += speed;

        let zoff = vz;

        for (let z = 0; z < p.height; z += w) {
            terrain[z] = [];
            let xoff = vx;
            for (let x = 0; x < p.width; x += w) {
                terrain[z][x] = p.map(p.noise(xoff, zoff), 0, 1, 0, 600);
                xoff += 0.05;
            }
            zoff += 0.05;
        }

        p.normalMaterial();

        for (let z = 0; z < p.height; z += w) {
            for (let x = 0; x < p.width; x += w) {
                p.push();
                h = terrain[z][x];
                p.translate(x, -h / 2, z);
                p.box(w, h, w);
                p.pop();
            }
        }
    }
}

export default orthoTerrain;