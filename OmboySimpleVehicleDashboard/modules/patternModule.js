import { increaseSpeed, decreaseSpeed, consumeFuel, addFuel } from './compositionModule.js';

export const Dashboard = (() => {
  let vehicle = null;
  let bus = null;

  function updateDisplay() {
    document.getElementById('speedValue').textContent = vehicle.speed;
    document.getElementById('fuelValue').textContent = vehicle.fuel;
    document.getElementById('engineStatus').textContent = vehicle.engineOn ? 'ON' : 'OFF';

    const needle = document.getElementById('needle');
    const rotation = -120 + (vehicle.speed / 180) * 240; // map speed to dial range
    needle.style.transform = `rotate(${rotation}deg)`;
  }

  function showToast(message, color = '#1e88e5') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = color;
    toast.hidden = false;
    setTimeout(() => (toast.hidden = true), 2000);
  }

  function toggleEngineButton() {
    const btn = document.getElementById('btnEngine');
    if (vehicle.engineOn) {
      btn.textContent = 'Stop Engine';
      btn.classList.remove('off');
      btn.classList.add('on');
    } else {
      btn.textContent = 'Start Engine';
      btn.classList.remove('on');
      btn.classList.add('off');
    }
  }

  return {
    init(eventBus, veh) {
      bus = eventBus;
      vehicle = veh;
      toggleEngineButton();
      updateDisplay();

      bus.on('engine:toggle', () => {
        vehicle.engineOn = !vehicle.engineOn;
        toggleEngineButton();
        const msg = vehicle.engineOn ? 'Engine started!' : 'Engine stopped!';
        showToast(msg, vehicle.engineOn ? '#27e0a1' : '#ff5d5d');
        updateDisplay();
      });

      bus.on('vehicle:accelerate', () => {
        if (!vehicle.engineOn) return showToast('Start engine first!', '#ff5d5d');
        if (vehicle.fuel <= 0) return showToast('Out of fuel!', '#ff5d5d');
        vehicle.speed = increaseSpeed(vehicle.speed, 10);
        vehicle.fuel = consumeFuel(vehicle.fuel, 4);
        showToast('Accelerating...', '#1e88e5');
        updateDisplay();
      });

      bus.on('vehicle:brake', () => {
        vehicle.speed = decreaseSpeed(vehicle.speed, 10);
        showToast('Braking...', '#ffcc3f');
        updateDisplay();
      });

      bus.on('vehicle:refuel', () => {
        vehicle.fuel = addFuel(vehicle.fuel, 20);
        showToast('Refueled!', '#27e0a1');
        updateDisplay();
      });
    }
  };
})();
