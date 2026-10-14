// Black Roses: mobile menu, gallery lightbox and contact-form validation.
// Everything here is progressive enhancement: the page still reads fine
// without JavaScript, and gallery images remain visible.

/* ---------- Mobile menu ---------- */

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.getElementById('nav-links');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));

// Choosing a link closes the menu so the section isn't hidden behind it.
navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});

/* ---------- Gallery lightbox ----------
   The 2023 version called openFullImg() but never defined it, so clicking
   a photo did nothing. This uses a native <dialog>, which handles focus
   trapping and Esc-to-close, and returns focus to the photo you opened. */

const items = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbCount = document.getElementById('lb-count');
let current = 0;
let opener = null;

function show(index) {
  // Wrap around so "next" on the last photo goes back to the first.
  current = (index + items.length) % items.length;
  const item = items[current];
  lbImg.src = item.dataset.full;
  lbImg.alt = item.querySelector('img').alt;
  lbCaption.textContent = item.dataset.caption;
  lbCount.textContent = `${current + 1} / ${items.length}`;
}

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    opener = item;
    show(index);
    lightbox.showModal();
  });
});

lightbox.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
lightbox.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());

lightbox.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') show(current - 1);
  if (event.key === 'ArrowRight') show(current + 1);
});

// Clicking the dark area around the photo closes it, like most viewers.
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

lightbox.addEventListener('close', () => {
  if (opener) opener.focus();
});

// Simple swipe support for phones.
let touchX = null;
lightbox.addEventListener('touchstart', (event) => { touchX = event.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (event) => {
  if (touchX === null) return;
  const dx = event.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  touchX = null;
});

/* ---------- Contact form ----------
   Custom messages instead of the browser's default bubbles, shown next to
   each field and announced to screen readers via aria-live. */

const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

const rules = {
  name: (v) => (v.trim() ? '' : 'Please enter your name.'),
  email: (v) => {
    if (!v.trim()) return 'Please enter your email address.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'That email address doesn\'t look right.';
  },
  message: (v) => (v.trim().length >= 10 ? '' : 'Please write at least 10 characters.'),
};

function validate(field) {
  const message = rules[field.name](field.value);
  document.getElementById(`${field.name}-error`).textContent = message;
  field.setAttribute('aria-invalid', String(Boolean(message)));
  return !message;
}

// Check a field when the visitor leaves it, then re-check as they fix it.
form.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('blur', () => validate(field));
  field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validate(field);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = Array.from(form.querySelectorAll('input, textarea'));
  const results = fields.map(validate);
  const firstInvalid = fields[results.indexOf(false)];

  if (firstInvalid) {
    success.hidden = true;
    firstInvalid.focus();
    return;
  }

  const name = form.elements.name.value.trim();
  success.textContent = `Thank you, ${name}! Your message looks good. (This demo doesn't send it anywhere.)`;
  success.hidden = false;
  form.reset();
  fields.forEach((field) => field.removeAttribute('aria-invalid'));
});
