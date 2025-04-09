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
    if (minute.length < 2) {
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

// get date range in array with dates formatted as 'mm/dd/yyyy' 
// -- function designed for future api integration to ensure easy updates and is not currently used
export function getDateRange() {
    const currentTime = new Date(); // create new date object and store in 'currentTime'
    let month = currentTime.getMonth() + 1; // get current month number 0-11 from 'currentTime' and add 1 to make 1-12
    let day = currentTime.getDate(); // get day number from 'currentTime'
    let year = currentTime.getFullYear(); // get year from 'currentTime'
    let oldDay; // declare 'oldDay' variable
    let oldMonth; // declare 'oldMonth' variable
    let oldYear; // declare 'oldYear' variable

    // check if current day is bigger than 5
    if (day > 5) {
        oldDay = day - 5; // set 'oldDay' as 5 days less than current day
        oldMonth = month; // keep 'oldMonth' same as 'month'
        oldYear = year; // keep 'oldYear' same as current year

        // check if current day is in the 2-5 range
    } else if ((day < 6) && (month != 1)) {
        oldDay = 26; // set 'oldDay' to 26
        oldMonth = month - 1; // set 'oldMonth' to 1 less than current month
        oldYear = year; // keep 'oldYear' the same as current year

        // check if current day is 5 or less and the current month is 1
    } else if ((day < 6) && (month == 1)) {
        oldDay = 26; // set 'oldDay' to 26
        oldMonth = 12; // set 'oldMonth' to 12
        oldYear = year - 1; // set 'oldYear' to 1 less than current year
    }

    // check if the current month is 1 digit
    if (month.length < 2) {
        month = `0${month}`; // format current month as two digits
    }

    // check if 'oldMonth' is 1 digit
    if (oldMonth.length < 2) {
        oldMonth = `0${oldMonth}`; // format 'oldMonth' as two digits
    }

    // check if current day is 1 digit
    if (day.length < 2) {
        day = `0${day}`; // format current day as 2 digits
    }

    // check if 'oldDay' is 1 digit
    if (oldDay.length < 2) {
        oldDay = `0${oldDay}`; // format 'oldDay' as 2 digits
    }

    let currentDate = `${month}/${day}/${year}`; // format 'currentDate' as mm/dd/yyyy
    let oldDate = `${oldMonth}/${oldDay}/${oldYear}`; // format 'oldDate' as mm/dd/yyyy
    let dateRange = [oldDate, currentDate]; // store'oldDate' and 'currentDate' in array
    return dateRange; // return 'dateRange' array
}

// get the current date in 'mm/dd/yyyy'
// -- function designed for future api integration to ensure easy updates and is not currently used
export function getNumericalDate() {
    const currentTime = new Date(); // create new date object as 'currentTime'
    let month = currentTime.getMonth() + 1; // get current month in 0-11 range and format into range 1-12
    let day = currentTime.getDate(); // get current day 
    let year = currentTime.getFullYear(); // get current year

    // check if current month is 1 digit
    if (month.length < 2) {
        month = `0${month}`; // format current month into 2 digits
    }

    // check if current day is 1 digit
    if (day.length < 2) {
        day = `0${day}`; // format current day into 2 digits
    }

    let currentDate = `${month}/${day}/${year}`; // format 'currentDate' as mm/dd/yyyy
    return currentDate; // return 'currentDate'
}

// ==================================================
// formatting functions
// ==================================================

// capitalize a word
export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // capitalize first letter of word
}

// shorten a string
export function shortenText(text) {
  const words = text.trim().split(' '); // take whitespace off string and split words into array at the spaces

  // check if there are 7 or more words in array
  if (words.length >= 7) {
    return words.slice(0, 10).join(' ') + '...'; // keep only the first seven words followed by "..."
  }
  return text; // return the first seven words
}