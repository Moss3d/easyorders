/* ==========================================================
 * ملف الأكواد الرئيسي للمتجر (store.js)
 * كل جزء له عنوان كبير، وفيه الستايل (CSS) والسكريبت (JS) بتاعه.
 *
 * طريقة التعديل:
 *  - الستايل: جوه vsCss(String.raw` ... `)  (لا تكتب علامة ` ولا ${ جواه)
 *  - السكريبت: جوه vsReady(function () { ... })
 * ========================================================== */

/* أدوات مساعدة: لا تعدل فيها */
function vsCss(css) {
  var s = document.createElement("style");
  s.setAttribute("data-vs", "");
  s.textContent = css;
  (document.head || document.documentElement).appendChild(s);
}
function vsReady(fn) {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
  else fn();
}

/* ==========================================================
 * الجزء 0: الخط العام للمتجر
 * ========================================================== */
vsCss(String.raw`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700;800&display=swap');

  :root {
    --font-family: 'Noto Sans Arabic',sans-serif !important;
    --font-body: 'Noto Sans Arabic',sans-serif !important;
    --font-heading: 'Noto Sans Arabic',sans-serif !important;
    --ps-ff-primary: 'Noto Sans Arabic',sans-serif !important;
    --ps-ff-ui: 'Noto Sans Arabic',sans-serif !important;
  }

  *,
  *::before,
  *::after {
    font-family: 'Noto Sans Arabic',sans-serif !important;
  }
`);

/* ==========================================================
 * الجزء 1: الهيدر وشريط الإعلانات (+ إخفاء الهيدر مع السكرول)
 * ========================================================== */
vsCss(String.raw`
  .ab-header-row--main {
    position: relative;
  }

  .header-col-left .ab-logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    margin: 0 !important;
    z-index: 10;
  }

  .ab-ann-slide {
    font-weight: 700 !important;
    font-size: 13.5px !important;
    letter-spacing: -.2px;
  }

  .ab-announce,
  #eo-header {
    transition: transform .35s cubic-bezier(.22,.61,.36,1);
    will-change: transform;
  }

  html.ab-hdr-hidden .ab-announce,
  html.ab-hdr-hidden #eo-header {
    transform: translateY(calc(-1 * var(--ab-hdr-total,200px))) !important;
  }

  @media (prefers-reduced-motion:reduce) {
    .ab-announce,
    #eo-header {
      transition: none;
    }
  }
`);
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

/* ==========================================================
 * الجزء 2: الرئيسية: السلايدر والدوائر والعناوين والبانر والأزرار
 * ========================================================== */
vsCss(String.raw`
  /* ---------- السلايدر الرئيسي (موبايل) ---------- */
  @media (max-width:768px) {
    .ab-slider {
      max-height: 350px !important;
      overflow: hidden;
    }
    .ab-slider-slide,
    .ab-slider-slide picture,
    .ab-slider-slide img {
      height: 100% !important;
      max-height: 350px !important;
      object-fit: cover !important;
    }
  }

  /* ---------- دوائر الأقسام ---------- */
  .ab-cat-circle {
    width: 74px !important;
    height: 74px !important;
  }

  .ab-cat-circle img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  .ab-cat-label {
    font-size: 13px !important;
    font-weight: 400 !important;
    letter-spacing: normal !important;
    margin-top: 6px !important;
  }

  /* ---------- العناوين الرئيسية (منتجات + أقسام + عنوان المقارنة) ---------- */
  .ab-pgrid-title,
  .category-mosaic__title,
  .ab-comparison-title {
    color: #225C2A !important;
    font-weight: 700 !important;
    text-align: center !important;
    line-height: 1.3 !important;
    letter-spacing: -.3px !important;
  }

  .ab-pgrid-title,
  .category-mosaic__title {
    font-size: 22px !important;
    margin-bottom: 20px !important;
  }

  @media (max-width:768px) {
    .ab-pgrid-title,
    .category-mosaic__title {
      font-size: 19px !important;
      margin-bottom: 15px !important;
    }
  }

  /* عنوان المقارنة: النص الأصلي مخفي والنص الجديد من ::before (غيّر الكلام من هنا) */
  .ab-comparison-title {
    font-size: 0 !important;
    margin-bottom: 30px !important;
  }

  .ab-comparison-title::before {
    content: "تفاصيل تغير شكل المكان" !important;
    font-size: 22px !important;
    font-weight: 700 !important;
    color: #225C2A !important;
  }

  @media (max-width:768px) {
    .ab-comparison-title::before {
      font-size: 19px !important;
    }
  }

  /* ---------- البانر الإعلاني (Split Hero) ---------- */
  .ps-split-duo-hero__title {
    font-size: clamp(1.35rem,2.6vw,1.85rem) !important;
    line-height: 1.25 !important;
  }

  .ps-split-duo-hero__shell {
    box-shadow: none !important;
  }

  .ps-split-duo-hero__grid {
    min-height: 380px !important;
  }

  .ps-split-duo-hero__copy {
    padding: 24px 28px !important;
  }

  @media (max-width:768px) {
    .ps-split-duo-hero__title {
      font-size: 1.25rem !important;
    }
  }

  @media (max-width:767px) {
    .ps-split-duo-hero__grid {
      min-height: auto !important;
    }
    .ps-split-duo-hero__visual,
    .ps-split-duo-hero__media,
    .ps-split-duo-hero__img {
      min-height: 230px !important;
      max-height: 250px !important;
    }
    .ps-split-duo-hero__copy {
      padding: 20px 16px !important;
    }
  }

  /* ---------- أزرار "عرض المزيد" ---------- */
  .ab-pgrid-viewall-btn {
    border: 1.5px solid #225C2A !important;
    border-radius: 999px !important;
    background-color: transparent !important;
    color: #225C2A !important;
    transition: all .3s ease !important;
  }

  .ab-pgrid-viewall-btn:hover {
    background-color: #225C2A !important;
    color: #fff !important;
    border-color: #225C2A !important;
    transform: translateY(-2px);
  }

  button[data-variant="slim"] {
    background-color: transparent !important;
    color: #225C2A !important;
    border: 1.5px solid #225C2A !important;
    border-radius: 999px !important;
    box-shadow: none !important;
    margin-bottom: 50px !important;
    transition: all .3s ease !important;
  }

  button[data-variant="slim"]:hover {
    background-color: #225C2A !important;
    color: #fff !important;
    border-color: #225C2A !important;
    transform: translateY(-2px) !important;
    box-shadow: none !important;
  }
`);

/* ==========================================================
 * الجزء 3: الرئيسية: سلايدر الأقسام (الموزاييك) + السحب بالماوس
 * ========================================================== */
vsCss(String.raw`
  /* ---------- موبايل وتابلت ---------- */
  .category-mosaic__grid {
    display: flex !important;
    flex-wrap: nowrap !important;
    gap: 12px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    scroll-snap-type: x mandatory;
    scroll-padding: 0 16px;
    padding: 0 16px 6px !important;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    cursor: grab;
  }

  .category-mosaic__grid::-webkit-scrollbar {
    display: none;
  }

  .category-mosaic__grid.is-dragging {
    cursor: grabbing;
    scroll-snap-type: none;
  }

  .category-mosaic__grid.is-dragging * {
    pointer-events: none;
  }

  .category-mosaic__tile {
    flex: 0 0 78% !important;
    width: 78% !important;
    max-width: 78% !important;
    margin: 0 !important;
    grid-column: auto !important;
    grid-row: auto !important;
    scroll-snap-align: start;
  }

  .category-mosaic__visual {
    height: auto !important;
    aspect-ratio: 4/5;
    overflow: hidden;
    border-radius: 14px;
  }

  .category-mosaic__img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    -webkit-user-drag: none;
    user-select: none;
  }

  @media (min-width:600px) {
    .category-mosaic__tile {
      flex-basis: 40% !important;
      width: 40% !important;
      max-width: 40% !important;
    }
  }

  /* ---------- كمبيوتر: عرض كامل + 6 أقسام في الصف + هوفر ---------- */
  @media (min-width:1025px) {
    html {
      overflow-x: clip;
    }
    html body .category-mosaic__grid {
      width: 100vw !important;
      max-width: 100vw !important;
      margin-inline: calc(50% - 50vw) !important;
      padding: 0 24px 10px !important;
      gap: 14px !important;
      scroll-padding: 0 24px;
      scrollbar-width: none !important;
    }
    html body .category-mosaic__grid::-webkit-scrollbar {
      display: none !important;
    }
    html body .category-mosaic__grid .category-mosaic__tile {
      flex: 0 0 calc((100% - 5 * 14px) / 6) !important;
      width: calc((100% - 5 * 14px) / 6) !important;
      max-width: calc((100% - 5 * 14px) / 6) !important;
    }
    html body .category-mosaic__grid .category-mosaic__visual {
      position: relative;
      border-radius: 16px !important;
      box-shadow: 0 4px 14px rgba(0,0,0,.06);
      transition: box-shadow .35s ease,transform .35s ease;
    }
    html body .category-mosaic__grid .category-mosaic__img {
      transition: transform .6s cubic-bezier(.22,.61,.36,1);
    }
    html body .category-mosaic__grid .category-mosaic__tile:hover .category-mosaic__visual {
      transform: translateY(-4px);
      box-shadow: 0 12px 26px rgba(34,92,42,.18);
    }
    html body .category-mosaic__grid .category-mosaic__tile:hover .category-mosaic__img {
      transform: scale(1.06);
    }
    html body .category-mosaic__grid .category-mosaic__shade {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg,rgba(34,92,42,0) 55%,rgba(34,92,42,.28) 100%);
      opacity: 0;
      transition: opacity .35s ease;
      pointer-events: none;
    }
    html body .category-mosaic__grid .category-mosaic__tile:hover .category-mosaic__shade {
      opacity: 1;
    }
  }
`);
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
  new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
});

