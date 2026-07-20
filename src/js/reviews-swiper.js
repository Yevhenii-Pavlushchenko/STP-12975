document.addEventListener('DOMContentLoaded', () => {
  // Находим все обертки треков (они есть и в features, и в reviews)
  const tracks = document.querySelectorAll('[data-slider-track]');

  tracks.forEach(track => {
    // Ищем элементы строго ВНУТРИ текущего трека или его ближайшего родителя
    const sliderBox = track.closest('.features__slider, .rev__slider');
    if (!sliderBox) return;

    const slides = track.querySelectorAll('[data-slider-slide]');
    const dots = sliderBox.querySelectorAll('[data-slider-dot]');
    const btnPrev = sliderBox.querySelector('[data-slider-prev]');
    const btnNext = sliderBox.querySelector('[data-slider-next]');

    if (slides.length === 0) return;

    const scrollToSlide = index => {
      if (index >= 0 && index < slides.length) {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 32;
        track.scrollTo({
          left: index * (slideWidth + gap),
          behavior: 'smooth',
        });
      }
    };

    btnPrev?.addEventListener('click', () => {
      const activeDot = sliderBox.querySelector('[data-slider-dot].active');
      const currentIndex = parseInt(activeDot?.dataset.slide || '0', 10);
      scrollToSlide(currentIndex - 1);
    });

    btnNext?.addEventListener('click', () => {
      const activeDot = sliderBox.querySelector('[data-slider-dot].active');
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
});
