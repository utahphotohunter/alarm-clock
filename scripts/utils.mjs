// useful general purpose functions

// ==================================================
// random number functions
// ==================================================

// gets random number 0 to one less than max
function getRandom(max) {
    return Math.floor(Math.random() * max) // return the random number
}

// gets random index from provided array
export async function getRandomIndex(array) {
  const list = await array; // wait for the provided array
  const selection = getRandom(list.length); // get a random index number from the array
  return selection; // return the random index number
}

// ==================================================
// time and date functions
// ==================================================

// get current time
export function getTime() {
    const currentTime = new Date(); // make new date object and store as 'currentTime'
    let hour = currentTime.getHours(); // get the 24hour formatted hour from 'currentTime'
    let minute = currentTime.getMinutes(); // get minute from 'currentTime'
    let meridian = 'AM'; // set the meridian as 'AM'

    // if 'hour' is greater than 12
    if (hour > 12) {
        hour = hour - 12; // convert 'hour' from 24hour time to 12hour time
        meridian = 'PM'; // set meridian to 'PM'
    }

    // check if 'hour' equals 0
    if (hour == 0) {
        hour = 12; // set 'hour' to 12 meaning 12am
    }

    // check if 'minute' is 1 digit
    if (minute.toString().length < 2) {
        minute = `0${minute}`; // format 'minute' as two digits
    }
    return `${hour}:${minute} ${meridian}`; // return time formatted as hh:mm:meridian
}

// get current date formatted as 'month, day, year'
export function getDate() {
    const currentTime = new Date(); // create new date object and store as 'currentTime'

    // store months of the year in array
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 

    const month = months[currentTime.getMonth()]; // get the month number from 'currentTime' and retrieve month name from array
    const day = currentTime.getDate(); // get day number from 'currentTime'
    const year = currentTime.getFullYear(); // get year from 'currentTime'
    return `${month} ${day}, ${year}`; // return date formatted as "month name, dd, yyyy"
}