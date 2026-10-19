/**
 * ==============================================================================
 * 1) حقن جميع التنسيقات (CSS STYLES)
 * ==============================================================================
 */
(function injectStyles() {
  const css = `
  /* ----- إخفاء عناوين الأقسام ----- */
  div[sectionid][title="تسوق حسب الفئة"] {
    display: none !important;
  }

  /* إخفاء القسم الفاضي (عنوان ووصف فاضيين) */
  .home_section_container:has(div[sectionid][title="    "]),
  .home_section_container:has(div[sectionid][title="   "]) {
    display: none !important;
  }

  /* ----- إزالة الخلفية البيضاء + مساحة فوق القسم ----- */
  .content_container,
  .home_section_container,
  .home_section_container .grid,
  .category_card {
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }
  .home_section_container {
    padding-top: 30px !important;
  }

  /* ----- أيقونات الفئات: الموبايل ----- */
  .category_card_img,
  .category_card_img img {
    width: 97px !important;
    height: 97px !important;
  }
  .category_card_name {
    font-size: 0.9rem !important;
    line-height: 1.4 !important;
    margin: 0 auto !important;
  }
  .home_section_container .grid {
    gap: 24px 12px !important;
    justify-items: center !important;
  }
  .category_card .inline-flex {
    margin-bottom: 10px !important;
  }

  /* ----- أيقونات الفئات: الكمبيوتر ----- */
  @media (min-width: 768px) {
    .category_card_img,
    .category_card_img img {
      width: 186px !important;
      height: 186px !important;
    }
    .category_card_name {
      font-size: 1.1rem !important;
    }
    .home_section_container .grid {
      gap: 32px 20px !important;
    }
  }

  /* ----- تحسين الأداء (LCP & CLS) ----- */
  .animate-slideIn,
  .animate-zoom-fade,
  .ab-reveal {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  @media (hover: none) {
    .ab-pgrid-img-hover { display: none !important; }
  }

  body.is-home main { min-height: 2000px; }
  @media (min-width: 768px) {
    body.is-home main { min-height: 1400px; }
  }

  .ab-footer {
    content-visibility: auto;
    contain-intrinsic-size: auto 400px;
  }

  /* إخفاء الأسعار القديمة والخصم لحظياً لمنع وميض الأرقام */
  .ab-pd-price-old:not([data-mod]),
  .ab-price-old:not([data-mod]),
  .vs-sticky__old:not([data-mod]),
  .vs-sg__old:not([data-mod]),
  .line-through:not([data-mod]),
  .ab-pd-discount-badge:not([data-mod]),
  .ab-sale-badge:not([data-mod]) {
    opacity: 0 !important;
  }

  /* إخفاء التقييم لحظياً حتى اكتمال التعديل */
  .ab-pd-reviews-count:not([data-rev-mod]) {
    opacity: 0 !important;
  }

  /* شريط الواتساب المدمج */
  .wa-inline-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #fafafa;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 7px 12px;
    margin-top: 10px;
    font-size: 12.5px;
    color: #4b5563;
    text-decoration: none !important;
    transition: all 0.2s ease;
    direction: rtl;
    width: 100%;
    box-sizing: border-box;
  }

  .wa-inline-bar:hover {
    background-color: #f0fdf4;
    border-color: #86efac;
    color: #15803d;
  }

  .wa-inline-action {
    color: #15803d;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* الشارات المخصصة */
  .custom-badges-wrap {
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px !important;
    margin-bottom: 8px !important;
    vertical-align: middle !important;
  }

  .ab-pd-discount-badge.badge-safe-pack {
    background-color: #15803d !important;
    color: #ffffff !important;
    opacity: 1 !important;
    visibility: visible !important;
  }

  .ab-pd-discount-badge.badge-smart-tag {
    background-color: #1e293b !important;
    color: #ffffff !important;
    opacity: 1 !important;
    visibility: visible !important;
  }

  /* نافذة التقييمات وقائمة الكروت */
  .lq-desc-accordion-item--reviews .lq-desc-accordion-panel,
  .lq-desc-accordion-item--reviews .lq-desc-accordion-panel-inner,
  .lq-desc-accordion-item--reviews .ab-reviews {
    display: block !important;
    height: auto !important;
    max-height: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    overflow: visible !important;
  }

  .lq-desc-accordion-item--reviews .ab-reveal,
  .lq-desc-accordion-item--reviews .ab-review-card {
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
  }

  .lq-desc-accordion-item--reviews .lq-desc-accordion-toggle,
  .ab-reviews-accordion-headline,
  .ab-reviews-header .ab-reviews-title,
  .ab-review-read-more {
    display: none !important;
  }

  .ab-reviews-header {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 4px 0 10px 0 !important;
    border-bottom: 1px solid #f1f5f9 !important;
    margin-bottom: 10px !important;
  }

  .ab-reviews-summary,
  .ab-reviews-summary-top {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  .ab-reviews-rating-display {
    font-size: 17px !important;
    font-weight: 800 !important;
    color: #0f172a !important;
  }

  .ab-reviews-count {
    font-size: 11px !important;
    color: #64748b !important;
  }

  .ab-reviews-write-btn {
    font-size: 11px !important;
    padding: 4px 10px !important;
    border-radius: 9999px !important;
    background: #f8fafc !important;
    border: 1px solid #cbd5e1 !important;
    color: #334155 !important;
    font-weight: 600 !important;
  }

  .ab-reviews-list {
    display: flex !important;
    flex-direction: row !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory !important;
    gap: 10px !important;
    padding-bottom: 8px !important;
    direction: rtl !important;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }

  .ab-reviews-list::-webkit-scrollbar {
    height: 3px;
  }
  .ab-reviews-list::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  .ab-review-card {
    flex: 0 0 240px !important;
    max-width: 240px !important;
    scroll-snap-align: start !important;
    background: #f8fafc !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 8px !important;
    padding: 10px 12px !important;
    box-sizing: border-box !important;
    margin: 0 !important;
    display: flex !important;
    flex-direction: column !important;
  }

  .ab-review-stars {
    margin-bottom: 3px !important;
  }

  .ab-review-stars .ab-pd-star {
    width: 12px !important;
    height: 12px !important;
  }

  .ab-review-author {
    font-size: 12px !important;
    font-weight: 700 !important;
    color: #1e293b !important;
    margin: 0 0 4px 0 !important;
    display: flex !important;
    align-items: center !important;
    gap: 4px !important;
  }

  .ab-review-author::after {
    content: "✓ مشتري موثق";
    font-size: 9px;
    font-weight: 500;
    color: #16a34a;
    background: #dcfce7;
    padding: 1px 4px;
    border-radius: 4px;
  }

  .ab-review-comment {
    font-size: 11.5px !important;
    color: #475569 !important;
    line-height: 1.4 !important;
    margin: 0 !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }

  /* لوحة الوصف وعرض المزيد */
  .lq-desc-accordion-item:not(.lq-desc-accordion-item--reviews) .lq-desc-accordion-panel,
  .lq-desc-accordion-item:not(.lq-desc-accordion-item--reviews) .lq-desc-accordion-panel-inner,
  #lq-desc-panel-main {
    display: block !important;
    height: auto !important;
    max-height: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    overflow: visible !important;
  }

  .lq-desc-accordion-item:not(.lq-desc-accordion-item--reviews) .lq-desc-accordion-toggle,
  .lq-desc-content h3:has(br),
  .lq-desc-content h2:has(br),
  .lq-desc-content p:empty {
    display: none !important;
  }

  .lq-desc-content .ql-editor {
    line-height: 1.6 !important;
    font-size: 13px !important;
    color: #475569 !important;
  }

  .lq-desc-content .ql-editor h3 {
    font-size: 13.5px !important;
    font-weight: 700 !important;
    color: #0f172a !important;
    margin: 10px 0 4px 0 !important;
  }

  .desc-collapsed {
    max-height: 140px !important;
    overflow: hidden !important;
    position: relative !important;
    transition: max-height 0.3s ease;
  }

  .desc-collapsed::after {
    content: "" !important;
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 60px !important;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)) !important;
    pointer-events: none !important;
  }

  .desc-toggle-btn {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    width: 100% !important;
    margin-top: 8px !important;
    padding: 7px 12px !important;
    background: #f8fafc !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 6px !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #2563eb !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
  }

  .desc-toggle-btn:hover {
    background: #eff6ff !important;
    border-color: #bfdbfe !important;
  }

  /* شبكة الأقسام وتنسيق الكروت */
  .home_section_container {
    gap: 16px !important;
    padding: 10px 0 20px 0 !important;
  }

  .home_section_container .css-1yafzwm h3 {
    font-size: 17px !important;
    font-weight: 800 !important;
    color: #0f172a !important;
    margin: 0 !important;
    position: relative;
    display: inline-block;
  }

  @media (max-width: 1024px) {
    .home_section_container .grid {
      grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
      column-gap: 8px !important;
      row-gap: 14px !important;
    }
  }

  @media (min-width: 1025px) {
    .home_section_container .grid {
      grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
      column-gap: 16px !important;
      row-gap: 22px !important;
    }
  }

  .category_card {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-decoration: none !important;
  }

  .category_card .inline-flex {
    margin-bottom: 0 !important;
  }

  .category_card .rounded-full {
    border: 2px solid #f1f5f9 !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04) !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    background-color: #f8fafc !important;
  }

  .category_card .category_card_img {
    width: 68px !important;
    height: 68px !important;
    transition: transform 0.4s ease !important;
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    .category_card .category_card_img {
      width: 90px !important;
      height: 90px !important;
    }
  }

  @media (min-width: 1025px) {
    .category_card .category_card_img {
      width: 110px !important;
      height: 110px !important;
    }
  }

  .category_card:hover .rounded-full {
    border-color: #d97706 !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(217, 119, 6, 0.15) !important;
  }

  .category_card:hover .category_card_img {
    transform: scale(1.08) !important;
  }

  .category_card_name {
    margin-top: 6px !important;
    font-size: 11.5px !important;
    font-weight: 600 !important;
    color: #334155 !important;
    line-height: 1.3 !important;
    letter-spacing: 0 !important;
    transition: color 0.2s ease !important;
    width: 100% !important;
    text-align: center !important;
  }

  @media (min-width: 768px) {
    .category_card_name {
      font-size: 13px !important;
      margin-top: 8px !important;
    }
  }

  .category_card:hover .category_card_name {
    color: #0f172a !important;
  }

  .category_card:has(img[alt*="عروض"]) .rounded-full {
    border-color: #ef4444 !important;
    background-color: #fef2f2 !important;
  }

  .category_card:has(img[alt*="عروض"]) .category_card_name {
    color: #dc2626 !important;
    font-weight: 700 !important;
  }

  /* سلايدر وتصنيفات الغرف (Pills) */
  .ab-categories {
    padding: 12px 0 20px 0 !important;
  }

  .ab-categories-header {
    text-align: center !important;
    margin-bottom: 14px !important;
  }

  .ab-categories-title {
    font-size: 18px !important;
    font-weight: 800 !important;
    color: #0f172a !important;
    display: block !important;
    text-align: center !important;
  }

  .ab-categories-carousel {
    display: block !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    padding: 8px 12px 14px 12px !important;
  }

  .ab-categories-carousel::-webkit-scrollbar {
    display: none !important;
  }

  .ab-categories-track {
    display: flex !important;
    flex-direction: row !important;
    gap: 10px !important;
    width: max-content !important;
    min-width: 100% !important;
    box-sizing: border-box !important;
  }

  @media (min-width: 900px) {
    .ab-categories-track {
      justify-content: center !important;
    }
  }

  .ab-cat-circle {
    display: none !important;
  }

  .ab-cat-card {
    flex: 0 0 auto !important;
    scroll-snap-align: start !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 10px 22px !important;
    background: #ffffff !important;
    border: 1.5px solid #e2e8f0 !important;
    border-radius: 9999px !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04) !important;
    text-decoration: none !important;
    transition: all 0.25s ease !important;
    cursor: pointer !important;
  }

  .ab-cat-card:hover {
    border-color: #0f172a !important;
    background-color: #f8fafc !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.09) !important;
  }

  .ab-cat-label {
    font-size: 13.5px !important;
    font-weight: 700 !important;
    color: #1e293b !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    white-space: nowrap !important;
    transition: color 0.2s ease !important;
  }

  .ab-cat-card:hover .ab-cat-label {
    color: #0f172a !important;
  }

  .ab-cat-card[href*="table"] .ab-cat-label::before { content: "🍽️"; font-size: 16px; }
  .ab-cat-card[href*="living"] .ab-cat-label::before { content: "🛋️"; font-size: 16px; }
  .ab-cat-card[href*="entrance"] .ab-cat-label::before { content: "🚪"; font-size: 16px; }
  .ab-cat-card[href*="bedroom"] .ab-cat-label::before { content: "🛏️"; font-size: 16px; }
  .ab-cat-card[href*="office"] .ab-cat-label::before { content: "🖥️"; font-size: 16px; }
  .ab-cat-card[href*="babies"] .ab-cat-label::before { content: "🧸"; font-size: 16px; }

  /* الأسئلة الشائعة (الأكورديون) */
  html body .szh-accordion {
    direction: rtl !important;
    text-align: right !important;
    max-width: 680px !important;
    margin: 20px auto 35px auto !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    padding: 0 12px !important;
    box-sizing: border-box !important;
  }

  html body .home_section_container .css-w2lwk8 h3 {
    font-size: 19px !important;
    font-weight: 800 !important;
    color: #0f172a !important;
    text-align: center !important;
    margin: 0 0 6px 0 !important;
  }

  html body .szh-accordion__item {
    background-color: #ffffff !important;
    border: 1.5px solid #eef2f6 !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    transition: all 0.25s ease !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02) !important;
    margin: 0 !important;
  }

  html body .szh-accordion__item:hover,
  html body .szh-accordion__item:has(button[aria-expanded="true"]) {
    border-color: #cbd5e1 !important;
    background-color: #f8fafc !important;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04) !important;
  }

  html body .szh-accordion__item-heading {
    margin: 0 !important;
    font-size: inherit !important;
    line-height: normal !important;
  }

  html body .szh-accordion .szh-accordion__item-btn,
  html body button[data-szh-adn-btn],
  html body .szh-accordion__item-heading button {
    font-size: 12.5px !important;
    font-weight: 700 !important;
    line-height: 1.6 !important;
    color: #1e293b !important;
    direction: rtl !important;
    text-align: right !important;
    padding: 12px 18px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    width: 100% !important;
    background: transparent !important;
    border: none !important;
    cursor: pointer !important;
    gap: 16px !important;
    box-sizing: border-box !important;
  }

  html body .szh-accordion__item-btn svg,
  html body .szh-accordion__item-btn svg.h-6 {
    width: 14px !important;
    height: 14px !important;
    min-width: 14px !important;
    max-width: 14px !important;
    max-height: 14px !important;
    color: #94a3b8 !important;
    flex-shrink: 0 !important;
    transition: transform 0.25s ease, color 0.2s ease !important;
  }

  html body .szh-accordion__item-btn[aria-expanded="true"] svg {
    transform: rotate(180deg) !important;
    color: #0f172a !important;
  }

  html body .szh-accordion__item-panel {
    padding: 0 18px 14px 18px !important;
    direction: rtl !important;
    text-align: right !important;
  }

  html body .szh-accordion__item-panel p {
    font-size: 11.5px !important;
    line-height: 1.7 !important;
    color: #475569 !important;
    margin: 0 !important;
    text-align: right !important;
    direction: rtl !important;
  }

  /* الشريط الأفقي للمواصفات والأرقام */
  .css-r8iv6o h3::before,
  .css-r8iv6o h3::after,
  .css-r8iv6o::before,
  .css-r8iv6o::after {
    display: none !important;
    content: none !important;
  }

  .home_section_container .css-r8iv6o h3 {
    font-size: 18px !important;
    font-weight: 800 !important;
    color: #0f172a !important;
    text-align: center !important;
    margin: 0 !important;
  }

  .home_section_container .css-pdin8h {
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    max-width: 520px !important;
    margin: 18px auto 0 auto !important;
    padding: 0 10px !important;
    box-sizing: border-box !important;
    direction: rtl !important;
  }

  .home_section_container .icon-image-container {
    display: none !important;
  }

  .home_section_container .icon-container {
    background: #ffffff !important;
    border: 1.5px solid #f1f5f9 !important;
    border-radius: 12px !important;
    padding: 12px 18px !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02) !important;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
    box-sizing: border-box !important;
    width: 100% !important;
  }

  .home_section_container .icon-container:hover {
    border-color: #cbd5e1 !important;
    background-color: #f8fafc !important;
    transform: translateX(-3px) !important;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05) !important;
  }

  .home_section_container .icon-text-container {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 100% !important;
    direction: rtl !important;
  }

  .home_section_container .icon-text-container p {
    font-size: 21px !important;
    font-weight: 800 !important;
    color: #0f172a !important;
    margin: 0 !important;
    line-height: 1 !important;
    flex-shrink: 0 !important;
    min-width: 78px !important;
    text-align: right !important;
    border-left: 1.5px solid #e2e8f0 !important;
    padding-left: 14px !important;
    margin-left: 14px !important;
  }

  .home_section_container .icon-text-container span {
    font-size: 13px !important;
    font-weight: 600 !important;
    color: #475569 !important;
    line-height: 1.4 !important;
    text-align: right !important;
    margin: 0 !important;
  }

  /* نصوص البانر الرئيسي */
  .rnw-hero__inner,
  .rnw-hero__kicker,
  .rnw-hero__title,
  .rnw-hero__lede,
  .rnw-hero__actions .rnw-btn {
    letter-spacing: 0 !important;
    letter-spacing: normal !important;
    word-spacing: normal !important;
  }

  .rnw-hero__title {
    font-weight: 600 !important;
    line-height: 1.25 !important;
  }

  .rnw-hero__kicker {
    font-weight: 700 !important;
  }

  .rnw-hero__lede {
    font-weight: 500 !important;
  }

  /* مسافة السلايدر والفوتر والأسئلة الشائعة */
  .ab-categories-carousel .ab-categories-track {
    margin-top: 5px !important;
    padding-top: 5px !important;
  }

  .home_section_container:has(.szh-accordion),
  .home_section_container.css-1or7lpt {
    margin-bottom: 25px !important;
    padding-bottom: 25px !important;
  }

  footer,
  .footer,
  [role="contentinfo"] {
    margin-top: 40px !important;
    padding-top: 25px !important;
  }

  /* استبدال صور البانرات للموبايل */
  @media (max-width: 768px) {
    .home_banner img[src*="1792321678444475356"] {
      content: url("https://files.easy-orders.net/1792321674971322391.webp") !important;
    }
    .home_banner img[src*="1792321633730397648"] {
      content: url("https://files.easy-orders.net/1792321639187993878.webp") !important;
    }
    .home_banner img[src*="1792321664614088127"] {
      content: url("https://files.easy-orders.net/1792321661808634032.webp") !important;
    }
    .home_banner .home_banner_img img {
      width: 100% !important;
      height: auto !important;
      object-fit: contain !important;
      display: block !important;
    }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.appendChild(document.createTextNode(css));
  (document.head || document.documentElement).appendChild(styleEl);
})();


/**
 * ==============================================================================
 * 2) تسريع تحميل أول صور للفئات (Fetch Priority)
 * ==============================================================================
 */
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


/**
 * ==============================================================================
 * 3) تعديل الأسعار ونسبة الخصم تلقائياً (+20)
 * ==============================================================================
 */
(function() {
  const ADD_AMOUNT = 20;

  function extractNumber(text) {
    if (!text) return null;
    const match = text.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : null;
  }

  function updateElementText(el, oldVal, newVal) {
    let updated = false;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.includes(String(oldVal))) {
        node.nodeValue = node.nodeValue.replace(String(oldVal), String(newVal));
        updated = true;
        break;
      }
    }
    if (!updated) {
      el.innerHTML = el.innerHTML.replace(String(oldVal), String(newVal));
    }
  }

  function processPrices() {
    // 1. صفحة المنتج الرئيسية
    document.querySelectorAll('.ab-pd').forEach(container => {
      const oldEl = container.querySelector('.ab-pd-price-old:not([data-mod])');
      const saleEl = container.querySelector('.ab-pd-price-sale');
      const badgeEl = container.querySelector('.ab-pd-discount-badge');

      if (oldEl && saleEl) {
        const oldP = extractNumber(oldEl.innerText);
        const saleP = extractNumber(saleEl.innerText);
        if (oldP && saleP) {
          const newOldP = oldP + ADD_AMOUNT;
          updateElementText(oldEl, oldP, newOldP);
          oldEl.setAttribute('data-mod', '1');

          if (badgeEl && !badgeEl.hasAttribute('data-mod')) {
            const newDiscount = Math.round(((newOldP - saleP) / newOldP) * 100);
            const currentBadgeNum = extractNumber(badgeEl.innerText);
            if (currentBadgeNum) updateElementText(badgeEl, currentBadgeNum, newDiscount);
            badgeEl.setAttribute('data-mod', '1');
          }
        }
      }
    });

    // 2. كروت المنتجات (Grid & List)
    document.querySelectorAll('.ab-pgrid-card, .ab-plist-card').forEach(card => {
      const oldEl = card.querySelector('.ab-price-old:not([data-mod])');
      const saleEl = card.querySelector('.ab-price-sale, .ab-pgrid-price, .ab-plist-price');
      const badgeEl = card.querySelector('.ab-sale-badge');

      if (oldEl && saleEl) {
        const oldP = extractNumber(oldEl.innerText);
        const saleP = extractNumber(saleEl.innerText);
        if (oldP && saleP) {
          const newOldP = oldP + ADD_AMOUNT;
          updateElementText(oldEl, oldP, newOldP);
          oldEl.setAttribute('data-mod', '1');

          if (badgeEl && !badgeEl.hasAttribute('data-mod')) {
            const newDiscount = Math.round(((newOldP - saleP) / newOldP) * 100);
            const currentBadgeNum = extractNumber(badgeEl.innerText);
            if (currentBadgeNum) updateElementText(badgeEl, currentBadgeNum, newDiscount);
            badgeEl.setAttribute('data-mod', '1');
          }
        }
      }
    });

    // 3. الشريط العائم السفلي (Sticky Bar)
    document.querySelectorAll('.vs-sticky').forEach(bar => {
      const oldEl = bar.querySelector('.vs-sticky__old:not([data-mod])');
      if (oldEl) {
        const oldP = extractNumber(oldEl.innerText);
        if (oldP) {
          updateElementText(oldEl, oldP, oldP + ADD_AMOUNT);
          oldEl.setAttribute('data-mod', '1');
        }
      }
    });

    // 4. قائمة الاقتراحات (vs-sg__list)
    document.querySelectorAll('.vs-sg__item').forEach(item => {
      const oldEl = item.querySelector('.vs-sg__old:not([data-mod])');
      if (oldEl) {
        const oldP = extractNumber(oldEl.innerText);
        if (oldP) {
          updateElementText(oldEl, oldP, oldP + ADD_AMOUNT);
          oldEl.setAttribute('data-mod', '1');
        }
      }
    });

    // 5. منتجات شريط الشحن المجاني (Swiper Carousel)
    document.querySelectorAll('.min_value_carousel .swiper-slide').forEach(slide => {
      const oldEl = slide.querySelector('.line-through:not([data-mod])');
      if (oldEl) {
        const oldP = extractNumber(oldEl.innerText);
        if (oldP) {
          updateElementText(oldEl, oldP, oldP + ADD_AMOUNT);
          oldEl.setAttribute('data-mod', '1');
        }
      }
    });
  }

  processPrices();
  const observer = new MutationObserver(processPrices);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();


/**
 * ==============================================================================
 * 4) رفع عدد التقييمات تلقائياً (+3)
 * ==============================================================================
 */
(function() {
  function boostReviews() {
    document.querySelectorAll('.ab-pd-reviews-count:not([data-rev-mod])').forEach(el => {
      const match = el.innerText.match(/\d+/);
      if (match) {
        const count = parseInt(match[0], 10);
        if (count > 0) {
          const newCount = count + 3;
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
          let node;
          while ((node = walker.nextNode())) {
            if (node.nodeValue.includes(String(count))) {
              node.nodeValue = node.nodeValue.replace(String(count), String(newCount));
              break;
            }
          }
        }
      }
      el.setAttribute('data-rev-mod', '1');
    });
  }

  boostReviews();
  const observer = new MutationObserver(boostReviews);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();


/**
 * ==============================================================================
 * 5) زر شريط الواتساب المدمج داخل صفحة المنتج
 * ==============================================================================
 */
(function() {
  function addInlineWhatsApp() {
    const trustBox = document.querySelector('.vs-trust');
    if (trustBox && !document.querySelector('.wa-inline-bar')) {
      const productName = document.querySelector('.ab-pd-name')?.innerText.trim() || 'المنتج';
      const encodedMsg = encodeURIComponent(`السلام عليكم، أحتاج مساعدة بخصوص: ${productName}`);
      
      const link = document.createElement('a');
      link.className = 'wa-inline-bar';
      link.href = `https://wa.me/201500334675?text=${encodedMsg}`;
      link.target = '_blank';
      link.rel = 'noopener';
      
      link.innerHTML = `
        <svg width="15" height="15" fill="#25D366" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/></svg>
        <span>محتاج مساعدة في الطلب؟</span>
        <span class="wa-inline-action">تواصل عبر واتساب</span>
      `;

      trustBox.parentNode.insertBefore(link, trustBox.nextSibling);
    }
  }

  addInlineWhatsApp();
  const observer = new MutationObserver(addInlineWhatsApp);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();


