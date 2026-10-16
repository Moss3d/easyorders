/* ==========================================================
 * ملف واحد فيه كل شيء: الستايل (CSS) + السكريبتات (JS)
 *  - الجزء الأول: الستايل (بيتحط في الصفحة فوراً)
 *  - الجزء الثاني: السكريبتات (بتشتغل بعد تحميل الصفحة)
 * ========================================================== */

/* ---------------------- 1) الستايل ---------------------- */
(function () {
  if (document.getElementById("vs-store-css")) return;
  var css = String.raw`
  /* ============================================================
     0. الخط العام للمتجر (Google Fonts)
     ============================================================ */
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700;800&display=swap');

  :root {
    --font-family: 'Noto Sans Arabic', sans-serif !important;
    --font-body: 'Noto Sans Arabic', sans-serif !important;
    --font-heading: 'Noto Sans Arabic', sans-serif !important;
    --ps-ff-primary: 'Noto Sans Arabic', sans-serif !important;
    --ps-ff-ui: 'Noto Sans Arabic', sans-serif !important;
  }

  *,
  *::before,
  *::after,
  html,
  body,
  input,
  button,
  select,
  textarea,
  h1, h2, h3, h4, h5, h6,
  p, span, a, label {
    font-family: 'Noto Sans Arabic', sans-serif !important;
  }


  /* ============================================================
     1. الهيدر وشريط الإعلانات
     ============================================================ */
  .ab-header-row--main {
    position: relative;
  }

  /* اللوجو في المنتصف */
  .header-col-left .ab-logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0 !important;
    z-index: 10;
  }

  .ab-ann-slide {
    font-weight: 700 !important;
    font-size: 13.5px !important;
    letter-spacing: -0.2px;
  }

  /* حركة إخفاء/إظهار الهيدر (مرتبطة بسكريبت A) */
  .ab-announce,
  #eo-header {
    transition: transform .35s cubic-bezier(.22, .61, .36, 1);
    will-change: transform;
  }

  html.ab-hdr-hidden .ab-announce,
  html.ab-hdr-hidden #eo-header {
    transform: translateY(calc(-1 * var(--ab-hdr-total, 200px))) !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .ab-announce,
    #eo-header { transition: none; }
  }

  /* إخفاء أزرار العروض في الهيدر */
  .ab-header-offers-btn,
  .ab-mobile-offers-btn {
    display: none !important;
  }


  /* ============================================================
     2. الصفحة الرئيسية
     ============================================================ */

  /* ---------- 2.1 السلايدر الرئيسي ---------- */
  @media (max-width: 768px) {
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

  /* ---------- 2.2 دوائر الأقسام ---------- */
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

  /* ---------- 2.3 العناوين الرئيسية ---------- */
  .ab-pgrid-title,
  .category-mosaic__title {
    color: #225C2A !important;
    font-size: 22px !important;
    font-weight: 700 !important;
    text-align: center !important;
    line-height: 1.3 !important;
    margin-bottom: 20px !important;
    letter-spacing: -0.3px !important;
  }

  @media (max-width: 768px) {
    .ab-pgrid-title,
    .category-mosaic__title {
      font-size: 19px !important;
      margin-bottom: 15px !important;
    }
  }

  /* ---------- 2.4 سلايدر تصنيفات الموزاييك ---------- */
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

  .category-mosaic__grid::-webkit-scrollbar { display: none; }
  .category-mosaic__grid.is-dragging { cursor: grabbing; scroll-snap-type: none; }
  .category-mosaic__grid.is-dragging * { pointer-events: none; }

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
    aspect-ratio: 4 / 5;
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

  /* تابلت */
  @media (min-width: 600px) {
    .category-mosaic__tile {
      flex-basis: 40% !important;
      width: 40% !important;
      max-width: 40% !important;
    }
  }

  /* كمبيوتر: عرض كامل للشاشة + 6 أقسام في الصف */
  @media (min-width: 1025px) {

    /* منع ظهور سكرول أفقي بسبب العرض الكامل */
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
      aspect-ratio: 4 / 5;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
      transition: box-shadow .35s ease, transform .35s ease;
    }

    html body .category-mosaic__grid .category-mosaic__img {
      transition: transform .6s cubic-bezier(.22, .61, .36, 1);
    }

    /* هوفر: زووم خفيف + رفع الكارت */
    html body .category-mosaic__grid .category-mosaic__tile:hover .category-mosaic__visual {
      transform: translateY(-4px);
      box-shadow: 0 12px 26px rgba(34, 92, 42, 0.18);
    }

    html body .category-mosaic__grid .category-mosaic__tile:hover .category-mosaic__img {
      transform: scale(1.06);
    }

    /* طبقة لون أخضر خفيفة تظهر عند الهوفر */
    html body .category-mosaic__grid .category-mosaic__shade {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(34, 92, 42, 0) 55%, rgba(34, 92, 42, 0.28) 100%);
      opacity: 0;
      transition: opacity .35s ease;
      pointer-events: none;
    }

    html body .category-mosaic__grid .category-mosaic__tile:hover .category-mosaic__shade {
      opacity: 1;
    }
  }

  /* ---------- 2.5 توحيد المسافات بين أقسام الصفحة الرئيسية ---------- */
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

  main.container_class > div.content_container {
    margin-bottom: 48px !important;
  }

  main.container_class > div.content_container:last-child {
    margin-bottom: 0 !important;
  }

  @media (max-width: 768px) {
    main.container_class > div.content_container {
      margin-bottom: 32px !important;
    }
  }

  /* ---------- 2.6 البانر الإعلاني (Split Hero) ---------- */
  .ps-split-duo-hero__title {
    font-size: clamp(1.35rem, 2.6vw, 1.85rem) !important;
    line-height: 1.25 !important;
  }

  /* كمبيوتر: تقليل الارتفاع والحشو */
  .ps-split-duo-hero__grid {
    min-height: 380px !important;
  }

  .ps-split-duo-hero__copy {
    padding: 24px 28px !important;
  }

  /* بدون ظل */
  .ps-split-duo-hero__shell {
    box-shadow: none !important;
  }

  @media (max-width: 768px) {
    .ps-split-duo-hero__title {
      font-size: 1.25rem !important;
    }
  }

  /* موبايل: تقليل ارتفاع البانر والصورة */
  @media (max-width: 767px) {
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

  /* ---------- 2.7 أزرار "عرض المزيد" ---------- */
  .ab-pgrid-viewall-btn {
    border: 1.5px solid #225C2A !important;
    border-radius: 999px !important;
    background-color: transparent !important;
    color: #225C2A !important;
    transition: all 0.3s ease !important;
  }

  .ab-pgrid-viewall-btn:hover {
    background-color: #225C2A !important;
    color: #ffffff !important;
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
    transition: all 0.3s ease !important;
  }

  button[data-variant="slim"]:hover {
    background-color: #225C2A !important;
    color: #ffffff !important;
    border-color: #225C2A !important;
    transform: translateY(-2px) !important;
    box-shadow: none !important;
  }

  /* ---------- 2.8 قسم المقارنة (قبل / بعد) ---------- */

  /* العنوان: النص الأصلي مخفي (font-size: 0) والنص الجديد من ::before */
  .ab-comparison-title {
    color: #225C2A !important;
    font-size: 0 !important;
    font-weight: 700 !important;
    text-align: center !important;
    line-height: 1.3 !important;
    margin-bottom: 30px !important;
    letter-spacing: -0.3px !important;
  }

  .ab-comparison-title::before {
    content: " تفاصيل تغير شكل المكان " !important;
    font-size: 22px !important;
    font-weight: 700 !important;
    color: #225C2A !important;
  }

  @media (max-width: 768px) {
    .ab-comparison-title::before {
      font-size: 19px !important;
    }
  }

  /* بدون ظل أسفل إطار الصورة */
  .ab-comparison-slider {
    box-shadow: none !important;
  }

  /* خط الفصل والمقبض (أعرض وأسهل في السحب) */
  .ab-orientation-horizontal .ab-comp-handle {
    width: 3px !important;
    background: rgba(255, 255, 255, 0.95) !important;
  }

  .ab-orientation-horizontal .ab-comp-handle-knob {
    width: 16px !important;
    height: 46px !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25) !important;
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

  /* شارتي (قبل) و (بعد) */
  .ab-comp-image-label {
    background: rgba(34, 92, 42, 0.88) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    color: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-radius: 999px !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    padding: 6px 16px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18) !important;
    top: 14px !important;
  }

  .ab-comp-image-label--left {
    left: 14px !important;
  }

  .ab-comp-image-label--right {
    right: 14px !important;
  }

  /* ---------- 2.9 آراء العملاء + إخفاء حسب الشاشة ---------- */

  /* موبايل: عنوان "بعض من آراء عملائنا" */
  @media (max-width: 768px) {
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
      letter-spacing: -0.3px;
    }
  }

  /* كمبيوتر: إخفاء قسم المقارنة وآراء العملاء */
  @media (min-width: 768px) {
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

  /* عناصر مخفية في الصفحة الرئيسية */
  .ab-featured-header,
  .ab-featured-scrollbar {
    display: none !important;
  }


  /* ============================================================
     3. صفحة المنتج
     ============================================================ */

  /* ---------- 3.1 مسار التنقل (Breadcrumbs) ---------- */
  .ab-breadcrumbs-list,
  .ab-breadcrumbs-item,
  .ab-breadcrumbs-item a,
  .ab-breadcrumbs-sep {
    font-size: 12px !important;
    color: #777777 !important;
  }

  .ab-pd-description {
    color: #7a7a7a !important;
  }

  /* عناصر مخفية في صفحة المنتج */
  .ab-pd-desc-actions,
  .ab-product-desc-root .ab-pd-desc-actions,
  .ab-pgrid-compare,
  .ab-plist-header:has(.ab-related-products-title),
  .ab-related-products-intro,
  .ab-related-products-title,
  .ab-fake-stock {
    display: none !important;
  }

  /* ---------- 3.2 أكورديون تفاصيل المنتج ---------- */
  .lq-desc-accordion-item {
    border-bottom: 1px solid #eeeeee !important;
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
    color: #888888 !important;
  }

  /* ---------- 3.3 نصوص وصف المنتج ---------- */
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
    margin-top: 14px !important;
    margin-bottom: 6px !important;
  }

  .product_description .ql-editor ol,
  .product_description .ql-editor ul {
    padding-inline-start: 16px !important;
    padding-inline-end: 0 !important;
    margin-inline: 0 !important;
    margin: 6px 0 14px !important;
  }

  .product_description .ql-editor li {
    font-size: 13.5px !important;
    line-height: 1.75 !important;
    color: #555555 !important;
    margin-bottom: 8px !important;
  }

  .product_description .ql-editor li strong {
    color: #1a1a1a !important;
    font-weight: 700 !important;
  }

  .product_description .ql-editor p:has(br:only-child),
  .product_description .ql-editor h2:has(br) {
    display: none !important;
  }

  /* ---------- 3.4 مراجعات وتقييمات العملاء ---------- */
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

  .ab-reviews-accordion-headline,
  .ab-reviews-header .ab-reviews-title {
    display: none !important;
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
    transition: all 0.25s ease;
  }

  .ab-reviews-write-btn:hover {
    background: #225C2A !important;
    color: #ffffff !important;
  }

  .ab-reviews-list {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
  }

  .ab-review-card {
    background: #ffffff !important;
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
    color: #666666 !important;
    line-height: 1.5 !important;
    margin: 0 !important;
  }

  /* ---------- 3.5 عداد المخزون (Stock Alert) ---------- */
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
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
    }
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
    }
  }

  /* ---------- 3.6 الباقات (Bundles) ----------
     ملاحظة: التصميم على مرحلتين، الأولى ثم الثانية (الأقوى) فوقها.
     لا تغيّر ترتيبهم عشان الثانية لازم تفضل بعد الأولى. */

  /* (أ) التصميم الأساسي */
  .bundles_title {
    color: #225C2A !important;
    font-size: 20px !important;
    font-weight: 800 !important;
    letter-spacing: -0.3px !important;
  }

  .bundles_description {
    color: #666666 !important;
    font-size: 13.5px !important;
    margin-top: 4px !important;
    margin-bottom: 20px !important;
  }

  .bundles_item {
    border: 1.5px solid #e5e7eb !important;
    border-radius: 14px !important;
    background-color: #ffffff !important;
    padding: 18px 16px !important;
    padding-top: 24px !important;
    margin-bottom: 16px !important;
    transition: all 0.25s ease-in-out !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02) !important;
  }

  .bundles_item:hover {
    border-color: #a3c2a8 !important;
    transform: translateY(-2px);
  }

  .bundles_item.\!border-skin-primary,
  .bundles_item[class*="border-skin-primary"] {
    border-color: #225C2A !important;
    border-width: 2px !important;
    background-color: #f7faf7 !important;
    box-shadow: 0 4px 15px rgba(34, 92, 42, 0.08) !important;
  }

  .radio_container {
    border-color: #225C2A !important;
    width: 22px !important;
    height: 22px !important;
  }

  .radio_circle.bg-blue-500,
  .bundles_item.\!border-skin-primary .radio_circle {
    background-color: #225C2A !important;
    width: 12px !important;
    height: 12px !important;
  }

  .bundles_item p.text-xl {
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #1a1a1a !important;
    margin-inline-start: 10px !important;
  }

  .bundles_label {
    background-color: #225C2A !important;
    border-radius: 6px !important;
    padding: 4px 12px !important;
    box-shadow: 0 2px 8px rgba(34, 92, 42, 0.2) !important;
  }

  .bundles_label span {
    font-size: 11.5px !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    letter-spacing: -0.2px !important;
  }

  .bundles_label .absolute {
    display: none !important;
  }

  /* (ب) التصميم المبسط والجذاب (يغطي على الأول) */
  html body .bundles_container {
    margin-top: 16px !important;
    direction: rtl;
  }

  html body .bundles_container .bundles_title {
    color: #1a1a1a !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    margin: 0 !important;
  }

  html body .bundles_container .bundles_description {
    color: #777 !important;
    font-size: 12.5px !important;
    margin: 3px 0 14px !important;
  }

  /* الكارت (غير محدد) */
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
    transition: border-color .2s ease, background .2s ease, box-shadow .2s ease !important;
  }

  html body .bundles_container .bundles_item:hover {
    border-color: #9fbfa3 !important;
    transform: none !important;
  }

  /* الصف الداخلي: الاسم يمين والسعر شمال */
  html body .bundles_container .bundles_item > div:first-child,
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

  /* الدايرة وعلامة الصح */
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

  /* إخفاء أي علامة قديمة جوه الدايرة */
  html body .bundles_container .bundles_item .radio_container > * {
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

  /* الاسم والسعر */
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

  /* الكارت المحدد */
  html body .bundles_container .bundles_item[class*="border-skin-primary"] {
    border: 2px solid #225C2A !important;
    padding: 11.5px 13.5px !important;
    background: linear-gradient(135deg, #f1f9ee 0%, #ffffff 100%) !important;
    box-shadow: 0 0 0 4px rgba(34, 92, 42, .08) !important;
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

  /* شارة "الأوفر" على حافة الكارت (لا تزود الارتفاع) */
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
    box-shadow: 0 2px 6px rgba(0, 0, 0, .12);
  }

  /* لمسة خفيفة تميز كارت العرض وهو غير محدد */
  html body .bundles_container .bundles_item:last-of-type:not(:first-of-type):not([class*="border-skin-primary"]) {
    border-color: #cfe3d1 !important;
    background: #fbfef9 !important;
  }

  /* ---------- 3.7 شريط "أضف للسلة" الثابت (سكريبت C) ---------- */
  .vs-sticky {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    background: #ffffff;
    border-top: 1px solid #e8efe8;
    box-shadow: 0 -4px 18px rgba(34, 92, 42, 0.10);
    padding: 10px 16px calc(10px + env(safe-area-inset-bottom, 0px));
    direction: rtl;
    transform: translateY(110%);
    visibility: hidden;
    transition: transform .3s cubic-bezier(.22, .61, .36, 1), visibility .3s;
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

  /* نسخة الزر فقط */
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
    color: #ffffff;
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
    background: #ffffff;
    color: #225C2A;
  }

  .vs-sticky__btn:active {
    transform: scale(.97);
  }

  .vs-sticky__btn.is-done {
    background: #ECFBD5;
    color: #225C2A;
  }

  /* مسافة تحت الصفحة عشان الشريط ما يغطيش الفوتر */
  html.vs-bar-on body {
    padding-bottom: 78px;
  }

  /* رفع زر "للأعلى" فوق الشريط */
  html.vs-bar-on .ab-floating-sidebar {
    bottom: 96px !important;
  }

  @media (max-width: 768px) {
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

  /* ---------- 3.8 ملاحظة خصم القطعة التانية (سكريبت D) ---------- */
  .vs-offer-note {
    margin: 16px 0 0;
    padding: 14px 16px;
    background: linear-gradient(135deg, #f1f9ee 0%, #ffffff 100%);
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
    color: #555555;
    line-height: 1.5;
    background: rgba(34, 92, 42, 0.06);
    border-radius: 8px;
  }

  .vs-offer-note__line + .vs-offer-note__line {
    margin-top: 6px;
  }

  .vs-offer-note__line--accent {
    background: #fdf6dc;
    color: #7a5a12;
  }

  @media (max-width: 768px) {
    .vs-offer-note { padding: 12px 14px; }
    .vs-offer-note__title { font-size: 16px; }
  }

  /* ---------- 3.9 شريط الثقة (سكريبت E و F) ---------- */
  .vs-trust {
    direction: rtl;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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

  /* فاصل رفيع بين العناصر */
  .vs-trust__item + .vs-trust__item::before {
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

  /* موبايل: النص على سطرين */
  @media (max-width: 768px) {
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

    /* السطر الأول (الكلمة الرئيسية) أغمق وأوضح */
    html body .vs-trust__text .vs-l1 {
      display: block;
      font-weight: 800;
      color: #1f3d24;
    }

    /* السطر التاني (التفصيلة) أخف */
    html body .vs-trust__text .vs-l2 {
      display: block;
      font-weight: 600;
      font-size: 11.5px;
      color: #4b6b50;
    }
  }

  /* كمبيوتر: الجزئين في سطر واحد */
  @media (min-width: 769px) {
    html body .vs-trust__text .vs-l1,
    html body .vs-trust__text .vs-l2 {
      display: inline;
    }
  }


  /* ============================================================
     4. صفحة عروض ما بعد الطلب (Cross-Selling)
     ============================================================ */
  body:has(.fixed.bottom-0) .border-skin-primary:not(button):not(.bundles_item) {
    border: 1.5px dashed #225C2A !important;
    background: linear-gradient(180deg, #fafffa 0%, #f4f8f4 100%) !important;
    border-radius: 16px !important;
    padding: 20px 16px !important;
    margin-bottom: 25px !important;
    text-align: center !important;
    box-shadow: 0 4px 15px rgba(34, 92, 42, 0.04) !important;
  }

  body:has(.fixed.bottom-0) .border-skin-primary .ql-editor p {
    display: none !important;
  }

  body:has(.fixed.bottom-0) .border-skin-primary .ql-editor > div::before {
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

  body:has(.fixed.bottom-0) .border-skin-primary .ql-editor > div::first-line {
    font-size: 32px !important;
    line-height: 1.2 !important;
  }

  body:has(.fixed.bottom-0) .border-skin-primary .ql-editor > div::after {
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

  body:has(.fixed.bottom-0) .mt-3:has(#sale-price) .text-sm:has(+ #sale-price) {
    display: none !important;
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
    color: #777777 !important;
    font-size: 12px !important;
  }

  body:has(.fixed.bottom-0) .pt-6:has(.ql-editor),
  body:has(.fixed.bottom-0) footer.ab-footer {
    display: none !important;
  }

  /* مساحة فارغة في نهاية الصفحة عشان الشريط الثابت ما يغطيش المحتوى */
  body:has(.fixed.bottom-0) main::after {
    content: "" !important;
    display: block !important;
    height: 200px !important;
    width: 100% !important;
    clear: both !important;
  }


  /* ============================================================
     5. صفحة إتمام الطلب (Checkout)
     ============================================================ */

  /* ---------- 5.1 الخلفية العامة ---------- */
  html body .app_container > .bg-white { background: #f6f9f6 !important; }
  html body .checkout_bg_left { background: #f1f6f1 !important; }
  html body .checkout_bg_right { border: 0 !important; }

  /* ---------- 5.2 الهيدر: لوجو صغير في النص ---------- */
  html body header:has(> .checkout_header) {
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

  /* ---------- 5.3 ملخص الطلب: عنوان بسيط بدل شريط الإجمالي ---------- */

  /* الملخص مفتوح دايماً ومش بيتقفل (الزر معطّل وأيقوناته مخفية) */
  #checkout-order-summary-content,
  #checkout-mobile-order-summary-content {
    display: block !important;
  }

  #checkout-order-summary-toggle,
  .checkout_mobile_total_toggle {
    pointer-events: none !important;
  }

  /* عناصر مخفية في صفحة الدفع */
  #checkout-order-summary-toggle svg,
  .checkout_mobile_total_toggle svg,
  #checkout-mobile-add-discount-button,
  .checkout_add_discount,
  div:has(> #checkout-mobile-add-discount-button),
  [data-invoice="checkout-mobile-total-savings"],
  .checkout_mobile_bottom_summary {
    display: none !important;
  }

  html body #checkout-order-summary-toggle {
    min-height: 0 !important;
    padding: 0 0 10px !important;
    border-bottom: 1px solid #eef2ee;
  }
  html body #checkout-order-summary-toggle > span:last-child { display: none !important; }
  html body #checkout-order-summary-toggle > span:first-child,
  html body #summary-heading {
    font-size: 15px !important;
    font-weight: 800 !important;
    color: #225C2A !important;
  }
  html body #summary-heading { margin: 0 0 4px !important; }

  /* ---------- 5.4 المنتجات داخل الملخص ---------- */
  html body .checkout_cart_items_container { margin: 6px 0 !important; }

  html body .checkout_cart_item {
    padding: 10px 0 !important;
    gap: 12px !important;
  }

  html body .checkout_cart_item > a {
    width: 52px !important;
    height: 52px !important;
    border-radius: 12px !important;
    box-shadow: none !important;
    border: 1px solid #e8efe8;
  }

  /* شارة الكمية */
  html body .checkout_cart_item > a > span {
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

  /* سطر الخصم: أخضر عشان يبان إنه توفير */
  html body .checkout_cart_item p.mt-1 {
    color: #225C2A !important;
    font-size: 11.5px !important;
    font-weight: 600 !important;
  }

  /* أزرار الكمية والحذف أصغر */
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

  /* ---------- 5.5 كود الخصم: مضغوط وهادي ---------- */
  html body .checkout_discount_section { margin-bottom: 14px !important; }
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

  /* ---------- 5.6 الإجماليات ---------- */
  html body .checkout_order_summary [data-invoice="invoice"] {
    display: flex !important;
    flex-direction: column;
    gap: 10px;
    padding: 12px 0 0 !important;
    border-top: 1px solid #eef2ee !important;
    font-size: 13px !important;
  }
  html body .checkout_order_summary [data-invoice="invoice"] > * { margin: 0 !important; }

  html body .checkout_order_summary [data-invoice="invoice"] dt {
    font-weight: 500;
    color: #666 !important;
  }
  html body .checkout_order_summary [data-invoice="invoice"] dd {
    font-size: 13px;
    font-weight: 700;
  }

  /* صف الإجمالي النهائي */
  html body .checkout_order_summary [data-invoice="invoice"] > div:has(> [data-invoice="invoice-total"]) {
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

  /* إجمالي التوفير: شارة خضراء صغيرة */
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

  /* ---------- 5.7 شريط الشحن المجاني ---------- */
  html body .checkout_form .rounded-lg.border-gray-300 {
    margin: 0 0 12px !important;
    background: #f1f9ee !important;
    border: 1px solid #d9e8d6 !important;
    border-radius: 14px !important;
  }
  html body .checkout_form .rounded-lg.border-gray-300 > .p-4 {
    padding: 10px 14px 12px !important;
  }
  html body .checkout_form .rounded-lg.border-gray-300 > .p-4 > span {
    margin-bottom: 8px !important;
    font-size: 12.5px !important;
    font-weight: 700 !important;
    color: #225C2A !important;
  }
  html body .checkout_form .rounded-lg.border-gray-300 > .p-4 [class*="c5d2de"] {
    background: #dcebd8 !important;
    height: 6px !important;
  }
  html body .checkout_form .rounded-lg.border-gray-300 > .p-4 [class*="202223"] {
    background: #225C2A !important;
    height: 6px !important;
  }

  /* ---------- 5.8 بيانات العميل ---------- */
  html body .contact-info-heading h2 {
    font-size: 15px !important;
    font-weight: 800 !important;
    color: #225C2A !important;
    margin: 0 0 4px !important;
  }
  html body .contact-info-heading .mt-3 { margin-top: 12px !important; }
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
    font-size: 16px !important;      /* 16px تمنع زوم الآيفون عند الكتابة */
    line-height: 1.4 !important;
    color: #1a1a1a !important;
    box-shadow: none !important;
    outline: none !important;
    transition: border-color .2s ease, box-shadow .2s ease;
  }
  html body .checkout_container .global_textarea {
    height: 88px !important;
    resize: none;
  }
  html body .checkout_container .global_input:focus,
  html body .checkout_container .global_textarea:focus {
    border-color: #225C2A !important;
    box-shadow: 0 0 0 3px rgba(34, 92, 42, .12) !important;
  }

  /* المحافظة (القائمة المنسدلة) */
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
    box-shadow: 0 0 0 3px rgba(34, 92, 42, .12) !important;
  }
  html body .gov_select .select__single-value {
    font-size: 16px !important;
    color: #1a1a1a !important;
  }
  html body .gov_select .select__indicator-separator { display: none !important; }
  html body .gov_select .select__menu {
    border-radius: 12px !important;
    overflow: hidden;
    box-shadow: 0 10px 28px rgba(0, 0, 0, .12) !important;
  }
  html body .gov_select .select__option--is-focused { background: #ECFBD5 !important; color: #1a1a1a !important; }
  html body .gov_select .select__option--is-selected { background: #225C2A !important; color: #fff !important; }

  /* ---------- 5.9 زر إتمام الطلب ---------- */
  html body #checkout-button .checkout_buy_now {
    background: #225C2A !important;
    color: #fff !important;
    border: 1.5px solid #225C2A !important;
    border-radius: 999px !important;
    padding: 14px 24px !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    transition: background .2s ease, transform .15s ease;
  }
  html body #checkout-button .checkout_buy_now:hover { background: #194620 !important; }
  html body #checkout-button .checkout_buy_now:active { transform: scale(.98); }

  /* ---------- 5.10 روابط السياسات في الآخر ---------- */
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

  /* ---------- 5.11 موبايل وتابلت ---------- */
  @media (max-width: 1023px) {

    /* زر إتمام الطلب مثبت أسفل الصفحة */
    html body #checkout-button.checkout_button {
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      top: auto !important;
      z-index: 50 !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 10px 16px calc(10px + env(safe-area-inset-bottom, 0px)) !important;
      background: #ffffff !important;
      border-top: 1px solid #e8efe8;
      box-shadow: 0 -4px 18px rgba(34, 92, 42, 0.10);
      transform: none !important;
    }

    html body #checkout-button .checkout_buy_now {
      width: 100% !important;
    }

    /* مسافة تحت الصفحة عشان الزر الثابت ما يغطيش آخر المحتوى */
    html body:has(#checkout-button) {
      padding-bottom: 84px !important;
    }

    /* كروت بيضاء على خلفية فاتحة */
    html body .checkout_order_summary {
      background: #fff !important;
      border: 1px solid #e3ece3 !important;
      border-radius: 16px;
      margin: 12px 12px 0 !important;
      padding: 12px 14px !important;
    }
    html body .checkout_form { padding: 12px 12px 20px !important; }
    html body .contact-info-heading {
      background: #fff;
      border: 1px solid #e3ece3;
      border-radius: 16px;
      padding: 14px;
    }
  }

  /* ---------- 5.12 الكمبيوتر: عمودين، والملخص ثابت وقت التمرير ---------- */
  @media (min-width: 1024px) {
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
    html body .gov_select .select__single-value { font-size: 14.5px !important; }
    html body #checkout-button { margin-top: 18px !important; }
  }


  /* ============================================================
     6. صفحة الشكر (Thank You)
     ============================================================ */

  /* الحاوية الخارجية */
  .thanks_container {
    margin-top: 0 !important;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }

  /* توسيط كارت الشكر */
  .ab-thanks {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 10px 16px !important;
    margin-top: 10px !important;
  }

  .ab-thanks-content {
    background: #ffffff !important;
    border: 1px solid #eef2ee !important;
    border-radius: 24px !important;
    box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.06) !important;
    max-width: 480px !important;
    width: 100% !important;
    padding: 36px 24px !important;
    text-align: center !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
  }

  /* إخفاء الأسطر الفارغة الزائدة */
  .ab-thanks-custom-content p:has(br:only-child),
  .ab-thanks-custom-content h3:has(br) {
    display: none !important;
  }

  /* أيقونة النبتة داخل دائرة، متوسطة في الكارت */
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
    text-align: center !important;
    box-shadow: 0 4px 15px rgba(34, 92, 42, 0.12) !important;
  }

  /* عنوان "تم استلام طلبك بنجاح" */
  .ab-thanks-custom-content h1:nth-child(2) {
    color: #225C2A !important;
    font-size: 22px !important;
    font-weight: 800 !important;
    margin-bottom: 16px !important;
    letter-spacing: -0.3px !important;
  }

  /* نصوص التعليمات وخطوات التأكيد */
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

  /* جملة الشحن والتوصيل في صندوق مميز */
  .ab-thanks-custom-content h3:last-of-type {
    background: #f7faf7 !important;
    border: 1px dashed rgba(34, 92, 42, 0.35) !important;
    border-radius: 12px !important;
    padding: 10px 14px !important;
    color: #225C2A !important;
    font-weight: 700 !important;
    margin-top: 14px !important;
  }

  /* زر "الذهاب للرئيسية" */
  .ab-thanks-home-btn {
    background: #225C2A !important;
    color: #ffffff !important;
    border: none !important;
    border-radius: 999px !important;
    padding: 12px 34px !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    cursor: pointer !important;
    margin-top: 24px !important;
    box-shadow: 0 4px 14px rgba(34, 92, 42, 0.25) !important;
    transition: all 0.25s ease !important;
  }

  .ab-thanks-home-btn:hover {
    background: #194620 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(34, 92, 42, 0.35) !important;
  }

  /* رابط "عرض أحدث العروض" (مخفي حالياً: شيل display:none لو عايز تظهره) */
  .ab-thanks-offers {
    display: none !important;
    color: #225C2A !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    margin-top: 14px !important;
    text-decoration: underline !important;
    text-underline-offset: 4px !important;
    opacity: 0.85 !important;
    transition: opacity 0.2s ease !important;
  }

  .ab-thanks-offers:hover {
    opacity: 1 !important;
  }

  /* قسم "تتبع طلبك" وزر النسخ (مخفي) */
  .ab-invoice-card--track {
    display: none !important;
  }


  /* ============================================================
     7. الفوتر والعناصر المخفية العامة
     ============================================================ */
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
    opacity: 0.85;
  }

  .ab-footer-powered,
  div:has(> .min_value_carousel),
  .min_value_carousel,
  .min_value_swiper_button_prev,
  .min_value_swiper_button_next {
    display: none !important;
  }
`;
  var s = document.createElement("style");
  s.id = "vs-store-css";
  s.textContent = css;
  (document.head || document.documentElement).appendChild(s);
})();

