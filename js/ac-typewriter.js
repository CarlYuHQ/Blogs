(function () {
  const SPEED = 90;
  const SPEED_FAST = 60;

  function typeText(el, text, speed, onDone) {
    if (!el || text == null) return;
    el.textContent = '';
    el.classList.add('ac-typewriter-caret');
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i += 1;
        setTimeout(tick, speed);
      } else {
        el.classList.remove('ac-typewriter-caret');
        if (onDone) onDone();
      }
    };
    tick();
  }

  function initNotice() {
    const notice = document.querySelector('.notice span');
    if (!notice || notice.dataset.acTyped) return;
    const text = notice.innerText.trim();
    if (!text) return;
    notice.dataset.acTyped = '1';
    typeText(notice, text, SPEED);
  }

  function watchSay() {
    const content = document.getElementById('say-content');
    const from = document.getElementById('say-from');
    const author = document.getElementById('say-author');
    if (!content) return;

    const run = () => {
      if (content.dataset.acTyping === '1') return;
      const main = content.innerText.trim();
      if (!main) return;
      content.dataset.acTyping = '1';

      const fromText = from ? from.innerText.trim() : '';
      const authorText = author ? author.innerText.trim() : '';
      if (from) from.textContent = '';
      if (author) author.textContent = '';

      typeText(content, main, SPEED, () => {
        if (authorText) {
          typeText(author, authorText, SPEED_FAST, () => {
            if (fromText) typeText(from, fromText, SPEED_FAST);
          });
        } else if (fromText) {
          typeText(from, fromText, SPEED_FAST);
        }
      });
    };

    const obs = new MutationObserver(run);
    obs.observe(content, { childList: true, characterData: true, subtree: true });
    run();
  }

  function boot() {
    initNotice();
    watchSay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  document.addEventListener('pjax:success', boot);
})();
