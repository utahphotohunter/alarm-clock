import { playAlarm, getSounds } from "./sounds.mjs";
import { getRandomIndex } from "./utils.mjs";

const sounds = getSounds();
const selectedIndex = getRandomIndex(sounds);
const stop = document.querySelector('button');

const startButton = document.getElementById('start');

startButton.addEventListener("click", function() {
    playAlarm(sounds, selectedIndex, stop);
});