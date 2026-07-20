document.addEventListener('DOMContentLoaded', () => {
  // Шукаємо всі треки на сторінці (і у features, і в reviews)
  const tracks = document.querySelectorAll('[data-slider-track]');

  tracks.forEach(track => {
    // Знаходимо батьківську секцію поточного слайдера
    const sliderSection = track.closest('section, article');
    if (!sliderSection) return;

    const slides = track.querySelectorAll('[data-slider-slide]');
    const dots = sliderSection.querySelectorAll('[data-slider-dot]');
    const btnPrev = sliderSection.querySelector('[data-slider-prev]');
    const btnNext = sliderSection.querySelector('[data-slider-next]');

    if (slides.length === 0) return;

    const scrollToSlide = index => {
      if (index >= 0 && index < slides.length) {
        slides[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    };

    btnPrev?.addEventListener('click', () => {
      const activeDot = sliderSection.querySelector('[data-slider-dot].active');
      const currentIndex = parseInt(activeDot?.dataset.slide || '0', 10);
      scrollToSlide(currentIndex - 1);
    });

    btnNext?.addEventListener('click', () => {
      const activeDot = sliderSection.querySelector('[data-slider-dot].active');
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
      rootMargin: '0px -40% 0px -40%',
      threshold: 0,
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
});
