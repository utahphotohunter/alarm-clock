
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function playAlarm() {
    let random = getRandom();
}

var audio = new Audio('../data/sounds/rooster.mp3');
const btn = document.querySelector('button');

btn.addEventListener('click', function () {
    audio.play();

});