/* -------------------- 2) السكريبتات -------------------- */
function __vsRunAll() {
/* ===== A. الهيدر الذكي ===== */
(function () {
  if (window.__abSmartHeader) return;
  window.__abSmartHeader = true;

  var root = document.documentElement;
  var lastY = window.pageYOffset || 0;
  var hidden = false;
  var ticking = false;

  var DELTA = 8;
  var TOP_OFFSET = 100;

  function measure() {
    var a = document.querySelector('.ab-announce');
    var h = document.getElementById('eo-header');
    var total = (a ? a.offsetHeight : 0) + (h ? h.offsetHeight : 0) + 12;
    root.style.setProperty('--ab-hdr-total', total + 'px');
  }

  function isLocked() {
    var m = document.getElementById('eo-menu-btn');
    var d = document.getElementById('eo-desktop-nav-btn');
    if (m && m.getAttribute('aria-expanded') === 'true') return true;
    if (d && d.getAttribute('aria-expanded') === 'true') return true;
    var ae = document.activeElement;
    if (ae && ae.closest && ae.closest('.ab-header-search')) return true;
    return false;
  }

  function setHidden(v) {
    if (v === hidden) return;
    hidden = v;
    root.classList.toggle('ab-hdr-hidden', v);
  }

  function update() {
    ticking = false;
    var y = Math.max(window.pageYOffset || 0, 0);

    if (isLocked() || y < TOP_OFFSET) {
      setHidden(false);
      lastY = y;
      return;
    }
    if (Math.abs(y - lastY) < DELTA) return;

    setHidden(y > lastY);
    lastY = y;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  measure();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); onScroll(); });
  window.addEventListener('load', measure);
  document.addEventListener('focusin', function (e) {
    if (e.target.closest && e.target.closest('.ab-header-search')) setHidden(false);
  });
  document.addEventListener('click', function () { setTimeout(onScroll, 50); });
})();

