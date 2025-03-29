// sound functions and data


// ==================================================
// sound data
// ==================================================
const url = 'https://utahphotohunter.github.io/alarm-clock/data/alarm.json';


// ==================================================
// sound functions
// ==================================================

// retrieve alarms
export async function getSounds() {
  const response = await fetch(url);
  const data = await response.json();
  return data.alarms;
}

// play a selected alarm on loop
export async function playAlarm(data, selection, stopButton) {
  const info = await data;
  const index = await selection;
  const alarm = info[index];
  var audio = new Audio(alarm.path);
  audio.loop = true;
  audio.play();
  stopButton.addEventListener("click", function() {
    audio.pause();
  });
}