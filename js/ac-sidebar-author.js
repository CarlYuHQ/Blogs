(function () {
  var AVATAR_URLS = [
    'https://carlyuhq.github.io/Blogs/images/author-96.jpg',
    'https://carlyuhq.github.io/images/self.png',
  ];

  function pinAuthorBlock() {
    var sidebar = document.querySelector('aside.sidebar');
    if (!sidebar) return;

    var info =
      document.querySelector('#site-overview-wrap .site-info') ||
      document.querySelector('.site-info');
    if (!info) return;

    var wrap = document.getElementById('ac-sidebar-author');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'ac-sidebar-author';
      wrap.className = 'ac-sidebar-author';
      sidebar.insertBefore(wrap, sidebar.firstChild);
    }
    if (info.parentElement !== wrap) {
      wrap.appendChild(info);
    }
  }

  function fixAvatarImg(img) {
    if (!img || img.dataset.acFixed === '1') return;

    img.loading = 'eager';
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    img.width = 96;
    img.height = 96;
    img.style.setProperty('display', 'block', 'important');
    img.style.setProperty('width', '96px', 'important');
    img.style.setProperty('height', '96px', 'important');
    img.style.setProperty('max-width', 'none', 'important');
    img.style.setProperty('object-fit', 'cover', 'important');
    img.style.setProperty('object-position', 'center center', 'important');
    img.style.setProperty('opacity', '1', 'important');
    img.style.setProperty('visibility', 'visible', 'important');

    var link = img.closest('.site-author-avatar');
    if (link) {
      link.classList.remove('has-ac-avatar');
      link.style.removeProperty('background-image');
    }

    var index = 0;
    function tryNext() {
      if (index >= AVATAR_URLS.length) return;
      var url = AVATAR_URLS[index++];
      img.onload = function () {
        if (img.naturalWidth > 0) {
          img.dataset.acFixed = '1';
        } else {
          tryNext();
        }
      };
      img.onerror = function () {
        tryNext();
      };
      img.src = url;
    }

    tryNext();
  }

  function init() {
    pinAuthorBlock();
    var img =
      document.querySelector('#ac-sidebar-author .site-author-avatar img') ||
      document.querySelector('.site-author-avatar img');
    fixAvatarImg(img);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('pjax:success', function () {
    var img = document.querySelector('.site-author-avatar img');
    if (img) img.dataset.acFixed = '';
    init();
  });

  var menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      setTimeout(init, 100);
    });
  }
})();