/* ===== B. سحب سلايدر الموزاييك بالماوس ===== */
(function () {
  function init(g) {
    if (g.dataset.dragInit) return;
    g.dataset.dragInit = '1';
    var down = false, startX = 0, startScroll = 0;

    g.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true;
      startX = e.clientX;
      startScroll = g.scrollLeft;
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

  function run() {
    document.querySelectorAll('.category-mosaic__grid').forEach(init);
  }
  run();
  new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
})();

/* ===== C. شريط أضف للسلة الثابت ===== */
(function () {
  if (window.__vsStickyBar) return;
  window.__vsStickyBar = true;

  /* ===== الإعدادات =====
     true  = اسم المنتج + السعر الجديد والقديم + الزر
     false = الزر فقط
  */
  var SHOW_INFO = true;

  var BTN_TEXT = 'أضف للسلة';
  var DONE_TEXT = 'تمت الإضافة ✓';

  var root = document.documentElement;
  var bar = null;
  var els = {};

  function q(sel) { return document.querySelector(sel); }
  function txt(sel) {
    var el = q(sel);
    return el ? el.textContent.trim() : '';
  }

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
    bar.remove();
    bar = null;
    els = {};
    root.classList.remove('vs-bar-on');
  }

  function tick() {
    var onProduct = location.pathname.indexOf('/products/') === 0 && q('.ab-pd .ab-pd-name');
    var orig = q('.add_to_cart_btn');

    if (!onProduct || !orig) {
      destroy();
      return;
    }

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
    var show = outOfView && scrolled && !orig.disabled;

    bar.classList.toggle('is-visible', show);
  }

  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick);
  setInterval(tick, 400); // لأن المتجر بيغير الصفحات بدون إعادة تحميل
  tick();
})();

