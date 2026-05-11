// ===== TEXT ANIMATIONS (Word by Word Reveal) =====
function initTextSplitting() {
  const elements = document.querySelectorAll('.split-text');
  elements.forEach(el => {
    const text = el.innerText;
    const words = text.split(' ');
    el.innerHTML = '';
    words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'split-parent';
      const innerSpan = document.createElement('span');
      innerSpan.className = 'split-child';
      innerSpan.innerText = word + (index === words.length - 1 ? '' : '\u00a0');
      wordSpan.appendChild(innerSpan);
      el.appendChild(wordSpan);
    });
  });
}

// ===== SIMPLE CARD SLIDER =====
function initCardSliders() {
  const sliders = document.querySelectorAll('.card-slider');
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.card-slide');
    if (slides.length <= 1) return;
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 4000);
  });
}

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
  mobileClose && mobileClose.addEventListener('click', () => mobileMenu.classList.remove('active'));
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('active'));
  });
}

// ===== PRICE CALCULATOR =====
function calcPrice() {
  const unitSelect  = document.getElementById('unitSelect');
  const nightsInput = document.getElementById('nightsInput');
  const calcNightly = document.getElementById('calcNightly');
  const calcNightsEl= document.getElementById('calcNights');
  const calcTotal   = document.getElementById('calcTotal');
  const waCalcLink  = document.getElementById('waCalcLink');

  if (!unitSelect || !nightsInput) return;

  const rate         = parseInt(unitSelect.value, 10);
  const nights       = Math.max(1, parseInt(nightsInput.value, 10) || 1);
  const cleaningFee  = 1500;
  const total        = rate * nights + cleaningFee;

  const unitName = unitSelect.options[unitSelect.selectedIndex].text.split('\u2014')[0].trim();

  if (calcNightly) calcNightly.textContent  = 'KES ' + rate.toLocaleString();
  if (calcNightsEl) calcNightsEl.textContent = nights;
  if (calcTotal)  calcTotal.textContent   = 'KES ' + total.toLocaleString();

  // Update the WhatsApp link with computed details
  if (waCalcLink) {
    const msg = encodeURIComponent(
      `Hello Chanan! I'd like to book ${unitName} for ${nights} night${nights > 1 ? 's' : ''}. Estimated total: KES ${total.toLocaleString()}.`
    );
    waCalcLink.href = `https://wa.me/254708085734?text=${msg}`;
  }
}

// ===== BOOKING INQUIRY FORM (sends via WhatsApp) =====
function submitBookingInquiry(e) {
  e.preventDefault();

  const name    = document.getElementById('guestName')?.value.trim()    || '';
  const phone   = document.getElementById('guestPhone')?.value.trim()   || '';
  const unit    = document.getElementById('guestUnit')?.value           || '';
  const nights  = document.getElementById('guestNights')?.value         || '';
  const message = document.getElementById('guestMessage')?.value.trim() || '';

  if (!name || !phone || !nights) return;

  const text = encodeURIComponent(
    `Hello Chanan Property Ventures!\n\n` +
    `*Booking Inquiry*\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Unit: ${unit}\n` +
    `Nights: ${nights}\n` +
    (message ? `Special Requests: ${message}\n` : '') +
    `\nPlease confirm availability. Thank you!`
  );

  window.open(`https://wa.me/254708085734?text=${text}`, '_blank');
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  initTextSplitting();
  initCardSliders();
  calcPrice(); // Set initial calculator values

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
