// ============================================
// TEAM ZIA JET RACING — GSAP Animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const isMobile = window.innerWidth < 768;
  const distance = isMobile ? 30 : 60;

  // ========== STANDARD FADE IN UP ==========
  gsap.utils.toArray('.animate-in').forEach(el => {
    gsap.from(el, {
      y: distance,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ========== SLIDE FROM LEFT ==========
  gsap.utils.toArray('.animate-left').forEach(el => {
    gsap.from(el, {
      x: -distance,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ========== SLIDE FROM RIGHT ==========
  gsap.utils.toArray('.animate-right').forEach(el => {
    gsap.from(el, {
      x: distance,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ========== SCALE IN ==========
  gsap.utils.toArray('.animate-scale').forEach(el => {
    gsap.from(el, {
      scale: 0.85,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ========== STAGGER CHILDREN ==========
  gsap.utils.toArray('.animate-stagger').forEach(parent => {
    const children = parent.children;
    gsap.from(children, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ========== IMAGE WIPE REVEAL ==========
  gsap.utils.toArray('.animate-wipe').forEach(el => {
    gsap.from(el, {
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ========== PARALLAX ==========
  if (!isMobile) {
    gsap.utils.toArray('.parallax').forEach(el => {
      gsap.to(el, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  // ========== HERO ENTRANCE (Homepage) ==========
  const heroTimeline = document.querySelector('.hero-content');
  if (heroTimeline) {
    const tl = gsap.timeline({ delay: 0.3 });
    const heroLogo = heroTimeline.querySelector('.hero-logo');
    const heroTitle = heroTimeline.querySelector('.hero-title');
    const heroSubtitle = heroTimeline.querySelector('.hero-subtitle');
    const heroTagline = heroTimeline.querySelector('.hero-tagline');
    const heroButtons = heroTimeline.querySelector('.hero-buttons');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (heroLogo) tl.from(heroLogo, { scale: 0.5, opacity: 0, duration: 1, ease: 'back.out(1.7)' });
    if (heroTitle) tl.from(heroTitle, { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
    if (heroSubtitle) tl.from(heroSubtitle, { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
    if (heroTagline) tl.from(heroTagline, { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');
    if (heroButtons) tl.from(heroButtons, { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
    if (scrollIndicator) tl.from(scrollIndicator, { opacity: 0, duration: 0.8 }, '-=0.1');
  }

  // ========== INNER PAGE HERO ==========
  const pageHero = document.querySelector('.page-hero-content');
  if (pageHero) {
    const tl = gsap.timeline({ delay: 0.2 });
    const breadcrumb = pageHero.querySelector('.breadcrumb');
    const pageTitle = pageHero.querySelector('.page-title');
    const pageSub = pageHero.querySelector('.page-subtitle');

    if (breadcrumb) tl.from(breadcrumb, { opacity: 0, duration: 0.5 });
    if (pageTitle) tl.from(pageTitle, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2');
    if (pageSub) tl.from(pageSub, { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
  }
});