/* ===== D. ملاحظة خصم القطعة التانية ===== */
(function () {
  if (window.__vsOfferNote) return;
  window.__vsOfferNote = true;

  function tick() {
    var onProduct = location.pathname.indexOf('/products/') === 0;
    var existing = document.getElementById('vs-offer-note');
    var checkoutBtn = document.querySelector('.checkout_btn');

    if (!onProduct || !checkoutBtn) {
      if (existing) existing.remove();
      return;
    }

    var target = checkoutBtn.parentElement;
    if (!target || !target.parentElement) return;

    if (existing && existing.nextElementSibling === target) return;
    if (existing) existing.remove();

    var box = document.createElement('div');
    box.id = 'vs-offer-note';
    box.className = 'vs-offer-note';
    box.innerHTML =
      '<p class="vs-offer-note__title">🎁 خصم 10% على القطعة التانية</p>' +
      '<p class="vs-offer-note__line">أضف قطعتين أو أكتر للسلة</p>' +
      '<p class="vs-offer-note__line vs-offer-note__line--accent">الخصم بيتطبق تلقائي في صفحة إتمام الطلب</p>';

    target.parentElement.insertBefore(box, target);
  }

  setInterval(tick, 400);
  tick();
})();

/* ===== E. شريط الثقة ===== */
(function () {
  if (window.__vsTrustBar) return;
  window.__vsTrustBar = true;

  /* ===== عدّل النصوص من هنا =====
     لازم تكون مطابقة لسياستكم الفعلية
     (ولو غيرت النص، غيّره كمان في SPLIT بالسكريبت F) */
  var ITEMS = [
    {
      text: 'الدفع عند الاستلام',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>'
    },
    {
      text: 'معاينة قبل الدفع',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m9 12 2 2 4-4"/></svg>'
    },
    {
      text: 'استبدال خلال 14 يوم',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>'
    }
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
      tx.textContent = it.text;
      item.appendChild(ic);
      item.appendChild(tx);
      box.appendChild(item);
    });
    return box;
  }

  function tick() {
    var existing = document.querySelector('.vs-trust');
    var onProduct = location.pathname.indexOf('/products/') === 0;
    var buy = document.querySelector('.checkout_btn');

    if (!onProduct || !buy || !buy.parentElement) {
      if (existing) existing.remove();
      return;
    }

    var wrap = buy.parentElement;
    if (existing && existing.previousElementSibling === wrap) return;
    if (existing) existing.remove();

    wrap.insertAdjacentElement('afterend', build());
  }

  setInterval(tick, 400); // لأن المتجر بيغير الصفحات بدون إعادة تحميل
  tick();
})();

