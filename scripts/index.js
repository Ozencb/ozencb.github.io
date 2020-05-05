// import blobsicles from './sketches/blobsicles';
import crossGrid from './sketches/crossGrid';
import geometries from './sketches/geometries';
import lorenz from './sketches/lorenz';
import mountains from './sketches/mountains';
import orbit from './sketches/orbit';
import smokeRings from './sketches/smokeRings';
// import stripes from './sketches/stripes';
// import stripesColored from './sketches/stripesColored';
import terrain from './sketches/terrain';
import topographic from './sketches/topographic';
import topography from './sketches/topography';
import trunk from './sketches/trunk';


let sketches = [
    crossGrid, geometries, lorenz, mountains, orbit, smokeRings,
    terrain, topographic, topography, trunk
];

const randomNumGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const sketch = sketches[randomNumGenerator(0, sketches.length - 1)];

new p5(sketch);
