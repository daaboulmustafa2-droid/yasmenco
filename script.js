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
// DARK MODE TOGGLE
// =============================================
(function () {
  const btn = document.getElementById('darkModeToggle');
  const body = document.body;

  // Apply saved preference immediately (before first paint)
  const saved = localStorage.getItem('yasminaTheme');
  if (saved === 'dark') {
    body.classList.add('dark-mode');
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-mode');
      localStorage.setItem('yasminaTheme', isDark ? 'dark' : 'light');
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    });
    // Set initial aria state
    btn.setAttribute('aria-pressed', body.classList.contains('dark-mode') ? 'true' : 'false');
  }
})();


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
// CONTACT FORM & GOOGLE SHEETS LEADS INTEGRATION
// =============================================
// Paste your Google Apps Script Web App URL below after completing setup:
const GOOGLE_SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyvUQR6WpxAOcOnp1DNg1etr65bwlMbCxlPW5_9AkIzrcikMYTng5bit1VuO9Ccnh9jOA/exec';

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const emailVal = document.getElementById('email').value.trim();
    const phoneVal = document.getElementById('phone')?.value.trim() || '';
    const procedureVal = document.getElementById('procedure')?.value || '';
    const messageVal = document.getElementById('message')?.value.trim() || '';

    if (!firstName || !lastName || !emailVal) {
      contactForm.querySelectorAll('input:invalid, input[required]:placeholder-shown').forEach(input => {
        input.style.borderColor = '#e05252';
        setTimeout(() => input.style.borderColor = '', 2500);
      });
      return;
    }

    const submitBtn = document.getElementById('submitFormBtn');
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    const leadData = {
      timestamp: new Date().toLocaleString('en-US', { timeZoneName: 'short' }),
      firstName,
      lastName,
      email: emailVal,
      phone: phoneVal,
      procedure: procedureVal,
      message: messageVal
    };

    if (GOOGLE_SHEET_SCRIPT_URL && GOOGLE_SHEET_SCRIPT_URL.trim() !== '') {
      try {
        await fetch(GOOGLE_SHEET_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData)
        });

        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
      } catch (err) {
        console.error('Error submitting form:', err);
        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
      }
    } else {
      // Demo delay if URL is not configured yet
      setTimeout(() => {
        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
      }, 1200);
    }
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
const procedureTranslations = {
  en: {
    'rhinoplasty': {
      title: 'Rhinoplasty',
      category: 'Facial Aesthetics',
      image: 'images/Perfect Rhinoplasty.jpg',
      description: `
        <p>Rhinoplasty, or a nose job, reshapes the nose to improve its appearance and proportion, or to correct breathing problems. Istanbul is world-renowned for advanced rhinoplasty techniques, particularly the ultrasonic (piezo) method which minimizes bruising and swelling.</p>
        <ul>
          <li><strong>Duration:</strong> 2 - 3 hours</li>
          <li><strong>Hospital Stay:</strong> 1 night</li>
          <li><strong>Recovery Time:</strong> 7 - 10 days</li>
          <li><strong>Results:</strong> Permanent</li>
        </ul>
        <p>Our affiliated master surgeons perform comprehensive facial analysis to ensure your new nose harmonizes perfectly with your natural features.</p>
      `
    },
    'facelift': {
      title: 'Face Lift',
      category: 'Facial Aesthetics',
      image: 'images/Perfect Facelift.webp',
      description: `
        <p>A facelift (rhytidectomy) is a surgical procedure that improves visible signs of aging in the face and neck. It addresses sagging skin, deep folds, and jowls to restore a youthful, rested appearance.</p>
        <ul>
          <li><strong>Duration:</strong> 3 - 5 hours</li>
          <li><strong>Hospital Stay:</strong> 1 - 2 nights</li>
          <li><strong>Recovery Time:</strong> 10 - 14 days</li>
          <li><strong>Results:</strong> Long-lasting (10+ years)</li>
        </ul>
        <p>Using modern deep-plane techniques, our surgeons deliver natural-looking results without the "pulled" look of older methods.</p>
      `
    },
    'breast-aug': {
      title: 'Breast Augmentation',
      category: 'Breast Procedures',
      image: 'images/Perfect Breast augmentation.jpg',
      description: `
        <p>Breast augmentation uses implants or fat transfer to increase the size, improve the shape, and enhance the fullness of the breasts. It is one of the most highly requested procedures we coordinate.</p>
        <ul>
          <li><strong>Duration:</strong> 1 - 2 hours</li>
          <li><strong>Hospital Stay:</strong> 1 night</li>
          <li><strong>Recovery Time:</strong> 5 - 7 days</li>
          <li><strong>Implants:</strong> FDA-approved premium silicone brands</li>
        </ul>
        <p>During your consultation, you will be guided through implant shapes (teardrop vs. round) and profiles to achieve your exact desired aesthetic.</p>
      `
    },
    'tummytuck': {
      title: 'Tummy Tuck',
      category: 'Body Contouring',
      image: 'images/perfect tummy tuck.webp',
      description: `
        <p>A tummy tuck (abdominoplasty) removes excess fat and skin and restores weakened muscles to create a smoother, firmer abdominal profile. It is often combined with liposuction.</p>
        <ul>
          <li><strong>Duration:</strong> 2 - 4 hours</li>
          <li><strong>Hospital Stay:</strong> 1 - 2 nights</li>
          <li><strong>Recovery Time:</strong> 10 - 14 days</li>
          <li><strong>Ideal for:</strong> Post-pregnancy or massive weight loss</li>
        </ul>
        <p>We ensure you are matched with specialists who excel in achieving a natural-looking belly button and well-hidden incisions.</p>
      `
    },
    'liposuction': {
      title: 'Liposuction',
      category: 'Body Contouring',
      image: 'images/perfect liposuction.webp',
      description: `
        <p>Liposuction slims and reshapes specific areas of the body by removing excess fat deposits and improving your body contours and proportion. Advanced VASER techniques are commonly utilized.</p>
        <ul>
          <li><strong>Duration:</strong> 1 - 3 hours (depending on areas)</li>
          <li><strong>Hospital Stay:</strong> Usually 1 night</li>
          <li><strong>Recovery Time:</strong> 5 - 7 days</li>
          <li><strong>Areas:</strong> Abdomen, flanks, thighs, arms, chin</li>
        </ul>
        <p>VASER liposuction allows for high-definition sculpting, revealing muscle definition while minimizing trauma to surrounding tissues.</p>
      `
    },
    'gastric-sleeve': {
      title: 'Gastric Sleeve',
      category: 'Bariatric Surgery',
      image: 'images/perfect gastric_sleeve.png',
      description: `
        <p>Sleeve gastrectomy is a weight-loss surgery where a large portion of the stomach is removed, leaving a tube-like structure. It significantly limits food intake and reduces hunger hormones.</p>
        <ul>
          <li><strong>Duration:</strong> 1 - 2 hours (Laparoscopic)</li>
          <li><strong>Hospital Stay:</strong> 2 - 3 nights</li>
          <li><strong>Recovery Time:</strong> 5 - 7 days</li>
          <li><strong>Expected Weight Loss:</strong> 60-70% of excess body weight</li>
        </ul>
        <p>Our partner bariatric centers provide comprehensive preoperative testing and postoperative nutritional guidance to ensure your long-term success.</p>
      `
    }
  },
  ar: {
    'rhinoplasty': {
      title: 'تجميل الأنف',
      category: 'جماليات الوجه',
      image: 'images/Perfect Rhinoplasty.jpg',
      description: `
        <p>تجميل الأنف (الرينوبلاستي) هو إجراء جراحي يُعيد تشكيل الأنف لتحسين مظهره وتناسقه، أو لتصحيح مشاكل التنفس. تشتهر إسطنبول عالمياً بتقنيات تجميل الأنف المتقدمة، ولا سيما الطريقة بالموجات فوق الصوتية (البيزو) التي تُقلل الكدمات والتورم.</p>
        <ul>
          <li><strong>مدة العملية:</strong> 2 - 3 ساعات</li>
          <li><strong>الإقامة في المستشفى:</strong> ليلة واحدة</li>
          <li><strong>فترة التعافي:</strong> 7 - 10 أيام</li>
          <li><strong>النتائج:</strong> دائمة</li>
        </ul>
        <p>يُجري جراحونا المتخصصون تحليلاً شاملاً للوجه لضمان تناغم الأنف الجديد مع ملامحكِ الطبيعية بشكل مثالي.</p>
      `
    },
    'facelift': {
      title: 'شد الوجه',
      category: 'جماليات الوجه',
      image: 'images/Perfect Facelift.webp',
      description: `
        <p>شد الوجه (الريتيدكتومي) إجراء جراحي يُحسّن علامات الشيخوخة الظاهرة في الوجه والرقبة، ويعالج ترهل الجلد والتجاعيد العميقة ليستعيد مظهراً شاباً ومنتعشاً.</p>
        <ul>
          <li><strong>مدة العملية:</strong> 3 - 5 ساعات</li>
          <li><strong>الإقامة في المستشفى:</strong> 1 - 2 ليالٍ</li>
          <li><strong>فترة التعافي:</strong> 10 - 14 يوماً</li>
          <li><strong>النتائج:</strong> طويلة الأمد (10+ سنوات)</li>
        </ul>
        <p>باستخدام تقنيات الطبقة العميقة الحديثة، يُحقق جراحونا نتائج طبيعية المظهر دون ذلك التعبير المشدود الذي تتركه الأساليب القديمة.</p>
      `
    },
    'breast-aug': {
      title: 'تكبير الثدي',
      category: 'عمليات الثدي',
      image: 'images/Perfect Breast augmentation.jpg',
      description: `
        <p>يستخدم تكبير الثدي الغرسات أو نقل الدهون لزيادة الحجم وتحسين الشكل وتعزيز امتلاء الثدي. وهو من أكثر الإجراءات التي ننسقها طلباً.</p>
        <ul>
          <li><strong>مدة العملية:</strong> 1 - 2 ساعة</li>
          <li><strong>الإقامة في المستشفى:</strong> ليلة واحدة</li>
          <li><strong>فترة التعافي:</strong> 5 - 7 أيام</li>
          <li><strong>الغرسات:</strong> ماركات سيليكون فاخرة معتمدة من FDA</li>
        </ul>
        <p>خلال استشارتكِ، ستُرشَدين في اختيار شكل الغرسة (دموعي أو مستدير) والبروفايل المناسب لتحقيق المظهر الجمالي الذي تريدينه تماماً.</p>
      `
    },
    'tummytuck': {
      title: 'شد البطن',
      category: 'نحت الجسم',
      image: 'images/perfect tummy tuck.webp',
      description: `
        <p>يُزيل شد البطن (الابدومينوبلاستي) الدهون والجلد الزائدَين ويُعيد بناء العضلات الضعيفة لإعطاء محيط البطن مظهراً أكثر نعومةً وشداً. وغالباً ما يُجمَع مع شفط الدهون.</p>
        <ul>
          <li><strong>مدة العملية:</strong> 2 - 4 ساعات</li>
          <li><strong>الإقامة في المستشفى:</strong> 1 - 2 ليالٍ</li>
          <li><strong>فترة التعافي:</strong> 10 - 14 يوماً</li>
          <li><strong>الأنسب لـ:</strong> ما بعد الحمل أو فقدان الوزن الكبير</li>
        </ul>
        <p>نحرص على مطابقتكِ مع متخصصين يتفوقون في تحقيق شكل طبيعي للسرة وإخفاء الشقوق بشكل مثالي.</p>
      `
    },
    'liposuction': {
      title: 'شفط الدهون',
      category: 'نحت الجسم',
      image: 'images/perfect liposuction.webp',
      description: `
        <p>يُنحّف شفط الدهون مناطق محددة من الجسم ويُعيد تشكيلها بإزالة رواسب الدهون الزائدة وتحسين قوام الجسم وتناسقه. تُستخدم تقنيات VASER المتقدمة على نطاق واسع.</p>
        <ul>
          <li><strong>مدة العملية:</strong> 1 - 3 ساعات (حسب المناطق)</li>
          <li><strong>الإقامة في المستشفى:</strong> عادةً ليلة واحدة</li>
          <li><strong>فترة التعافي:</strong> 5 - 7 أيام</li>
          <li><strong>المناطق:</strong> البطن، الخاصرة، الفخذان، الذراعان، الذقن</li>
        </ul>
        <p>يتيح شفط دهون VASER نحتاً عالي الدقة، يكشف عن تحديد العضلات مع تقليل الصدمة للأنسجة المحيطة.</p>
      `
    },
    'gastric-sleeve': {
      title: 'تكميم المعدة',
      category: 'جراحة السمنة',
      image: 'images/perfect gastric_sleeve.png',
      description: `
        <p>تكميم المعدة جراحة لإنقاص الوزن يُزال فيها جزء كبير من المعدة لتبقى على شكل أنبوب. يُقلل ذلك بشكل ملحوظ من تناول الطعام ويُخفض هرمونات الجوع.</p>
        <ul>
          <li><strong>مدة العملية:</strong> 1 - 2 ساعة (بالمنظار)</li>
          <li><strong>الإقامة في المستشفى:</strong> 2 - 3 ليالٍ</li>
          <li><strong>فترة التعافي:</strong> 5 - 7 أيام</li>
          <li><strong>فقدان الوزن المتوقع:</strong> 60-70% من الوزن الزائد</li>
        </ul>
        <p>توفر مراكزنا الشريكة للسمنة فحوصاً قبل الجراحة وإرشادات غذائية بعدها لضمان نجاحكِ على المدى الطويل.</p>
      `
    }
  },
  tr: {
    'rhinoplasty': {
      title: 'Rinoplasti',
      category: 'Yüz Estetiği',
      image: 'images/Perfect Rhinoplasty.jpg',
      description: `
        <p>Rinoplasti (burun estetiği), burunun görünümünü ve oranlarını iyileştirmek ya da nefes alma sorunlarını gidermek için yapılır. İstanbul, özellikle morarma ve şişliği en aza indiren ultrasonik (piezo) teknik başta olmak üzere ileri rinoplasti teknikleriyle dünya çapında ün kazanmıştır.</p>
        <ul>
          <li><strong>Süre:</strong> 2 - 3 saat</li>
          <li><strong>Hastane Kalışı:</strong> 1 gece</li>
          <li><strong>İyileşme Süresi:</strong> 7 - 10 gün</li>
          <li><strong>Sonuçlar:</strong> Kalıcı</li>
        </ul>
        <p>Uzman cerrahlarımız, yeni burnunuzun doğal hatlarınızla mükemmel uyum sağlaması için kapsamlı bir yüz analizi yapar.</p>
      `
    },
    'facelift': {
      title: 'Yüz Germe',
      category: 'Yüz Estetiği',
      image: 'images/Perfect Facelift.webp',
      description: `
        <p>Yüz germe (ritidektomi), yüz ve boyundaki yaşlanma belirtilerini iyileştiren bir cerrahi işlemdir. Sarkan deri, derin kıvrımlar ve yanaklardaki sarkmaları gidererek dinlenmiş ve genç bir görünüm kazandırır.</p>
        <ul>
          <li><strong>Süre:</strong> 3 - 5 saat</li>
          <li><strong>Hastane Kalışı:</strong> 1 - 2 gece</li>
          <li><strong>İyileşme Süresi:</strong> 10 - 14 gün</li>
          <li><strong>Sonuçlar:</strong> Uzun süreli (10+ yıl)</li>
        </ul>
        <p>Cerrahlarımız modern derin düzlem teknikleriyle eski yöntemlerin yapay gergin görünümü olmaksızın doğal sonuçlar elde eder.</p>
      `
    },
    'breast-aug': {
      title: 'Meme Büyütme',
      category: 'Meme Prosedürleri',
      image: 'images/Perfect Breast augmentation.jpg',
      description: `
        <p>Meme büyütme, implant veya yağ transferi kullanarak göğüslerin boyutunu artırır, şeklini iyileştirir ve dolgunluğunu artırır. Koordine ettiğimiz en çok talep gören prosedürlerin başında gelir.</p>
        <ul>
          <li><strong>Süre:</strong> 1 - 2 saat</li>
          <li><strong>Hastane Kalışı:</strong> 1 gece</li>
          <li><strong>İyileşme Süresi:</strong> 5 - 7 gün</li>
          <li><strong>İmplantlar:</strong> FDA onaylı premium silikon markalar</li>
        </ul>
        <p>Danışma sürecinizde, istediğiniz estetiği elde etmek için implant şekli (damlacık veya yuvarlak) ve profil seçimi konusunda yönlendirileceksiniz.</p>
      `
    },
    'tummytuck': {
      title: 'Karın Germe',
      category: 'Vücut Şekillendirme',
      image: 'images/perfect tummy tuck.webp',
      description: `
        <p>Karın germe (abdominoplasti), fazla yağ ve deriyi kaldırarak zayıflamış kasları onarır ve daha düz, sıkı bir karın profili oluşturur. Genellikle liposuction ile birlikte uygulanır.</p>
        <ul>
          <li><strong>Süre:</strong> 2 - 4 saat</li>
          <li><strong>Hastane Kalışı:</strong> 1 - 2 gece</li>
          <li><strong>İyileşme Süresi:</strong> 10 - 14 gün</li>
          <li><strong>İdeal:</strong> Doğum sonrası veya ciddi kilo kaybı için</li>
        </ul>
        <p>Doğal görünümlü bir göbek ve iyi gizlenmiş kesiler konusunda uzman cerrahlarla eşleşmenizi sağlıyoruz.</p>
      `
    },
    'liposuction': {
      title: 'Liposuction',
      category: 'Vücut Şekillendirme',
      image: 'images/perfect liposuction.webp',
      description: `
        <p>Liposuction, fazla yağ birikintilerini gidererek vücudun belirli bölgelerini inceltir ve yeniden şekillendirir, vücut hatlarını ve oranlarını iyileştirir. Gelişmiş VASER teknikleri yaygın olarak kullanılmaktadır.</p>
        <ul>
          <li><strong>Süre:</strong> 1 - 3 saat (bölgeye göre)</li>
          <li><strong>Hastane Kalışı:</strong> Genellikle 1 gece</li>
          <li><strong>İyileşme Süresi:</strong> 5 - 7 gün</li>
          <li><strong>Bölgeler:</strong> Karın, böğür, uyluk, kol, çene</li>
        </ul>
        <p>VASER liposuction, çevre dokulara minimum zarar vererek kas hatlarını ortaya çıkaran yüksek tanımlı bir şekillendirme imkânı sunar.</p>
      `
    },
    'gastric-sleeve': {
      title: 'Tüp Mide',
      category: 'Bariatrik Cerrahi',
      image: 'images/perfect gastric_sleeve.png',
      description: `
        <p>Tüp mide (sleeve gastrektomi), midenin büyük bir bölümünün çıkarılarak tüp şeklinde bırakıldığı bir kilo verme ameliyatıdır. Yiyecek alımını önemli ölçüde sınırlar ve açlık hormonlarını azaltır.</p>
        <ul>
          <li><strong>Süre:</strong> 1 - 2 saat (Laparoskopik)</li>
          <li><strong>Hastane Kalışı:</strong> 2 - 3 gece</li>
          <li><strong>İyileşme Süresi:</strong> 5 - 7 gün</li>
          <li><strong>Beklenen Kilo Kaybı:</strong> Fazla vücut ağırlığının %60-70'i</li>
        </ul>
        <p>Ortak bariatrik merkezlerimiz, uzun vadeli başarınızı garantilemek için kapsamlı ameliyat öncesi testler ve ameliyat sonrası beslenme rehberliği sunar.</p>
      `
    }
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
  const langData = procedureTranslations[currentLang] || procedureTranslations['en'];
  const data = langData[procId] || procedureTranslations['en'][procId];
  if (!data) return;

  modalImg.src = data.image;
  modalImg.alt = data.title;
  modalCat.textContent = data.category;
  modalTitle.textContent = data.title;
  modalDesc.innerHTML = data.description;

  procModal.classList.add('open');
  document.body.style.overflow = 'hidden';
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

// =============================================
// LANGUAGE SWITCHER (i18n)
// =============================================
const translations = {
  en: {
    nav_about: 'About',
    nav_services: 'Services',
    nav_why: 'Why Istanbul',
    nav_testimonials: 'Testimonials',
    nav_cta: 'Free Consultation',
    hero_badge: 'UAE Registered Agency · Surgeries in Istanbul, Turkey',
    hero_title_html: 'Your Trusted UAE Guide to<br/><em>World-Class Care</em><br/>in Istanbul',
    hero_subtitle: 'Headquartered & registered in the UAE, YasminaHealth connects GCC & global patients with elite aesthetic & medical specialists in Istanbul — delivering a seamless, safe, and personalized journey from start to finish.',
    hero_btn_consult: 'Book Free Consultation',
    hero_btn_services: 'Explore Services',
    stat_patients: 'Patients Guided',
    stat_years: 'Years Experience',
    stat_countries: 'Countries Served',
    about_tag: 'About Yasmen Solibi',
    about_title_html: 'An Expert Who Listens,<br/><em>A Guide Who Delivers</em>',
    about_lead: 'Yasmen Solibi is a UAE-based medical tourism consultant leading a UAE-registered healthcare agency that specializes in luxury medical travel and expert surgical placement in Istanbul, Turkey.',
    about_body: 'Based in the UAE and working directly with top JCI-accredited hospitals and master surgeons in Istanbul, Yasmen handles every detail of your medical journey. From initial online consultation to VIP transport, luxury stay, surgical care, and aftercare in Istanbul — you\'re never alone. Her hands-on, empathetic approach has earned her a reputation for trust and excellence across the UAE, GCC, and 30+ countries.',
    cred1_title: 'Specialist Background',
    cred1_sub: 'Healthcare Management & Medical Tourism',
    cred2_title: 'UAE Registered Agency',
    cred2_sub: 'UAE Headquarters · Surgeries in Istanbul',
    cred3_title: 'International Patients',
    cred3_sub: 'English, Turkish, Arabic & French consultations',
    about_cta: 'Schedule a Consultation',
    proc_tag: 'Procedures',
    proc_title: 'Transformative Care Options',
    proc_desc: 'Connecting UAE & international patients with premier surgical teams and JCI-accredited clinics in Istanbul.',
    why_tag: 'Why Istanbul?',
    why_title_html: 'World-Class Surgery at<br/><em>Remarkable Value</em>',
    why_lead: 'Istanbul has become one of the world\'s top medical tourism destinations — combining European-standard care with costs significantly lower than Western Europe or the USA.',
    why_f1_title: 'Premium Quality',
    why_f1_desc: 'JCI-accredited hospitals with the latest technology and internationally trained surgeons.',
    why_f2_title: 'Easy Travel Access',
    why_f2_desc: 'Istanbul Airport serves 300+ destinations worldwide, with visa-on-arrival for many nationalities.',
    why_f3_title: 'Cost Savings up to 70%',
    why_f3_desc: 'Same high-quality procedures at a fraction of UK, US, or Western European prices.',
    why_f4_title: 'Full Concierge Support',
    why_f4_desc: 'Travel coordination, accommodation, and aftercare support for international patients.',
    test_tag: 'Patient Stories',
    test_title: 'Words From Real Patients',
    contact_tag: 'Get in Touch',
    contact_title_html: 'Start Your<br/><em>Transformation Journey</em>',
    contact_lead: 'Book a free, no-obligation online consultation with Yasmen. We\'ll discuss your goals, answer your questions, and design a personalized health travel plan — all in your language.',
    contact_wa_title: 'WhatsApp',
    contact_wa_sub: 'Message us instantly for a quick reply',
    contact_ig_title: 'Instagram',
    contact_ig_sub: 'Follow @yasminahealth for results & updates',
    contact_loc_title: 'Headquarters & Surgeries',
    contact_loc_sub: 'UAE Registered Agency (HQ) | Operations: Istanbul, Turkey',
    form_title: 'Request a Free Consultation',
    form_subtitle: 'Fill in your details and Yasmen will get back to you within 24 hours.',
    form_fname: 'First Name *',
    form_lname: 'Last Name *',
    form_fname_ph: 'Your first name',
    form_lname_ph: 'Your last name',
    form_submit: 'Send Consultation Request',
    form_success_title: 'Message Received!',
    form_success_sub: 'Thank you for reaching out. Yasmen\'s team will contact you within 24 hours.',
    modal_cta: 'Request Consultation',
    proc_cat_facial: 'Facial Aesthetics',
    proc_cat_breast: 'Breast Procedures',
    proc_cat_body: 'Body Contouring',
    proc_cat_bariatric: 'Bariatric Surgery',
    proc_rhino_title: 'Rhinoplasty',
    proc_facelift_title: 'Face Lift',
    proc_breast_title: 'Breast Augmentation',
    proc_tummy_title: 'Tummy Tuck',
    proc_lipo_title: 'Liposuction',
    proc_gastric_title: 'Gastric Sleeve',
    proc_details: 'Details →',
    footer_tagline: 'UAE-Registered Agency · Premier Care in Istanbul.',
    footer_contact_header: 'Contact & Locations',
    footer_hq: 'HQ: United Arab Emirates (UAE)',
    footer_ops: 'Surgeries: Istanbul, Turkey',
    footer_copy: '© 2025 YasminaHealth. All rights reserved. Registered Medical Tourism Agency in the United Arab Emirates (UAE).',
    footer_disclaimer: 'YasminaHealth is a UAE-registered medical tourism agency. All surgical procedures are performed by certified specialists in accredited clinics in Istanbul, Turkey. Results may vary.',
  },
  ar: {
    nav_about: 'من نحن',
    nav_services: 'خدماتنا',
    nav_why: 'لماذا إسطنبول',
    nav_testimonials: 'آراء المرضى',
    nav_cta: 'استشارة مجانية',
    hero_badge: 'وكالة مسجلة في الإمارات · العمليات في إسطنبول، تركيا',
    hero_title_html: 'دليلكِ الموثوق من الإمارات نحو<br/><em>رعاية عالمية المستوى</em><br/>في إسطنبول',
    hero_subtitle: 'يقع المقر الرئيسي لـ YasminaHealth وهي وكالة مسجلة في الإمارات العربية المتحدة، لتربط المرضى من دول الخليج والعالم بأفضل الجراحين والمراكز الطبية المعتمدة في إسطنبول — مع إدارة رحلتكِ بالكامل برعاية وأمان مطلق.',
    hero_btn_consult: 'احجزي استشارتك المجانية',
    hero_btn_services: 'استكشفي خدماتنا',
    stat_patients: 'مريض تمت مرافقتهم',
    stat_years: 'سنوات من الخبرة',
    stat_countries: 'دولة نخدمها',
    about_tag: 'عن ياسمين صليبي',
    about_title_html: 'خبيرة تستمع إليكِ،<br/><em>ومرشدة توصلكِ إلى هدفكِ</em>',
    about_lead: 'ياسمين صليبي استشارية سياحة علاجية مقيمة في الإمارات وتدير وكالة رعاية صحية مسجلة في الإمارات، متخصصة في السفر الطبي الفاخر والتنسيق الجراحي في إسطنبول، تركيا.',
    about_body: 'انطلاقاً من مقرها في الإمارات وبالتعاون المباشر مع أفضل المستشفيات المعتمدة والجراحين في إسطنبول، تتولى ياسمين الإشراف على كل تفصيلة في رحلتكِ الطبية. من الاستشارة الأولية عبر الإنترنت إلى الاستقبال الفاخر والإقامة والعملية الجراحية والمتابعة في إسطنبول — لستِ وحدكِ أبداً. أكسبها أسلوبها المباشر والمهني سمعة مرموقة في الإمارات والخليج وأكثر من 30 دولة.',
    cred1_title: 'خلفية متخصصة',
    cred1_sub: 'إدارة الرعاية الصحية والسياحة العلاجية',
    cred2_title: 'وكالة مسجلة في الإمارات',
    cred2_sub: 'المقر الرئيسي في الإمارات · الجراحات في إسطنبول',
    cred3_title: 'مرضى دوليون',
    cred3_sub: 'استشارات بالعربية والتركية والإنجليزية والفرنسية',
    about_cta: 'احجزي موعداً للاستشارة',
    proc_tag: 'الإجراءات',
    proc_title: 'خيارات رعاية تحويلية',
    proc_desc: 'نربط المرضى من الإمارات والخليج والعالم بأفضل الفرق الجراحية والعيادات المعتمدة في إسطنبول.',
    why_tag: 'لماذا إسطنبول؟',
    why_title_html: 'جراحة عالمية المستوى<br/><em>بأسعار استثنائية</em>',
    why_lead: 'أصبحت إسطنبول من أبرز وجهات السياحة العلاجية في العالم، تجمع رعاية بمستوى أوروبي مع تكاليف أقل بكثير من غرب أوروبا أو الولايات المتحدة.',
    why_f1_title: 'جودة فائقة',
    why_f1_desc: 'مستشفيات معتمدة من JCI بأحدث التقنيات وجراحين مدربين دولياً.',
    why_f2_title: 'سهولة التنقل',
    why_f2_desc: 'مطار إسطنبول يخدم أكثر من 300 وجهة حول العالم مع تأشيرة عند الوصول لكثير من الجنسيات.',
    why_f3_title: 'توفير يصل إلى 70%',
    why_f3_desc: 'نفس الإجراءات عالية الجودة بجزء بسيط من أسعار المملكة المتحدة أو الولايات المتحدة.',
    why_f4_title: 'دعم شامل',
    why_f4_desc: 'تنسيق السفر والإقامة ومتابعة ما بعد العلاج للمرضى الدوليين.',
    test_tag: 'قصص المرضى',
    test_title: 'كلمات من مرضى حقيقيين',
    contact_tag: 'تواصلي معنا',
    contact_title_html: 'ابدئي رحلتكِ<br/><em>نحو التحول</em>',
    contact_lead: 'احجزي استشارة مجانية عبر الإنترنت مع ياسمين. سنناقش أهدافكِ، ونشرح لكِ تفاصيل العملية في إسطنبول، ونعد خطة سفركِ العلاجية المخصصة — بلغتكِ.',
    contact_wa_title: 'واتساب',
    contact_wa_sub: 'راسلينا فوراً للحصول على رد سريع',
    contact_ig_title: 'إنستغرام',
    contact_ig_sub: 'تابعي @yasminahealth للنتائج والتحديثات',
    contact_loc_title: 'المقر الرئيسي والجراحات',
    contact_loc_sub: 'وكالة مسجلة في الإمارات (المقر) | العمليات والجراحات: إسطنبول، تركيا',
    form_title: 'اطلبي استشارة مجانية',
    form_subtitle: 'أدخلي بياناتكِ وسترد عليكِ ياسمين خلال 24 ساعة.',
    form_fname: 'الاسم الأول *',
    form_lname: 'اسم العائلة *',
    form_fname_ph: 'اسمك الأول',
    form_lname_ph: 'اسم عائلتك',
    form_submit: 'إرسال طلب الاستشارة',
    form_success_title: 'تم استلام رسالتكِ!',
    form_success_sub: 'شكراً لتواصلكِ. سيتصل بكِ فريق ياسمين خلال 24 ساعة.',
    modal_cta: 'طلب استشارة',
    proc_cat_facial: 'جماليات الوجه',
    proc_cat_breast: 'عمليات الثدي',
    proc_cat_body: 'نحت الجسم',
    proc_cat_bariatric: 'جراحة السمنة',
    proc_rhino_title: 'تجميل الأنف',
    proc_facelift_title: 'شد الوجه',
    proc_breast_title: 'تكبير الثدي',
    proc_tummy_title: 'شد البطن',
    proc_lipo_title: 'شفط الدهون',
    proc_gastric_title: 'تكميم المعدة',
    proc_details: 'التفاصيل →',
    footer_tagline: 'وكالة مسجلة في الإمارات · رعاية طبية فاخرة في إسطنبول.',
    footer_contact_header: 'التواصل والمواقع',
    footer_hq: 'المقر الرئيسي: الإمارات العربية المتحدة',
    footer_ops: 'إجراء العمليات: إسطنبول، تركيا',
    footer_copy: '© 2025 YasminaHealth. جميع الحقوق محفوظة. وكالة سياحة علاجية مسجلة في الإمارات العربية المتحدة.',
    footer_disclaimer: 'YasminaHealth وكالة سياحة علاجية مسجلة في الإمارات. تُجرى جميع العمليات الجراحية والعلاجات الطبية على يد جراحين معتمدين في مستشفيات معتمدة في إسطنبول، تركيا. قد تختلف النتائج من شخص لآخر.',
  },
  tr: {
    nav_about: 'Hakkımızda',
    nav_services: 'Hizmetler',
    nav_why: 'Neden İstanbul',
    nav_testimonials: 'Hasta Yorumları',
    nav_cta: 'Ücretsiz Danışma',
    hero_badge: 'BAE Kayıtlı Acente · Ameliyatlar İstanbul, Türkiye\'de',
    hero_title_html: 'BAE\'den İstanbul\'da<br/><em>Dünya Standartlarında Sağlığa</em><br/>Güvenilir Rehberiniz',
    hero_subtitle: 'Merkezi ve resmi kaydı BAE\'de bulunan YasminaHealth, Körfez ve dünya genelinden hastaları İstanbul\'un seçkin cerrahları ve JCI akreditasyonlu tıp merkezleriyle buluşturur — tüm sürecinizi tam güvenlik ve özel ilgiyle yönetir.',
    hero_btn_consult: 'Ücretsiz Randevu Al',
    hero_btn_services: 'Hizmetleri Keşfet',
    stat_patients: 'Yönlendirilen Hasta',
    stat_years: 'Yıllık Deneyim',
    stat_countries: 'Hizmet Verilen Ülke',
    about_tag: 'Yasmen Solibi Hakkında',
    about_title_html: 'Sizi Dinleyen Bir Uzman,<br/><em>Hedeflerinize Ulaştıran Bir Rehber</em>',
    about_lead: 'Yasmen Solibi, BAE\'de yaşayan ve İstanbul, Türkiye\'de uzman cerrahi yönlendirme ile lüks tıbbi seyahat alanında uzmanlaşmış BAE kayıtlı bir sağlık acentesini yöneten medikal turizm danışmanıdır.',
    about_body: 'BAE merkezli olarak İstanbul\'un en iyi JCI akreditasyonlu hastaneleri ve uzman cerrahlarıyla doğrudan çalışan Yasmen, tıbbi yolculuğunuzun her detayını üstlenir. Çevrim içi ilk danışmanlıktan VIP transfere, lüks konaklamadan İstanbul\'daki cerrahi bakım ve ameliyat sonrası takibe kadar — hiç yalnız değilsiniz. Samimi ve profesyonel yaklaşımı, BAE, Körfez ülkeleri ve 30\'dan fazla ülkede güven kazanmıştır.',
    cred1_title: 'Uzman Geçmiş',
    cred1_sub: 'Sağlık Yönetimi & Medikal Turizm',
    cred2_title: 'BAE Kayıtlı Acente',
    cred2_sub: 'BAE Genel Merkez · Ameliyatlar İstanbul\'da',
    cred3_title: 'Uluslararası Hastalar',
    cred3_sub: 'İngilizce, Türkçe, Arapça & Fransızca danışmanlık',
    about_cta: 'Danışma Randevusu Al',
    proc_tag: 'Prosedürler',
    proc_title: 'Dönüştürücü Bakım Seçenekleri',
    proc_desc: 'BAE ve uluslararası hastaları İstanbul\'daki seçkin cerrahi ekipler ve JCI akreditasyonlu kliniklerle buluşturuyoruz.',
    why_tag: 'Neden İstanbul?',
    why_title_html: 'Dünya Standartlarında Cerrahi<br/><em>Olağanüstü Fiyatlarla</em>',
    why_lead: 'İstanbul, Avrupa standartlarında bakımı Batı Avrupa veya ABD\'ye kıyasla çok daha uygun maliyetlerle sunan, dünyanın önde gelen medikal turizm destinasyonlarından biri hâline gelmiştir.',
    why_f1_title: 'Premium Kalite',
    why_f1_desc: 'JCI akreditasyonlu hastaneler, en son teknoloji ve uluslararası eğitimli cerrahlar.',
    why_f2_title: 'Kolay Ulaşım',
    why_f2_desc: 'İstanbul Havalimanı 300\'den fazla destinasyona hizmet vermekte; pek çok uyruk için kapıda vize sunulmaktadır.',
    why_f3_title: '%70\'e Kadar Tasarruf',
    why_f3_desc: 'İngiltere, ABD veya Batı Avrupa fiyatlarının çok altında aynı yüksek kalitede prosedürler.',
    why_f4_title: 'Tam Konsiyerj Desteği',
    why_f4_desc: 'Uluslararası hastalar için seyahat organizasyonu, konaklama ve ameliyat sonrası destek.',
    test_tag: 'Hasta Hikayeleri',
    test_title: 'Gerçek Hastalardan Söz',
    contact_tag: 'İletişime Geçin',
    contact_title_html: 'Dönüşüm Yolculuğunuza<br/><em>Başlayın</em>',
    contact_lead: 'Yasmen ile çevrim içi ücretsiz bir danışma ayarlayın. Hedeflerinizi konuşalım, İstanbul\'daki ameliyat sürecini açıklayalım ve kişiselleştirilmiş sağlık seyahatinizi planlayalım — kendi dilinizde.',
    contact_wa_title: 'WhatsApp',
    contact_wa_sub: 'Hızlı yanıt için hemen mesaj gönderin',
    contact_ig_title: 'Instagram',
    contact_ig_sub: 'Sonuçlar ve güncellemeler için @yasminahealth\'i takip edin',
    contact_loc_title: 'Genel Merkez & Ameliyatlar',
    contact_loc_sub: 'BAE Kayıtlı Acente (Merkez) | Cerrahi Operasyonlar: İstanbul, Türkiye',
    form_title: 'Ücretsiz Danışma Talep Et',
    form_subtitle: 'Bilgilerinizi girin, Yasmen 24 saat içinde size ulaşsın.',
    form_fname: 'Ad *',
    form_lname: 'Soyad *',
    form_fname_ph: 'Adınız',
    form_lname_ph: 'Soyadınız',
    form_submit: 'Danışma Talebi Gönder',
    form_success_title: 'Mesajınız Alındı!',
    form_success_sub: 'Bize ulaştığınız için teşekkürler. Yasmen\'in ekibi 24 saat içinde sizinle iletişime geçecek.',
    modal_cta: 'Danışma Talep Et',
    proc_cat_facial: 'Yüz Estetiği',
    proc_cat_breast: 'Meme Prosedürleri',
    proc_cat_body: 'Vücut Şekillendirme',
    proc_cat_bariatric: 'Bariatrik Cerrahi',
    proc_rhino_title: 'Rinoplasti',
    proc_facelift_title: 'Yüz Germe',
    proc_breast_title: 'Meme Büyütme',
    proc_tummy_title: 'Karın Germe',
    proc_lipo_title: 'Liposuction',
    proc_gastric_title: 'Tüp Mide',
    proc_details: 'Detaylar →',
    footer_tagline: 'BAE Kayıtlı Acente · İstanbul\'da Dünya Standartlarında Bakım.',
    footer_contact_header: 'İletişim & Konumlar',
    footer_hq: 'Merkez: Birleşik Arap Emirlikleri (BAE)',
    footer_ops: 'Ameliyatlar: İstanbul, Türkiye',
    footer_copy: '© 2025 YasminaHealth. Tüm hakları saklıdır. Birleşik Arap Emirlikleri\'nde (BAE) Kayıtlı Medikal Turizm Acentesi.',
    footer_disclaimer: 'YasminaHealth, BAE\'de kayıtlı bir medikal turizm acentesidir. Tüm cerrahi operasyonlar İstanbul, Türkiye\'deki akredite kliniklerde sertifikalı uzmanlar tarafından gerçekleştirilir. Sonuçlar kişiden kişiye değişebilir.',
  }
};

let currentLang = localStorage.getItem('yasmeen_lang') || 'en';

function applyTranslation(lang) {
  const t = translations[lang];
  if (!t) return;

  currentLang = lang;
  localStorage.setItem('yasmeen_lang', lang);

  // Update HTML lang & dir
  const htmlEl = document.documentElement;
  htmlEl.setAttribute('lang', lang);
  htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  // Load Arabic font if needed
  if (lang === 'ar' && !document.getElementById('arabic-font')) {
    const link = document.createElement('link');
    link.id = 'arabic-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
  }

  // Translate text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (key.endsWith('_html')) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  // Update lang button label
  const labels = { en: 'EN', ar: 'ع', tr: 'TR' };
  const langCurrentEl = document.getElementById('langCurrent');
  if (langCurrentEl) langCurrentEl.textContent = labels[lang] || lang.toUpperCase();

  // Update active state on options
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

// Language dropdown toggle
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

if (langBtn && langDropdown) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });

  document.addEventListener('click', () => langDropdown.classList.remove('open'));

  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTranslation(btn.getAttribute('data-lang'));
      langDropdown.classList.remove('open');
    });
  });
}

// Apply saved/default language on load
applyTranslation(currentLang);
