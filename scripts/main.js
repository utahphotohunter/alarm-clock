// main script for index.html

// import time and date
import { getTime, getDate } from './utils.mjs';

let time = document.getElementById('time');
let date = document.getElementById('date');

time.textContent = getTime();
date.textContent = getDate();
