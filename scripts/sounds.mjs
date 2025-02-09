import { getRandomIndex } from './utils.mjs';

// alarm data
const url = '../data/alarm.json';

// retrieve alarms
async function getSounds() {
  const response = await fetch(url);
  const data = await response.json();
  return data.alarms;
}

// this needs to be changed to play sound. this will be exported to main
async function displaySelection(data, selection) {
    const info = await data;
    const index = await selection;
    console.log(info[index]);
}

const sounds = getSounds();
const selectedIndex = getRandomIndex(sounds);

displaySelection(sounds, selectedIndex);