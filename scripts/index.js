import blobsicles from './blobsicles';
import crossGrid from './crossGrid';
import geometries from './geometries';
import lorenz from './lorenz';
import orbit from './orbit';
import smokeRings from './smokeRings';
import stripes from './stripes';
import stripesColored from './stripesColored';
import terrain from './terrain';
import topographic from './topographic';
import topography from './topography';
import trunk from './trunk';

import mountains from './WIP/mountains';
import orthoTerrain from './WIP/orthoTerrain';

let visuals = [
    blobsicles, crossGrid, geometries, lorenz, orbit, smokeRings,
    stripes, stripesColored, terrain, topographic, topography, trunk
];

const randomNumGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const visual = visuals[randomNumGenerator(0, visuals.length - 1)];

new p5(visual);