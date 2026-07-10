// ============================================
// FIRAS NOUIRA — Portfolio JS
// Handles: nav active state, scroll reveal
// ============================================

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('#nav ul li');

// ---- NAV ACTIVE STATE (scroll-based) ----
function updateNav() {
  const scrollY = window.pageYOffset;

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(li => {
    li.classList.remove('active');
    if (li.classList.contains(current)) {
      li.classList.add('active');
    }
  });

  if (current === 'home') {
    document.body.classList.add('home-active');
  } else {
    document.body.classList.remove('home-active');
  }
}

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealEls.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80) {
      // stagger siblings (timeline items, project cards)
      const siblings = el.parentElement.querySelectorAll(
        '.timeline-item, .project-card'
      );
      let delay = 0;
      siblings.forEach((sib, j) => { if (sib === el) delay = j * 80; });
      setTimeout(() => el.classList.add('visible'), delay);
    }
  });
}

// ---- MODAL INTERACTIONS ----
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const openCtnModal = document.getElementById('open-ctn-modal');
const previewTrigger = document.getElementById('ctn-preview-trigger');

function openModal() {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (openCtnModal) {
  openCtnModal.addEventListener('click', openModal);
}

if (previewTrigger) {
  previewTrigger.addEventListener('click', openModal);
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modalOverlay.classList.contains('open')) {
    closeModal();
  }
});

// ---- MOBILE SIDEBAR TOGGLE ----
const mobileHamburger = document.getElementById('mobile-hamburger');
const mobileOverlay = document.getElementById('mobile-overlay');

function openSidebar() {
  document.body.classList.add('sidebar-open');
  if (mobileHamburger) mobileHamburger.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
  document.body.classList.remove('sidebar-open');
  if (mobileHamburger) mobileHamburger.setAttribute('aria-expanded', 'false');
}

if (mobileHamburger) {
  mobileHamburger.addEventListener('click', () => {
    if (document.body.classList.contains('sidebar-open')) closeSidebar(); else openSidebar();
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeSidebar);
}

// Close sidebar when clicking a nav link (mobile)
const mobileNavLinks = document.querySelectorAll('#nav a');
mobileNavLinks.forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 900) closeSidebar();
  });
});

// ---- INIT ----
window.addEventListener('scroll', () => {
  updateNav();
  revealOnScroll();
}, { passive: true });

// Trigger on load
updateNav();
revealOnScroll();

// ---- LANGUAGE SELECTOR ----
const langSelector = document.getElementById('lang-selector');
const langBtns = document.querySelectorAll('.lang-btn');

// Store current language
let currentLang = localStorage.getItem('selectedLang') || 'en';

// Translation data — loaded from JSON file
let translations = {};
fetch('locals/translations.json')
  .then(r => r.json())
  .then(data => {
    translations = data;
    initLanguage();
  });

// Initialize language — called after translations JSON is loaded
function initLanguage() {
  const savedLang = localStorage.getItem('selectedLang') || 'en';
  setLanguage(savedLang);
}

// Set language and update UI
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('selectedLang', lang);

  // Update active button
  langBtns.forEach(btn => {
    btn.classList.remove('lang-btn--active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('lang-btn--active');
    }
  });

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      const text = translations[lang][key];

      // Special handling for home name to preserve formatting
      if (el.classList.contains('home-name')) {
        const firstName = translations[lang]['home-name-first'];
        const secondName = translations[lang]['home-name-second'];
        el.innerHTML = `${firstName}<br /><em>${secondName}</em>`;
      }
      // Handle project names and other content with line breaks
      else if (text.includes('\n')) {
        el.innerHTML = text.replace(/\n/g, '<br />');
      }
      else {
        el.textContent = text;
      }
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// Language button click handlers
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    setLanguage(lang);
  });
});

