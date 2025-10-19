export function registerButtonEvent(buttonId, handler) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  btn.addEventListener('click', handler);
}