/* ===== F. شريط الثقة: تقسيم النص لسطرين ===== */
(function () {
  if (window.__vsTrustTwoLines) return;
  window.__vsTrustTwoLines = true;

  /* تقسيم كل نص على سطرين: [السطر الأول, السطر التاني]
     الكمبيوتر بيعرض النص كامل، والموبايل بيعرضهم سطرين */
  var SPLIT = {
    'الدفع عند الاستلام': ['الدفع', 'عند الاستلام'],
    'معاينة قبل الدفع': ['معاينة', 'قبل الدفع'],
    'استبدال خلال 14 يوم': ['استبدال', 'خلال 14 يوم']
  };

  function run() {
    document.querySelectorAll('.vs-trust__text').forEach(function (el) {
      if (el.dataset.vsSplit) return;
      var full = el.textContent.trim();
      var parts = SPLIT[full];
      el.dataset.vsSplit = '1';
      if (!parts) return;

      el.setAttribute('aria-label', full);
      el.innerHTML = '';

      var a = document.createElement('span');
      a.className = 'vs-l1';
      a.textContent = parts[0];

      var sp = document.createElement('span');
      sp.className = 'vs-sp';
      sp.textContent = ' ';

      var b = document.createElement('span');
      b.className = 'vs-l2';
      b.textContent = parts[1];

      el.appendChild(a);
      el.appendChild(sp);
      el.appendChild(b);
    });
  }

  setInterval(run, 400);
  run();
})();

