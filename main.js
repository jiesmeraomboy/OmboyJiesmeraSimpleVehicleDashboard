import { EventEmitter } from './modules/observerModule.js';
import { createVehicle } from './modules/factoryModule.js';
import { Dashboard } from './modules/patternModule.js';
import { registerButtonEvent } from './modules/eventModule.js';

document.addEventListener('DOMContentLoaded', () => {
  const bus = new EventEmitter();
  const vehicle = createVehicle('car', 'My Vehicle');

  Dashboard.init(bus, vehicle);

  registerButtonEvent('btnEngine', () => bus.emit('engine:toggle'));
  registerButtonEvent('btnAccel', () => bus.emit('vehicle:accelerate'));
  registerButtonEvent('btnBrake', () => bus.emit('vehicle:brake'));
  registerButtonEvent('btnRefuel', () => bus.emit('vehicle:refuel'));
});
