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
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
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