/* ===== G. سلايدر الموبايل (الحركة) ===== */
(function () {
  if (window.__vsMS) return;
  window.__vsMS = true;

  var DURATIONS = [3000, 5000, 5000]; // مدة كل سلايد بالترتيب (ملي ثانية): الأول 3 ثواني
  var DEFAULT_MS = 5000;              // مدة أي سلايد زيادة عن القائمة
  var mq = window.matchMedia('(max-width: 768px)');
  var inst = [];

  function init(el) {
    var track = el.querySelector('.vs-ms__track');
    var box = el.querySelector('.vs-ms__dots');

    Array.prototype.forEach.call(track.querySelectorAll('.vs-ms__clone'), function (c) { c.remove(); });
    var n = track.children.length;

    // نسخة من السلايد الأول في الآخر عشان اللفة تكمل بدون رجوع للخلف
    var clone = track.children[0].cloneNode(true);
    clone.classList.add('vs-ms__clone');
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);

    var slides = track.children;
    var dots = [], vids = [];
    var i = 0, timer, scrollT, paused = false, visible = true, io;

    function dur(l) { return DURATIONS[l] || DEFAULT_MS; }

    box.innerHTML = '';
    for (var k = 0; k <= n; k++) {
      if (k < n) {
        var d = document.createElement('span');
        d.className = 'vs-ms__dot';
        d.appendChild(document.createElement('i'));
        d.style.animationDuration = dur(k) + 'ms';
        box.appendChild(d);
        dots[k] = d;
      }
      var v = slides[k].querySelector('video');
      if (v) {
        if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src;
        v.muted = true;
        vids[k] = v;
      }
    }

    function schedule() {
      clearTimeout(timer);
      if (paused || !visible || document.hidden) return;
      timer = setTimeout(next, dur(i % n));
    }
    function playVideos() {
      vids.forEach(function (v, idx) {
        if (!v) return;
        if (idx === i && visible && !document.hidden) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else { v.pause(); }
      });
    }
    function activate(x) {
      i = x;
      var l = x % n;
      dots.forEach(function (dt, idx) {
        dt.classList.remove('is-active');
        dt.classList.toggle('is-done', idx < l);
      });
      void el.offsetWidth; // إعادة تشغيل شريط التقدم
      dots[l].classList.add('is-active');
      playVideos();
      schedule();
    }
    function go(x, smooth) {
      track.scrollTo({ left: x * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
      activate(x);
    }
    function next() {
      if (i >= n) { track.scrollTo({ left: 0, behavior: 'auto' }); i = 0; }
      go(i + 1, true);
    }
    function settle(force) {
      var idx = Math.round(track.scrollLeft / (track.clientWidth || 1));
      idx = Math.max(0, Math.min(n, idx));
      if (idx === n) {                       // وصلنا للنسخة: نرجع للأول فوراً بدون ما يبان
        track.scrollTo({ left: 0, behavior: 'auto' });
        if (i === n) { i = 0; playVideos(); } else { activate(0); }
        return;
      }
      if (force || idx !== i) activate(idx);
    }

    function onScroll() { clearTimeout(scrollT); scrollT = setTimeout(function () { settle(false); }, 120); }
    function onStart() { paused = true; el.classList.add('is-paused'); clearTimeout(timer); }
    function onEnd() { paused = false; el.classList.remove('is-paused'); setTimeout(function () { settle(true); }, 250); }
    function onVis() { playVideos(); schedule(); }
    function onResize() { track.scrollTo({ left: i * track.clientWidth, behavior: 'auto' }); }

    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('touchstart', onStart, { passive: true });
    track.addEventListener('touchend', onEnd, { passive: true });
    track.addEventListener('touchcancel', onEnd, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', onResize);

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        playVideos();
        schedule();
      }, { threshold: 0.4 });
      io.observe(el);
    }

    activate(0);

    var api = {
      el: el,
      stop: function () {
        clearTimeout(timer);
        clearTimeout(scrollT);
        if (io) io.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        window.removeEventListener('resize', onResize);
        vids.forEach(function (v) { if (v) v.pause(); });
        el._vs = null;
      }
    };
    el._vs = api;
    inst.push(api);
  }

  function tick() {
    inst = inst.filter(function (a) {
      if (!a.el.isConnected) { a.stop(); return false; }
      return true;
    });

    document.querySelectorAll('.vs-ms').forEach(function (el) {
      if (mq.matches && !el._vs) init(el);
      if (!mq.matches && el._vs) {
        el._vs.stop();
        inst = inst.filter(function (a) { return a.el !== el; });
      }
    });
  }

  setInterval(tick, 500); // لأن المتجر بيغير الصفحات بدون إعادة تحميل
  tick();
})();


