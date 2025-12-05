// ==========================================
// PROJECT FILTER FUNCTIONALITY
// ==========================================

let activeFilter = 'all';

function filterProjects(category) {
  const cards = document.querySelectorAll('.project-card');
  const buttons = document.querySelectorAll('.filters button');

  // Update active filter
  activeFilter = category;

  // Update button states
  buttons.forEach(button => {
    button.classList.remove('active');
    if (button.textContent.toLowerCase().includes(category) ||
      (category === 'all' && button.textContent === 'All')) {
      button.classList.add('active');
    }
  });

  // Filter cards with animation
  cards.forEach((card, index) => {
    const shouldShow = category === 'all' || card.classList.contains(category);

    if (shouldShow) {
      setTimeout(() => {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      }, index * 100);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

// ==========================================
// MOBILE MENU & NAVIGATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('close-btn');
  const header = document.querySelector('header');

  // Mobile menu controls
  const closeMenu = () => {
    mobileMenu.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    mobileMenu.classList.add('show');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  hamburger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  // Close menu when clicking links
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Header scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Initialize project cards animation
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });

  // Set initial active filter button
  const firstFilterButton = document.querySelector('.filters button');
  if (firstFilterButton) {
    firstFilterButton.classList.add('active');
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopBtn = document.getElementById('backToTopBtn');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Scroll to top function
function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe content sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.content');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
  });
});

// ==========================================
// STATISTICS COUNTER ANIMATION
// ==========================================

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60 FPS
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
      });
      // Unobserve after animation starts
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };

      // Simple validation
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showFormStatus('Please fill in all required fields.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate form submission (you can replace this with actual email service)
      // For now, we'll just show a success message
      showFormStatus('Thank you for your message! I will get back to you soon.', 'success');

      // Reset form
      contactForm.reset();

      // TODO: Integrate with EmailJS or your preferred email service
      // Example with EmailJS:
      // emailjs.send("service_id", "template_id", formData)
      //   .then(() => {
      //     showFormStatus('Thank you for your message! I will get back to you soon.', 'success');
      //     contactForm.reset();
      //   })
      //   .catch(() => {
      //     showFormStatus('Oops! Something went wrong. Please try again.', 'error');
      //   });
    });
  }

  function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;

    // Hide success message after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        formStatus.className = 'form-status';
      }, 5000);
    }
  }
});