// initLanguage() is called once translations.json finishes loading (see fetch above)
// ---- TECH BADGE RENDERER ----
// Single source of truth for all technology icons.
// Usage in HTML: <div class="tags" data-techs="Angular,Docker,MongoDB"></div>
const TECH_DEFS = {
  'Angular': { shape: 'circle', fill: '#DD0031', textFill: '#fff', label: 'A', fontSize: 11 },
  'Express.js': { shape: 'circle', fill: '#000', textFill: '#fff', label: 'ex', fontSize: 9 },
  'MongoDB': { shape: 'circle', fill: '#47A248', textFill: '#fff', label: 'DB', fontSize: 10 },
  'Three.js': { shape: 'circle', fill: '#F7A400', textFill: '#fff', label: '3', fontSize: 11 },
  'Python': { shape: 'circle', fill: '#3776AB', textFill: '#fff', label: 'Py', fontSize: 10 },
  'YOLOv8': { shape: 'circle', fill: '#FFB300', textFill: '#000', label: 'YOLO', fontSize: 10 },
  'Docker': { shape: 'rect', fill: '#2496ED', textFill: '#fff', label: 'D', fontSize: 10 },
  'TypeScript': { shape: 'rect', fill: '#007ACC', textFill: '#fff', label: 'TS', fontSize: 10, rx: 2, y: 4, h: 16 },
  'React': { shape: 'rect', fill: '#61DAFB', textFill: '#000', label: 'R', fontSize: 10 },
  'Flask': { shape: 'rect', fill: '#005A9C', textFill: '#fff', label: 'Fl', fontSize: 10, rx: 0, x: 4, y: 4, w: 16, h: 16 },
};

function makeTechBadge(name) {
  const def = TECH_DEFS[name];
  if (!def) return '';

  let shape;
  if (def.shape === 'circle') {
    shape = `<circle cx="12" cy="12" r="11" fill="${def.fill}"/>`;
  } else {
    const x = def.x ?? 2, y = def.y ?? 2;
    const w = def.w ?? 20, h = def.h ?? 20;
    const rx = def.rx ?? 3;
    shape = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${def.fill}"/>`;
  }

  const svg = `<svg class="tech-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${shape}
    <text x="12" y="16" font-size="${def.fontSize}" text-anchor="middle" fill="${def.textFill}" font-family="Arial">${def.label}</text>
  </svg>`;

  return `<span class="tech">${svg}<span>${name}</span></span>`;
}

// Render all [data-techs] containers
document.querySelectorAll('[data-techs]').forEach(container => {
  const names = container.getAttribute('data-techs').split(',').map(s => s.trim());
  container.innerHTML = names.map(makeTechBadge).join('');
});

// ---- INTERFACE CAROUSEL ----
(function () {
  const carousel = document.getElementById('iface-carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.iface-slide'));
  const dots = Array.from(carousel.querySelectorAll('.iface-dot'));
  const counter = document.getElementById('iface-cur');
  const lbl = document.getElementById('iface-lbl');
  let current = 0;

  function goTo(n) {
    slides[current].classList.remove('iface-slide--active');
    dots[current].classList.remove('iface-dot--active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('iface-slide--active');
    dots[current].classList.add('iface-dot--active');
    if (counter) counter.textContent = current + 1;
    if (lbl) lbl.innerHTML = slides[current].dataset.label || '';
  }

  // Single shared nav bar — two buttons with data-action="prev" / "next"
  carousel.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      goTo(current + (btn.dataset.action === 'next' ? 1 : -1));
    });
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(parseInt(dot.dataset.target, 10)));
  });
})();
document.getElementById('readme-toggle').addEventListener('click', function () {
  const content = document.getElementById('readme-content');
  const expanded = this.getAttribute('aria-expanded') === 'true';
  this.setAttribute('aria-expanded', String(!expanded));
  content.hidden = expanded;
  this.querySelector('.readme-toggle-title').textContent = expanded ? 'Show full README' : 'Hide README';
});