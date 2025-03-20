// useful general purpose functions


// ==================================================
// random number functions
// ==================================================

// gets random number 0 to one less than max
function getRandom(max) {
    return Math.floor(Math.random() * max)
}

// gets random index from provided array
export async function getRandomIndex(array) {
  const list = await array;
  const selection = getRandom(list.length);
  return selection;
}


// ==================================================
// time and date functions
// ==================================================

// get current time
export function getTime() {
    const currentTime = new Date();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    let meridian = 'AM';

    if (hour > 12) {
        hour = hour - 12;
        meridian = 'PM';
    }

    let stringMinute = minute.toString();

    if (stringMinute.length < 2) {
        minute = `0${minute}`;
    }

    return `${hour}:${minute} ${meridian}`;
}

// get current date
export function getDate() {
    const currentTime = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const month = months[currentTime.getMonth()];
    const day = currentTime.getDate();
    const year = currentTime.getFullYear();
    return `${month} ${day}, ${year}`;
}


// ==================================================
// local storage functions
// ==================================================

// set local storage
export function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}