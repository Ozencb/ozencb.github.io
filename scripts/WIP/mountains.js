const mountains = (p) => {
    console.log("Perlin Mountains by Owen McAteer.");
    console.log("Link to project: https://owenmcateer.github.io/Motus-Art");

    const canvasSize = 500;

    const points = [];
    const size = 10;
    const gridSize = 10;
    const gridOffset = 0;
    const maxHeight = 300;

    const noiseScale = 0.08;
    let noiseOffsetX = 0;
    let noiseOffsetY = 0;

    let scale;


    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.pixelDensity(2);
        p.frameRate(30);
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                points.push({
                    posX: x,
                    posY: y,
                    x: (x * size) + gridOffset,
                    y: (y * size) + gridOffset,
                    noise: 0,
                });
            }
        }
    }

    p.draw = () => {
        p.background(0);

        scale = p.windowWidth < p.windowHeight ? p.windowWidth / 1000 : p.windowHeight / 1000;
        p.scale(scale);
        
        noiseOffsetX += 0.1;
        noiseOffsetY += 0.1;

        points.forEach((pnt) => {
            pnt.noise = p.constrain(p.noise((pnt.posX - noiseOffsetX) * noiseScale, (pnt.posY + noiseOffsetY) * noiseScale), 0.5, 1) * maxHeight - (maxHeight / 2);
            pnt.noiseyY = pnt.y - pnt.noise;
        });

        p.noFill();
        p.stroke(160);
        for (let pnt = 0; pnt < points.length; pnt++) {
            const thisPoint = points[pnt];
            const connect = points.find(pnt => pnt.posX === thisPoint.posX + 1 && pnt.posY === thisPoint.posY - 1);

            if (connect) {
                p.line(points[pnt].x, points[pnt].noiseyY, connect.x, connect.noiseyY);
            }
        }
    }
}

export default mountains;