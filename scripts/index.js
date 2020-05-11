import crossGrid from './sketches/crossGrid';
import cubeGrid from './sketches/cubeGrid';
import donut from './sketches/donut';
import lorenz from './sketches/lorenz';
import mountains from './sketches/mountains';
import orbit from './sketches/orbit';
import smokeRings from './sketches/smokeRings';
import terrain from './sketches/terrain';
import topography from './sketches/topography';

let sketches = [
    crossGrid, cubeGrid, donut, lorenz, mountains, 
    orbit, smokeRings, terrain, topography,
];

const randomNumGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const sketch = sketches[randomNumGenerator(0, sketches.length - 1)];

new p5(sketch);
