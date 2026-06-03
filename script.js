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

// ---- INIT ----
window.addEventListener('scroll', () => {
  updateNav();
  revealOnScroll();
}, { passive: true });

// Trigger on load
updateNav();
revealOnScroll();