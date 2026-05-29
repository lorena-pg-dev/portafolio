/* ============================================================
   PORTFOLIO — LORENA PALOMINO
   main.js
   ============================================================ */


/* ── 1. TYPEWRITER — gestionado por el sistema de temas ─────── */
/* (se inicializa al final del archivo junto con applyTheme)     */


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


/* ============================================================
   SISTEMA DE LÍNEAS TEMPORALES
   ============================================================ */

/* ── Datos por tema ─────────────────────────────────────────── */
const themeData = {
  default: {
    triggerLabel: 'Ajustar línea temporal',
    words: [
      'Desarrolladora DAM',
      'Apasionada del código',
      'Creativa y curiosa',
      'Futura desarrolladora multiplataforma'
    ],
    card: {
      comment: '// Lorena.java',
      className: 'Developer',
      attrs: [
        { type: 'String',  name: 'nombre',     val: '"Lorena"',         str: true  },
        { type: 'String',  name: 'entusiasmo', val: '"estratosferico"', str: true  },
        { type: 'boolean', name: 'disponible', val: 'true',             str: false }
      ]
    }
  },
  matrix: {
    triggerLabel: '> sistema_alterado.exe',
    words: [
      'Hechicera del código',
      'Arquitecta de sistemas',
      'Compilando realidades...',
      'El código te ha elegido'
    ],
    card: {
      comment: '// Hechicera.java',
      className: 'Hechicera',
      attrs: [
        { type: 'String',  name: 'hechizo',    val: '"compilar()"',  str: true  },
        { type: 'int',     name: 'nivel',       val: '99',            str: false },
        { type: 'boolean', name: 'omnisciente', val: 'true',          str: false }
      ]
    }
  },
  pacman: {
    triggerLabel: 'Ajustar línea temporal',
    words: [
      'INSERT COIN',
      'PLAYER ONE READY',
      'GAME ON...',
      'HIGH SCORE: ∞'
    ],
    card: {
      comment: '// Gamer.java',
      className: 'Gamer',
      attrs: [
        { type: 'String',  name: 'modo',   val: '"PLAYER ONE"', str: true  },
        { type: 'int',     name: 'vidas',  val: '3',            str: false },
        { type: 'boolean', name: 'gameOn', val: 'true',         str: false }
      ]
    }
  },
  dungeon: {
    triggerLabel: 'Ajustar línea temporal',
    words: [
      'Berserker del teclado',
      'Cazadora de bugs',
      'Sin miedo al merge conflict',
      'La aventura continúa...'
    ],
    card: {
      comment: '// Berserker.java',
      className: 'Berserker',
      attrs: [
        { type: 'String',  name: 'arma',      val: '"teclado"',          str: true  },
        { type: 'int',     name: 'fuerza',    val: 'Integer.MAX_VALUE',  str: false },
        { type: 'boolean', name: 'temeraria', val: 'true',               str: false }
      ]
    }
  }
};

/* ── Renderizar tarjeta Java ────────────────────────────────── */
function renderCodeCard(theme) {
  const card = document.getElementById('code-card');
  if (!card) return;
  const d = themeData[theme].card;

  let html = `<div class="code-comment">${d.comment}</div>`;
  html += `<div><span class="code-keyword">public class</span><span class="code-str"> ${d.className} </span><span>{</span></div>`;

  d.attrs.forEach(a => {
    const valSpan = a.str
      ? `<span class="code-str">${a.val}</span>`
      : `<span class="code-bool">${a.val}</span>`;
    html += `<div>&nbsp;<span class="code-keyword">${a.type}</span> <span class="code-key">${a.name}</span> <span>=</span> ${valSpan}<span>;</span></div>`;
  });

  html += `<div>}</div>`;
  card.innerHTML = html;
}

/* ── Typewriter — reiniciar con nuevas palabras ─────────────── */
let twWords = themeData.default.words;
let twWordIndex = 0;
let twCharIndex = 0;
let twDeleting  = false;
let twTimer     = null;

function runTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const word = twWords[twWordIndex];

  if (!twDeleting) {
    twCharIndex++;
    el.textContent = word.slice(0, twCharIndex);
    if (twCharIndex >= word.length) { twDeleting = true; twTimer = setTimeout(runTypewriter, 1400); return; }
  } else {
    twCharIndex--;
    el.textContent = word.slice(0, twCharIndex);
    if (twCharIndex === 0) { twDeleting = false; twWordIndex = (twWordIndex + 1) % twWords.length; }
  }
  twTimer = setTimeout(runTypewriter, twDeleting ? 55 : 90);
}

/* ── Matrix rain canvas ─────────────────────────────────────── */
const canvas  = document.getElementById('matrix-canvas');
const ctx     = canvas ? canvas.getContext('2d') : null;
let   matrixRaf = null;
const matrixChars = 'アイウエオカキクケコ01<>{}[]//ｦｧｨｩｪ';

function resizeCanvas() {
  if (!canvas) return;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function startMatrix() {
  if (!ctx) return;
  resizeCanvas();
  const cols  = Math.floor(canvas.width / 14);
  const drops = Array(cols).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0,10,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = '12px monospace';
    drops.forEach((y, i) => {
      const ch = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      ctx.fillText(ch, i * 14, y * 14);
      if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
    matrixRaf = requestAnimationFrame(draw);
  }
  draw();
}

/* ── Brasas flotantes — Berserker ───────────────────────────── */
function startEmbers() {
  if (!ctx) return;
  resizeCanvas();
  const embers = [];

  function newEmber() {
    return {
      x:      Math.random() * canvas.width,
      y:      canvas.height + 8,
      r:      Math.random() * 2.5 + 0.8,
      vy:     Math.random() * 1.2 + 0.4,
      vx:     (Math.random() - 0.5) * 0.6,
      life:   1,
      decay:  Math.random() * 0.004 + 0.002
    };
  }

  function drawEmbers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (embers.length < 80) embers.push(newEmber());

    for (let i = embers.length - 1; i >= 0; i--) {
      const e = embers[i];
      e.y   -= e.vy;
      e.x   += e.vx;
      e.life -= e.decay;

      if (e.life <= 0) { embers.splice(i, 1); continue; }

      const alpha = e.life * 0.8;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      /* color varía entre naranja y dorado */
      const g = Math.floor(80 + e.life * 80);
      ctx.fillStyle = `rgba(240, ${g}, 10, ${alpha})`;
      ctx.fill();
    }
    matrixRaf = requestAnimationFrame(drawEmbers);
  }
  drawEmbers();
}

function stopMatrix() {
  if (matrixRaf) { cancelAnimationFrame(matrixRaf); matrixRaf = null; }
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* ── Pacman canvas con colisión y respawn ───────────────────── */
function startPacman() {
  if (!ctx) return;
  resizeCanvas();

  const PAC_R   = 18;
  const GHOST_R = 14;
  const W = canvas.width, H = canvas.height;

  /* Puntos en cuadrícula */
  const dots = [];
  const gap  = 30;
  for (let x = gap; x < W; x += gap)
  for (let y = gap; y < H; y += gap)
    dots.push({ x, y, eaten: false, power: Math.random() < 0.04 });

  function resetDots() { dots.forEach(d => d.eaten = false); }

  /* 6 trayectorias — cambian con cada muerte o vuelta */
  const patterns = [
    x => H * 0.50 + Math.sin(x * 0.014) * H * 0.28,
    x => H * 0.50 + Math.sin(x * 0.022) * H * 0.18 + Math.sin(x * 0.008) * H * 0.12,
    x => H * 0.25 + Math.abs(Math.sin(x * 0.016)) * H * 0.50,
    x => H * 0.75 - Math.abs(Math.sin(x * 0.016)) * H * 0.50,
    x => H * 0.50 + Math.sin(x * 0.038) * H * 0.14,
    x => { const p = (x % (W/3)) / (W/3); return p < .5 ? H*.25+p*H*.5 : H*.75-(p-.5)*H*.5; }
  ];
  let patIdx = 0;

  /* Estado */
  let state      = 'alive';  // 'alive' | 'dying' | 'spawning'
  let stateFrame = 0;
  let killerIdx  = -1;       // índice del fantasma que atrapó a Pacman

  /* Pacman */
  const pac = { x: -PAC_R, y: H / 2, mouthT: 0 };

  /* Fantasmas */
  const ghosts = [
    { x: W * .20, y: H * .25, color: '#FF2222', dx:  1.4, dy:  0.8 },
    { x: W * .55, y: H * .65, color: '#FFB8FF', dx: -1.1, dy:  1.2 },
    { x: W * .75, y: H * .30, color: '#00FFFF', dx:  1.1, dy: -1.0 },
    { x: W * .35, y: H * .75, color: '#FFB852', dx: -1.0, dy: -1.2 }
  ];

  /* ── Dibujar fantasma ─────────────────────────────────────── */
  function drawGhost(g, alpha, scale) {
    const s    = scale || 1;
    const r    = GHOST_R * s;
    const col  = (killerIdx >= 0 && ghosts[killerIdx] === g && state === 'dying')
                 ? '#FFFFFF' : g.color;

    ctx.save();
    ctx.translate(g.x, g.y);
    ctx.scale(s, s);

    ctx.beginPath();
    ctx.arc(0, -r * 0.3, r, Math.PI, 0);
    ctx.lineTo(r,  r * 0.9);
    const hw = r / 2;
    ctx.lineTo( hw * 0.5,  r * 0.3);
    ctx.lineTo( 0,         r * 0.9);
    ctx.lineTo(-hw * 0.5,  r * 0.3);
    ctx.lineTo(-r,         r * 0.9);
    ctx.closePath();
    ctx.fillStyle = col + (Math.round((alpha || 0.73) * 255).toString(16).padStart(2,'0'));
    ctx.fill();

    [[-5, -4], [5, -4]].forEach(([ex, ey]) => {
      ctx.beginPath(); ctx.arc(ex, ey, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'white'; ctx.fill();
      ctx.beginPath(); ctx.arc(ex + 1, ey + 1, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#0033cc'; ctx.fill();
    });

    ctx.restore();
  }

  /* ── Lógica principal ─────────────────────────────────────── */
  function draw() {
    ctx.fillStyle = 'rgba(0,0,12,0.22)';
    ctx.fillRect(0, 0, W, H);

    /* ── ALIVE ────────────────────────────────────────────── */
    if (state === 'alive') {
      pac.x += 1.8;
      pac.y  = patterns[patIdx](pac.x);
      pac.mouthT += 0.18;

      /* Sale por la derecha → siguiente patrón */
      if (pac.x > W + PAC_R) {
        pac.x  = -PAC_R;
        patIdx = (patIdx + 1) % patterns.length;
        resetDots();
      }

      /* Puntos */
      dots.forEach(dot => {
        if (dot.eaten) return;
        const r = dot.power ? 6 : 3;
        if (Math.hypot(dot.x - pac.x, dot.y - pac.y) < PAC_R + r) { dot.eaten = true; return; }
        ctx.beginPath(); ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx.fillStyle = dot.power ? '#FFD700' : 'rgba(255,215,0,0.5)';
        ctx.fill();
      });

      /* Fantasmas */
      ghosts.forEach((g, i) => {
        g.x += g.dx; g.y += g.dy;
        if (g.x < GHOST_R || g.x > W - GHOST_R) g.dx *= -1;
        if (g.y < GHOST_R || g.y > H - GHOST_R) g.dy *= -1;
        drawGhost(g, 0.73, 1);

        /* Colisión */
        if (Math.hypot(g.x - pac.x, g.y - pac.y) < PAC_R + GHOST_R - 5) {
          state      = 'dying';
          stateFrame = 0;
          killerIdx  = i;
        }
      });

      /* Pacman vivo */
      const mouth = Math.abs(Math.sin(pac.mouthT)) * 0.32;
      ctx.beginPath();
      ctx.arc(pac.x, pac.y, PAC_R, mouth, Math.PI * 2 - mouth);
      ctx.lineTo(pac.x, pac.y);
      ctx.fillStyle = '#FFD700';
      ctx.fill();

    /* ── DYING ────────────────────────────────────────────── */
    } else if (state === 'dying') {
      stateFrame++;
      const DEATH_DUR = 55;
      const progress  = Math.min(stateFrame / DEATH_DUR, 1);

      /* Puntos (congelados) */
      dots.forEach(dot => {
        if (dot.eaten) return;
        const r = dot.power ? 6 : 3;
        ctx.beginPath(); ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx.fillStyle = dot.power ? '#FFD700' : 'rgba(255,215,0,0.5)';
        ctx.fill();
      });

      /* Fantasmas — killer parpadea */
      ghosts.forEach((g, i) => {
        const flash = i === killerIdx && Math.floor(stateFrame / 4) % 2 === 0;
        drawGhost(g, flash ? 1 : 0.73, flash ? 1.1 : 1);
      });

      /* Animación muerte: boca se abre hasta cerrar el cuerpo, luego encoge */
      if (progress < 0.7) {
        const open = (progress / 0.7) * Math.PI;
        ctx.beginPath();
        ctx.arc(pac.x, pac.y, PAC_R, open, Math.PI * 2 - open);
        ctx.lineTo(pac.x, pac.y);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
      } else {
        const shrink = PAC_R * (1 - (progress - 0.7) / 0.3);
        if (shrink > 1) {
          ctx.beginPath();
          ctx.arc(pac.x, pac.y, shrink, 0, Math.PI * 2);
          ctx.fillStyle = '#FFD700';
          ctx.fill();
        }
      }

      /* Fin de muerte → respawn */
      if (progress >= 1) {
        state      = 'spawning';
        stateFrame = 0;
        killerIdx  = -1;
        pac.x      = -PAC_R;
        patIdx     = (patIdx + 1) % patterns.length;
        resetDots();
      }

    /* ── SPAWNING ─────────────────────────────────────────── */
    } else if (state === 'spawning') {
      stateFrame++;
      const SPAWN_DUR = 22;
      const progress  = Math.min(stateFrame / SPAWN_DUR, 1);

      pac.x += 1.8;
      pac.y  = patterns[patIdx](pac.x);
      pac.mouthT += 0.18;

      /* Puntos */
      dots.forEach(dot => {
        if (dot.eaten) return;
        const r = dot.power ? 6 : 3;
        if (Math.hypot(dot.x - pac.x, dot.y - pac.y) < PAC_R + r) { dot.eaten = true; return; }
        ctx.beginPath(); ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx.fillStyle = dot.power ? '#FFD700' : 'rgba(255,215,0,0.5)';
        ctx.fill();
      });

      /* Fantasmas */
      ghosts.forEach(g => {
        g.x += g.dx * 0.3; g.y += g.dy * 0.3;
        if (g.x < GHOST_R || g.x > W - GHOST_R) g.dx *= -1;
        if (g.y < GHOST_R || g.y > H - GHOST_R) g.dy *= -1;
        drawGhost(g, 0.4, 1);
      });

      /* Pacman crece desde cero */
      const size  = PAC_R * progress;
      const mouth = Math.abs(Math.sin(pac.mouthT)) * 0.32;
      ctx.beginPath();
      ctx.arc(pac.x, pac.y, size, mouth, Math.PI * 2 - mouth);
      ctx.lineTo(pac.x, pac.y);
      ctx.fillStyle = `rgba(255,215,0,${progress})`;
      ctx.fill();

      if (progress >= 1) state = 'alive';
    }

    matrixRaf = requestAnimationFrame(draw);
  }

  draw();
}

window.addEventListener('resize', () => { if (matrixRaf) { stopMatrix(); startMatrix(); } });

/* ── Aplicar tema ───────────────────────────────────────────── */
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);

  // Tarjeta Java
  renderCodeCard(theme);

  // Typewriter — cambia palabras y reinicia
  clearTimeout(twTimer);
  twWords     = themeData[theme].words;
  twWordIndex = 0;
  twCharIndex = 0;
  twDeleting  = false;
  const twEl = document.getElementById('typewriter');
  if (twEl) twEl.textContent = '';
  runTypewriter();

  // El botón lanzador siempre muestra el mismo texto

  // Efectos de canvas por tema
  stopMatrix();
  if (theme === 'matrix')  startMatrix();
  if (theme === 'dungeon') startEmbers();
  if (theme === 'pacman')  startPacman();

  // Cerrar panel
  document.getElementById('theme-panel').classList.remove('open');
  document.getElementById('theme-trigger').classList.remove('open');
}

/* ── Lanzador UI ────────────────────────────────────────────── */
const trigger = document.getElementById('theme-trigger');
const panel   = document.getElementById('theme-panel');

trigger.addEventListener('click', () => {
  const isOpen = panel.classList.toggle('open');
  trigger.classList.toggle('open', isOpen);
});

document.querySelectorAll('.theme-option').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

// Cerrar al hacer clic fuera
document.addEventListener('click', e => {
  if (!e.target.closest('.theme-launcher')) {
    panel.classList.remove('open');
    trigger.classList.remove('open');
  }
});

/* ── Ciclo de colores del botón lanzador ────────────────────── */
const triggerAccents = [
  { border: '#7f77dd', text: '#afa9ec' },   // violeta — default
  { border: '#00cc33', text: '#00ff41' },   // verde   — matrix
  { border: '#c17f24', text: '#f0a830' },   // dorado  — berserker
  { border: '#cc8800', text: '#FFD700' },   // amarillo — pacman
];
let triggerAccentIdx = 0;

function cycleTriggerAccent() {
  const btn = document.getElementById('theme-trigger');
  if (!btn || btn.classList.contains('open')) return;

  triggerAccentIdx = (triggerAccentIdx + 1) % triggerAccents.length;
  const c = triggerAccents[triggerAccentIdx];

  /* Cambio de color */
  btn.style.borderColor = c.border;
  btn.style.color       = c.text;
  const prefix = btn.querySelector('.trigger-prefix');
  const cursor = btn.querySelector('.trigger-cursor');
  if (prefix) prefix.style.color = c.border;
  if (cursor) cursor.style.color = c.border;

  /* Destello de brillo momentáneo */
  btn.style.boxShadow = `0 0 22px 5px ${c.border}66`;
  setTimeout(() => { btn.style.boxShadow = ''; }, 900);

  /* Pings sonar — dos oleadas */
  const launcher = document.getElementById('theme-launcher');
  for (let i = 0; i < 2; i++) {
    setTimeout(() => {
      const ping = document.createElement('div');
      ping.className = 'trigger-ping';
      ping.style.setProperty('--ping-color', c.border);
      /* Posicionar el ping alineado con el botón dentro del launcher */
      ping.style.cssText += `
        position:absolute;
        bottom:0; right:0;
        width:${btn.offsetWidth}px;
        height:${btn.offsetHeight}px;
        border-radius:10px;
        border:1.5px solid ${c.border};
        pointer-events:none;
        animation:ping-out .85s ease-out forwards;
      `;
      launcher.appendChild(ping);
      setTimeout(() => ping.remove(), 900);
    }, i * 200);
  }

  /* Sacudida */
  btn.classList.remove('is-shaking');
  void btn.offsetWidth;
  btn.classList.add('is-shaking');
  setTimeout(() => btn.classList.remove('is-shaking'), 700);
}

setInterval(cycleTriggerAccent, 2800);

/* ── Init ───────────────────────────────────────────────────── */
renderCodeCard('default');
runTypewriter();
