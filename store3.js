/* ==========================================================
 * store2.js : السكريبت فقط (الستايل كله في store2.css)
 * ========================================================== */

/* أدوات مساعدة: لا تعدل فيها */
function vsReady(fn) {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
  else fn();
}
/* مراقب واحد خفيف: يشتغل مرة واحدة كحد أقصى في كل فريم */
function vsObserve(fn) {
  var queued = false;
  new MutationObserver(function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; fn(); });
  }).observe(document.body, { childList: true, subtree: true });
}

/* الجزء 1: الهيدر وشريط الإعلانات (+ إخفاء الهيدر مع السكرول) */
vsReady(function () {
  if (window.__vsHeader) return;
  window.__vsHeader = true;

  var root = document.documentElement;
  var lastY = window.pageYOffset || 0, hidden = false, ticking = false;
  var DELTA = 8, TOP_OFFSET = 100;

  function q(sel) { return document.querySelector(sel); }

  function measure() {
    var a = q('.ab-announce'), h = document.getElementById('eo-header');
    var total = (a ? a.offsetHeight : 0) + (h ? h.offsetHeight : 0) + 12;
    root.style.setProperty('--ab-hdr-total', total + 'px');
  }

  function isLocked() {
    var m = document.getElementById('eo-menu-btn'), d = document.getElementById('eo-desktop-nav-btn');
    if (m && m.getAttribute('aria-expanded') === 'true') return true;
    if (d && d.getAttribute('aria-expanded') === 'true') return true;
    var ae = document.activeElement;
    return !!(ae && ae.closest && ae.closest('.ab-header-search'));
  }

  function setHidden(v) {
    if (v === hidden) return;
    hidden = v;
    root.classList.toggle('ab-hdr-hidden', v);
  }

  function update() {
    ticking = false;
    var y = Math.max(window.pageYOffset || 0, 0);
    if (isLocked() || y < TOP_OFFSET) { setHidden(false); lastY = y; return; }
    if (Math.abs(y - lastY) < DELTA) return;
    setHidden(y > lastY);
    lastY = y;
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  measure();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); onScroll(); });
  window.addEventListener('load', measure);
  document.addEventListener('focusin', function (e) {
    if (e.target.closest && e.target.closest('.ab-header-search')) setHidden(false);
  });
  document.addEventListener('click', function () { setTimeout(onScroll, 50); });
});

/* الجزء 3: الرئيسية: سلايدر الأقسام (الموزاييك) + السحب بالماوس */
vsReady(function () {
  if (window.__vsMosaicDrag) return;
  window.__vsMosaicDrag = true;

  function init(g) {
    if (g.dataset.dragInit) return;
    g.dataset.dragInit = '1';
    var down = false, startX = 0, startScroll = 0;

    g.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; startX = e.clientX; startScroll = g.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 5) g.classList.add('is-dragging');
      g.scrollLeft = startScroll - dx;
    });
    window.addEventListener('pointerup', function () {
      down = false;
      setTimeout(function () { g.classList.remove('is-dragging'); }, 0);
    });
  }

  function run() { document.querySelectorAll('.category-mosaic__grid').forEach(init); }
  run();
  vsObserve(run);
});

/* الجزء 14: زر السلة السريع على كروت المنتجات */
vsReady(function () {
  if (window.__vsCardCart) return;
  window.__vsCardCart = true;

  var CART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>';
  var cache = {};

  function slugOf(a) {
    var m = (a.getAttribute('href') || '').match(/\/products\/([^\/?#]+)/);
    return m ? decodeURIComponent(m[1]) : '';
  }

  // بنجيب رقم المنتج من صفحته (مرة واحدة ونحفظه)
  function getId(slug) {
    if (cache[slug]) return Promise.resolve(cache[slug]);
    return fetch('/products/' + encodeURIComponent(slug), { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (t) {
        var m = t.match(/data-product-id="([0-9a-f-]{36})"/);
        if (m) cache[slug] = m[1];
        return m ? m[1] : null;
      })
      .catch(function () { return null; });
  }

  function onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    var btn = e.currentTarget;
    var card = btn.closest('a');
    var slug = card ? slugOf(card) : '';
    if (!slug) return;
    btn.classList.add('is-busy');
    getId(slug).then(function (id) {
      btn.classList.remove('is-busy');
      if (!id) { location.href = card.getAttribute('href'); return; }
      btn.dispatchEvent(new CustomEvent('quick-add', {
        bubbles: true,
        detail: { productId: id, openCart: false }
      }));
      btn.innerHTML = CHECK;
      btn.classList.add('is-done');
      setTimeout(function () {
        btn.innerHTML = CART;
        btn.classList.remove('is-done');
      }, 1400);
    });
  }

  function run() {
    var list = document.querySelectorAll('.ab-pgrid-card .ab-pgrid-media');
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (m.querySelector('.vs-cart-btn')) continue;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'vs-cart-btn';
      b.setAttribute('aria-label', 'أضف للسلة');
      b.innerHTML = CART;
      b.addEventListener('click', onClick);
      m.appendChild(b);
    }
  }

  run();
  vsObserve(run);
});

/* تسريع تحميل أول صور للفئات (Fetch Priority) */
(function() {
  function fixCategoryImgs() {
    const imgs = document.querySelectorAll('.category_card img');
    for (let i = 0; i < imgs.length && i < 6; i++) {
      imgs[i].loading = 'eager';
      if (i < 3) imgs[i].setAttribute('fetchpriority', 'high');
    }
  }
  if (document.readyState !== 'loading') fixCategoryImgs();
  else document.addEventListener('DOMContentLoaded', fixCategoryImgs);
})();

/* تحويل مباشر لصفحة الشراء عند الضغط على إتمام الطلب */
(function() {
  document.addEventListener('click', function(e) {
    const checkoutBtn = e.target.closest('[data-cart="checkout-wrapper"] button');
    if (checkoutBtn) {
      e.preventDefault();
      e.stopPropagation();
      checkoutBtn.style.opacity = '0.7';
      checkoutBtn.innerText = 'جاري الانتقال لإتمام الطلب...';
      window.location.href = '/checkout';
    }
  }, true);
})();
