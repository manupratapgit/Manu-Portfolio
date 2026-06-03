function initAnimations() {

  // ── 1. IntersectionObserver for reveal / fade-up / slide-left ──
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  // Mark elements already in viewport as in-view immediately
  function isVisible(el) {
    var r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  function register(el) {
    if (isVisible(el)) {
      el.classList.add('in-view');
    } else {
      io.observe(el);
    }
  }

  // ── 2. Text reveal — eyebrows and section titles get left-to-right clip ──
  document.querySelectorAll('.eyebrow, .section-title, .hero-h1, .hero-pill').forEach(function (el) {
    el.classList.add('reveal');
    register(el);
  });

  // ── 3. Fade-up — sub text, hero sub, buttons ──
  document.querySelectorAll('.section-sub, .hero-sub, .hero-actions, .hero-stats').forEach(function (el) {
    el.classList.add('fade-up');
    register(el);
  });

  // ── 4. Cards — staggered slide from left ──
  document.querySelectorAll('.impact-grid .card').forEach(function (el, i) {
    el.classList.add('slide-left');
    el.classList.add('stagger-' + Math.min(i, 7));
    register(el);
  });

  document.querySelectorAll('.beyond-grid .beyond-card').forEach(function (el, i) {
    el.classList.add('fade-up');
    el.classList.add('stagger-' + Math.min(i, 7));
    register(el);
  });

  // ── 5. Timeline rows — slide from left ──
  document.querySelectorAll('.tl-row').forEach(function (el, i) {
    el.classList.add('slide-left');
    el.classList.add('stagger-' + Math.min(i, 7));
    register(el);
  });

  // ── 6. Skills columns ──
  document.querySelectorAll('.skills-grid > div').forEach(function (el, i) {
    el.classList.add('fade-up');
    el.classList.add('stagger-' + Math.min(i, 7));
    register(el);
  });

  // ── 7. Proof section — testimonial + achievement cards ──
  document.querySelectorAll('.t-card').forEach(function (el, i) {
    el.classList.add('fade-up');
    el.classList.add('stagger-' + Math.min(i, 7));
    register(el);
  });

  document.querySelectorAll('.a-card').forEach(function (el, i) {
    el.classList.add('fade-up');
    el.classList.add('stagger-' + Math.min(i, 7));
    register(el);
  });

  // ── 8. AI cards ──
  document.querySelectorAll('.ai-card').forEach(function (el, i) {
    el.classList.add('fade-up');
    el.classList.add('stagger-' + Math.min(i, 7));
    register(el);
  });

  // ── 9. Connect section ──
  document.querySelectorAll('.connect-email, .connect-links').forEach(function (el, i) {
    el.classList.add('fade-up');
    el.classList.add('stagger-' + i);
    register(el);
  });

  // ── 8. Count-up animation for stat numbers ──
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      countObserver.unobserve(entry.target);
      animateCount(entry.target);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num, .istat-num').forEach(function (el) {
    el.setAttribute('data-original', el.textContent);
    countObserver.observe(el);
  });

  function animateCount(el) {
    var original = el.getAttribute('data-original') || el.textContent;
    // Extract leading number
    var match = original.match(/^([^\d]*)(\d[\d,.]*)(.*)/);
    if (!match) return;
    var prefix = match[1];
    var numStr = match[2].replace(/,/g, '');
    var suffix = match[3];
    var end = parseFloat(numStr);
    if (isNaN(end)) return;

    var duration = 900;
    var start = performance.now();
    var startVal = 0;

    function tick(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(startVal + (end - startVal) * ease);
      // preserve comma formatting if original had it
      var formatted = match[2].includes(',') ? current.toLocaleString() : String(current);
      el.textContent = prefix + formatted + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  // ── 10. Expandable impact cards ──
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.ic-expand-trigger');
    if (!trigger) return;

    var card = trigger.closest('.ic');
    var story = card.querySelector('.ic-full-story');
    if (!story) return;

    var isOpen = story.classList.contains('open');

    // Close all open stories first
    document.querySelectorAll('.ic-full-story.open').forEach(function (s) {
      s.classList.remove('open');
      s.hidden = true;
      var t = s.closest('.ic').querySelector('.ic-expand-trigger');
      if (t) t.textContent = 'Read the full story ↓';
    });

    // Toggle this one
    if (!isOpen) {
      story.classList.add('open');
      story.hidden = false;
      trigger.textContent = 'Close ↑';
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}
