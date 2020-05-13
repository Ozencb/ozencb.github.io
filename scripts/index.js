import debounce from 'lodash.debounce';
import crossGrid from './sketches/crossGrid';
import cubeGrid from './sketches/cubeGrid';
import donut from './sketches/donut';
import lorenz from './sketches/lorenz';
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


const main = document.querySelector('#main');

const resizeWindow = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const changeEveryStyle = (elements, className, method) => {
  elements.forEach((element) => {
    if (method === 'add') {
      element.classList.add(className);
    } else if (method === 'remove') {
      element.classList.remove(className);
    }
  });
};

const scrollEvent = () => {
  const stage = document.querySelector('#stage');
  const arrow = document.querySelector('#arrow');
  const svgs = document.querySelectorAll('.svg-path');
  const hrs = document.querySelectorAll('.hr');

  if (main.scrollTop > 50) {
    arrow.classList.add('invisible');
    stage.classList.add('invisible');
  } else {
    arrow.classList.remove('invisible');
    stage.classList.remove('invisible');
  }

  if (main.scrollTop > window.innerHeight / 2) {
    document.body.classList.add('colours-inverted');
    changeEveryStyle(svgs, 'svg-fill-inverted', 'add');
    changeEveryStyle(hrs, 'svg-fill-inverted', 'add');
  } else {
    document.body.classList.remove('colours-inverted');
    changeEveryStyle(svgs, 'svg-fill-inverted', 'remove');
    changeEveryStyle(hrs, 'svg-fill-inverted', 'remove');
  }

  resizeWindow();
};

const initialize = () => {
  resizeWindow();

  document.querySelector('#intro').scrollIntoView();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  const sketches = [
    crossGrid, cubeGrid, donut, lorenz,
    orbit, ring, terrain, topography,
  ];

  const randomNumGenerator = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const sketch = sketches[randomNumGenerator(0, sketches.length - 1)];
  new p5(sketch);
};

window.addEventListener('load', initialize);

const debounceScroll = debounce(scrollEvent, 25);
main.addEventListener('scroll', debounceScroll);

const debounceResize = debounce(resizeWindow, 25);
window.addEventListener('resize', debounceResize);