// Theme toggle — runs after DOM ready
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('themeToggle');
  var icon = document.getElementById('themeIcon');
  if (!btn || !icon) return;

  function isDark() {
    return document.documentElement.classList.contains('dark');
  }

  function syncIcon() {
    if (isDark()) {
      icon.className = 'ti ti-sun';
      btn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      icon.className = 'ti ti-moon';
      btn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  syncIcon();

  btn.addEventListener('click', function () {
    var html = document.documentElement;
    if (isDark()) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    syncIcon();
  });
});