/* ==========================================================
 * الجزء 4: الرئيسية: المسافات + آراء العملاء + قسم المقارنة
 * ========================================================== */
vsCss(String.raw`
  /* ---------- توحيد المسافات بين أقسام الصفحة الرئيسية ---------- */
  .ab-categories,
  .ab-slider,
  .mcp-multi-cat,
  .fsc-flash-sale,
  .ab-pgrid,
  .ps-split-duo-hero,
  .ab-comparison-section,
  .home_section_container {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .ab-comparison-section {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  main.container_class>div.content_container {
    margin-bottom: 48px !important;
  }

  main.container_class>div.content_container:last-child {
    margin-bottom: 0 !important;
  }

  @media (max-width:768px) {
    main.container_class>div.content_container {
      margin-bottom: 32px !important;
    }
  }

  /* ---------- آراء العملاء: عنوان على الموبايل ---------- */
  @media (max-width:768px) {
    [sectionid="ce53dd9d-5e98-4017-a87a-8504d8ea0318"].css-15b4rjx,
    [sectionid="259a64cc-1507-4b2c-8575-53cf483a70c8"].css-15b4rjx,
    [url*="1791594506382623275"].css-15b4rjx {
      max-width: 85% !important;
      width: 85% !important;
      margin-top: 30px !important;
      margin-bottom: 30px !important;
    }
    [sectionid="ce53dd9d-5e98-4017-a87a-8504d8ea0318"].css-15b4rjx::before,
    [sectionid="259a64cc-1507-4b2c-8575-53cf483a70c8"].css-15b4rjx::before,
    [url*="1791594506382623275"].css-15b4rjx::before {
      content: "بعض من آراء عملائنا" !important;
      display: block !important;
      text-align: center !important;
      font-size: 20px !important;
      font-weight: 700 !important;
      color: #225C2A !important;
      margin-bottom: 16px !important;
      letter-spacing: -.3px;
    }
  }

  /* ---------- إخفاء قسم المقارنة وآراء العملاء على الكمبيوتر ---------- */
  @media (min-width:768px) {
    .ab-comparison-section,
    .content_container:has(.ab-comparison-section),
    .home_section_container:has([sectionid="ce53dd9d-5e98-4017-a87a-8504d8ea0318"]),
    .content_container:has([sectionid="ce53dd9d-5e98-4017-a87a-8504d8ea0318"]),
    .home_section_container:has([sectionid="259a64cc-1507-4b2c-8575-53cf483a70c8"]),
    .home_section_container:has([sectionid="d1ba0345-2140-40da-a5e7-fc79920562f6"]),
    .content_container:has([sectionid="d1ba0345-2140-40da-a5e7-fc79920562f6"]),
    .home_section_container:has([url*="1791594506382623275"]),
    .content_container:has([url*="1791594506382623275"]) {
      display: none !important;
    }
  }

  /* ---------- قسم المقارنة (قبل / بعد): الإطار والمقبض والشارات ---------- */
  .ab-comparison-slider {
    box-shadow: none !important;
  }

  .ab-orientation-horizontal .ab-comp-handle {
    width: 3px !important;
    background: rgba(255,255,255,.95) !important;
  }

  .ab-orientation-horizontal .ab-comp-handle-knob {
    width: 16px !important;
    height: 46px !important;
    box-shadow: 0 2px 10px rgba(0,0,0,.25) !important;
  }

  .ab-orientation-horizontal .ab-comp-handle-knob__grip {
    width: 2px !important;
  }

  .ab-orientation-horizontal .ab-comp-handle-knob__grip::before {
    left: -5px !important;
  }

  .ab-orientation-horizontal .ab-comp-handle-knob__grip::after {
    right: -5px !important;
  }

  .ab-comp-image-label {
    background: rgba(34,92,42,.88) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    color: #fff !important;
    border: 1px solid rgba(255,255,255,.3) !important;
    border-radius: 999px !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    padding: 6px 16px !important;
    box-shadow: 0 4px 12px rgba(0,0,0,.18) !important;
    top: 14px !important;
  }

  .ab-comp-image-label--left {
    left: 14px !important;
  }

  .ab-comp-image-label--right {
    right: 14px !important;
  }
`);

/* ==========================================================
 * الجزء 5: صفحة المنتج: الوصف والأكورديون والمراجعات والمخزون
 * ========================================================== */
vsCss(String.raw`
  /* ---------- مسار التنقل (Breadcrumbs) ---------- */
  .ab-breadcrumbs-list,
  .ab-breadcrumbs-item,
  .ab-breadcrumbs-item a,
  .ab-breadcrumbs-sep {
    font-size: 12px !important;
    color: #777 !important;
  }

  .ab-pd-description {
    color: #7a7a7a !important;
  }

  /* ---------- أكورديون تفاصيل المنتج ---------- */
  .lq-desc-accordion-item {
    border-bottom: 1px solid #eee !important;
    margin: 0 !important;
  }

  .lq-desc-accordion-trigger {
    padding: 13px 4px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    background: transparent !important;
    cursor: pointer;
  }

  .lq-desc-accordion-title {
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #1a1a1a !important;
  }

  .lq-desc-accordion-toggle {
    width: 14px !important;
    height: 14px !important;
    color: #888 !important;
  }

  /* ---------- نصوص وصف المنتج ---------- */
  .product_description .ql-editor,
  .product_description .ql-editor p,
  .product_description .ql-editor li {
    text-align: justify !important;
    text-justify: inter-word !important;
    text-align-last: right !important;
    width: 100% !important;
  }

  .product_description .ql-editor {
    line-height: 1.85 !important;
    font-size: 14px !important;
    color: #4a4a4a !important;
    padding: 10px 4px !important;
  }

  .product_description .ql-editor p {
    margin-bottom: 6px !important;
  }

  .product_description .ql-editor p strong {
    display: inline !important;
    word-spacing: normal !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #225C2A !important;
  }

  .product_description .ql-editor ol,
  .product_description .ql-editor ul {
    padding-inline-start: 16px !important;
    padding-inline-end: 0 !important;
    margin: 6px 0 14px !important;
  }

  .product_description .ql-editor li {
    font-size: 13.5px !important;
    line-height: 1.75 !important;
    color: #555 !important;
    margin-bottom: 8px !important;
  }

  .product_description .ql-editor li strong {
    color: #1a1a1a !important;
    font-weight: 700 !important;
  }

  /* ---------- مراجعات وتقييمات العملاء ---------- */
  .lq-desc-accordion-item--reviews .lq-desc-accordion-title {
    font-size: 0 !important;
    display: inline-block !important;
  }

  .lq-desc-accordion-item--reviews .lq-desc-accordion-title::before {
    content: "آراء العملاء" !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #1a1a1a !important;
  }

  .ab-reviews-header {
    background: #f9f9f9 !important;
    border: 1px solid #f0f0f0 !important;
    border-radius: 10px !important;
    padding: 12px 16px !important;
    margin: 6px 0 14px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 10px !important;
  }

  .ab-reviews-write-btn {
    background: transparent !important;
    color: #225C2A !important;
    border: 1.5px solid #225C2A !important;
    border-radius: 999px !important;
    font-size: 12.5px !important;
    font-weight: 600 !important;
    padding: 6px 16px !important;
    cursor: pointer;
    transition: all .25s ease;
  }

  .ab-reviews-write-btn:hover {
    background: #225C2A !important;
    color: #fff !important;
  }

  .ab-reviews-list {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
  }

  .ab-review-card {
    background: #fff !important;
    border: 1px solid #f0f0f0 !important;
    border-radius: 8px !important;
    padding: 10px 14px !important;
    box-shadow: none !important;
  }

  .ab-review-author {
    font-size: 13px !important;
    font-weight: 700 !important;
    color: #222 !important;
    margin: 4px 0 2px !important;
  }

  .ab-review-comment {
    font-size: 12.5px !important;
    color: #666 !important;
    line-height: 1.5 !important;
    margin: 0 !important;
  }

  /* ---------- عداد المخزون (Stock Alert) ---------- */
  .vasaya-stock-alert {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    margin: 12px 0 8px !important;
    color: #dc2626 !important;
    font-size: 13.5px !important;
    font-weight: 700 !important;
    direction: rtl !important;
    white-space: nowrap !important;
    line-height: 1 !important;
  }

  .vasaya-stock-dot {
    width: 8px !important;
    height: 8px !important;
    background-color: #ef4444 !important;
    border-radius: 50% !important;
    display: inline-block !important;
    flex-shrink: 0 !important;
    animation: v-pulse 1.8s infinite !important;
  }

  @keyframes v-pulse {
    0% {
      transform: scale(.95);
      box-shadow: 0 0 0 0 rgba(239,68,68,.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 6px rgba(239,68,68,0);
    }
    100% {
      transform: scale(.95);
      box-shadow: 0 0 0 0 rgba(239,68,68,0);
    }
  }
`);

