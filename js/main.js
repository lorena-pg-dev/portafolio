/* ============================================================
   PORTFOLIO — LORENA PALOMINO
   main.js
   ============================================================ */


/* ── 1. TYPEWRITER ─────────────────────────────────────────── */
(function initTypewriter() {
  const el    = document.getElementById('typewriter');
  const words = [
    'Desarrolladora DAM',
    'Apasionada del código',
    'Creativa y curiosa',
    'Futura desarrolladora multiplataforma'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  function tick() {
    const word = words[wordIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex >= word.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting   = false;
        wordIndex  = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(tick, deleting ? 55 : 90);
  }

  tick();
})();


/* ── 2. RIPPLE en botones ───────────────────────────────────── */
document.querySelectorAll('.js-ripple').forEach(btn => {
  btn.addEventListener('click', e => {
    const wave = document.createElement('span');
    wave.className = 'ripple-wave';

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    wave.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${e.clientX - rect.left - size / 2}px;
      top:    ${e.clientY - rect.top  - size / 2}px;
    `;

    btn.appendChild(wave);
    setTimeout(() => wave.remove(), 600);
  });
});


/* ── 3. MENÚ MOBILE toggle ──────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


/* ── 4. SCROLL REVEAL + SKILL BARS + CONTADORES ────────────── */
let skillsActivated   = false;
let countersActivated = false;

function activateSkillBars() {
  if (skillsActivated) return;

  const bars = document.querySelectorAll('.skill-fill');
  const anyVisible = [...bars].some(b => b.getBoundingClientRect().top < window.innerHeight);

  if (anyVisible) {
    skillsActivated = true;
    bars.forEach(b => { b.style.width = b.dataset.w + '%'; });
  }
}

function activateCounters() {
  if (countersActivated) return;

  const nums = document.querySelectorAll('.counter-num');
  const anyVisible = [...nums].some(n => n.getBoundingClientRect().top < window.innerHeight);

  if (!anyVisible) return;

  countersActivated = true;
  nums.forEach(num => {
    const target  = parseInt(num.dataset.target);
    let   current = 0;
    const inc     = Math.ceil(target / 40);

    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { current = target; clearInterval(timer); }
      num.textContent = current;
    }, 35);
  });
}

/* IntersectionObserver — reveal genérico */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    activateSkillBars();
    activateCounters();
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* IntersectionObserver — timeline (entrada lateral escalonada) */
const tlObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    tlObserver.unobserve(entry.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.tl-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.18}s`;
  tlObserver.observe(item);
});

/* Activar skill bars si ya están en pantalla al cargar */
window.addEventListener('load', () => {
  setTimeout(activateSkillBars, 300);
});
