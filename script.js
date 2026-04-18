document.addEventListener('DOMContentLoaded', function () {

  // ── SEARCH BAR EXPAND / COLLAPSE ──────────────────────────
  const searchBar   = document.getElementById('search');
  const searchIcon  = searchBar ? searchBar.querySelector('.fa-search') : null;
  const closeIcon   = searchBar ? searchBar.querySelector('.fa-times')  : null;

  if (searchIcon) {
    searchIcon.addEventListener('click', function () {
      searchBar.classList.add('expand');
      const input = searchBar.querySelector('.search-input');
      if (input) input.focus();
    });
  }

  if (closeIcon) {
    closeIcon.addEventListener('click', function () {
      searchBar.classList.remove('expand');
    });
  }

  // ── MOBILE HAMBURGER MENU ──────────────────────────────────
  const hamburgerBtn  = document.getElementById('hamburger-btn');
  const mobileNav     = document.getElementById('mobile-nav');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const closeNavBtn   = document.getElementById('close-nav');

  function openMobileMenu() {
    if (!mobileNav || !mobileOverlay) return;
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (hamburgerBtn) hamburgerBtn.classList.add('open');
  }

  function closeMobileMenu() {
    if (!mobileNav || !mobileOverlay) return;
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('show');
    document.body.style.overflow = '';
    if (hamburgerBtn) hamburgerBtn.classList.remove('open');
  }

  if (hamburgerBtn)  hamburgerBtn.addEventListener('click', openMobileMenu);
  if (closeNavBtn)   closeNavBtn.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // Close on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Close when a nav link is tapped
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // ── STICKY HEADER SHADOW on SCROLL ────────────────────────
  const header = document.querySelector('header');
  window.addEventListener('scroll', function () {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 16px rgba(0,0,0,0.18)'
      : '0 2px 8px rgba(0,0,0,0.12)';
  }, { passive: true });

  // ── NEWS CARD CLICK (placeholder) ─────────────────────────
  document.querySelectorAll('.news-card, .news-box, .chennai-card, .news-card-horizontal')
    .forEach(function (card) {
      card.addEventListener('click', function () {
        // Add real navigation here when links are available
        // e.g. window.location.href = card.dataset.url;
      });
    });

  // ── SHARE BUTTON CLICK ────────────────────────────────────
  document.querySelectorAll('.comments, .comment-icon, .comment-icon3')
    .forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (navigator.share) {
          navigator.share({ title: 'DT Next News', url: window.location.href });
        } else {
          // Fallback: copy URL
          navigator.clipboard.writeText(window.location.href).then(function () {
            showToast('Link copied!');
          });
        }
      });
    });

  // ── TOAST NOTIFICATION ────────────────────────────────────
  function showToast(msg) {
    let toast = document.getElementById('dt-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dt-toast';
      toast.style.cssText =
        'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(10px);' +
        'background:#1e799d;color:#fff;padding:10px 22px;border-radius:50px;' +
        'font-size:0.85rem;font-weight:600;z-index:9999;opacity:0;transition:all 0.35s;' +
        'white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,0.2);';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
    }, 2500);
  }

  // ── READ MORE BUTTONS ─────────────────────────────────────
  document.querySelectorAll('.skew-button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showToast('Loading more articles...');
    });
  });

});
