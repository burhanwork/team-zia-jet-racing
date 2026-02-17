// ============================================
// TEAM ZIA JET RACING — Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ========== GSAP FALLBACK ==========
  // If GSAP/ScrollTrigger fail to animate elements within 4s, force them visible
  setTimeout(() => {
    const hidden = document.querySelectorAll('.animate-in, .animate-left, .animate-right, .animate-scale, .animate-wipe');
    const hasHidden = Array.from(hidden).some(el => getComputedStyle(el).opacity === '0');
    if (hasHidden) {
      document.body.classList.add('gsap-fallback');
    }
  }, 4000);

  // ========== NAVBAR SCROLL BEHAVIOR ==========
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ========== MOBILE MENU TOGGLE ==========
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ========== BACK TO TOP BUTTON ==========
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
        backToTop.classList.add('opacity-100');
      } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none');
        backToTop.classList.remove('opacity-100');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== ACTIVE NAV LINK ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========== LOADING SCREEN ==========
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    if (sessionStorage.getItem('zia-visited')) {
      loadingScreen.style.display = 'none';
    } else {
      sessionStorage.setItem('zia-visited', 'true');
      const loadLogo = loadingScreen.querySelector('.loading-logo');

      if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline();
        if (loadLogo) {
          tl.from(loadLogo, { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' });
        }

        const dismissLoading = () => {
          gsap.to(loadingScreen, {
            y: '-100%',
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => {
              loadingScreen.style.display = 'none';
            }
          });
        };

        window.addEventListener('load', () => {
          setTimeout(dismissLoading, 1500);
        });

        // Fallback in case load already fired
        setTimeout(dismissLoading, 3000);
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 1500);
        });
      }
    }
  }

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

});
