import crossGrid from './crossGrid';
import curvedShapes from './curvedShapes';
import globe from './globe';
import lorenz from './lorenz';
import shapes from './shapes';
import smokeRings from './smokeRings';
import stripes from './stripes';
import stripesRandom from './stripesRandom';
import terrain from './terrain';
import topography from './topography';
import trace from './trace';
import trunk from './trunk';

console.log("Globe, shapes and lorenz functions are copied over from official P5js site.");
console.log("The rest of the visuals are made by Kjetil Golid.");
console.log("His work can be found here: https://github.com/kgolid/p5ycho");

let functions = [
    crossGrid, curvedShapes, globe, lorenz, shapes, 
    smokeRings, stripes, stripesRandom, terrain, 
    topography, trace, trunk
];

function randomNumGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


new p5(functions[randomNumGenerator(0, functions.length - 1)]);