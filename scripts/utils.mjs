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

    if (hour == 0) {
        hour = 12;
    }

    let stringMinute = minute.toString();

    if (stringMinute.length < 2) {
        minute = `0${minute}`;
    }

    return `${hour}:${minute} ${meridian}`;
}

// get current date formatted as 'month, day, year'
export function getDate() {
    const currentTime = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const month = months[currentTime.getMonth()];
    const day = currentTime.getDate();
    const year = currentTime.getFullYear();
    return `${month} ${day}, ${year}`;
}

// get date range in array with dates formatted as 'mm/dd/yyyy'
export function getDateRange() {
    const currentTime = new Date();

    let month = currentTime.getMonth() + 1;
    let day = currentTime.getDate();
    let year = currentTime.getFullYear();

    let oldDay;
    let oldMonth;
    let oldYear;

    if (day > 5) {
        oldDay = day - 5;
        oldMonth = month;
        oldYear = year;
    } else if ((day < 6) && (month != 1)) {
        oldDay = 26;
        oldMonth = month - 1;
        oldYear = year;
    } else if ((day < 6) && (month == 1)) {
        oldDay = 26;
        oldMonth = 12;
        oldYear = year - 1;
    }

    let strMonth = month.toString();
    let strOldMonth = oldMonth.toString();
    let strDay = day.toString();
    let strOldDay = oldDay.toString();

    if (strMonth.length < 2) {
        month = `0${month}`;
    }

    if (strOldMonth.length < 2) {
        oldMonth = `0${oldMonth}`;
    }

    if (strDay.length < 2) {
        day = `0${day}`;
    }

    if (strOldDay.length < 2) {
        oldDay = `0${oldDay}`;
    }

    let currentDate = `${month}/${day}/${year}`;
    let oldDate = `${oldMonth}/${oldDay}/${oldYear}`;
    let dateRange = [oldDate, currentDate];
    return dateRange;
}

// get the current date in 'mm/dd/yyyy'
export function getNumericalDate() {
    const currentTime = new Date();

    let month = currentTime.getMonth() + 1;
    let day = currentTime.getDate();
    let year = currentTime.getFullYear();
    let strMonth = month.toString();
    let strDay = day.toString();

    if (strMonth.length < 2) {
        month = `0${month}`;
    }

    if (strDay.length < 2) {
        day = `0${day}`;
    }

    let currentDate = `${month}/${day}/${year}`;
    return currentDate;
}