import crossGrid from './sketches/crossGrid';
import cubeGrid from './sketches/cubeGrid';
import donut from './sketches/donut';
import lorenz from './sketches/lorenz';
import mountains from './sketches/mountains';
import orbit from './sketches/orbit';
import ring from './sketches/ring';
import terrain from './sketches/terrain';
import topography from './sketches/topography';


const sketches = [
    crossGrid, cubeGrid, donut, lorenz, mountains,
    orbit, ring, terrain, topography,
];

const randomNumGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const sketch = sketches[randomNumGenerator(0, sketches.length - 1)];

new p5(sketch);



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const scrollEvent = () => {
    const main = document.querySelector('#main');
    const intro = document.querySelector('#intro');
    const about = document.querySelector('#about');
    const stage = document.querySelector('#stage');
    const arrow = document.querySelector('.scroll-arrow');
    const svgPath = document.querySelector('#svg-path');

    if (body.screenTop > 20) {
        arrow.classList.add('invisible');
        stage.classList.add('invisible');

    } else {
        arrow.classList.remove('invisible');
        stage.classList.remove('invisible');
    }

    if (window.scrollY > window.innerHeight / 2) {
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
}


window.addEventListener('scroll', scrollEvent);