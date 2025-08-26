// År i footer
document.getElementById('year').textContent = new Date().getFullYear();

// Hamburger: toggla meny + ikon + aria (G + VG: ikon växlar + slide-in via CSS)
const toggleBtn = document.querySelector('.menu-toggle');
const burger = document.getElementById('burger');
const menu = document.getElementById('mainmenu');

toggleBtn.addEventListener('click', () => {
  const nowOpen = menu.classList.toggle('open');
  toggleBtn.setAttribute('aria-expanded', String(nowOpen));
  toggleBtn.setAttribute('aria-label', nowOpen ? 'Stäng menyn' : 'Öppna menyn');
  burger.textContent = nowOpen ? '✕' : '☰';
});

// (VG) Enkel validering innan POST: namn, lösenordslängd, minst en radio
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  msg.className = 'form-msg';
  msg.textContent = '';

  const name = form.elements['name'];
  const pass = form.elements['password'];
  const radios = form.querySelectorAll('input[type="radio"][name="type"]');

  if (!name.value.trim()) {
    e.preventDefault();
    msg.textContent = 'Fyll i ditt namn.';
    msg.classList.add('err');
    name.focus();
    return;
  }

  if (!pass.value || pass.value.length < 6) {
    e.preventDefault();
    msg.textContent = 'Lösenord måste vara minst 6 tecken.';
    msg.classList.add('err');
    pass.focus();
    return;
  }

  const anyRadio = Array.from(radios).some(r => r.checked);
  if (!anyRadio) {
    e.preventDefault();
    msg.textContent = 'Välj vad du söker.';
    msg.classList.add('err');
    radios[0].focus();
    return;
  }

  // Låt POST gå iväg till httpbin (kravet)
  msg.textContent = 'Skickar…';
  msg.classList.add('ok');
});
