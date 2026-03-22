/**
 * Sheikh Abir Ali Portfolio
 * Main JavaScript File
 * Production-ready, Chrome Web Store Compliant
 */

(function() {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initCounterAnimation();
    initFormHandling();
    initParallax();
  }

  // Navbar Scroll Effect
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      // Add scrolled class for styling
      if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // Mobile Menu
  function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const menuLinks = document.querySelectorAll('.mobile-nav-links a');

    if (!menuBtn || !menu) return;

    // Open menu
    menuBtn.addEventListener('click', function() {
      menu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Close menu
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close on link click
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Scroll Reveal Animation
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    if (reveals.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    reveals.forEach(function(element) {
      observer.observe(element);
    });
  }

  // Smooth Scroll for Anchor Links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const navHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Counter Animation
  function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');

    if (counters.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(function(counter) {
      observer.observe(counter);
    });
  }

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'), 10);
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(start + (target - start) * easeOut);
      element.textContent = current + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Form Handling
  function initFormHandling() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = form.querySelector('.form-submit');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual endpoint)
      setTimeout(function() {
        // Show success message
        showFormSuccess(form);
        
        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  function showFormSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = '✓ Message sent successfully! I\'ll get back to you soon.';
    successMessage.style.cssText = `
      padding: 16px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid #10B981;
      border-radius: 8px;
      color: #10B981;
      margin-bottom: 20px;
      text-align: center;
    `;

    form.insertBefore(successMessage, form.firstChild);

    // Remove after 5 seconds
    setTimeout(function() {
      successMessage.remove();
    }, 5000);
  }

  // Parallax Effect (Subtle)
  function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    if (shapes.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const scrolled = window.pageYOffset;
          
          shapes.forEach(function(shape, index) {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    }, { passive: true });
  }

  // Utility: Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Utility: Throttle function
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    };
  }

})();
