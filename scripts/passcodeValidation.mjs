// functions to handle disabling alarm via user set code


// ==================================================
// stop alarm passcode functions
// ==================================================

// set passcode
export function setStopCode() {
    const setCode = prompt('Enter a passcode you will remember.');
    if (!setCode) {
        setStopCode();
    } else {
        localStorage.setItem('stopCode', setCode);
    }
}

// get passcode
export function getStopCode() {
    let passcode = localStorage.getItem('stopCode');
    return passcode;
}

export async function checkCode() {
    let codeConfirmed = false;
    const storedCode = localStorage.getItem('stopCode');
    let userInput = await prompt('Enter the passcode.');
    if (userInput === storedCode) {
        codeConfirmed = true;
        return codeConfirmed;
    } else {
        alert('Incorrect code entered.')
        checkCode();
    }
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