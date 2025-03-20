// functions to handle disabling alarm via user set code


// ==================================================
// stop alarm passcode functions
// ==================================================

// set passcode
export function setStopCode(passcode) {
    localStorage.setItem('stopCode', passcode);
}

// get passcode
export function getStopCode() {
    let passcode = localStorage.getItem('stopCode');
    return passcode;
}


// ==================================================
// stop alarm passcode hint functions
// ==================================================

// set passcode hint
export function setHint(hint) {
    localStorage.setItem('hint', hint);
}

// get passcode hint
export function getHint() {
    let hint = localStorage.getItem('hint');
    return hint;
}