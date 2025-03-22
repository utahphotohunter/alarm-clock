// main script for index.html


// ==================================================
// imports
// ==================================================
import { getTime, getDate, getRandomIndex } from './utils.mjs';
import { playAlarm, getSounds } from "./sounds.mjs";
import { setAlarm, getAlarm } from "./alarmTime.mjs";
import { setStopCode, getStopCode, setHint, getHint } from './passcodeValidation.mjs';


// ==================================================
// initial alarm and stop code
// ==================================================

// initial alarm
if (!('alarmHour' in localStorage)) {
    setAlarm('8', '30', 'AM'); // set initial alarm to 8:30am
}

// initial stop code
if (!('stopCode' in localStorage)) {
    setStopCode('0000'); // set initial stop code to 0000
}


// ==================================================
// variables
// ==================================================

// html selectors
const time = document.getElementById('time'); // selects header for time
const date = document.getElementById('date'); // selects header for date
const alarmTime = document.getElementById('alarmTime'); // selects p for alarm time
const alarmDialog = document.getElementById('alarm-interface'); // selects the alarm interface dialog
const stopCodeDialog = document.getElementById('enter-passcode');

// data variables
const sounds = getSounds(); // gets alarms in json object


// let selectedIndex = getRandomIndex(sounds); // selects random alarm from json

// buttons
const startButton = document.getElementById('start'); // button to enable the alarm
const stop = document.querySelector('button'); // button to stop the alarm
const editAlarmTime = document.querySelector('#edit-alarm'); // button to open the alarm setting dialog
const editCode = document.getElementById('edit-code'); // button to open the code and hint settings dialog
const applyAlarm = document.querySelector('#confirm-alarm'); // button to apply user set alarm 
const closeAlarm = document.querySelector('#close-alarm'); // button to close alarm user dialog
const submitCode = document.getElementById('submit-code'); // button to submit code to stop alarm
const showHint = document.getElementById('show-hint'); // button to show hint for code
const setCode = document.getElementById('confirm-code'); // button to confirm code and hint set by user
const closeCode = document.getElementById('close-code'); // button to close code and hint dialog

// alarm time input selectors
let userAlarmHour = document.getElementById('hour'); // alarm hour input field
let userAlarmMinute = document.getElementById('minute'); // alarm minute input field
let userAlarmMeridian = document.getElementById('meridian'); // alarm meridian input field

// passcode and hint selectors
let stopCode = document.getElementById('stop-code'); // passcode input field to stop alarm
let userSetStopCode = document.getElementById('user-set-code'); // passcode input field to set passcode
let userSetHint = document.getElementById('user-set-hint'); // hint input field to set hint


// ==================================================
// page content
// ==================================================

// data displays on page load
time.textContent = getTime(); // displays time
date.textContent = getDate(); // displays date
alarmTime.textContent = getAlarm(); // displays alarm time

// refreshes display info
setInterval(function() {
    time.textContent = getTime(); // displays time
    date.textContent = getDate(); // displays date
    alarmTime.textContent = getAlarm(); // displays alarm time
}, 1000);


// ==================================================
// listening events
// ==================================================

// start program and stop alarm
startButton.addEventListener("click", function() {
    setInterval(function() {
        if (getAlarm() == getTime()) {
            playAlarm(sounds, getRandomIndex(sounds), stop);
        }
    }, 60000);
});

// show alarm interface
editAlarmTime.addEventListener("click", function() {
    alarmDialog.showModal();
});

// close alarm interface
closeAlarm.addEventListener("click", function() {
    alarmDialog.closest();
});

// set user alarm
applyAlarm.addEventListener("click", function() {
    setAlarm(userAlarmHour.value, userAlarmMinute.value, userAlarmMeridian.value);
});