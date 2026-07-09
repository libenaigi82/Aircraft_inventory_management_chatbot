export function randomStock(min = 10, max = 80) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomReserved(max = 10) {
  return Math.floor(Math.random() * max);
}

export function randomMinimum() {
  return 10;
}

export function randomMaximum() {
  return 100;
}