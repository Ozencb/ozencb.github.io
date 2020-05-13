import crossGrid from './sketches/crossGrid';
import cubeGrid from './sketches/cubeGrid';
import donut from './sketches/donut';
import lorenz from './sketches/lorenz';
import mountains from './sketches/mountains';
import orbit from './sketches/orbit';
import ring from './sketches/ring';
import terrain from './sketches/terrain';
import topography from './sketches/topography';

console.info(`Welcome! Thanks for visiting my site. 
Refresh page to see other generative backgrounds :)!

The generative backgrounds are written in P5.js.
Some of these are inspired by/taken from other artists.

If you have any questions please let me know at: bilgiliozenc@gmail.com
`);

document.querySelector('#intro').scrollIntoView();

const main = document.querySelector('#main');
main.addEventListener('scroll', () => {
  const stage = document.querySelector('#stage');
  const arrow = document.querySelector('#scroll-arrow');
  const svgPath = document.querySelector('#svg-path');

  if (main.scrollTop > 50) {
    arrow.classList.add('invisible');
    stage.classList.add('invisible');
  } else {
    arrow.classList.remove('invisible');
    stage.classList.remove('invisible');
  }

  if (main.scrollTop > window.innerHeight / 2) {
    document.body.classList.remove('colours-normal');
    document.body.classList.add('colours-inverted');
    svgPath.classList.remove('svg-fill-normal');
    svgPath.classList.add('svg-fill-inverted');
  } else {
    document.body.classList.remove('colours-inverted');
    document.body.classList.add('colours-normal');
    svgPath.classList.remove('svg-fill-inverted');
    svgPath.classList.add('svg-fill-normal');
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.scrollIntoView({
      behavior: 'smooth',
    });
  });
});

const sketches = [
  crossGrid, cubeGrid, donut, lorenz, mountains,
  orbit, ring, terrain, topography,
];

const randomNumGenerator = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const sketch = sketches[randomNumGenerator(0, sketches.length - 1)];

new p5(sketch);
