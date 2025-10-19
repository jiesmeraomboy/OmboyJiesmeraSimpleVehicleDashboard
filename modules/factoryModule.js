export function createVehicle(type, name) {
  return {
    type,
    name,
    speed: 0,
    fuel: 100,
    engineOn: false
  };
}
