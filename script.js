const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.classList.toggle('is-open');
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.classList.remove('is-open');
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.portfolio-card[data-category]');
filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const filter = button.dataset.filter;
    cards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function configureLinks(selector, key, label) {
  document.querySelectorAll(selector).forEach((link) => {
    const url = (window.SITE_CONFIG || {})[key];
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
    } else {
      link.href = '#';
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showToast(`Add the ${label} URL in site-config.js`);
      });
    }
  });
}

configureLinks('[data-whatsapp]', 'whatsapp', 'WhatsApp');
configureLinks('[data-fiverr]', 'fiverr', 'Fiverr');

const form = document.getElementById('inquiryForm');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const message = `Hello Zain,\n\nName: ${data.get('name')}\nPlatform: ${data.get('platform')}\nWebsite: ${data.get('website') || 'Not provided'}\n\nProject details:\n${data.get('message')}`;

    try {
      await navigator.clipboard.writeText(message);
      showToast('Inquiry copied — paste it into your preferred platform.');
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = message;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      showToast('Inquiry copied — paste it into your preferred platform.');
    }
  });
}

/* Cursor-emitted light effect. Disabled automatically on touch devices. */
const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (supportsFinePointer && !reducedMotion) {
  const aura = document.createElement('div');
  const dot = document.createElement('div');
  aura.className = 'cursor-aura';
  dot.className = 'cursor-dot';
  document.body.append(aura, dot);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let auraX = mouseX;
  let auraY = mouseY;

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    document.body.classList.add('has-pointer');
  }, { passive: true });

  window.addEventListener('mouseleave', () => document.body.classList.remove('has-pointer'));
  window.addEventListener('mouseenter', () => document.body.classList.add('has-pointer'));

  const animateAura = () => {
    auraX += (mouseX - auraX) * 0.12;
    auraY += (mouseY - auraY) * 0.12;
    aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`;
    requestAnimationFrame(animateAura);
  };
  animateAura();

  window.addEventListener('click', (event) => {
    const pulse = document.createElement('span');
    pulse.className = 'cursor-pulse';
    pulse.style.left = `${event.clientX}px`;
    pulse.style.top = `${event.clientY}px`;
    document.body.appendChild(pulse);
    pulse.addEventListener('animationend', () => pulse.remove(), { once: true });
  });

  const illuminatedItems = document.querySelectorAll(
    '.work-card, .portfolio-card, .service-grid article, .service-mini-grid article, .inquiry-form, .contact-channels a, .principles article'
  );

  illuminatedItems.forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const rect = item.getBoundingClientRect();
      item.style.setProperty('--x', `${event.clientX - rect.left}px`);
      item.style.setProperty('--y', `${event.clientY - rect.top}px`);
    });
  });
}
