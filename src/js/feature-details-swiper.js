document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('[data-fd-track]');
  const slides = document.querySelectorAll('[data-fd-slide]');
  const dots = document.querySelectorAll('[data-fd-dot]');
  const btnPrev = document.querySelector('[data-fd-prev]');
  const btnNext = document.querySelector('[data-fd-next]');

  if (!track || slides.length === 0) return;

  const scrollToSlide = index => {
    if (index >= 0 && index < slides.length) {
      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = 16;
      track.scrollTo({
        left: index * (slideWidth + gap),
        behavior: 'smooth',
      });
    }
  };

  btnPrev?.addEventListener('click', () => {
    const activeDot = document.querySelector('[data-fd-dot].active');
    const currentIndex = parseInt(activeDot?.dataset.slide || '0', 10);
    scrollToSlide(currentIndex - 1);
  });

  btnNext?.addEventListener('click', () => {
    const activeDot = document.querySelector('[data-fd-dot].active');
    const currentIndex = parseInt(activeDot?.dataset.slide || '0', 10);
    scrollToSlide(currentIndex + 1);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const targetIndex = parseInt(e.currentTarget.dataset.slide, 10);
      scrollToSlide(targetIndex);
    });
  });

  const observerOptions = {
    root: track,
    threshold: 0.6,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const slideIndex = Array.from(slides).indexOf(entry.target);

        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === slideIndex);
        });
      }
    });
  }, observerOptions);

  slides.forEach(slide => observer.observe(slide));
});
