// =============================================
// PRELOADER
// =============================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 700);
    }
    initCounters();
  }, 1800);
});

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =============================================
// MOBILE HAMBURGER MENU
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =============================================
// PARTICLES
// =============================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 18;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(particle);
  }
}
createParticles();

// =============================================
// COUNTER ANIMATION
// =============================================
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    animateCounter(counter, target);
  });
}

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================
const revealElements = document.querySelectorAll(
  '.about-grid, .service-card, .why-feature, .testimonial-card, .contact-grid, .section-header, .istanbul-card, .credential-item, .contact-detail-item'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// =============================================
// TESTIMONIALS SLIDER
// =============================================
const track = document.getElementById('testimonialsTrack');
const cards = track ? Array.from(track.children) : [];
const dotsContainer = document.getElementById('tDots');
const prevBtn = document.getElementById('tPrev');
const nextBtn = document.getElementById('tNext');

let currentSlide = 0;
let slidesPerView = window.innerWidth < 900 ? 1 : 2;
const totalSlides = cards.length;
let maxSlide = totalSlides - slidesPerView;

function updateSlider() {
  slidesPerView = window.innerWidth < 900 ? 1 : 2;
  maxSlide = Math.max(0, totalSlides - slidesPerView);
  currentSlide = Math.min(currentSlide, maxSlide);

  const cardWidth = track.parentElement.offsetWidth;
  const gap = 28;
  const slideWidth = (cardWidth - (slidesPerView - 1) * gap) / slidesPerView;

  cards.forEach(card => {
    card.style.minWidth = slideWidth + 'px';
  });

  const offset = currentSlide * (slideWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;
  updateDots();
}

function updateDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  const dotCount = maxSlide + 1;
  for (let i = 0; i <= maxSlide; i++) {
    const dot = document.createElement('button');
    dot.className = `t-dot ${i === currentSlide ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  }
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : maxSlide;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = currentSlide < maxSlide ? currentSlide + 1 : 0;
    updateSlider();
  });
}

// Auto-advance slider
let sliderInterval = setInterval(() => {
  currentSlide = currentSlide < maxSlide ? currentSlide + 1 : 0;
  updateSlider();
}, 5000);

track?.parentElement?.addEventListener('mouseenter', () => clearInterval(sliderInterval));
track?.parentElement?.addEventListener('mouseleave', () => {
  sliderInterval = setInterval(() => {
    currentSlide = currentSlide < maxSlide ? currentSlide + 1 : 0;
    updateSlider();
  }, 5000);
});

window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);
updateSlider();

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const emailVal = document.getElementById('email').value.trim();

    if (!firstName || !emailVal) {
      // Basic validation shake
      contactForm.querySelectorAll('input:invalid, input:placeholder-shown[required]').forEach(input => {
        input.style.borderColor = '#e05252';
        setTimeout(() => input.style.borderColor = '', 2000);
      });
      return;
    }

    // Simulate form submission
    const submitBtn = document.getElementById('submitFormBtn');
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');
    }, 1500);
  });
}

// =============================================
// ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link:not(.nav-cta)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.classList.toggle('active-nav', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(section => sectionObserver.observe(section));

// =============================================
// PROCEDURES MODAL LOGIC
// =============================================
const procedureData = {
  'rhinoplasty': {
    title: 'Rhinoplasty',
    category: 'Facial Aesthetics',
    image: 'images/rhinoplasty_img_1787147162455.png',
    description: `
      <p>Rhinoplasty, or a nose job, reshapes the nose to improve its appearance and proportion, or to correct breathing problems. Istanbul is world-renowned for advanced rhinoplasty techniques, particularly the ultrasonic (piezo) method which minimizes bruising and swelling.</p>
      <ul>
        <li><strong>Duration:</strong> 2 - 3 hours</li>
        <li><strong>Hospital Stay:</strong> 1 night</li>
        <li><strong>Recovery Time:</strong> 7 - 10 days in Istanbul</li>
        <li><strong>Results:</strong> Permanent</li>
      </ul>
      <p>Our affiliated master surgeons perform comprehensive facial analysis to ensure your new nose harmonizes perfectly with your natural features.</p>
    `
  },
  'facelift': {
    title: 'Face Lift',
    category: 'Facial Aesthetics',
    image: 'images/facelift_img_1787147174060.png',
    description: `
      <p>A facelift (rhytidectomy) is a surgical procedure that improves visible signs of aging in the face and neck. It addresses sagging skin, deep folds, and jowls to restore a youthful, rested appearance.</p>
      <ul>
        <li><strong>Duration:</strong> 3 - 5 hours</li>
        <li><strong>Hospital Stay:</strong> 1 - 2 nights</li>
        <li><strong>Recovery Time:</strong> 10 - 14 days in Istanbul</li>
        <li><strong>Results:</strong> Long-lasting (10+ years)</li>
      </ul>
      <p>Using modern deep-plane techniques, our surgeons deliver natural-looking results without the "pulled" look of older methods.</p>
    `
  },
  'breast-aug': {
    title: 'Breast Augmentation',
    category: 'Breast Procedures',
    image: 'images/breast_aug_img_1787147201673.png',
    description: `
      <p>Breast augmentation uses implants or fat transfer to increase the size, improve the shape, and enhance the fullness of the breasts. It is one of the most highly requested procedures we coordinate.</p>
      <ul>
        <li><strong>Duration:</strong> 1 - 2 hours</li>
        <li><strong>Hospital Stay:</strong> 1 night</li>
        <li><strong>Recovery Time:</strong> 5 - 7 days in Istanbul</li>
        <li><strong>Implants:</strong> FDA-approved premium silicone brands</li>
      </ul>
      <p>During your consultation, you will be guided through implant shapes (teardrop vs. round) and profiles to achieve your exact desired aesthetic.</p>
    `
  },
  'tummytuck': {
    title: 'Tummy Tuck',
    category: 'Body Contouring',
    image: 'images/tummy_tuck_img_1787147252940.png',
    description: `
      <p>A tummy tuck (abdominoplasty) removes excess fat and skin and restores weakened muscles to create a smoother, firmer abdominal profile. It is often combined with liposuction.</p>
      <ul>
        <li><strong>Duration:</strong> 2 - 4 hours</li>
        <li><strong>Hospital Stay:</strong> 1 - 2 nights</li>
        <li><strong>Recovery Time:</strong> 10 - 14 days in Istanbul</li>
        <li><strong>Ideal for:</strong> Post-pregnancy or massive weight loss</li>
      </ul>
      <p>We ensure you are matched with specialists who excel in achieving a natural-looking belly button and well-hidden incisions.</p>
    `
  },
  'liposuction': {
    title: 'Liposuction',
    category: 'Body Contouring',
    image: 'images/liposuction_img_1787147271360.png',
    description: `
      <p>Liposuction slims and reshapes specific areas of the body by removing excess fat deposits and improving your body contours and proportion. Advanced VASER techniques are commonly utilized.</p>
      <ul>
        <li><strong>Duration:</strong> 1 - 3 hours (depending on areas)</li>
        <li><strong>Hospital Stay:</strong> Usually 1 night</li>
        <li><strong>Recovery Time:</strong> 5 - 7 days in Istanbul</li>
        <li><strong>Areas:</strong> Abdomen, flanks, thighs, arms, chin</li>
      </ul>
      <p>VASER liposuction allows for high-definition sculpting, revealing muscle definition while minimizing trauma to surrounding tissues.</p>
    `
  },
  'gastric-sleeve': {
    title: 'Gastric Sleeve',
    category: 'Bariatric Surgery',
    image: 'images/gastric_sleeve_img_1787147283435.png',
    description: `
      <p>Sleeve gastrectomy is a weight-loss surgery where a large portion of the stomach is removed, leaving a tube-like structure. It significantly limits food intake and reduces hunger hormones.</p>
      <ul>
        <li><strong>Duration:</strong> 1 - 2 hours (Laparoscopic)</li>
        <li><strong>Hospital Stay:</strong> 2 - 3 nights</li>
        <li><strong>Recovery Time:</strong> 5 - 7 days in Istanbul</li>
        <li><strong>Expected Weight Loss:</strong> 60-70% of excess body weight</li>
      </ul>
      <p>Our partner bariatric centers provide comprehensive preoperative testing and postoperative nutritional guidance to ensure your long-term success.</p>
    `
  }
};

const procCards = document.querySelectorAll('.proc-card');
const procModal = document.getElementById('procModal');
const procModalOverlay = document.getElementById('procModalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalCta = document.getElementById('modalCta');

const modalImg = document.getElementById('modalImg');
const modalCat = document.getElementById('modalCat');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

function openModal(procId) {
  const data = procedureData[procId];
  if (!data) return;

  modalImg.src = data.image;
  modalImg.alt = data.title;
  modalCat.textContent = data.category;
  modalTitle.textContent = data.title;
  modalDesc.innerHTML = data.description;

  procModal.classList.add('open');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
  procModal.classList.remove('open');
  document.body.style.overflow = '';
}

procCards.forEach(card => {
  card.addEventListener('click', () => {
    const procId = card.getAttribute('data-procedure');
    openModal(procId);
  });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}
if (procModalOverlay) {
  procModalOverlay.addEventListener('click', closeModal);
}
if (modalCta) {
  modalCta.addEventListener('click', closeModal); // Close modal when navigating to contact
}