/**
 * ==============================================================================
 * 6) إضافة الشارات الذكية وشارة تغليف ضد الكسر
 * ==============================================================================
 */
(function() {
  function injectBadges() {
    const discountBadge = document.querySelector('.ab-pd-discount-badge');
    
    if (discountBadge && !document.querySelector('.badge-safe-pack')) {
      const title = document.querySelector('.ab-pd-name')?.innerText || '';
      let smartText = 'الأكثر طلباً';
      if (title.includes('فاخر')) smartText = 'قطعة فاخرة';
      else if (title.includes('عصري') || title.includes('عصرية')) smartText = 'تصميم عصري';
      else if (title.includes('طقم')) smartText = 'طقم توفيري';

      let wrap = discountBadge.closest('.custom-badges-wrap');
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.className = 'custom-badges-wrap';
        discountBadge.parentNode.insertBefore(wrap, discountBadge);
        wrap.appendChild(discountBadge);
      }

      const safeBadge = document.createElement('span');
      safeBadge.className = 'ab-pd-discount-badge badge-safe-pack';
      safeBadge.setAttribute('data-mod', '1');
      safeBadge.innerText = 'تغليف ضد الكسر';
      wrap.appendChild(safeBadge);

      const smartBadge = document.createElement('span');
      smartBadge.className = 'ab-pd-discount-badge badge-smart-tag';
      smartBadge.setAttribute('data-mod', '1');
      smartBadge.innerText = smartText;
      wrap.appendChild(smartBadge);
    }
  }

  injectBadges();
  const observer = new MutationObserver(injectBadges);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();


/**
 * ==============================================================================
 * 7) الفتح التلقائي لنافذة التقييمات
 * ==============================================================================
 */
(function() {
  function autoOpenReviews() {
    const item = document.querySelector('.lq-desc-accordion-item--reviews');
    const trigger = item?.querySelector('.lq-desc-accordion-trigger');
    if (item && trigger && (!item.classList.contains('ab-open') || trigger.getAttribute('aria-expanded') !== 'true')) {
      trigger.click();
    }
  }

  autoOpenReviews();
  document.addEventListener('DOMContentLoaded', autoOpenReviews);
  setTimeout(autoOpenReviews, 300);
})();


/**
 * ==============================================================================
 * 8) التحكم في الوصف وإضافة زر (عرض كامل الوصف ▾)
 * ==============================================================================
 */
(function() {
  function applyDescriptionFix() {
    const item = document.querySelector('.lq-desc-accordion-item:not(.lq-desc-accordion-item--reviews)');
    if (!item) return;

    const trigger = item.querySelector('.lq-desc-accordion-trigger');
    const descContent = item.querySelector('.lq-desc-content');

    if (trigger && (!item.classList.contains('ab-open') || trigger.getAttribute('aria-expanded') !== 'true')) {
      trigger.click();
    }

    if (descContent && !item.querySelector('.desc-toggle-btn')) {
      descContent.classList.add('desc-collapsed');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'desc-toggle-btn';
      btn.innerHTML = `<span>عرض كامل الوصف والمواصفات ▾</span>`;

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isCollapsed = descContent.classList.contains('desc-collapsed');
        
        if (isCollapsed) {
          descContent.classList.remove('desc-collapsed');
          btn.innerHTML = `<span>عرض أقل ▴</span>`;
        } else {
          descContent.classList.add('desc-collapsed');
          btn.innerHTML = `<span>عرض كامل الوصف والمواصفات ▾</span>`;
          descContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });

      descContent.parentNode.appendChild(btn);
    }
  }

  applyDescriptionFix();

  const observer = new MutationObserver(applyDescriptionFix);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('popstate', () => setTimeout(applyDescriptionFix, 100));
  ['pushState', 'replaceState'].forEach(evt => {
    const original = history[evt];
    history[evt] = function() {
      original.apply(this, arguments);
      setTimeout(applyDescriptionFix, 150);
    };
  });
})();


/**
 * ==============================================================================
 * 9) ضبط خط أزرار الأسئلة الشائعة
 * ==============================================================================
 */
(function() {
  function forceSmallFaqFont() {
    document.querySelectorAll('.szh-accordion__item-btn, button[data-szh-adn-btn]').forEach(btn => {
      btn.style.setProperty('font-size', '12.5px', 'important');
      btn.style.setProperty('text-align', 'right', 'important');
    });
  }

  forceSmallFaqFont();
  document.addEventListener('DOMContentLoaded', forceSmallFaqFont);
  setTimeout(forceSmallFaqFont, 300);
})();


/**
 * ==============================================================================
 * 10) تحويل مباشر لصفحة الشراء عند الضغط على إتمام الطلب
 * ==============================================================================
 */
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
