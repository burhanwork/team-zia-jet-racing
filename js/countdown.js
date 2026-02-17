// ============================================
// TEAM ZIA JET RACING — Countdown Timer
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const countdownEl = document.querySelector('[data-target-date]');
  if (!countdownEl) return;

  const targetDate = new Date(countdownEl.getAttribute('data-target-date')).getTime();
  const daysEl = countdownEl.querySelector('[data-days]');
  const hoursEl = countdownEl.querySelector('[data-hours]');
  const minutesEl = countdownEl.querySelector('[data-minutes]');
  const secondsEl = countdownEl.querySelector('[data-seconds]');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      const label = countdownEl.querySelector('.countdown-label');
      if (label) label.textContent = 'RACE DAY!';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
