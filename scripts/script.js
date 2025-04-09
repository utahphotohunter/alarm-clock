// main script for index.html


// ==================================================
// imports
// ==================================================
import { getTime, getDate, getRandomIndex } from './utils.mjs';
import { playAlarm, getSounds } from './sounds.mjs';
import { setAlarm, getAlarm } from './alarmTime.mjs';
import { setInitialNewsPreferences, makeNewsPreferenceDialog, resetApiLockout, editNewsPreferrences } from './news.mjs';


// ==================================================
// initial settings on first page load
// ==================================================

// initial alarm
// check if 'alarmHour' is in local storage
if (!('alarmHour' in localStorage)) {
    setAlarm('8', '30', 'AM'); // set initial alarm to 8:30am
}

// create news preference dialog
makeNewsPreferenceDialog(); 

// set news preferences
setInitialNewsPreferences(); 


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


// let selectedIndex = getRandomIndex(sounds); // selects random alarm from json

// buttons
const enableAlarm = document.getElementById('start'); // button to enable the alarm
const stop = document.querySelector('button'); // button to stop the alarm
const editAlarmTime = document.querySelector('#edit-alarm'); // button to open the alarm setting dialog
const applyAlarm = document.querySelector('#confirm-alarm'); // button to apply user set alarm 
const closeAlarm = document.querySelector('#close-alarm'); // button to close alarm user dialog
const editNews = document.getElementById('edit-news'); // button to open the news preferrence dialog


// alarm time input selectors
let userAlarmHour = document.getElementById('hour'); // alarm hour input field
let userAlarmMinute = document.getElementById('minute'); // alarm minute input field
let userAlarmMeridian = document.getElementById('meridian'); // alarm meridian input field


// ==================================================
// page content
// ==================================================

// data displays on page load
time.textContent = getTime(); // displays time
date.textContent = getDate(); // displays date
alarmTime.textContent = `Alarm - ${getAlarm()}`; // displays alarm time

// every second, refresh date, time, and alarm time
setInterval(function() {
    time.textContent = getTime(); // displays time
    date.textContent = getDate(); // displays date
    alarmTime.textContent = `Alarm - ${getAlarm()}`; // displays alarm time
}, 1000);


// ==================================================
// listening events
// ==================================================

// sounds, getRandomIndex(sounds)

// reponse to enable alarm button
enableAlarm.addEventListener('click', function() {

    // every 60 seconds, check if it is alarm time
    setInterval(function() {

        // check if alarm time and current time are the same
        if (getAlarm() == getTime()) {
            playAlarm(sounds, getRandomIndex(sounds), stop); // play a random alarm with a stop button
        }
        
        // check if the current time is "3:30 AM"
        if (getTime() == '3:30 AM') {
            resetApiLockout(); // change every local storage news option "accesssedToday" item to the value of "False"
        }
    }, 60000);
});

// response for edit alarm button
editAlarmTime.addEventListener('click', function() {
    alarmDialog.showModal(); // open the alarm interface dialog as modal
});

// response for close alarm dialog button
closeAlarm.addEventListener('click', function() {
    alarmDialog.close(); // close the alarm dialog
});

// response for apply alarm button
applyAlarm.addEventListener('click', function() {
    setAlarm(userAlarmHour.value, userAlarmMinute.value, userAlarmMeridian.value); // validate and store the set alarm time in local storage
});

// response for edit news preferrences button
editNews.addEventListener('click', function() {
    editNewsPreferrences(); // open the news preferrences dialog and update local storage with new preferrences
});