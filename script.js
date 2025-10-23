document.addEventListener('DOMContentLoaded', function () {
  // Initialize all functionality
  initTypingEffect();
  initMobileNavigation();
  initSmoothScrolling();
  initScrollAnimations();
  initStickyHeader();
  initContactForm();
  initCurrentYear();
  initSkillBars();
});

// Typing effect with enhanced features
function initTypingEffect() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;

  const roles = [
    "AI Software Engineer ",
    "Automation Specialist ",
    "Full-Stack Developer ",
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    if (isPaused) return;

    const currentRole = roles[roleIndex];
    
    if (!isDeleting) {
      // Typing forward
      typingText.innerHTML = currentRole.slice(0, charIndex) + '<span class="cursor">|</span>';
      charIndex++;
      
      if (charIndex > currentRole.length) {
        isDeleting = true;
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          setTimeout(type, 100);
        }, 2000);
        return;
      }
    } else {
      // Deleting
      typingText.innerHTML = currentRole.slice(0, charIndex) + '<span class="cursor">|</span>';
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          setTimeout(type, 500);
        }, 500);
        return;
      }
    }
    
    const speed = isDeleting ? 50 : 100;
    const randomVariation = Math.random() * 20 - 10; // Add natural typing variation
    setTimeout(type, speed + randomVariation);
  }

  // Start typing effect after a brief delay
  setTimeout(type, 1000);
}

// Mobile navigation with enhanced functionality
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('show');
    toggleBtn.classList.toggle('active');
    
    // Animate hamburger icon
    const icon = toggleBtn.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });

  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
      toggleBtn.classList.remove('active');
      const icon = toggleBtn.querySelector('i');
      icon.classList.replace('fa-times', 'fa-bars');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
      nav.classList.remove('show');
      toggleBtn.classList.remove('active');
      const icon = toggleBtn.querySelector('i');
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav.classList.remove('show');
      toggleBtn.classList.remove('active');
      const icon = toggleBtn.querySelector('i');
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });
}

// Smooth scrolling with offset for fixed header
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update active nav link
      updateActiveNavLink(targetId);
    });
  });
}

// Update active navigation link based on scroll position
function updateActiveNavLink(targetId) {
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === targetId) {
      link.classList.add('active');
    }
  });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
  const sections = document.querySelectorAll('.section');
  const projectCards = document.querySelectorAll('.project-card');
  const skillItems = document.querySelectorAll('.skills-grid > div');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add staggered animations for project cards
        if (entry.target.id === 'projects') {
          projectCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('fade-in');
            }, index * 150);
          });
        }
        
        // Add staggered animations for skill items
        if (entry.target.id === 'skills') {
          skillItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('fade-in');
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

// Sticky header with scroll effects
function initStickyHeader() {
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class based on scroll position
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;

    // Update active nav link based on scroll position
    updateActiveNavOnScroll();
  });
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('.section');
  const headerHeight = document.querySelector('header').offsetHeight;
  const scrollPosition = window.scrollY + headerHeight + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      updateActiveNavLink('#' + sectionId);
    }
  });
}

// Enhanced contact form with validation
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const inputs = form.querySelectorAll('input, textarea');
  
  // Add floating label functionality
  inputs.forEach(input => {
    // Create and insert label
    const label = document.createElement('label');
    label.textContent = input.getAttribute('placeholder');
    label.htmlFor = input.id;
    input.parentNode.insertBefore(label, input);
    input.removeAttribute('placeholder');

    // Handle focus events
    input.addEventListener('focus', () => {
      label.classList.add('active');
      input.parentNode.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      if (!input.value) {
        label.classList.remove('active');
      }
      input.parentNode.classList.remove('focused');
    });

    // Check initial value
    if (input.value) {
      label.classList.add('active');
    }
  });

  // Form submission
  // Form submission (real Formspree request)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Validate form
  if (!validateForm(form)) {
    showNotification('Please fill all required fields correctly.', 'error');
    return;
  }

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();

      // Reset floating labels
      inputs.forEach(input => {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
          label.classList.remove('active');
        }
      });
    } else {
      showNotification('Something went wrong. Please try again later.', 'error');
    }
  } catch (error) {
    showNotification('Network error. Please try again.', 'error');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

}

// Form validation
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ef4444';
      isValid = false;
      
      // Remove error style on input
      input.addEventListener('input', () => {
        input.style.borderColor = '';
      }, { once: true });
    }
  });

  // Email validation
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput && emailInput.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailInput.style.borderColor = '#ef4444';
      isValid = false;
      
      emailInput.addEventListener('input', () => {
        emailInput.style.borderColor = '';
      }, { once: true });
    }
  }

  return isValid;
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 400px;
    animation: slideInRight 0.3s ease-out;
  `;

  // Close button styles
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  document.body.appendChild(notification);

  // Close functionality
  closeBtn.addEventListener('click', () => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => notification.remove(), 300);
  });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add CSS for notifications
const notificationStyles = `
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-group label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #6b7280;
  transition: all 0.3s ease;
  pointer-events: none;
  background: white;
  padding: 0 0.5rem;
}

.form-group label.active {
  top: -0.5rem;
  left: 0.8rem;
  font-size: 0.8rem;
  color: #2563eb;
}

.form-group.focused label {
  color: #2563eb;
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Skill bars animation (optional enhancement)
function initSkillBars() {
  // This can be enhanced to show skill levels with animated bars
  console.log('Skill bars initialized - ready for enhancement');
}

// Set current year in footer
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Add some performance optimizations
window.addEventListener('load', () => {
  // Preload critical images
  const criticalImages = document.querySelectorAll('img[loading="lazy"]');
  criticalImages.forEach(img => {
    img.loading = 'eager';
  });
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden, can pause non-essential animations
  } else {
    // Page is visible again
  }
});