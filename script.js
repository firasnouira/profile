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

// Translation object
const translations = {
  en: {
    // Navigation
    'nav-home': 'Home',
    'nav-experience': 'Experience',
    'nav-projects': 'Projects',
    'nav-skills': 'Skills',
    'nav-contact': 'Contact',
    // Home
    'home-label': 'Full-Stack Developer',
    'home-name-first': 'Firas',
    'home-name-second': 'Nouira',
    'home-bio': 'I build end-to-end web applications — clean code, solid architecture, interfaces that work. Based in Tunis, open to remote opportunities.',
    'home-cta-projects': 'View Projects',
    'home-cta-contact': 'Contact',
    // Experience
    'exp-title': 'Experience',
    'exp-role-1': 'Full-Stack Developer',
    'exp-desc-1': 'Built an MVP for a logistics and container management platform for tracking and managing logistic operations and data.',
    // Projects
    'proj-title': 'Projects',
    'proj-featured': 'Featured',
    'proj-1-name': 'Smart Container\nLogistics Platform',
    'proj-1-desc': 'End-to-end maritime logistics system built for CTN. Covers expedition creation, automated 3D bin-packing, multi-port pathfinding, real-time vessel tracking via AIS, and a role-based operator dashboard.',
    'proj-2-name': 'Path Holes Detector',
    'proj-2-desc': 'AI-powered road defect detection and reporting system. Detects potholes from image, video, or webcam input, pins them to a shared map, and supports citizen reporting with live map updates.',
    // Buttons
    'btn-details': 'View details ↗',
    'btn-demo': 'Live demo ↗',
    // Modal
    'modal-featured': 'Featured Project',
    'modal-title-1': 'Smart Container Logistics Platform',
    'modal-about-title': 'About the project',
    'modal-about-1': 'CTN is a state-owned Tunisian shipping line handling ~100,000 transport units annually. Their container shipping operations were entirely managed through manual, informal processes — clients submitted requests through ad-hoc channels, agents manually selected voyages and assigned containers based on experience alone.',
    'modal-about-2': 'This platform digitizes and optimizes that entire workflow: from expedition request to real-time vessel tracking, with automated container space optimization and intelligent route planning baked in.',
    'modal-features-title': 'Key features',
    // Skills
    'skills-title': 'Skills',
    'skill-frontend': 'Frontend',
    'skill-backend': 'Backend',
    'skill-devops': 'DevOps & Tools',
    'skill-education': 'Education',
    'edu-degree': 'B.Sc. Computer Science',
    'edu-school': 'University of Monastir',
    // Contact
    'contact-title': 'Contact',
    'contact-email-label': 'Email',
    'contact-linkedin-label': 'LinkedIn',
    'contact-github-label': 'GitHub',
  },
  fr: {
    // Navigation
    'nav-home': 'Accueil',
    'nav-experience': 'Expérience',
    'nav-projects': 'Projets',
    'nav-skills': 'Compétences',
    'nav-contact': 'Contact',
    // Home
    'home-label': 'Développeur Full-Stack',
    'home-name-first': 'Firas',
    'home-name-second': 'Nouira',
    'home-bio': 'Je construis des applications web de bout en bout — code propre, architecture solide, interfaces qui fonctionnent. Basé à Tunis, ouvert aux opportunités à distance.',
    'home-cta-projects': 'Voir Projets',
    'home-cta-contact': 'Contact',
    // Experience
    'exp-title': 'Expérience',
    'exp-role-1': 'Développeur Full-Stack',
    'exp-desc-1': 'Création d\'un MVP pour une plateforme de gestion logistique et de conteneurs pour le suivi et la gestion des opérations et données logistiques.',
    // Projects
    'proj-title': 'Projets',
    'proj-featured': 'En vedette',
    'proj-1-name': 'Plateforme de Logistique\nde Conteneurs Intelligente',
    'proj-1-desc': 'Système de logistique maritime de bout en bout construit pour CTN. Couvre la création d\'expéditions, l\'empaquetage 3D automatisé, la recherche de chemins multi-ports, le suivi des navires en temps réel via AIS et un tableau de bord d\'opérateurs basé sur les rôles.',
    'proj-2-name': 'Détecteur de Nids-de-Poule',
    'proj-2-desc': 'Système de détection et de signalement des défauts de route alimenté par l\'IA. Détecte les nids-de-poule à partir d\'entrées d\'image, vidéo ou webcam, les épingle sur une carte partagée et prend en charge les signalements des citoyens avec des mises à jour de carte en temps réel.',
    // Buttons
    'btn-details': 'Voir les détails ↗',
    'btn-demo': 'Démo en direct ↗',
    // Modal
    'modal-featured': 'Projet en vedette',
    'modal-title-1': 'Plateforme de Logistique de Conteneurs Intelligente',
    'modal-about-title': 'À propos du projet',
    'modal-about-1': 'CTN est une compagnie maritime tunisienne publique gérant environ 100 000 unités de transport annuellement. Ses opérations d\'expédition de conteneurs étaient entièrement gérées par des processus manuels et informels — les clients soumettaient des demandes par des canaux ponctuels, les agents sélectionnaient manuellement les voyages et assignaient les conteneurs selon l\'expérience.',
    'modal-about-2': 'Cette plateforme numérise et optimise ce flux de travail entier : de la demande d\'expédition au suivi des navires en temps réel, avec optimisation automatique de l\'espace des conteneurs et planification d\'itinéraires intelligents intégrées.',
    'modal-features-title': 'Caractéristiques principales',
    // Skills
    'skills-title': 'Compétences',
    'skill-frontend': 'Frontend',
    'skill-backend': 'Backend',
    'skill-devops': 'DevOps & Outils',
    'skill-education': 'Formation',
    'edu-degree': 'Licence en Informatique',
    'edu-school': 'Université de Monastir',
    // Contact
    'contact-title': 'Contact',
    'contact-email-label': 'E-mail',
    'contact-linkedin-label': 'LinkedIn',
    'contact-github-label': 'GitHub',
  },
  de: {
    // Navigation
    'nav-home': 'Startseite',
    'nav-experience': 'Erfahrung',
    'nav-projects': 'Projekte',
    'nav-skills': 'Fähigkeiten',
    'nav-contact': 'Kontakt',
    // Home
    'home-label': 'Full-Stack-Entwickler',
    'home-name-first': 'Firas',
    'home-name-second': 'Nouira',
    'home-bio': 'Ich entwickle End-to-End-Webanwendungen — sauberer Code, solide Architektur, funktionierende Schnittstellen. Basierend in Tunis, offen für Remote-Möglichkeiten.',
    'home-cta-projects': 'Projekte Anzeigen',
    'home-cta-contact': 'Kontakt',
    // Experience
    'exp-title': 'Erfahrung',
    'exp-role-1': 'Full-Stack-Entwickler',
    'exp-desc-1': 'Entwicklung eines MVP für eine Logistik- und Containerverwaltungsplattform zur Verfolgung und Verwaltung von Logistikoperationen und Daten.',
    // Projects
    'proj-title': 'Projekte',
    'proj-featured': 'Präsentiert',
    'proj-1-name': 'Intelligente Container-\nLogistik-Plattform',
    'proj-1-desc': 'End-to-End-System für maritime Logistik für CTN. Umfasst Erstellung von Expeditionen, automatisches 3D-Packverfahren, Multi-Port-Routensuche, Echtzeit-Schiffsverfolgung via AIS und rollenbasiertes Operatoren-Dashboard.',
    'proj-2-name': 'Pothole Detektor',
    'proj-2-desc': 'KI-gestütztes System zur Erkennung und Meldung von Straßenschäden. Erkennt Schlaglöcher aus Bildern, Videos oder Webcam-Eingaben, markiert sie auf einer gemeinsamen Karte und unterstützt Bürger bei Meldungen mit Live-Kartenaktualisierungen.',
    // Buttons
    'btn-details': 'Details ansehen ↗',
    'btn-demo': 'Live-Demo ↗',
    // Modal
    'modal-featured': 'Präsentiertes Projekt',
    'modal-title-1': 'Intelligente Container-Logistik-Plattform',
    'modal-about-title': 'Über das Projekt',
    'modal-about-1': 'CTN ist eine staatliche tunesische Reederei, die jährlich etwa 100.000 Transporteinheiten handhabt. Ihre Containerschiffoperationen wurden vollständig durch manuelle, informelle Prozesse verwaltet — Kunden reichten Anfragen über Ad-hoc-Kanäle ein, Agenten wählten manuell Fahrten aus und wiesen Container basierend auf Erfahrung zu.',
    'modal-about-2': 'Diese Plattform digitalisiert und optimiert diesen gesamten Workflow: von der Expeditionsanfrage bis zur Echtzeit-Schiffsverfolgung mit automatischer Containerspeicheroptimierung und intelligenter Routenplanung.',
    'modal-features-title': 'Hauptmerkmale',
    // Skills
    'skills-title': 'Fähigkeiten',
    'skill-frontend': 'Frontend',
    'skill-backend': 'Backend',
    'skill-devops': 'DevOps & Tools',
    'skill-education': 'Ausbildung',
    'edu-degree': 'B.Sc. Informatik',
    'edu-school': 'Universität Monastir',
    // Contact
    'contact-title': 'Kontakt',
    'contact-email-label': 'E-Mail',
    'contact-linkedin-label': 'LinkedIn',
    'contact-github-label': 'GitHub',
  }
};

