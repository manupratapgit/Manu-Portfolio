function initAnimations() {
  const observerOptions = { threshold: 0.12 };

  // Apply .anim-hidden to all targets not already in viewport
  const fadeEls = document.querySelectorAll('.anim-fade');
  const staggerContainers = document.querySelectorAll('.anim-stagger');
  const tlRows = document.querySelectorAll('.tl-row');

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  // Fade elements
  fadeEls.forEach(el => {
    if (!isInViewport(el)) el.classList.add('anim-hidden');
  });

  // Stagger children
  staggerContainers.forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      if (!isInViewport(child)) {
        child.classList.add('anim-hidden');
        child.style.transitionDelay = `${i * 80}ms`;
      }
    });
  });

  // Timeline rows
  tlRows.forEach(el => {
    if (!isInViewport(el)) el.classList.add('anim-hidden');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('anim-hidden');
        entry.target.classList.add('anim-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.anim-hidden').forEach(el => observer.observe(el));
}
