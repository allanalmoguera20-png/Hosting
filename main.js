document.getElementById('footer-year').textContent = new Date().getFullYear();

const u = 'allan.almoguera20';
const d = 'gmail.com';
const emailEl = document.getElementById('footer-email');
emailEl.href = 'mailto:' + u + '@' + d;
emailEl.textContent = u + '@' + d;

document.addEventListener('click', function (e) {
  const wrapper = document.getElementById('cv-dropdown-wrapper');
  if (wrapper && !wrapper.contains(e.target)) {
    document.getElementById('cv-menu').classList.add('hidden');
  }
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  body.classList.add('light-mode');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
  updateLightModeColors();
} else {
  updateDarkModeColors();
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light');
    updateLightModeColors();
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark');
    updateDarkModeColors();
  }
});

function updateLightModeColors() {
  document
    .querySelectorAll('.header-text, .main-text')
    .forEach((el) => (el.style.color = '#081b29'));
  document
    .querySelectorAll('.secondary-text')
    .forEach((el) => (el.style.color = '#374151'));
  document.querySelectorAll('.nav-link').forEach((el) => {
    if (!el.classList.contains('bg-cyan-400')) el.style.color = '#081b29';
  });
  document
    .querySelectorAll('.form-input')
    .forEach((el) => (el.style.color = '#081b29'));
  themeToggle.style.color = '#0891b2';
  document.getElementById('mobile-menu-btn').style.color = '#081b29';
}

function updateDarkModeColors() {
  document
    .querySelectorAll('.header-text, .main-text')
    .forEach((el) => (el.style.color = '#ededed'));
  document
    .querySelectorAll('.secondary-text')
    .forEach((el) => (el.style.color = '#d1d5db'));
  document.querySelectorAll('.nav-link').forEach((el) => {
    if (!el.classList.contains('bg-cyan-400')) el.style.color = '#ffffff';
  });
  document
    .querySelectorAll('.form-input')
    .forEach((el) => (el.style.color = '#ffffff'));
  themeToggle.style.color = '#ffffff';
  document.getElementById('mobile-menu-btn').style.color = '#ffffff';
}

emailjs.init('IOC5CvzHuHRppIZSs');

new Typed('.text', {
  strings: [
    'a Web Developer',
    'an Application Developer',
    'a Front-End Developer',
    'a Back-End Developer',
  ],
  typeSpeed: 50,
  backSpeed: 50,
  backDelay: 500,
  loop: true,
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
  navMenu.classList.toggle('flex');
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      navMenu.classList.add('hidden');
      navMenu.classList.remove('flex');
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = 'home';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove('bg-cyan-400', 'text-black');
    link.style.color = body.classList.contains('light-mode')
      ? '#081b29'
      : '#ffffff';
    if (link.getAttribute('data-section') === current) {
      link.classList.add('bg-cyan-400', 'text-black');
      link.style.color = '#000000';
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

function loadSubmissions() {
  const submissions =
    JSON.parse(localStorage.getItem('contactSubmissions')) || [];
  const tbody = document.getElementById('submissions-table-body');

  if (submissions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="main-text py-8 text-center text-xs md:text-sm" style="color:#9ca3af;">
          No submissions yet. Be the first to reach out!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = submissions
    .map(
      (sub) => `
    <tr>
      <td class="py-4 px-4">${sub.name}</td>
      <td class="py-4 px-4">${sub.contact}</td>
      <td class="py-4 px-4">${sub.email}</td>
      <td class="py-4 px-4">${sub.message}</td>
      <td class="py-4 px-4">${sub.date}</td>
    </tr>
  `
    )
    .join('');
}

function saveSubmission(name, contact, email, message) {
  const submissions =
    JSON.parse(localStorage.getItem('contactSubmissions')) || [];
  const date = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  submissions.push({ name, contact, email, message, date });
  localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
  loadSubmissions();
}

loadSubmissions();

document
  .getElementById('contact-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const status = document.getElementById('status-message');

    const name = document.getElementById('user_name').value;
    const contact = document.getElementById('user_contact').value;
    const email = document.getElementById('user_email').value;
    const message = document.getElementById('message').value;

    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.classList.add('hidden');

    emailjs.sendForm('service_eli3t1r', 'template_cm5nx2h', this).then(
      () => {
        saveSubmission(name, contact, email, message);

        status.textContent = 'Message sent successfully! 🎉';
        status.classList.remove('hidden', 'text-red-400');
        status.classList.add('text-cyan-400');
        document.getElementById('contact-form').reset();
        btn.disabled = false;
        btn.textContent = 'Send Message';
      },
      (err) => {
        status.textContent = 'Oops! Something went wrong. Please try again.';
        status.classList.remove('hidden', 'text-cyan-400');
        status.classList.add('text-red-400');
        btn.disabled = false;
        btn.textContent = 'Send Message';
        console.log('EmailJS Error:', err);
      }
    );
  });
