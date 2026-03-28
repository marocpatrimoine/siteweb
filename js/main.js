/* ============================================
   MAROC PATRIMOINE - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initScrollEffects();
  initScrollReveal();
  initCounters();
  initFAQ();
  initMobileMenu();
});

/* ---------- Navigation ---------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const mobileCta = document.getElementById('mobileCta');
  const scrollProgress = document.getElementById('scrollProgress');
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Navbar background
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (currentScroll > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
    
    // Mobile CTA
    if (mobileCta && currentScroll > 800) {
      mobileCta.classList.add('visible');
    } else if (mobileCta) {
      mobileCta.classList.remove('visible');
    }
    
    // Scroll progress bar
    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (currentScroll / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    }
    
    lastScroll = currentScroll;
  });
  
  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        
        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ---------- Scroll Effects ---------- */
function initScrollEffects() {
  // Parallax effect for hero particles
  const particles = document.querySelector('.particles');
  
  if (particles) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      particles.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
  }
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }
  
  // Initial check
  checkReveal();
  
  // Check on scroll
  window.addEventListener('scroll', checkReveal);
}

/* ---------- Animated Counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

function animateCounter(element, target) {
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

/* ---------- FAQ Accordion ---------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ---------- Utility Functions ---------- */
function debounce(func, wait = 20) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit = 100) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
