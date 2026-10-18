const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuButton.textContent = open ? '×' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.textContent = '☰';
  }));
}
// Reveal sections on scroll, with a graceful fallback for browsers without IntersectionObserver.
const revealTargets = document.querySelectorAll('.feature,.session-card,.speaker-card,.timeline-item,.venue-copy');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach(el => el.classList.add('will-reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
}


// Premium intro: quick, lightweight and accessible.
const introScreen = document.getElementById('introScreen');
if (introScreen) {
  const finishIntro = () => introScreen.classList.add('is-done');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishIntro();
  } else {
    window.setTimeout(finishIntro, 1650);
    introScreen.addEventListener('click', finishIntro, { once: true });
  }
}

// Live clock in Indian Standard Time; this is the current clock, not a countdown.
const liveClock = document.getElementById('liveClock');
const liveDate = document.getElementById('liveDate');
function updateLiveClock() {
  if (!liveClock) return;
  const now = new Date();
  liveClock.textContent = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true
  }).format(now);
  if (liveDate) {
    liveDate.textContent = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata', weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
    }).format(now).toUpperCase();
  }
}
updateLiveClock();
window.setInterval(updateLiveClock, 1000);


// Live countdown to the seminar start: 23 October 2026, 09:45 IST (UTC+05:30).
const countdownFields = {
  days: document.getElementById('countDays'),
  hours: document.getElementById('countHours'),
  minutes: document.getElementById('countMinutes'),
  seconds: document.getElementById('countSeconds'),
  status: document.getElementById('countdownStatus')
};
function updateDeadlineCountdown() {
  if (!countdownFields.days) return;
  const eventStart = new Date('2026-10-23T09:45:00+05:30').getTime();
  const remaining = eventStart - Date.now();
  if (remaining <= 0) {
    countdownFields.days.textContent = '00';
    countdownFields.hours.textContent = '00';
    countdownFields.minutes.textContent = '00';
    countdownFields.seconds.textContent = '00';
    countdownFields.status.textContent = 'EVENT STARTED / CHECK WITH ORGANISERS';
    return;
  }
  const totalSeconds = Math.floor(remaining / 1000);
  countdownFields.days.textContent = String(Math.floor(totalSeconds / 86400)).padStart(3, '0');
  countdownFields.hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0');
  countdownFields.minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  countdownFields.seconds.textContent = String(totalSeconds % 60).padStart(2, '0');
}
updateDeadlineCountdown();
window.setInterval(updateDeadlineCountdown, 1000);
