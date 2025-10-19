export function increaseSpeed(speed, amount) {
  return Math.min(speed + amount, 180);
}

export function decreaseSpeed(speed, amount) {
  return Math.max(speed - amount, 0);
}

export function consumeFuel(fuel, amount) {
  return Math.max(fuel - amount, 0);
}

export function addFuel(fuel, amount) {
  return Math.min(fuel + amount, 100);
}
