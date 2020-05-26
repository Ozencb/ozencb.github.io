import debounce from 'lodash.debounce';

import donut from './sketches/donut';
import orbit from './sketches/orbit';
import ring from './sketches/ring';

console.info(`Welcome! Thanks you for visiting my site.

If you liked the background visuals make sure to 
refresh the page to see other generative backgrounds!

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

  if (main.scrollTop > 50) {
    arrow.classList.add('invisible');
  } else {
    arrow.classList.remove('invisible');
  }

  if (main.scrollTop > window.innerHeight / 2) {
    document.documentElement.style.setProperty('--bg-color', '#efefef');
    document.documentElement.style.setProperty('--primary-color', '#171718');
    stage.classList.add('invisible');
  } else {
    document.documentElement.style.setProperty('--bg-color', '#171718');
    document.documentElement.style.setProperty('--primary-color', '#e4e0d7');
    stage.classList.remove('invisible');
  }

  resizeWindow();
};

const showRandomSketch = () => {
  const sketches = [donut, orbit, ring];

  const randomNumGenerator = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const sketch = sketches[randomNumGenerator(0, sketches.length - 1)];
  const visual = new p5(sketch);
}

const initialize = () => {
  resizeWindow();
  showRandomSketch();

  document.querySelector('#intro').scrollIntoView();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

};

window.addEventListener('load', initialize);

const debounceScroll = debounce(scrollEvent, 25);
main.addEventListener('scroll', debounceScroll);

const debounceResize = debounce(resizeWindow, 25);
window.addEventListener('resize', debounceResize);
