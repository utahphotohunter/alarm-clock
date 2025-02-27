// functions that manage local storage for alarm times


// ==================================================
// set alarm functions
// ==================================================

// set alarm time
export function setAlarm(hour, minute, meridian) {
    localStorage.setItem('alarmHour', hour);
    localStorage.setItem('alarmMinute', minute);
    localStorage.setItem('alarmMeridian', meridian);
}

// get alarm time
export function getAlarm() {
    let hour = localStorage.getItem('alarmHour');
    let minute = localStorage.getItem('alarmMinute');
    let meridian = localStorage.getItem('alarmMeridian');

    return `${hour}:${minute} ${meridian}`;
}