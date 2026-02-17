// ============================================
// TEAM ZIA JET RACING — Custom Cursor (Desktop Only)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.style.cursor = 'none';

  // Add cursor:none to all interactive elements
  const style = document.createElement('style');
  style.textContent = 'a,button,input,textarea,select,.cursor-hover{cursor:none !important;}';
  document.head.appendChild(style);

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  // Smooth follow for ring using GSAP if available
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add(() => {
      gsap.to(ring, {
        x: mouseX - 16,
        y: mouseY - 16,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true
      });
    });
  } else {
    document.addEventListener('mousemove', () => {
      ring.style.transform = `translate(${mouseX - 16}px, ${mouseY - 16}px)`;
    });
  }

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, input, textarea, select, .cursor-hover, [role="button"]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove('hover');
    }
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
});