/* ==========================================================
 * الجزء 6: صفحة المنتج: الباقات
 * ========================================================== */
vsCss(String.raw`
  html body .bundles_container {
    margin-top: 16px !important;
    direction: rtl;
  }

  html body .bundles_container .bundles_title {
    color: #1a1a1a !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    margin: 0 !important;
    letter-spacing: -.3px !important;
  }

  html body .bundles_container .bundles_description {
    color: #777 !important;
    font-size: 12.5px !important;
    margin: 3px 0 14px !important;
  }

  /* ---------- الكارت (غير محدد) ---------- */
  html body .bundles_container .bundles_item {
    position: relative !important;
    display: block !important;
    background: #fff !important;
    border: 1.5px solid #e3e8e3 !important;
    border-radius: 14px !important;
    padding: 12px 14px !important;
    margin: 0 0 12px !important;
    box-shadow: none !important;
    transform: none !important;
    text-align: start !important;
    cursor: pointer;
    transition: border-color .2s ease,background .2s ease,box-shadow .2s ease !important;
  }

  html body .bundles_container .bundles_item:hover {
    border-color: #9fbfa3 !important;
    transform: none !important;
  }

  html body .bundles_container .bundles_item>div:first-child,
  html body .bundles_container .bundles_item .flex-1 {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 4px 12px !important;
    text-align: start !important;
    width: 100% !important;
  }

  html body .bundles_container .bundles_item .relative {
    display: flex !important;
    align-items: center !important;
    margin: 0 !important;
  }

  /* ---------- الدايرة وعلامة الصح ---------- */
  html body .bundles_container .bundles_item .radio_container {
    position: relative !important;
    width: 22px !important;
    height: 22px !important;
    min-width: 22px !important;
    border-radius: 50% !important;
    border: 1.5px solid #b5c4b6 !important;
    background: #fff !important;
    margin: 0 0 0 10px !important;
    padding: 0 !important;
    font-size: 0 !important;
    transition: all .2s ease !important;
  }

  html body .bundles_container .bundles_item .radio_container>* {
    display: none !important;
  }

  html body .bundles_container .bundles_item .radio_container::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 7px;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2.2px 2.2px 0;
    transform: rotate(45deg) scale(0);
    transition: transform .2s ease;
  }

  /* ---------- الاسم والسعر ---------- */
  html body .bundles_container .bundles_item p {
    margin: 0 !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    color: #333 !important;
    line-height: 1.5 !important;
    text-align: start !important;
  }

  html body .bundles_container .bundles_item .line-through {
    color: #a3a3a3 !important;
    font-size: 12px !important;
    font-weight: 400 !important;
  }

  /* ---------- الكارت المحدد ---------- */
  html body .bundles_container .bundles_item[class*="border-skin-primary"] {
    border: 2px solid #225C2A !important;
    padding: 11.5px 13.5px !important;
    background: linear-gradient(135deg,#f1f9ee 0%,#fff 100%) !important;
    box-shadow: 0 0 0 4px rgba(34,92,42,.08) !important;
  }

  html body .bundles_container .bundles_item[class*="border-skin-primary"] .radio_container {
    background: #225C2A !important;
    border-color: #225C2A !important;
  }

  html body .bundles_container .bundles_item[class*="border-skin-primary"] .radio_container::after {
    transform: rotate(45deg) scale(1);
  }

  html body .bundles_container .bundles_item[class*="border-skin-primary"] p {
    color: #1a1a1a !important;
    font-weight: 700 !important;
  }

  /* ---------- شارة "الأوفر" ---------- */
  html body .bundles_container .bundles_item:last-of-type:not(:first-of-type)::before {
    content: "⚡ الأوفر";
    position: absolute;
    top: -10px;
    left: 14px;
    background: #FFC83D;
    color: #225C2A;
    font-size: 11px;
    font-weight: 800;
    padding: 1px 10px;
    border-radius: 999px;
    line-height: 1.7;
    box-shadow: 0 2px 6px rgba(0,0,0,.12);
  }

  html body .bundles_container .bundles_item:last-of-type:not(:first-of-type):not([class*="border-skin-primary"]) {
    border-color: #cfe3d1 !important;
    background: #fbfef9 !important;
  }

  /* ---------- ليبل الباقة ---------- */
  .bundles_label {
    background-color: #225C2A !important;
    border-radius: 6px !important;
    padding: 4px 12px !important;
    box-shadow: 0 2px 8px rgba(34,92,42,.2) !important;
  }

  .bundles_label span {
    font-size: 11.5px !important;
    font-weight: 700 !important;
    color: #fff !important;
    letter-spacing: -.2px !important;
  }
`);

/* ==========================================================
 * الجزء 7: صفحة المنتج: ملاحظة خصم القطعة التانية
 * ========================================================== */
vsCss(String.raw`
  .vs-offer-note {
    margin: 16px 0 0;
    padding: 14px 16px;
    background: linear-gradient(135deg,#f1f9ee 0%,#fff 100%);
    border: 1.5px dashed #225C2A;
    border-radius: 12px;
    direction: rtl;
    text-align: right;
  }

  .vs-offer-note__title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 10px;
    font-size: 17px;
    font-weight: 800;
    color: #225C2A;
    line-height: 1.4;
  }

  .vs-offer-note__line {
    margin: 0;
    padding: 6px 10px;
    font-size: 12.5px;
    font-weight: 500;
    color: #555;
    line-height: 1.5;
    background: rgba(34,92,42,.06);
    border-radius: 8px;
  }

  .vs-offer-note__line+.vs-offer-note__line {
    margin-top: 6px;
  }

  .vs-offer-note__line--accent {
    background: #fdf6dc;
    color: #7a5a12;
  }

  @media (max-width:768px) {
    .vs-offer-note {
      padding: 12px 14px;
    }
    .vs-offer-note__title {
      font-size: 16px;
    }
  }
`);
vsReady(function () {
  if (window.__vsOfferNote) return;
  window.__vsOfferNote = true;

  function q(sel) { return document.querySelector(sel); }
  function onProductPage() { return location.pathname.indexOf('/products/') === 0; }

  function tick() {
    var existing = document.getElementById('vs-offer-note');
    var checkoutBtn = q('.checkout_btn');
    if (!onProductPage() || !checkoutBtn) { if (existing) existing.remove(); return; }

    var target = checkoutBtn.parentElement;
    if (!target || !target.parentElement) return;
    if (existing && existing.nextElementSibling === target) return;
    if (existing) existing.remove();

    var box = document.createElement('div');
    box.id = 'vs-offer-note';
    box.className = 'vs-offer-note';
    // غيّر نصوص الخصم من هنا
    box.innerHTML =
      '<p class="vs-offer-note__title">🎁 خصم 10% على أي قطعة تانية</p>' +
      '<p class="vs-offer-note__line">يطبق الخصم سواء كان نفس المنتج او منتج آخر</p>' +
      '<p class="vs-offer-note__line vs-offer-note__line--accent">الخصم بيتطبق تلقائي في صفحة إتمام الطلب</p>';
    target.parentElement.insertBefore(box, target);
  }

  setInterval(tick, 400); // لأن المتجر بيغير الصفحات بدون إعادة تحميل
  tick();
});

/* ==========================================================
 * الجزء 8: صفحة المنتج: شريط الثقة (دفع/معاينة/استبدال)
 * ========================================================== */