// Initialize language on page load
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

// Initialize on page load
initLanguage();
// ---- TECH BADGE RENDERER ----
// Single source of truth for all technology icons.
// Usage in HTML: <div class="tags" data-techs="Angular,Docker,MongoDB"></div>
const TECH_DEFS = {
  'Angular':     { shape: 'circle', fill: '#DD0031', textFill: '#fff', label: 'A',    fontSize: 11 },
  'Express.js':  { shape: 'circle', fill: '#000',    textFill: '#fff', label: 'ex',   fontSize: 9  },
  'MongoDB':     { shape: 'circle', fill: '#47A248', textFill: '#fff', label: 'DB',   fontSize: 10 },
  'Three.js':    { shape: 'circle', fill: '#F7A400', textFill: '#fff', label: '3',    fontSize: 11 },
  'Python':      { shape: 'circle', fill: '#3776AB', textFill: '#fff', label: 'Py',   fontSize: 10 },
  'YOLOv8':      { shape: 'circle', fill: '#FFB300', textFill: '#000', label: 'YOLO', fontSize: 10 },
  'Docker':      { shape: 'rect',   fill: '#2496ED', textFill: '#fff', label: 'D',    fontSize: 10 },
  'TypeScript':  { shape: 'rect',   fill: '#007ACC', textFill: '#fff', label: 'TS',   fontSize: 10, rx: 2, y: 4, h: 16 },
  'React':       { shape: 'rect',   fill: '#61DAFB', textFill: '#000', label: 'R',    fontSize: 10 },
  'Flask':       { shape: 'rect',   fill: '#005A9C', textFill: '#fff', label: 'Fl',   fontSize: 10, rx: 0, x: 4, y: 4, w: 16, h: 16 },
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

  const slides  = Array.from(carousel.querySelectorAll('.iface-slide'));
  const dots    = Array.from(carousel.querySelectorAll('.iface-dot'));
  const counter = document.getElementById('iface-cur');
  const lbl     = document.getElementById('iface-lbl');
  let current   = 0;

  function goTo(n) {
    slides[current].classList.remove('iface-slide--active');
    dots[current].classList.remove('iface-dot--active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('iface-slide--active');
    dots[current].classList.add('iface-dot--active');
    if (counter) counter.textContent = current + 1;
    if (lbl)     lbl.innerHTML = slides[current].dataset.label || '';
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