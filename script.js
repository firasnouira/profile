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