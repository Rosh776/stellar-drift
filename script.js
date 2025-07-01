// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Scroll Animations
const animateElements = document.querySelectorAll('.animate-on-scroll');

const checkScroll = () => {
  animateElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const isInView = (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0);
    if (isInView) el.classList.add('active');
  });
};

// Video Play on Scroll
const videos = document.querySelectorAll('video');

const handleVideoPlay = () => {
  videos.forEach(video => {
    const rect = video.getBoundingClientRect();
    const isInView = (rect.top <= window.innerHeight && rect.bottom >= 0);
    isInView ? video.play() : video.pause();
  });
};

// Event Listeners
window.addEventListener('scroll', () => {
  checkScroll();
  handleVideoPlay();
});

window.addEventListener('load', checkScroll);
