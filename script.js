// ============================================
// MOBILE NAV TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const sidebar = document.getElementById('sidebar');

navToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close sidebar on link click (mobile)
document.querySelectorAll('.tree-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// ============================================
// ACTIVE LINK ON SCROLL (scroll-spy)
// ============================================
const sections = document.querySelectorAll('.section');
const treeLinks = document.querySelectorAll('.tree-link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      treeLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(section => spyObserver.observe(section));

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
// Add .reveal to elements we want to animate in
const revealTargets = document.querySelectorAll(
  '.about-text, .about-stats .stat-card, .skill-card, .project-card, ' +
  '.timeline-item, .edu-card, .cert-card, .achievements, .contact-card'
);

revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 6) * 60}ms`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ============================================
// CUSTOM CURSOR (desktop only)
// ============================================
const cursorDot = document.querySelector('.cursor-dot');

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '0.6';
  });
}

// ============================================
// HERO TYPING EFFECT (on the class code block)
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  const codeBlock = document.querySelector('.hero-code');
  if (!codeBlock) return;

  const fullHTML = codeBlock.innerHTML;
  const fullText = codeBlock.textContent;

  // Build a sequence of "reveal up to character N" snapshots using the
  // original HTML so syntax-highlight spans remain intact.
  codeBlock.style.opacity = '0';

  requestAnimationFrame(() => {
    codeBlock.style.transition = 'opacity 0.4s ease';
    codeBlock.style.opacity = '1';
  });

  // (Full typing char-by-char with HTML is complex/fragile; instead we do
  // a simple fade-in + cursor blink for a clean "loaded" feel.)
  const cursor = document.createElement('span');
  cursor.textContent = '▌';
  cursor.style.color = 'var(--accent)';
  cursor.style.animation = 'blink 1s step-end infinite';
  codeBlock.appendChild(cursor);

  const style = document.createElement('style');
  style.textContent = `@keyframes blink { 50% { opacity: 0; } }`;
  document.head.appendChild(style);

  setTimeout(() => cursor.remove(), 4000);
});
