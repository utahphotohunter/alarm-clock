// import time and date
import { getTime, getDate } from './timeDate.mjs';

let time = document.getElementById('time');
let date = document.getElementById('date');

time.textContent = getTime();
date.textContent = getDate();