function initAnimations() {

  // ── All elements with inline opacity:0 are candidates ──
  var animated = document.querySelectorAll('[style*="opacity:0"]');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      var el = entry.target;
      var delay = parseInt(el.dataset.delay || '0');

      setTimeout(function () {
        el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
        el.style.opacity = '1';
        el.style.transform = 'none';
      }, delay);

      observer.unobserve(el);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animated.forEach(function (el) { observer.observe(el); });

  // ── Nav scroll behaviour ──
  initNav();

  // ── Count-up for stat numbers ──
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      countObserver.unobserve(entry.target);
      animateCount(entry.target);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num, .istat-num, .hsc-num').forEach(function (el) {
    el.setAttribute('data-original', el.textContent);
    countObserver.observe(el);
  });

  function animateCount(el) {
    var original = el.getAttribute('data-original') || el.textContent;
    var match = original.match(/^([^\d]*)(\d[\d,.]*)(.*)/);
    if (!match) return;
    var prefix = match[1];
    var numStr = match[2].replace(/,/g, '');
    var suffix = match[3];
    var end = parseFloat(numStr);
    if (isNaN(end)) return;

    var duration = 900;
    var start = performance.now();

    function tick(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(end * ease);
      var formatted = match[2].includes(',') ? current.toLocaleString() : String(current);
      el.textContent = prefix + formatted + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  // ── Expandable impact cards ──
  initExpandCards();
}

// ── Stagger helper ──
function applyStagger(selector, baseDelay) {
  baseDelay = baseDelay || 80;
  document.querySelectorAll(selector).forEach(function (el, i) {
    el.dataset.delay = String(i * baseDelay);
  });
}

// ── Nav transparent → solid on scroll ──
function initNav() {
  var nav = document.querySelector('nav');
  if (!nav) return;

  function updateNav() {
    var isLight = document.documentElement.classList.contains('light');
    if (window.scrollY > 60) {
      nav.style.background = isLight
        ? 'rgba(245,242,236,0.92)'
        : 'rgba(13,26,20,0.92)';
      nav.style.backdropFilter = 'blur(12px)';
      nav.style.borderBottom = '0.5px solid rgba(61,158,106,0.15)';
    } else {
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.borderBottom = 'none';
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });

  // Re-run when theme toggles so nav colour stays correct
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      // theme.js toggles the class; wait one tick for it to apply
      setTimeout(updateNav, 10);
    });
  }
}

function initExpandCards() {
  var heroCard = document.getElementById('hero-card');
  if (heroCard) {
    heroCard.addEventListener('click', function () {
      var expanded = heroCard.querySelector('.hero-expanded');
      if (!expanded) return;
      var isOpen = heroCard.classList.contains('is-open');
      heroCard.classList.toggle('is-open');
      if (isOpen) {
        expanded.classList.remove('open');
        expanded.hidden = true;
      } else {
        expanded.classList.add('open');
        expanded.hidden = false;
      }
    });
  }

  document.addEventListener('click', function (e) {
    var card = e.target.closest('.ic');
    if (!card) return;
    var expanded = card.querySelector('.ic-expanded');
    if (!expanded) return;

    var isOpen = card.classList.contains('is-open');

    document.querySelectorAll('.ic.is-open').forEach(function (c) {
      c.classList.remove('is-open');
      var exp = c.querySelector('.ic-expanded');
      if (exp) { exp.classList.remove('open'); exp.hidden = true; }
    });

    if (!isOpen) {
      card.classList.add('is-open');
      expanded.classList.add('open');
      expanded.hidden = false;
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

window.initAnimations = initAnimations;
window.applyStagger = applyStagger;
