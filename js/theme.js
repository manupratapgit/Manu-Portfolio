// Forest Dark is default. Toggle adds html.light for light mode.
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('themeToggle');
  var icon = document.getElementById('themeIcon');
  if (!btn || !icon) return;

  function isLight() {
    return document.documentElement.classList.contains('light');
  }

  function syncIcon() {
    if (isLight()) {
      icon.className = 'ti ti-moon';
      btn.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      icon.className = 'ti ti-sun';
      btn.setAttribute('aria-label', 'Switch to light mode');
    }
  }

  syncIcon();

  btn.addEventListener('click', function () {
    var html = document.documentElement;
    if (isLight()) {
      html.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
    syncIcon();
  });
});
