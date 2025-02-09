// useful general purpose functions

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