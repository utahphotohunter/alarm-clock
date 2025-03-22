// sound functions and data


// ==================================================
// sound data
// ==================================================
const url = '../data/alarm.json';


// ==================================================
// sound functions
// ==================================================

// retrieve alarms
export async function getSounds() {
  const response = await fetch(url);
  const data = await response.json();
  return data.alarms;
}

// this needs to be changed to play sound. this will be exported to main
export async function playAlarm(data, selection, stopButton, stopCode) {
  const info = await data;
  const index = await selection;
  const alarm = info[index];
  console.log(alarm);
  var audio = new Audio(alarm.path);
  audio.loop = true;
  audio.play();
  stopButton.addEventListener("click", function() {
    if (stopCode = localStorage.getItem('stopCode')) {
      audio.pause();
    } else {
      alert('Incorrect passcode entered.');
    }
    
  });
}