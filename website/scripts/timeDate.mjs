// get current time
export function getTime() {
    const currentTime = new Date();
    let hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    let meridian = 'AM';

    if (hour > 12) {
        hour = hour - 12;
        meridian = 'PM';
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