import getRandomPalette from '../utils/getRandomPalette';

const mountains = (p) => {
    console.log("Perlin Mountains by Owen McAteer.");
    console.log("Link to project: https://owenmcateer.github.io/Motus-Art");

    let canvas;
    const canvasSize = 500;

    const points = [];
    const size = 10;
    const gridSize = Math.ceil((canvasSize * 0.8) / size) + 1;
    const maxHeight = 100;

    const noiseScale = 0.1;
    let noiseOffsetX = 0;
    let noiseOffsetY = 0;


    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);

        canvas.parent('stage');
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        p.pixelDensity(1);

        p.noFill();
        p.stroke(getRandomPalette());

        setPoints();
    }

    p.draw = () => {
        p.background(0);

        p.scale(Math.min(p.windowWidth / 100, p.windowHeight / 100));

        noiseOffsetX += 0.05;
        noiseOffsetY = 0;

        points.forEach((pnt) => {
            pnt.noise = p.constrain(p.noise((pnt.posX - noiseOffsetX) * noiseScale, (pnt.posY + noiseOffsetY) * noiseScale), 0.5, 1) * maxHeight - (maxHeight / 2);
            pnt.noiseyY = pnt.y - pnt.noise;
        });

        for (let i = 0; i < points.length; i++) {
            const thisPoint = points[i];
            const connect = points.find(pnt => pnt.posX === thisPoint.posX + 1 && pnt.posY === thisPoint.posY - 1);

            if (connect) {
                p.line(points[i].x, points[i].noiseyY, connect.x, connect.noiseyY);
            }
        }
    }

    const setPoints = () => {
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                points.push({
                    posX: x,
                    posY: y,
                    x: (x * size),
                    y: (y * size),
                    noise: 0,
                });
            }
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.clear();
        p.redraw();
    }
}

export default mountains;