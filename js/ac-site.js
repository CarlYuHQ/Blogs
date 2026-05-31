(function () {
  function getRoot() {
    return (window.CONFIG && window.CONFIG.root) || '/Blogs/';
  }

  function getCursorCss() {
    const root = getRoot().replace(/\/?$/, '/');
    return `url('${root}images/cursor-icon.png') 4 0, auto`;
  }

  function initThemeAssets() {
    const root = getRoot().replace(/\/?$/, '/');
    document.documentElement.style.setProperty('--ac-cursor', getCursorCss());
    document.documentElement.style.setProperty(
      '--yun-bg-image',
      `url('${root}images/background.png')`
    );
  }

  function applyAnimalCursor(el) {
    if (!el) return;
    const c = getCursorCss();
    el.style.setProperty('cursor', c, 'important');
    el.querySelectorAll('*').forEach((child) => {
      child.style.setProperty('cursor', c, 'important');
    });
  }

  function initThemeToggle() {
    if (document.getElementById('ac-theme-toggle')) return;

    const btn = document.createElement('button');
    btn.id = 'ac-theme-toggle';
    btn.type = 'button';
    btn.title = '切换日夜模式 / Toggle Day & Night';
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.innerHTML = '<span aria-hidden="true">🌓</span>';

    btn.addEventListener('click', () => {
      const yunBtn = document.getElementById('toggle-mode-btn');
      if (yunBtn) {
        yunBtn.click();
        return;
      }
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('darken-mode', isDark ? 'dark' : 'light');
    });

    document.body.appendChild(btn);
    applyAnimalCursor(btn);
    btn.addEventListener('mouseenter', () => applyAnimalCursor(btn));
  }

  initThemeAssets();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) initThemeToggle();
  });

  document.addEventListener('pjax:success', initThemeToggle);
})();
