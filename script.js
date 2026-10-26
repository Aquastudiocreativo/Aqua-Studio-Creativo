// =============================================================
// MENÚ MÓVIL Y CARRUSEL DE SERVICIOS
// =============================================================
document.addEventListener('DOMContentLoaded', () => {

  // --- MENÚ MÓVIL ---
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- CARRUSEL DE SERVICIOS ---
  const track = document.getElementById('services-track');
  const prevBtn = document.getElementById('prev-service');
  const nextBtn = document.getElementById('next-service');
  const dotsNav = document.getElementById('slider-dots');

  if (track && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    const dots = dotsNav ? Array.from(dotsNav.children) : [];
    let currentIndex = 0;
    let autoplayTimer = null;

    function moveToSlide(index) {
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      // Aplica la transformación directamente al riel de imágenes
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Actualizar puntos
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    // Eventos de botones prev/next
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      moveToSlide(currentIndex + 1);
      resetAutoplay();
    });

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      moveToSlide(currentIndex - 1);
      resetAutoplay();
    });

    // Eventos de clics en los puntos
    if (dotsNav) {
      dotsNav.addEventListener('click', (e) => {
        const targetDot = e.target.closest('.dot');
        if (!targetDot) return;
        const targetIndex = parseInt(targetDot.dataset.slide, 10);
        moveToSlide(targetIndex);
        resetAutoplay();
      });
    }

    // Funciones de auto-play
    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        moveToSlide(currentIndex + 1);
      }, 3000);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Pausar al pasar el mouse por encima
    const container = document.querySelector('.services-slider-container');
    if (container) {
      container.addEventListener('mouseenter', stopAutoplay);
      container.addEventListener('mouseleave', startAutoplay);
    }

    // Iniciar auto-play
    startAutoplay();
  }

});