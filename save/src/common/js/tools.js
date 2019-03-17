function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let j = getRandom(0, i)
    let t = array[i]
    array[i] = array[j]
    array[j] = t
  }
  return array
}