/* ===== H. سلايدر الموبايل (إزالة المسافات) ===== */
(function () {
  if (window.__vsMSSpacing) return;
  window.__vsMSSpacing = true;

  var mq = window.matchMedia('(max-width: 768px)');

  function imp(el, props) {
    for (var p in props) el.style.setProperty(p, props[p], 'important');
  }

  function fix() {
    document.querySelectorAll('.vs-ms').forEach(function (el) {
      var wrap = el.closest('.content_container') || el.parentElement;

      // كمبيوتر: نخفي القسم الفاضي كله عشان ميسيبش فراغ
      if (!mq.matches) {
        imp(wrap, { display: 'none' });
        return;
      }
      wrap.style.removeProperty('display');

      // نصفّر المسافات فوق وتحت من السلايدر لحد القسم الخارجي
      var node = el.parentElement;
      while (node) {
        imp(node, {
          'padding-top': '0', 'padding-bottom': '0',
          'margin-top': '0', 'margin-bottom': '0'
        });
        if (node === wrap) break;
        node = node.parentElement;
      }
      imp(el, { 'margin-top': '0', 'margin-bottom': '0' });
    });
  }

  setInterval(fix, 500); // لأن المتجر بيغير الصفحات بدون إعادة تحميل
  fix();
})();


/* ===== I. فيديو واحد (تشغيل + مسافات) ===== */
(function () {
  if (window.__vsVid) return;
  window.__vsVid = true;

  function imp(el, props) {
    for (var p in props) el.style.setProperty(p, props[p], 'important');
  }

  function setup(box) {
    var v = box.querySelector('video');
    if (!v) return;
    box._vsv = true;
    v.muted = true;

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      }, { threshold: 0.4 }).observe(box);
    } else {
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    }
  }

  function spacing(box) {
    var wrap = box.closest('.content_container') || box.parentElement;
    var hiddenOnThisScreen = getComputedStyle(box).display === 'none';

    // لو الفيديو مخفي على الشاشة دي (الكمبيوتر) نخفي القسم كله عشان ميسيبش فراغ
    if (hiddenOnThisScreen) {
      imp(wrap, { display: 'none' });
      return;
    }
    wrap.style.removeProperty('display');

    // نصفّر المسافات فوق وتحت لحد القسم الخارجي
    var node = box.parentElement;
    while (node) {
      imp(node, {
        'padding-top': '0', 'padding-bottom': '0',
        'margin-top': '0', 'margin-bottom': '0'
      });
      if (node === wrap) break;
      node = node.parentElement;
    }
    imp(box, { 'margin-top': '0', 'margin-bottom': '0' });
  }

  function tick() {
    document.querySelectorAll('.vs-vid').forEach(function (box) {
      if (!box._vsv) setup(box);
      spacing(box);
    });
  }

  setInterval(tick, 500); // لأن المتجر بيغير الصفحات بدون إعادة تحميل
  tick();
})();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", __vsRunAll);
} else {
  __vsRunAll();
}
