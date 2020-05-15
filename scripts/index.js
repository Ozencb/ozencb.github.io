import debounce from 'lodash.debounce';

import cubeGrid from './sketches/cubeGrid';
import donut from './sketches/donut';
import lorenz from './sketches/lorenz';
import orbit from './sketches/orbit';
import ring from './sketches/ring';
import terrain from './sketches/terrain';

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

const scrollEvent = () => {
  const stage = document.querySelector('#stage');
  const arrow = document.querySelector('#arrow');

  if (main.scrollTop > window.innerHeight / 2) {
    document.documentElement.style.setProperty('--bg-color', '#efefef');
    document.documentElement.style.setProperty('--primary-color', '#171718');
    stage.classList.add('invisible');
  } else {
    document.documentElement.style.setProperty('--bg-color', '#171718');
    document.documentElement.style.setProperty('--primary-color', '#e4e0d7');
    stage.classList.remove('invisible');
  }

  if (main.scrollTop > 50) {
    arrow.classList.add('invisible');
  } else {
    arrow.classList.remove('invisible');
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

  const sketches = [cubeGrid, donut, lorenz, orbit, ring, terrain];

  const randomNumGenerator = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const sketch = sketches[randomNumGenerator(0, sketches.length - 1)];
  new p5(cubeGrid);
};

window.addEventListener('load', initialize);

const debounceScroll = debounce(scrollEvent, 25);
main.addEventListener('scroll', debounceScroll);

const debounceResize = debounce(resizeWindow, 25);
window.addEventListener('resize', debounceResize);
