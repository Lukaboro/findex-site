// Findex — gedeelde scripts (nav-gedrag, mobiel menu, reveal-animatie)

// Nav: rand/schaduw bij scrollen
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

// Mobiel menu
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav-links');

function setMenuOpen(open) {
  if (!toggle || !links) return;
  links.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  toggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
}

if (toggle && links) {
  toggle.addEventListener('click', () => {
    setMenuOpen(!links.classList.contains('is-open'));
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenuOpen(false);
  });
}

// Reveal on scroll — elementen al in beeld tonen direct
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4 * 0.06) + 's';
  const r = el.getBoundingClientRect();
  if (r.top < window.innerHeight * 0.92) { el.classList.add('in'); }
  else { io.observe(el); }
});
