/* ============================================================
   BizCatalyst – Main JavaScript
   Handles: navbar scroll, mobile menu, scroll reveals,
   counter animation, testimonial carousel
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Inject & Initialize Local AI Assistant ----------
  injectAIAssistant();

  async function injectAIAssistant() {
    const isSubPage = window.location.pathname.includes('/pages/');
    const basePath = isSubPage ? '../' : './';

    try {
      const response = await fetch(`${basePath}components/ai-assistant.html`);
      if (!response.ok) return;
      const html = await response.text();
      
      const div = document.createElement('div');
      div.innerHTML = html;
      document.body.appendChild(div.firstElementChild);

      // Dynamically load the RAG engine script
      const script = document.createElement('script');
      script.type = 'module';
      script.src = `${basePath}js/local-ai-rag.js`;
      document.body.appendChild(script);
    } catch (err) {
      console.error('Failed to inject AI assistant:', err);
    }
  }

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ---------- Mobile Menu Toggle ----------
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Animate hamburger to X
      mobileToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // ---------- Smooth Scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Scroll Reveal Animation ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation slightly for multiple items
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Counter Animation ----------
  const counters = document.querySelectorAll('.hero-stat .number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();
    const suffix = target >= 1000 ? '+' : target === 98 ? '%' : target === 24 ? '/7' : '+';

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      if (target >= 1000) {
        el.textContent = current.toLocaleString() + '+';
      } else if (target === 98) {
        el.textContent = current + '%';
      } else if (target === 24) {
        el.textContent = current + '/7';
      } else {
        el.textContent = current + '+';
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ---------- Testimonial Carousel ----------
  const track = document.getElementById('testimonialsTrack');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentTestimonial = 0;
  let autoPlayInterval;

  function goToTestimonial(index) {
    if (!track) return;
    const cards = track.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;

    currentTestimonial = index;
    const cardWidth = cards[0].offsetWidth + 24; // gap
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      goToTestimonial(index);
      resetAutoPlay();
    });
  });

  function autoPlay() {
    autoPlayInterval = setInterval(() => {
      const next = (currentTestimonial + 1) % dots.length;
      goToTestimonial(next);
    }, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlay();
  }

  autoPlay();

  // ---------- Parallax subtle effect on hero orbs ----------
  window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.hero-orb');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 8;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // ---------- Catalog Card Tilt Effect ----------
  document.querySelectorAll('.catalog-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

});
