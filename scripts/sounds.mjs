// sound functions and data

// ==================================================
// sound data
// ==================================================
const url = 'https://utahphotohunter.github.io/alarm-clock/data/alarm.json'; // set url for getting alarm info in json form

// ==================================================
// sound functions
// ==================================================

// retrieve alarms
export async function getSounds() {
  const response = await fetch(url); // fetch sound json info
  const data = await response.json(); // parse info into json format
  return data.alarms; // return json object of alarm info
}

// play a selected alarm on loop
export async function playAlarm(data, selection, stopButton) {
  const info = await data; // wait for the alarm json object
  const index = await selection; // wait for the random index
  const alarm = info[index]; // choose the alarm at the random index
  var audio = new Audio(alarm.path); // create audio object from randomly selected alarm
  audio.loop = true; // make the alarm sound loop
  audio.play(); // play alarm
  
  // reponse from stop alarm button
  stopButton.addEventListener('click', function() {
    audio.pause(); // stop the alarm sound
  });
}