// functions that manage local storage for alarm times

// ==================================================
// alarm functions using local storeage
// ==================================================

// set alarm time
export function setAlarm(hour, minute, meridian) {
    const hourNum = Number(hour); // change hour string type input to number type
    const minuteNum = Number(minute); // change minute string type input to number type

    // check if time entered is valid 12 hour time
    if ((Number.isInteger(hourNum) && (hourNum >= 1) && (hourNum <= 12)) && 
    (Number.isInteger(minuteNum) && (minuteNum >= 0) && (minuteNum <= 59))) {
        localStorage.setItem('alarmHour', hour); // set local storage 'alarmHour' to hour string type input
        localStorage.setItem('alarmMinute', minute); // set local storage 'alarmMinute' to minute string type input
        localStorage.setItem('alarmMeridian', meridian); // set local storage 'alarmMeridian' to provided meridian input
    } else {  
        localStorage.setItem('alarmHour', '8'); // set local storage to 'alarmHour' to '8'
        localStorage.setItem('alarmMinute', '30'); // set local storage to 'alarmMinute' to '30'
        localStorage.setItem('alarmMeridian', 'AM'); // set local storage to 'alarmMeridian' to 'AM'
    }
}

// get alarm time
export function getAlarm() {
    let hour = localStorage.getItem('alarmHour'); // get local storage item 'alarmHour'
    let minute = localStorage.getItem('alarmMinute'); // get local storage item 'alarmMinute'
    let meridian = localStorage.getItem('alarmMeridian'); // get local storage item 'alarmMeridian'
    return `${hour}:${minute} ${meridian}`; // return time formatted as 'h:mm:meridian'
}