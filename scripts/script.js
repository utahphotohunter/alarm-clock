// main script for index.html


// ==================================================
// imports
// ==================================================
import { getTime, getDate } from './utils.mjs';
import { playAlarm, getSounds } from "./sounds.mjs";
import { getRandomIndex } from "./utils.mjs";
import { setAlarm, getAlarm } from "./alarmTime.mjs";


// ==================================================
// initial alarm
// ==================================================

// initial alarm
setAlarm('8', '30', 'AM');


// ==================================================
// variables
// ==================================================

// html selectors
const time = document.getElementById('time'); // selects header for time
const date = document.getElementById('date'); // selects header for date
const alarmTime = document.getElementById('alarmTime'); // selects p for alarm time
const alarmDialog = document.getElementById('alarm-interface'); // selects the alarm interface dialog

// data variables
const sounds = getSounds(); // gets alarms in json object
let selectedIndex = getRandomIndex(sounds); // selects random alarm from json

// buttons
const startButton = document.getElementById('start'); // program start button
const stop = document.querySelector('button'); // alarm stop button
const newSound = document.querySelector('#new-sound'); // new sound button
const editAlarmTime = document.querySelector('#edit-alarm'); // edit alarm button
const applyAlarm = document.querySelector('#submit'); // button to apply user set alarm 
const closeAlarm = document.querySelector('#close'); // button to close alarm user interface


// ==================================================
// page content
// ==================================================

// data displays
time.textContent = getTime(); // displays time
date.textContent = getDate(); // displays date
alarmTime.textContent = getAlarm();


// ==================================================
// listening events
// ==================================================

// changes current alarm to new random alarm
newSound.addEventListener("click", function() {
    selectedIndex = getRandomIndex(sounds);
});

console.log(getTime());
console.log(getAlarm());

// start program and stop alarm
startButton.addEventListener("click", function() {
    setInterval(function() {
        if ('2:42 PM' == getTime()) {
            console.log(getTime());
            playAlarm(sounds, selectedIndex, stop);
        }
    }, 60000);
});

// set alarm time
editAlarmTime.addEventListener("click", function() {
    alarmDialog.showModal();
});

// close alarm interface
closeAlarm.addEventListener("click", function() {
    alarmDialog.closest();
});