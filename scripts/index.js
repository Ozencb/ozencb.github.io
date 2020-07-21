import debounce from 'lodash.debounce';

import { experience } from './experience';

import donut from './sketches/donut';
import orbit from './sketches/orbit';
import ring from './sketches/ring';

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

  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    document.querySelectorAll('.main section').forEach(el => {
      el.style.scrollSnapAlign = 'none';
    });
    document.querySelector('.about .links').style.scrollSnapAlign = 'none';
    document.querySelector('main').style.scrollSnapType = 'none';
  }

  // Set cookie to display snackbar only at first load
  if(document.cookie.indexOf('snackbarLoad=') === -1){
    setSnackbarCookie();
    const snackbar = document.querySelector('#snackbar');
    snackbar.classList.add('show');
    setTimeout(() => snackbar.classList.remove('show'), 3000);
  }

  experience.forEach(exp => {
    createExperienceElement(exp);
  });
};

const setSnackbarCookie = () => {
  const date = new Date();

  // One hour expiry
  date.setTime(date.getTime() + (1000*60*60));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `snackbarLoad=true; ${expires}; path=/`;
};

const createExperienceElement = (exp) => {
  const targetContainer = document.querySelector(`.${exp.type}`);

  const item = document.createElement('div');
  item.classList.add('item');

  const firstLine = document.createElement('div');
  firstLine.classList.add('first-line');
  firstLine.innerText = exp.heading;

  const secondLine = document.createElement('div');
  secondLine.classList.add('second-line');
  secondLine.innerText = exp.sub;

  const year = document.createElement('div');
  year.classList.add('year');
  year.innerHTML = `${exp.yearStart}<span><span class="year-dash"> - </span><br class="year-break" /></span>${exp.yearEnd}`;

  item.appendChild(firstLine);
  item.appendChild(secondLine);
  item.appendChild(year);

  targetContainer.appendChild(item);
}


window.addEventListener('load', initialize);

const debounceScroll = debounce(scrollEvent, 25);
main.addEventListener('scroll', debounceScroll);

const debounceResize = debounce(resizeWindow, 25);
window.addEventListener('resize', debounceResize);