vsCss(String.raw`
  .vs-trust {
    direction: rtl;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 6px;
    margin-top: 14px;
    padding: 10px 6px;
    background: #f7faf7;
    border: 1px solid #e3ece3;
    border-radius: 14px;
  }

  .vs-trust__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;
    padding: 0 4px;
    position: relative;
  }

  .vs-trust__item+.vs-trust__item::before {
    content: "";
    position: absolute;
    right: -3px;
    top: 15%;
    height: 70%;
    width: 1px;
    background: #dbe6db;
  }

  .vs-trust__icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #ECFBD5;
    color: #225C2A;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vs-trust__icon svg {
    width: 18px;
    height: 18px;
  }

  .vs-trust__text {
    font-size: 10px;
    font-weight: 700;
    line-height: 1.4;
    color: #1f3d24;
  }

  .vs-trust__text .vs-l1,
  .vs-trust__text .vs-l2 {
    display: inline;
  }

  /* موبايل: النص على سطرين */
  @media (max-width:768px) {
    html body .vs-trust {
      gap: 4px;
      padding: 10px 4px;
    }
    html body .vs-trust__item {
      gap: 6px;
      padding: 0 2px;
    }
    html body .vs-trust__text {
      font-size: 12px;
      line-height: 1.45;
      white-space: normal;
    }
    html body .vs-trust__text .vs-l1 {
      display: block;
      font-weight: 800;
      color: #1f3d24;
    }
    html body .vs-trust__text .vs-l2 {
      display: block;
      font-weight: 600;
      font-size: 11.5px;
      color: #4b6b50;
    }
  }
`);
vsReady(function () {
  if (window.__vsTrust) return;
  window.__vsTrust = true;

  function q(sel) { return document.querySelector(sel); }
  function onProductPage() { return location.pathname.indexOf('/products/') === 0; }

  // عدّل النصوص من هنا: a = السطر الأول، b = السطر التاني (لازم تطابق سياستكم الفعلية)
  var ITEMS = [
    { a: 'الدفع', b: 'عند الاستلام', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>' },
    { a: 'معاينة', b: 'قبل الدفع', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m9 12 2 2 4-4"/></svg>' },
    { a: 'استبدال', b: 'خلال 14 يوم', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>' }
  ];

  function build() {
    var box = document.createElement('div');
    box.className = 'vs-trust';
    ITEMS.forEach(function (it) {
      var item = document.createElement('div');
      item.className = 'vs-trust__item';
      var ic = document.createElement('span');
      ic.className = 'vs-trust__icon';
      ic.innerHTML = it.icon;
      var tx = document.createElement('span');
      tx.className = 'vs-trust__text';
      tx.setAttribute('aria-label', it.a + ' ' + it.b);
      var l1 = document.createElement('span');
      l1.className = 'vs-l1';
      l1.textContent = it.a;
      var l2 = document.createElement('span');
      l2.className = 'vs-l2';
      l2.textContent = it.b;
      tx.appendChild(l1);
      tx.appendChild(document.createTextNode(' '));
      tx.appendChild(l2);
      item.appendChild(ic);
      item.appendChild(tx);
      box.appendChild(item);
    });
    return box;
  }

  function tick() {
    var existing = q('.vs-trust');
    var buy = q('.checkout_btn');
    if (!onProductPage() || !buy || !buy.parentElement) { if (existing) existing.remove(); return; }
    var wrap = buy.parentElement;
    if (existing && existing.previousElementSibling === wrap) return;
    if (existing) existing.remove();
    wrap.insertAdjacentElement('afterend', build());
  }

  setInterval(tick, 400); // لأن المتجر بيغير الصفحات بدون إعادة تحميل
  tick();
});

/* ==========================================================
 * الجزء 9: صفحة المنتج: شريط "أضف للسلة" الثابت
 * ========================================================== */
vsCss(String.raw`
  .vs-sticky {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    background: #fff;
    border-top: 1px solid #e8efe8;
    box-shadow: 0 -4px 18px rgba(34,92,42,.1);
    padding: 10px 16px calc(10px + env(safe-area-inset-bottom,0px));
    direction: rtl;
    transform: translateY(110%);
    visibility: hidden;
    transition: transform .3s cubic-bezier(.22,.61,.36,1),visibility .3s;
  }

  .vs-sticky.is-visible {
    transform: translateY(0);
    visibility: visible;
  }

  .vs-sticky__inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .vs-sticky--button .vs-sticky__inner {
    max-width: 520px;
  }

  .vs-sticky__info {
    flex: 1;
    min-width: 0;
  }

  .vs-sticky__name {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vs-sticky__prices {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .vs-sticky__new {
    font-size: 15px;
    font-weight: 800;
    color: #225C2A;
  }

  .vs-sticky__old {
    font-size: 12px;
    color: #9a9a9a;
    text-decoration: line-through;
  }

  .vs-sticky__btn {
    border: 1.5px solid #225C2A;
    background: #225C2A;
    color: #fff;
    border-radius: 999px;
    padding: 12px 26px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: all .25s ease;
  }

  .vs-sticky--button .vs-sticky__btn {
    flex: 1;
    width: 100%;
  }

  .vs-sticky--info .vs-sticky__btn {
    flex: 0 0 auto;
    min-width: 150px;
  }

  .vs-sticky__btn:hover {
    background: #fff;
    color: #225C2A;
  }

  .vs-sticky__btn:active {
    transform: scale(.97);
  }

  .vs-sticky__btn.is-done {
    background: #ECFBD5;
    color: #225C2A;
  }

  html.vs-bar-on body {
    padding-bottom: 78px;
  }

  html.vs-bar-on .ab-floating-sidebar {
    bottom: 96px !important;
  }

  @media (max-width:768px) {
    .vs-sticky {
      padding-left: 12px;
      padding-right: 12px;
    }
    .vs-sticky__btn {
      padding: 12px 18px;
      font-size: 13.5px;
    }
    .vs-sticky--info .vs-sticky__btn {
      min-width: 130px;
    }
  }
`);
vsReady(function () {
  if (window.__vsSticky) return;
  window.__vsSticky = true;

  // true = اسم المنتج + السعر الجديد والقديم + الزر | false = الزر فقط
  var SHOW_INFO = true;
  var BTN_TEXT = 'أضف للسلة', DONE_TEXT = 'تمت الإضافة ✓';

  var root = document.documentElement;
  var bar = null, els = {};

  function q(sel) { return document.querySelector(sel); }
  function txt(sel) { var el = q(sel); return el ? el.textContent.trim() : ''; }
  function onProductPage() { return location.pathname.indexOf('/products/') === 0; }

  function build() {
    bar = document.createElement('div');
    bar.className = 'vs-sticky ' + (SHOW_INFO ? 'vs-sticky--info' : 'vs-sticky--button');
    var inner = document.createElement('div');
    inner.className = 'vs-sticky__inner';

    if (SHOW_INFO) {
      var info = document.createElement('div');
      info.className = 'vs-sticky__info';
      els.name = document.createElement('p');
      els.name.className = 'vs-sticky__name';
      var prices = document.createElement('div');
      prices.className = 'vs-sticky__prices';
      els.newP = document.createElement('span');
      els.newP.className = 'vs-sticky__new';
      els.oldP = document.createElement('span');
      els.oldP.className = 'vs-sticky__old';
      prices.appendChild(els.newP);
      prices.appendChild(els.oldP);
      info.appendChild(els.name);
      info.appendChild(prices);
      inner.appendChild(info);
    }

    els.btn = document.createElement('button');
    els.btn.type = 'button';
    els.btn.className = 'vs-sticky__btn';
    els.btn.textContent = BTN_TEXT;
    els.btn.addEventListener('click', function () {
      var orig = q('.add_to_cart_btn');
      if (!orig || orig.disabled) return;
      orig.click();
      els.btn.textContent = DONE_TEXT;
      els.btn.classList.add('is-done');
      setTimeout(function () {
        els.btn.textContent = BTN_TEXT;
        els.btn.classList.remove('is-done');
      }, 1500);
    });
    inner.appendChild(els.btn);

    bar.appendChild(inner);
    document.body.appendChild(bar);
    root.classList.add('vs-bar-on');
  }

  function destroy() {
    if (!bar) return;
    bar.remove(); bar = null; els = {};
    root.classList.remove('vs-bar-on');
  }

  function tick() {
    var isProduct = onProductPage() && q('.ab-pd .ab-pd-name');
    var orig = q('.add_to_cart_btn');
    if (!isProduct || !orig) { destroy(); return; }
    if (!bar) build();

    if (SHOW_INFO) {
      var name = txt('.ab-pd-name');
      var newP = txt('.ab-pd-price-sale') || txt('.ab-pd-price');
      var oldP = txt('.ab-pd-price-old');
      if (els.name.textContent !== name) els.name.textContent = name;
      if (els.newP.textContent !== newP) els.newP.textContent = newP;
      if (els.oldP.textContent !== oldP) els.oldP.textContent = oldP;
      els.oldP.style.display = oldP ? '' : 'none';
    }

    // يظهر لما الزر الأصلي يخرج من الشاشة، ويختفي لو المنتج نفذ
    var r = orig.getBoundingClientRect();
    var outOfView = r.bottom < 0 || r.top > window.innerHeight;
    var scrolled = (window.pageYOffset || 0) > 80;
    bar.classList.toggle('is-visible', outOfView && scrolled && !orig.disabled);
  }

  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick);
  setInterval(tick, 400); // لأن المتجر بيغير الصفحات بدون إعادة تحميل
  tick();
});

/* ==========================================================
 * الجزء 10: صفحة عروض ما بعد الطلب
 * ========================================================== */
vsCss(String.raw`
  /* مساحة فارغة في آخر الصفحة عشان الشريط الثابت ما يغطيش المحتوى */
  body:has(.fixed.bottom-0) main::after {
    content: "" !important;
    display: block !important;
    height: 200px !important;
    width: 100% !important;
    clear: both !important;
  }

  /* كارت العرض */
  body:has(.fixed.bottom-0) .border-skin-primary:not(button):not(.bundles_item) {
    border: 1.5px dashed #225C2A !important;
    background: linear-gradient(180deg,#fafffa 0%,#f4f8f4 100%) !important;
    border-radius: 16px !important;
    padding: 20px 16px !important;
    margin-bottom: 25px !important;
    text-align: center !important;
    box-shadow: 0 4px 15px rgba(34,92,42,.04) !important;
  }

  /* نص العرض (غيّر الكلام من هنا) */
  body:has(.fixed.bottom-0) .border-skin-primary .ql-editor>div::before {
    content: "🎁\Aلأنك طلبت الآن: احصل على خصم خاص!";
    white-space: pre-line !important;
    display: block !important;
    font-size: 17px !important;
    font-weight: 800 !important;
    color: #225C2A !important;
    line-height: 1.4 !important;
    margin-bottom: 12px !important;
    text-align: center !important;
  }

  body:has(.fixed.bottom-0) .border-skin-primary .ql-editor>div::first-line {
    font-size: 32px !important;
    line-height: 1.2 !important;
  }

  body:has(.fixed.bottom-0) .border-skin-primary .ql-editor>div::after {
    content: "⏳ فرصة لمرة واحدة • متاح على هذه الصفحة فقط";
    display: inline-block !important;
    background-color: #fef3c7 !important;
    color: #92400e !important;
    font-size: 12.5px !important;
    font-weight: 700 !important;
    padding: 6px 16px !important;
    border-radius: 999px !important;
    border: 1px solid #fde68a !important;
    margin: 0 auto !important;
    text-align: center !important;
  }

  /* السعر */
  body:has(.fixed.bottom-0) .mt-3:has(#sale-price) {
    background: #fdfdfd !important;
    border: 1px solid #eef2ee !important;
    border-radius: 12px !important;
    padding: 12px 18px !important;
    margin-top: 10px !important;
    display: inline-block !important;
    width: 100% !important;
  }

  body:has(.fixed.bottom-0) .mt-3:has(#sale-price) .flex-col {
    flex-direction: row-reverse !important;
    justify-content: space-between !important;
    align-items: center !important;
  }

  body:has(.fixed.bottom-0) #sale-price {
    font-size: 28px !important;
    font-weight: 900 !important;
    color: #225C2A !important;
  }

  body:has(.fixed.bottom-0) #sale-price::after {
    content: " ج.م";
    font-size: 14px !important;
    font-weight: 600 !important;
  }

  body:has(.fixed.bottom-0) .mt-3:has(#sale-price) .line-through {
    color: #a0a0a0 !important;
    font-size: 16px !important;
    text-decoration: line-through !important;
  }

  body:has(.fixed.bottom-0) .mt-3:has(#sale-price) .line-through::after {
    content: " ج.م";
    font-size: 12px !important;
  }

  body:has(.fixed.bottom-0) .mt-3:has(#sale-price) .text-sm:has(+ .line-through) {
    color: #777 !important;
    font-size: 12px !important;
  }
`);

/* ==========================================================
 * الجزء 11: صفحة الشكر
 * ========================================================== */
vsCss(String.raw`
  /* ---------- الحاوية والكارت ---------- */
  .thanks_container {
    margin-top: 0 !important;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }

  .ab-thanks {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 10px 16px !important;
    margin-top: 10px !important;
  }

  .ab-thanks-content {
    background: #fff !important;
    border: 1px solid #eef2ee !important;
    border-radius: 24px !important;
    box-shadow: 0 15px 35px -5px rgba(0,0,0,.06) !important;
    max-width: 480px !important;
    width: 100% !important;
    padding: 36px 24px !important;
    text-align: center !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
  }

  /* ---------- أيقونة النبتة ---------- */
  .ab-thanks-custom-content h1:first-child {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 72px !important;
    height: 72px !important;
    background: #ECFBD5 !important;
    border-radius: 50% !important;
    font-size: 36px !important;
    margin: 0 auto 16px !important;
    box-shadow: 0 4px 15px rgba(34,92,42,.12) !important;
    text-align: center !important;
  }

  /* ---------- العنوان والنصوص ---------- */
  .ab-thanks-custom-content h1:nth-child(2) {
    color: #225C2A !important;
    font-size: 22px !important;
    font-weight: 800 !important;
    margin-bottom: 16px !important;
    letter-spacing: -.3px !important;
  }

  .ab-thanks-custom-content .ql-editor {
    line-height: normal !important;
    padding: 0 !important;
  }

  .ab-thanks-custom-content h3 {
    font-size: 14px !important;
    font-weight: 500 !important;
    color: #4b5563 !important;
    line-height: 1.6 !important;
    margin: 4px 0 !important;
    text-align: center !important;
  }

  .ab-thanks-custom-content h3:last-of-type {
    background: #f7faf7 !important;
    border: 1px dashed rgba(34,92,42,.35) !important;
    border-radius: 12px !important;
    padding: 10px 14px !important;
    color: #225C2A !important;
    font-weight: 700 !important;
    margin-top: 14px !important;
  }

  /* ---------- زر الذهاب للرئيسية ---------- */
  .ab-thanks-home-btn {
    background: #225C2A !important;
    color: #fff !important;
    border: none !important;
    border-radius: 999px !important;
    padding: 12px 34px !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    cursor: pointer !important;
    margin-top: 24px !important;
    box-shadow: 0 4px 14px rgba(34,92,42,.25) !important;
    transition: all .25s ease !important;
  }

  .ab-thanks-home-btn:hover {
    background: #194620 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(34,92,42,.35) !important;
  }
`);

/* ==========================================================
 * الجزء 12: صفحة إتمام الطلب (الستايل)
 * ========================================================== */
vsCss(String.raw`
  /* ---------- ملخص الطلب مفتوح دايماً (الزر معطّل) ---------- */
  #checkout-order-summary-content,
  #checkout-mobile-order-summary-content {
    display: block !important;
  }

  #checkout-order-summary-toggle,
  .checkout_mobile_total_toggle {
    pointer-events: none !important;
  }

  /* ---------- الخلفية العامة ---------- */
  html body .app_container>.bg-white {
    background: #f6f9f6 !important;
  }

  html body .checkout_bg_left {
    background: #f1f6f1 !important;
  }

  html body .checkout_bg_right {
    border: 0 !important;
  }

  /* ---------- الهيدر: لوجو صغير في النص ---------- */
  html body header:has(>.checkout_header) {
    background: #fff !important;
    border-bottom: 1px solid #e8efe8 !important;
  }

  html body .checkout_header {
    justify-content: center !important;
    padding: 12px 16px !important;
  }

  html body .checkout_header .relative.overflow-hidden,
  html body .checkout_header img {
    height: 30px !important;
    width: auto !important;
  }

  /* ---------- ملخص الطلب: عنوان بسيط ---------- */
  html body #checkout-order-summary-toggle {
    min-height: 0 !important;
    padding: 0 0 10px !important;
    border-bottom: 1px solid #eef2ee;
  }

  html body #checkout-order-summary-toggle>span:first-child,
  html body #summary-heading {
    font-size: 15px !important;
    font-weight: 800 !important;
    color: #225C2A !important;
  }

  html body #summary-heading {
    margin: 0 0 4px !important;
  }

  /* ---------- المنتجات داخل الملخص ---------- */
  html body .checkout_cart_items_container {
    margin: 6px 0 !important;
  }

  html body .checkout_cart_item {
    padding: 10px 0 !important;
    gap: 12px !important;
  }

  html body .checkout_cart_item>a {
    width: 52px !important;
    height: 52px !important;
    border-radius: 12px !important;
    box-shadow: none !important;
    border: 1px solid #e8efe8;
  }

  html body .checkout_cart_item>a>span {
    height: 20px !important;
    min-width: 20px !important;
    font-size: 11px !important;
    background: #225C2A !important;
    border-width: 2px !important;
    border-radius: 999px !important;
  }

  html body .checkout_cart_item p.truncate {
    font-size: 13px !important;
    font-weight: 700 !important;
    color: #1a1a1a !important;
  }

  html body .checkout_cart_item .tabular-nums {
    font-size: 13px !important;
    font-weight: 700 !important;
  }

  html body .checkout_cart_item .line-through {
    font-size: 11.5px !important;
    font-weight: 400 !important;
  }

  html body .checkout_cart_item p.mt-1 {
    color: #225C2A !important;
    font-size: 11.5px !important;
    font-weight: 600 !important;
  }

  html body .checkout_cart_item .mt-2 {
    margin-top: 6px !important;
    justify-content: space-between !important;
  }

  html body .checkout_cart_item button[aria-label$="quantity"] {
    padding: 3px !important;
    border-radius: 8px !important;
    border-color: #dfe7df !important;
  }

  html body .checkout_cart_item button[aria-label$="quantity"] svg {
    width: 14px !important;
    height: 14px !important;
  }

  html body .checkout_cart_item p.w-10 {
    width: 30px !important;
    font-size: 13px !important;
    font-weight: 700 !important;
  }

  html body .checkout_cart_item button[aria-label="Remove item"] svg {
    width: 17px !important;
    height: 17px !important;
  }

  /* ---------- كود الخصم ---------- */
  html body .checkout_discount_section {
    margin-bottom: 14px !important;
  }

  html body .checkout_discount_section label {
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #666 !important;
  }

  html body .checkout_discount_section .global_input {
    padding: 9px 12px !important;
  }

  html body .checkout_discount_section button {
    height: 42px;
    padding: 0 18px !important;
    border-radius: 12px !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    border: 1.5px solid #225C2A !important;
    color: #225C2A !important;
    background: #fff !important;
  }

  html body .checkout_discount_section button:disabled {
    opacity: .45;
    border-color: #c9d6ca !important;
    color: #8a9a8c !important;
  }

  /* ---------- الإجماليات ---------- */
  html body .checkout_order_summary [data-invoice="invoice"] {
    display: flex !important;
    flex-direction: column;
    gap: 10px;
    padding: 12px 0 0 !important;
    border-top: 1px solid #eef2ee !important;
    font-size: 13px !important;
  }

  html body .checkout_order_summary [data-invoice="invoice"]>* {
    margin: 0 !important;
  }

  html body .checkout_order_summary [data-invoice="invoice"] dt {
    font-weight: 500;
    color: #666 !important;
  }

  html body .checkout_order_summary [data-invoice="invoice"] dd {
    font-size: 13px;
    font-weight: 700;
  }

  html body .checkout_order_summary [data-invoice="invoice"]>div:has(>[data-invoice="invoice-total"]) {
    border-top: 1px dashed #d4e2d5 !important;
    padding-top: 12px !important;
  }

  html body .checkout_order_summary [data-invoice="invoice-total-label"] {
    font-size: 15px !important;
    font-weight: 800 !important;
    color: #1a1a1a !important;
  }

  html body .checkout_order_summary [data-invoice="invoice-total-value"] {
    font-size: 18px !important;
    font-weight: 800 !important;
    color: #225C2A !important;
  }

  html body .checkout_order_summary [data-invoice="invoice-total-savings"] {
    background: #ECFBD5;
    color: #225C2A !important;
    border-radius: 10px;
    padding: 6px 10px;
    margin-top: 10px !important;
    font-size: 12.5px !important;
    font-weight: 700 !important;
    justify-content: center;
  }

  /* ---------- شريط الشحن المجاني ---------- */
  html body .checkout_form .rounded-lg.border-gray-300 {
    margin: 0 0 12px !important;
    background: #f1f9ee !important;
    border: 1px solid #d9e8d6 !important;
    border-radius: 14px !important;
  }

  html body .checkout_form .rounded-lg.border-gray-300>.p-4 {
    padding: 10px 14px 12px !important;
  }

  html body .checkout_form .rounded-lg.border-gray-300>.p-4>span {
    margin-bottom: 8px !important;
    font-size: 12.5px !important;
    font-weight: 700 !important;
    color: #225C2A !important;
  }

  html body .checkout_form .rounded-lg.border-gray-300>.p-4 [class*="c5d2de"] {
    background: #dcebd8 !important;
    height: 6px !important;
  }

  html body .checkout_form .rounded-lg.border-gray-300>.p-4 [class*="202223"] {
    background: #225C2A !important;
    height: 6px !important;
  }

  /* تعديل لاحق على شريط الشحن (لازم يفضل بعد اللي فوقه) */
  html body .checkout_form .rounded-lg.border-gray-300>.p-4>span[class*="202223"] {
    background: transparent !important;
    height: auto !important;
  }

  /* ---------- بيانات العميل ---------- */
  html body .contact-info-heading h2 {
    font-size: 15px !important;
    font-weight: 800 !important;
    color: #225C2A !important;
    margin: 0 0 4px !important;
  }

  html body .contact-info-heading .mt-3 {
    margin-top: 12px !important;
  }

  html body .contact-info-heading label {
    font-size: 12.5px !important;
    font-weight: 600 !important;
    color: #333 !important;
    margin-bottom: 2px;
  }

  html body .checkout_container .global_input,
  html body .checkout_container .global_textarea {
    width: 100%;
    background: #fff !important;
    border: 1.5px solid #dfe7df !important;
    border-radius: 12px !important;
    padding: 11px 14px !important;
    font-size: 16px !important;
    line-height: 1.4 !important;
    color: #1a1a1a !important;
    box-shadow: none !important;
    outline: none !important;
    transition: border-color .2s ease,box-shadow .2s ease;
  }

  html body .checkout_container .global_textarea {
    height: 88px !important;
    resize: none;
  }

  html body .checkout_container .global_input:focus,
  html body .checkout_container .global_textarea:focus {
    border-color: #225C2A !important;
    box-shadow: 0 0 0 3px rgba(34,92,42,.12) !important;
  }

  /* ---------- المحافظة (القائمة المنسدلة) ---------- */
  html body .gov_select .select__control {
    min-height: 46px !important;
    background: #fff !important;
    border: 1.5px solid #dfe7df !important;
    border-radius: 12px !important;
    box-shadow: none !important;
  }

  html body .gov_select .select__control--is-focused,
  html body .gov_select .select__control:hover {
    border-color: #225C2A !important;
  }

  html body .gov_select .select__control--is-focused {
    box-shadow: 0 0 0 3px rgba(34,92,42,.12) !important;
  }

  html body .gov_select .select__single-value {
    font-size: 16px !important;
    color: #1a1a1a !important;
  }

  html body .gov_select .select__indicator-separator {
    display: none !important;
  }

  html body .gov_select .select__menu {
    border-radius: 12px !important;
    overflow: hidden;
    box-shadow: 0 10px 28px rgba(0,0,0,.12) !important;
  }

  html body .gov_select .select__option--is-focused {
    background: #ECFBD5 !important;
    color: #1a1a1a !important;
  }

  html body .gov_select .select__option--is-selected {
    background: #225C2A !important;
    color: #fff !important;
  }

  /* ---------- زر إتمام الطلب ---------- */
  html body #checkout-button .checkout_buy_now {
    background: #225C2A !important;
    color: #fff !important;
    border: 1.5px solid #225C2A !important;
    border-radius: 999px !important;
    padding: 14px 24px !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    transition: background .2s ease,transform .15s ease;
  }

  html body #checkout-button .checkout_buy_now:hover {
    background: #194620 !important;
  }

  html body #checkout-button .checkout_buy_now:active {
    transform: scale(.98);
  }

  /* ---------- روابط السياسات في الآخر ---------- */
  html body .checkout_store_pages {
    justify-content: center;
    gap: 6px 16px !important;
    margin-top: 14px !important;
    padding: 14px 0 6px !important;
    border-top: 1px solid #e8efe8 !important;
  }

  html body .checkout_store_pages a {
    font-size: 12px !important;
    color: #8a948b !important;
  }

  /* ---------- موبايل وتابلت: زر ثابت أسفل الصفحة + كروت بيضاء ---------- */
  @media (max-width:1023px) {
    html body #checkout-button.checkout_button {
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      top: auto !important;
      z-index: 50 !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 10px 16px calc(10px + env(safe-area-inset-bottom,0px)) !important;
      background: #fff !important;
      border-top: 1px solid #e8efe8;
      box-shadow: 0 -4px 18px rgba(34,92,42,.1);
      transform: none !important;
    }
    html body #checkout-button .checkout_buy_now {
      width: 100% !important;
    }
    html body:has(#checkout-button) {
      padding-bottom: 84px !important;
    }
    html body .checkout_order_summary {
      background: #fff !important;
      border: 1px solid #e3ece3 !important;
      border-radius: 16px;
      margin: 12px 12px 0 !important;
      padding: 12px 14px !important;
    }
    html body .checkout_form {
      padding: 12px 12px 20px !important;
    }
    html body .contact-info-heading {
      background: #fff;
      border: 1px solid #e3ece3;
      border-radius: 16px;
      padding: 14px;
    }
  }

  /* ---------- الكمبيوتر: عمودين والملخص ثابت وقت التمرير ---------- */
  @media (min-width:1024px) {
    html body .checkout_container {
      max-width: 1100px !important;
      column-gap: 56px !important;
      padding-top: 28px !important;
    }
    html body .checkout_order_summary {
      position: sticky;
      top: 84px;
      align-self: start;
      background: #fff !important;
      border: 1px solid #e3ece3;
      border-radius: 18px;
      padding: 20px !important;
      margin-bottom: 24px;
    }
    html body .checkout_container .global_input,
    html body .checkout_container .global_textarea,
    html body .gov_select .select__single-value {
      font-size: 14.5px !important;
    }
    html body #checkout-button {
      margin-top: 18px !important;
    }
  }
`);

/* ==========================================================
 * الجزء 13: صفحة إتمام الطلب: المنتجات المقترحة
 * ========================================================== */
vsCss(String.raw`
  .vs-sg {
    direction: rtl;
    margin: 14px 0 18px;
    padding: 14px 14px 6px;
    background: #f7faf7;
    border: 1px solid #e3ece3;
    border-radius: 16px;
  }

  .vs-sg__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 4px;
  }

  .vs-sg__title {
    margin: 0;
    font-size: 14px;
    font-weight: 800;
    color: #225C2A;
  }

  .vs-sg__hint {
    font-size: 11.5px;
    color: #7a8a7c;
  }

  .vs-sg__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .vs-sg__item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 0;
    border-top: 1px solid #e6eee6;
  }

  .vs-sg__item:first-child {
    border-top: 0;
  }

  .vs-sg__img {
    position: relative;
    flex: 0 0 76px;
    width: 76px;
    height: 76px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #e8efe8;
    background: #fff;
    cursor: zoom-in;
  }

  .vs-sg__img::after {
    content: "";
    position: absolute;
    left: 5px;
    bottom: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(34,92,42,.88) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2.4' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='6'/%3E%3Cpath d='m20 20-4-4M11 8v6M8 11h6'/%3E%3C/svg%3E") center/12px no-repeat;
  }

  .vs-sg__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .vs-sg__info {
    flex: 1;
    min-width: 0;
  }

  .vs-sg__name {
    cursor: pointer;
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vs-sg__prices {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .vs-sg__new,
  .vs-sg__old {
    display: inline-flex;
    align-items: baseline;
    gap: 3px;
    unicode-bidi: isolate;
    direction: rtl;
  }

  .vs-sg__cur {
    unicode-bidi: isolate;
    direction: rtl;
  }

  .vs-sg__new {
    font-size: 13px;
    font-weight: 800;
    color: #225C2A;
  }

  .vs-sg__old {
    font-size: 11.5px;
    color: #9a9a9a;
    text-decoration: line-through;
  }

  .vs-sg__btn {
    flex: 0 0 auto;
    border: 1.5px solid #225C2A;
    background: #fff;
    color: #225C2A;
    border-radius: 999px;
    padding: 7px 16px;
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: all .25s ease;
  }

  .vs-sg__btn:hover {
    background: #225C2A;
    color: #fff;
  }

  .vs-sg__btn:active {
    transform: scale(.97);
  }

  .vs-sg__btn.is-done {
    background: #ECFBD5;
    border-color: #ECFBD5;
    color: #225C2A;
    pointer-events: none;
  }

  /* نافذة تكبير الصورة */
  .vs-lb {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(15,30,18,.62);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    direction: rtl;
  }

  .vs-lb__card {
    position: relative;
    width: 100%;
    max-width: 420px;
    max-height: 92vh;
    overflow: auto;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(0,0,0,.28);
  }

  .vs-lb__x {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    width: 34px;
    height: 34px;
    border: 0;
    border-radius: 50%;
    background: rgba(255,255,255,.92);
    color: #225C2A;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,.18);
  }

  .vs-lb__img {
    display: block;
    width: 100%;
    max-height: 60vh;
    object-fit: contain;
    background: #f7faf7;
  }

  .vs-lb__body {
    padding: 14px 16px 16px;
  }

  .vs-lb__name {
    margin: 0 0 6px;
    font-size: 15px;
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1.5;
  }

  .vs-lb__body .vs-sg__new {
    font-size: 16px;
  }

  .vs-lb__add {
    display: block;
    width: 100%;
    margin-top: 14px;
    border: 1.5px solid #225C2A;
    background: #225C2A;
    color: #fff;
    border-radius: 999px;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all .25s ease;
  }

  .vs-lb__add:active {
    transform: scale(.98);
  }

  .vs-lb__add.is-done {
    background: #ECFBD5;
    border-color: #ECFBD5;
    color: #225C2A;
    pointer-events: none;
  }
`);
vsReady(function () {
  if (window.__vsSuggest) return;
  window.__vsSuggest = true;

  var MAX = 3, GRACE = 1400; // MAX = عدد المنتجات المقترحة
  var picks = [], doneAt = {}, sig = '';

  function q(s, r) { return (r || document).querySelector(s); }
  function qa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function path(h) { return (h || '').split('?')[0]; }
  function num(t) { return (t || '').replace(/[^\d.,]/g, ''); }

  function cartMap() {
    var o = {};
    qa('.checkout_cart_item > a').forEach(function (a) { o[path(a.getAttribute('href'))] = 1; });
    return o;
  }

  function source() {
    var seen = {}, out = [];
    qa('.checkout_form .swiper-slide:not(.swiper-slide-duplicate)').forEach(function (sl) {
      var a = q('a[href^="/products/"]', sl), b = q('button', sl);
      if (!a || !b) return;
      var h = path(a.getAttribute('href'));
      if (seen[h]) return;
      seen[h] = 1;
      var img = q('img', sl), nm = q('h3', sl), pr = q('span.font-bold', sl), od = q('span.line-through', sl);
      out.push({
        href: h,
        name: nm ? nm.textContent.trim() : '',
        img: img ? img.getAttribute('src') : '',
        price: num(pr && pr.textContent),
        old: num(od && od.textContent),
        btn: b
      });
    });
    return out;
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function choose(src, inCart) {
    var now = Date.now(), byHref = {};
    src.forEach(function (s) { byHref[s.href] = s; });
    var avail = src.filter(function (s) { return !inCart[s.href]; });
    var availMap = {};
    avail.forEach(function (s) { availMap[s.href] = 1; });
    picks = picks.filter(function (p) {
      return availMap[p.href] || (doneAt[p.href] && now - doneAt[p.href] < GRACE);
    }).map(function (p) { return byHref[p.href] || p; });
    var have = {};
    picks.forEach(function (p) { have[p.href] = 1; });
    shuffle(avail.filter(function (s) { return !have[s.href]; })).forEach(function (s) {
      if (picks.length < MAX) picks.push(s);
    });
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function money(cls, n) {
    var w = el('span', cls);
    w.appendChild(el('span', '', n));
    w.appendChild(el('span', 'vs-sg__cur', 'ج.م'));
    return w;
  }

  function addToCart(href) {
    var s = source().filter(function (x) { return x.href === href; })[0];
    if (!s) return false;
    s.btn.click();
    doneAt[href] = Date.now();
    return true;
  }

  // ---------- نافذة تكبير الصورة ----------
  function closeLightbox() {
    var lb = document.getElementById('vs-lb');
    if (lb) lb.remove();
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape') closeLightbox(); }

  function openLightbox(p) {
    closeLightbox();
    var lb = el('div', 'vs-lb');
    lb.id = 'vs-lb';
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    var card = el('div', 'vs-lb__card');
    var x = el('button', 'vs-lb__x', '✕');
    x.type = 'button';
    x.setAttribute('aria-label', 'إغلاق');
    x.addEventListener('click', closeLightbox);
    var img = document.createElement('img');
    img.className = 'vs-lb__img';
    img.setAttribute('src', p.img);
    img.setAttribute('alt', p.name);
    var body = el('div', 'vs-lb__body');
    body.appendChild(el('p', 'vs-lb__name', p.name));
    var pr = el('div', 'vs-sg__prices');
    pr.appendChild(money('vs-sg__new', p.price));
    if (p.old) pr.appendChild(money('vs-sg__old', p.old));
    body.appendChild(pr);
    var btn = el('button', 'vs-lb__add', doneAt[p.href] ? 'تمت الإضافة ✓' : '+ أضف للسلة');
    btn.type = 'button';
    if (doneAt[p.href]) btn.classList.add('is-done');
    btn.addEventListener('click', function () {
      if (!addToCart(p.href)) return;
      btn.textContent = 'تمت الإضافة ✓';
      btn.classList.add('is-done');
      setTimeout(closeLightbox, 700);
    });
    body.appendChild(btn);
    card.appendChild(x);
    card.appendChild(img);
    card.appendChild(body);
    lb.appendChild(card);
    document.body.appendChild(lb);
    document.addEventListener('keydown', onKey);
  }

  // ---------- صندوق المنتجات المقترحة ----------
  function render(box) {
    box.innerHTML = '';
    var head = el('div', 'vs-sg__head');
    head.appendChild(el('h3', 'vs-sg__title', 'منتجات مكمّلة لطلبك'));
    head.appendChild(el('span', 'vs-sg__hint', 'إضافات اختيارية'));
    box.appendChild(head);
    var ul = el('ul', 'vs-sg__list');
    picks.forEach(function (p) {
      var li = el('li', 'vs-sg__item');
      var imgWrap = el('div', 'vs-sg__img');
      var img = document.createElement('img');
      img.setAttribute('src', p.img);
      img.setAttribute('alt', p.name);
      img.setAttribute('loading', 'lazy');
      imgWrap.appendChild(img);
      imgWrap.addEventListener('click', function () { openLightbox(p); });
      var info = el('div', 'vs-sg__info');
      var nameEl = el('p', 'vs-sg__name', p.name);
      nameEl.addEventListener('click', function () { openLightbox(p); });
      info.appendChild(nameEl);
      var pr = el('div', 'vs-sg__prices');
      pr.appendChild(money('vs-sg__new', p.price));
      if (p.old) pr.appendChild(money('vs-sg__old', p.old));
      info.appendChild(pr);
      var btn = el('button', 'vs-sg__btn', doneAt[p.href] ? 'تمت الإضافة ✓' : '+ أضف');
      btn.type = 'button';
      if (doneAt[p.href]) btn.classList.add('is-done');
      btn.addEventListener('click', function () {
        if (!addToCart(p.href)) return;
        btn.textContent = 'تمت الإضافة ✓';
        btn.classList.add('is-done');
      });
      li.appendChild(imgWrap);
      li.appendChild(info);
      li.appendChild(btn);
      ul.appendChild(li);
    });
    box.appendChild(ul);
  }

  function tick() {
    var box = document.getElementById('vs-suggest');
    var anchor = q('#checkout-button');
    var onCheckout = q('#checkout-form') && anchor && q('.checkout_cart_item');
    if (!onCheckout) { if (box) box.remove(); return; }

    choose(source(), cartMap());
    if (!picks.length) { if (box) box.remove(); sig = ''; return; }

    var s = picks.map(function (p) { return p.href + (doneAt[p.href] ? '!' : ''); }).join('|');
    if (!box) {
      box = el('div', 'vs-sg');
      box.id = 'vs-suggest';
      sig = '';
    }
    if (s !== sig) { render(box); sig = s; }
    if (box.nextElementSibling !== anchor) anchor.parentNode.insertBefore(box, anchor);
  }

  setInterval(tick, 400);
  tick();
});

/* ==========================================================
 * الجزء 14: زر السلة السريع على كروت المنتجات
 * ========================================================== */
vsCss(String.raw`
  .ab-pgrid-media {
    position: relative;
  }

  .vs-cart-btn {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 2;
    width: 36px;
    height: 36px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: #225C2A;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(34,92,42,.28);
    transition: transform .2s ease,background .2s ease;
  }

  .vs-cart-btn:hover {
    transform: scale(1.08);
    background: #194620;
  }

  .vs-cart-btn:active {
    transform: scale(.94);
  }

  .vs-cart-btn svg {
    width: 18px;
    height: 18px;
    pointer-events: none;
  }

  .vs-cart-btn.is-busy {
    opacity: .6;
    pointer-events: none;
  }

  .vs-cart-btn.is-done {
    background: #ECFBD5;
    color: #225C2A;
    pointer-events: none;
  }

  /* شكل الزجاج (يغطي على اللون الأخضر فوق) */
  html body .vs-cart-btn {
    background: rgba(255,255,255,.55);
    color: #225C2A;
    border: 1px solid rgba(255,255,255,.75);
    -webkit-backdrop-filter: blur(10px) saturate(1.4);
    backdrop-filter: blur(10px) saturate(1.4);
    box-shadow: 0 4px 14px rgba(34,92,42,.18),inset 0 1px 0 rgba(255,255,255,.7);
  }

  html body .vs-cart-btn:hover {
    background: rgba(255,255,255,.8);
    transform: scale(1.06);
  }

  html body .vs-cart-btn:active {
    transform: scale(.94);
  }

  html body .vs-cart-btn.is-done {
    background: rgba(236,251,213,.85);
    color: #225C2A;
  }
`);
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
  new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
});

/* ==========================================================
 * الجزء 15: الفوتر
 * ========================================================== */
vsCss(String.raw`
  .ab-footer-heading {
    font-size: 14px !important;
    font-weight: 700 !important;
  }

  .ab-footer-links a {
    font-size: 12.5px !important;
    line-height: 1.5 !important;
  }

  .ab-footer-copy,
  .ab-footer-legal a {
    font-size: 11.5px !important;
  }

  .ab-footer-copy {
    opacity: .85;
  }
`);

/* ==========================================================
 * الجزء 16: العناصر المخفية
 * ========================================================== */
vsCss(String.raw`
  /* لإظهار أي عنصر: امسح اسمه من القائمة (وخلي القائمة فيها عنصر واحد على الأقل أو امسح القاعدة كلها) */
  /* سيلكتورات :has في قواعد لوحدها عشان لو المتصفح مش بيدعمها ما تبوظش الباقي */
  /* ---------- الهيدر ---------- */
  .ab-header-offers-btn,
  .ab-mobile-offers-btn {
    display: none !important;
  }

  /* ---------- الصفحة الرئيسية ---------- */
  .ab-featured-header,
  .ab-featured-scrollbar {
    display: none !important;
  }

  /* ---------- صفحة المنتج ---------- */
  .ab-pd-desc-actions,
  .ab-pgrid-compare,
  .ab-related-products-intro,
  .ab-related-products-title,
  .ab-reviews-accordion-headline,
  .ab-reviews-header .ab-reviews-title,
  .ab-fake-stock {
    display: none !important;
  }

  .ab-plist-header:has(.ab-related-products-title),
  .product_description .ql-editor p:has(br:only-child),
  .product_description .ql-editor h2:has(br) {
    display: none !important;
  }

  /* ---------- الباقات ---------- */
  .bundles_label .absolute {
    display: none !important;
  }

  /* ---------- صفحة عروض ما بعد الطلب ---------- */
  body:has(.fixed.bottom-0) .border-skin-primary .ql-editor p,
  body:has(.fixed.bottom-0) .mt-3:has(#sale-price) .text-sm:has(+ #sale-price),
  body:has(.fixed.bottom-0) .pt-6:has(.ql-editor),
  body:has(.fixed.bottom-0) footer.ab-footer {
    display: none !important;
  }

  /* ---------- صفحة الشكر ---------- */
  .ab-thanks-offers,
  .ab-invoice-card--track {
    display: none !important;
  }

  .ab-thanks-custom-content p:has(br:only-child),
  .ab-thanks-custom-content h3:has(br) {
    display: none !important;
  }

  /* ---------- صفحة إتمام الطلب ---------- */
  #checkout-order-summary-toggle svg,
  .checkout_mobile_total_toggle svg,
  #checkout-mobile-add-discount-button,
  .checkout_add_discount,
  [data-invoice="checkout-mobile-total-savings"],
  .checkout_mobile_bottom_summary,
  html body #checkout-order-summary-toggle>span:last-child {
    display: none !important;
  }

  div:has(>#checkout-mobile-add-discount-button) {
    display: none !important;
  }

  /* ---------- عام / الفوتر ---------- */
  .ab-footer-powered,
  .min_value_carousel,
  .min_value_swiper_button_prev,
  .min_value_swiper_button_next {
    display: none !important;
  }

  div:has(>.min_value_carousel) {
    display: none !important;
  }

.ab-pgrid-title {
  font-size: 2em; /* الضعف بالنسبة لحجم الخط الأصلي */
}


  
`);
