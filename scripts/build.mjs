/* =========================================================
   LATA SCIENTIFIC — static catalogue generator
   Run:  node scripts/build.mjs
   Reads data/catalogue.mjs and writes:
     - products.html            (catalogue overview)
     - cat-<slug>.html          (one per category)
     - product-<slug>.html      (one per product)
   Shared header/footer are defined ONCE here, so the whole
   site stays consistent. Do not hand-edit generated files —
   edit data/catalogue.mjs (or this template) and re-run.
   ========================================================= */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { categories } from "../data/catalogue.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = (name, html) => writeFileSync(resolve(ROOT, name), html, "utf8");

/* ---------- intrinsic image size ----------
   Emitting width/height on every <img> reserves the box before the file
   arrives, so lazy-loaded product shots cannot shift the layout as they
   pop in. Read straight from the file header — no dependency needed. */
const sizeCache = new Map();
function imgSize(rel) {
  if (!rel) return null;
  if (sizeCache.has(rel)) return sizeCache.get(rel);
  let out = null;
  try {
    const file = resolve(ROOT, rel);
    if (existsSync(file)) {
      const b = readFileSync(file);
      if (b.length > 24 && b[0] === 0x89 && b[1] === 0x50) {
        out = { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };            // PNG IHDR
      } else if (b[0] === 0xff && b[1] === 0xd8) {
        let i = 2;
        while (i < b.length - 9) {
          if (b[i] !== 0xff) { i++; continue; }
          const m = b[i + 1];
          if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
            out = { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };  // JPEG SOFn
            break;
          }
          i += 2 + b.readUInt16BE(i + 2);
        }
      }
    }
  } catch { out = null; }
  sizeCache.set(rel, out);
  return out;
}
const dimAttrs = (rel) => { const s = imgSize(rel); return s ? ` width="${s.w}" height="${s.h}"` : ""; };

/* ---------- icons ---------- */
const ICON = {
  glassware: '<path d="M9 3h6M10 3v5l-4 11a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3L14 8V3"/>',
  reaction: '<circle cx="9" cy="15" r="6"/><circle cx="17" cy="10" r="4"/>',
  distillation: '<path d="M10 3h4M11 3v6l-3 11a2 2 0 0 0 2 3h6a2 2 0 0 0 2-3l-3-11V3"/>',
  columns: '<rect x="9" y="3" width="6" height="18" rx="2"/><path d="M10 7h4M10 11h4M10 15h4"/>',
  cooling: '<path d="M8 4h8M9 4v16M15 4v16"/><path d="M9 9q6 4 6 0M9 14q6 4 6 0"/>',
  scrubbers: '<path d="M8 5h8l-1.5 15a2 2 0 0 1-2 1.8h-1a2 2 0 0 1-2-1.8z"/><path d="M10 11q2 2 4 0"/>',
  ptfe: '<path d="M4 8c6 0 6 8 12 8"/><path d="M16 4h4v16h-4"/>',
  silicone: '<path d="M4 12h16M8 9v6M12 9v6M16 9v6"/>',
  valves: '<path d="M4 12h5M15 12h5"/><path d="M9 7l6 10M15 7L9 17"/><circle cx="12" cy="12" r="2"/>',
  fittings: '<path d="M6 9h6v6H6zM12 11h6"/>',
  filters: '<path d="M5 5h14l-5 7v6l-4 2v-8z"/>',
  pipeline: '<path d="M2 9h5v6H2zM17 9h5v6h-5"/><path d="M7 12h10"/>',
  "ptfe-lined": '<path d="M3 8h18v8H3z"/><path d="M6 10.5h12v3H6z"/><path d="M3 8v8M21 8v8"/>',
  "lined-valves": '<path d="M3 12h5M16 12h5"/><path d="M8 7h8v10H8z"/><circle cx="12" cy="12" r="2.2"/><path d="M12 7V4M10 4h4"/>',
  "sight-flow": '<path d="M2 10h4v4H2zM18 10h4v4h-4"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1.6"/>',
  /* Categories added in the 2026 catalogue restructure */
  coupling: '<path d="M3 10h7v4H3zM14 10h7v4h-7"/><path d="M10 7.5v9M14 7.5v9"/>',
  "rotary-evaporator": '<path d="M4 5h6M7 5v5"/><path d="M7 10 4.5 17a3.2 3.2 0 0 0 3 4.4h-.9"/><circle cx="15.5" cy="16" r="4.6"/><path d="M11 9.5h6.5a2.5 2.5 0 0 1 2.5 2.5v1"/>',
  "tubular-structure": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
  "heat-exchanger": '<path d="M3 6h14a4 4 0 0 1 0 12H3"/><path d="M6 6v12M10 6v12M14 6v12"/>',
  "column-component": '<rect x="8" y="2" width="8" height="20" rx="1.6"/><path d="M8 7h8M8 12h8M8 17h8"/><path d="M5 12h3M16 12h3"/>',
};
const svg = (slug, w = 24) =>
  `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[slug] || ""}</svg>`;
// large placeholder art for media blocks
const bigArt = (slug) =>
  `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(36 36) scale(2)">${ICON[slug] || ""}</g></svg>`;

const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const glass = categories.filter((c) => c.group === "glass");
const fluid = categories.filter((c) => c.group === "fluid");
const find = (slug) => categories.find((c) => c.slug === slug);

/* A category holds EITHER a flat `products` array, or `subcategories`
   (each with its own products) for deeper ranges like Pipeline Components.
   These helpers let the rest of the generator treat both the same way. */
const subsOf = (cat) => cat.subcategories || null;
const allProducts = (cat) =>
  subsOf(cat) ? cat.subcategories.flatMap((s) => s.products || []) : (cat.products || []);
// Which subcategory a product belongs to (null for flat categories).
const subOf = (cat, p) =>
  subsOf(cat) ? cat.subcategories.find((s) => (s.products || []).some((x) => x.slug === p.slug)) : null;

/* ---------- shared chrome ---------- */
const megaCol = (title, list) => `
          <div class="mega__group"><h4>${title}</h4>
            ${list.map((c) => `<a class="mega__link" href="cat-${c.slug}.html"><span class="mega__ico">${svg(c.slug, 20)}</span><span><b>${c.name}</b><small>${c.tagline}</small></span></a>`).join("\n            ")}
          </div>`;

const header = () => `<div class="topbar">
  <div class="container topbar__inner">
    <div class="topbar__contacts">
      <a href="tel:+910000000000"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5c0 9 6 15 15 15l1-4-5-2-2 2a12 12 0 0 1-5-5l2-2-2-5z"/></svg>+91 00000 00000</a>
      <a href="mailto:sales@latascientific.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>sales@latascientific.com</a>
    </div>
    <div class="topbar__meta"><b>ISO-aligned QC</b> · Borosilicate 3.3 · Shipping to 40+ countries</div>
  </div>
</div>

<header class="site-header" id="header">
  <div class="container header__inner">
    <a class="logo" href="index.html" aria-label="Lata Scientific home"><span class="logo__mark" aria-hidden="true"><svg viewBox="0 0 32 40" width="22" height="28"><g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 9v15a5 5 0 0 0 5 5h3"/><path d="M27 14a4.5 4.5 0 0 0-4.5-4h-.5a4.8 4.8 0 0 0 0 9.6h1.5a4.8 4.8 0 0 1 0 9.6h-.8a4.5 4.5 0 0 1-4.3-3.6"/></g><g stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".75"><path d="M5.5 13h2.5M5.5 17h2.5M5.5 21h2.5"/></g></svg></span><span class="logo__text"><span class="logo__name">Lata<span>Scientific</span></span><span class="logo__tag">Glass · Process · Fluid</span></span></a>
    <nav class="mainnav" id="mainnav" aria-label="Primary">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <div class="has-mega">
        <button class="mainnav__trigger" aria-expanded="false" aria-haspopup="true">Products <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="mega" role="menu">
${megaCol("Glass &amp; Process Equipment", glass)}
${megaCol("Fluid Transfer &amp; Fittings", fluid)}
          <div class="mega__promo"><div><h4>Can't find it? We fabricate it.</h4><p>Custom glass and assemblies built to your dimensions.</p></div><a class="link" href="capabilities.html">Custom fabrication ${arrow.replace('width="2"', 'width="2" width="16" height="16"')}</a></div>
        </div>
      </div>
      <a href="capabilities.html">Capabilities</a>
      <a href="quality.html">Quality</a>
      <a href="contact.html">Contact</a>
      <a href="contact.html" class="btn btn--primary only-drawer">Request a quote</a>
    </nav>
    <div class="header__cta"><a href="contact.html" class="btn btn--primary">Request a quote</a></div>
    <button class="navtoggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mainnav"><span></span><span></span><span></span></button>
  </div>
</header>`;

const footerProducts = categories.slice(0, 6).map((c) => `<a href="cat-${c.slug}.html">${c.name}</a>`).join("");
const footer = () => `<footer class="site-footer footer">
  <div class="container footer__inner">
    <div>
      <a class="logo" href="index.html" aria-label="Lata Scientific home"><span class="logo__mark" aria-hidden="true"><svg viewBox="0 0 32 40" width="22" height="28"><g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 9v15a5 5 0 0 0 5 5h3"/><path d="M27 14a4.5 4.5 0 0 0-4.5-4h-.5a4.8 4.8 0 0 0 0 9.6h1.5a4.8 4.8 0 0 1 0 9.6h-.8a4.5 4.5 0 0 1-4.3-3.6"/></g><g stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".75"><path d="M5.5 13h2.5M5.5 17h2.5M5.5 21h2.5"/></g></svg></span><span class="logo__text"><span class="logo__name">Lata<span>Scientific</span></span><span class="logo__tag">Glass · Process · Fluid</span></span></a>
      <p class="footer__blurb">Precision borosilicate glassware, glass process equipment and fluid-transfer components — engineered to the tolerance your method demands.</p>
      <div class="footer__social">
        <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.06 3.77-2.06C20.4 8.64 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3s-2.3 1.57-2.3 3.2V21H9z"/></svg></a>
        <a href="#" aria-label="X"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.5 3h3l-6.6 7.6L22 21h-5.9l-4.6-6-5.3 6H3.2l7-8L2 3h6l4.2 5.5zM16 19h1.6L8 5H6.3z"/></svg></a>
        <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM10 15V9l5 3z"/></svg></a>
      </div>
    </div>
    <nav class="footer__col" aria-label="Products"><h4>Products</h4>${footerProducts}</nav>
    <nav class="footer__col" aria-label="Company"><h4>Company</h4><a href="about.html">About us</a><a href="capabilities.html">Capabilities</a><a href="quality.html">Quality</a><a href="products.html">Products</a><a href="contact.html">Contact</a></nav>
    <div class="footer__col footer__news"><h4>Newsletter</h4><p>Occasional notes on new apparatus and capabilities. No noise.</p><form class="news" id="newsForm" novalidate><input type="email" id="newsEmail" placeholder="Work email" aria-label="Email for newsletter" required /><button class="btn btn--primary btn--sm" type="submit" aria-label="Subscribe"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form><p class="news__note" id="newsNote" role="status" aria-live="polite"></p></div>
  </div>
  <div class="container footer__bar"><p>© <span data-year>2026</span> Lata Scientific. All rights reserved.</p><div class="footer__legal"><a href="#">Privacy</a><a href="#">Terms</a><a href="quality.html">Certifications</a></div></div>
</footer>

<button class="to-top" id="toTop" aria-label="Back to top"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button>
<script src="assets/js/main.js" defer></script>
<script type="module" src="assets/js/premium.js"></script>
</body>
</html>`;

/* HTML-escape for anything that lands inside an attribute (meta, alt, JSON-LD). */
const esc = (s) => String(s ?? "")
  .replace(/&(?!(?:amp|lt|gt|quot|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;")
  .replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Strip tags/entities for meta text so descriptions read as plain prose.
const plain = (s) => String(s ?? "")
  .replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
  .replace(/\s+/g, " ").trim();

const BASE_URL = "https://www.latascientific.com/";

/* `extra` carries per-page SEO: keywords, og:image and JSON-LD. */
const head = (title, desc, canonical, extra = {}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0B2540" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
${extra.keywords ? `  <meta name="keywords" content="${esc(extra.keywords)}" />\n` : ""}  <link rel="canonical" href="${BASE_URL}${canonical}" />
  <meta property="og:type" content="${extra.ogType || "website"}" />
  <meta property="og:site_name" content="Lata Scientific" />
  <meta property="og:url" content="${BASE_URL}${canonical}" />
  <meta property="og:title" content="${esc(extra.ogTitle || title)}" />
  <meta property="og:description" content="${esc(desc)}" />
${extra.image ? `  <meta property="og:image" content="${BASE_URL}${extra.image}" />\n  <meta property="og:image:alt" content="${esc(extra.imageAlt || title)}" />\n` : ""}  <meta name="twitter:card" content="${extra.image ? "summary_large_image" : "summary"}" />
  <meta name="twitter:title" content="${esc(extra.ogTitle || title)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
${extra.image ? `  <meta name="twitter:image" content="${BASE_URL}${extra.image}" />\n` : ""}  <link rel="icon" href="favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="site.webmanifest" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <!-- Local CSS first so it is never queued behind a third-party request. -->
  <link rel="stylesheet" href="assets/css/styles.css" />
  <link rel="stylesheet" href="assets/css/premium.css" />
  <link rel="stylesheet" href="assets/css/catalogue.css" />
  <!-- Fonts load without blocking first paint; display=swap keeps text visible. -->
  <link rel="stylesheet" media="print" onload="this.media='all'" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&amp;family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&amp;family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" /></noscript>
${(extra.jsonld || []).map((o) => `  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n")}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
`;

const ctaBand = () => `<section class="section${""}"><div class="container"><div class="cta reveal"><h2>Not sure which spec fits your process?</h2><p>Send your requirement — media, temperature, pressure, dimensions — and we'll recommend the right product or fabricate it.</p><a href="contact.html" class="btn btn--light btn--lg">Talk to an engineer ${arrow}</a></div></div></section>`;

/* ---------- product card (used on category pages + related) ---------- */
// Real supplied photo when `image` is set; otherwise the icon placeholder.
const media = (p, cat, cls = "ph ph--sm") =>
  p.image
    ? `<img src="${p.image}"${dimAttrs(p.image)} alt="${esc(p.alt || p.name)}" loading="lazy" decoding="async" />`
    : `<div class="${cls}">${bigArt(cat.slug)}</div>`;

// `subtitle` is optional — products supplied by name only render without it.
const productCard = (cat, p, tag) => `<article class="pcard reveal">
        <div class="pcard__media"><span class="pcard__tag">${tag || cat.name}</span>${media(p, cat)}</div>
        <div class="pcard__body"><h3>${p.name}</h3>${p.subtitle ? `<p>${p.subtitle}</p>` : `<p></p>`}
          <div class="pcard__foot"><span class="pcard__count">View details</span><a class="pcard__arrow" href="product-${p.slug}.html" aria-label="${p.name}">${arrow.replace('width="2"','width="2" width="16" height="16"')}</a></div>
        </div>
      </article>`;

/* ---------- category page ---------- */
const catNav = (active) =>
  categories.map((c) => `<a href="cat-${c.slug}.html"${c.slug === active ? ' class="is-active"' : ""}><span class="mega__ico">${svg(c.slug, 18)}</span>${c.name}${c.slug === active ? '<span class="catnav__dot"></span>' : ""}</a>`).join("\n        ");

/* Engineering reference tables that apply to a whole range (flange drilling,
   torque, tolerances) — shown once on the category page, not on every product. */
const refBlock = (cat) => !cat.refTables || !cat.refTables.length ? "" : `
  <section class="section section--alt" id="reference">
    <div class="container">
      <div class="sec-head"><p class="eyebrow">Engineering reference</p><h2 class="h2">Standards that apply across the ${cat.name.toLowerCase()} range.</h2>
        <p>These tables govern every item in this category. Product pages carry only their own dimensions.</p></div>
      ${cat.refTables.map((t) => dataTable(t, "reveal")).join("\n      ")}
    </div>
  </section>`;

const categoryPage = (cat) => head(
  `${cat.name} — Products | Lata Scientific`,
  plain(`${cat.blurb} Browse the ${cat.name.toLowerCase()} range from Lata Scientific.`).slice(0, 158),
  `cat-${cat.slug}.html`,
  {
    keywords: [...new Set(allProducts(cat).flatMap((p) => (p.keywords || "").split(",").map((k) => k.trim())).filter(Boolean))].slice(0, 25).join(", ") || undefined,
    image: (allProducts(cat).find((p) => p.image) || {}).image,
    imageAlt: cat.name,
    jsonld: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${cat.name} — Lata Scientific`,
        description: plain(cat.blurb),
        url: `${BASE_URL}cat-${cat.slug}.html`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: allProducts(cat).length,
          itemListElement: allProducts(cat).map((p, i) => ({
            "@type": "ListItem", position: i + 1, name: p.name,
            url: `${BASE_URL}product-${p.slug}.html`,
          })),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Products", item: `${BASE_URL}products.html` },
          { "@type": "ListItem", position: 3, name: cat.name, item: `${BASE_URL}cat-${cat.slug}.html` },
        ],
      },
    ],
  }
) + header() + `
<main id="main">
  <section class="pagehero">
    <div class="container pagehero__inner">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="products.html">Products</a><span>/</span><b>${cat.name}</b></nav>
      <p class="eyebrow">${cat.group === "glass" ? "Glass &amp; process equipment" : "Fluid transfer &amp; fittings"}</p>
      <h1>${cat.name}</h1>
      <p>${cat.blurb}</p>
    </div>
  </section>

  <section class="section">
    <div class="container catlayout">
      <aside class="catside">
        <div class="catside__block">
          <h3 class="catside__title">Categories</h3>
          <nav class="catnav" aria-label="Product categories">
        ${catNav(cat.slug)}
          </nav>
        </div>
        <div class="brochure">
          <span class="brochure__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M14 2v6h6"/><path d="M9 15h6M9 18h4"/></svg></span>
          <div><b>Brochure</b><small>${cat.name} — full range</small></div>
          <a class="btn btn--dark btn--block" href="assets/pdfs/${cat.brochure}" aria-label="Download ${cat.name} brochure">Download PDF <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 11l5 5 5-5"/><path d="M5 20h14"/></svg></a>
          <p class="brochure__hint">Placeholder — drop <code>${cat.brochure}</code> into <code>assets/pdfs/</code>.</p>
        </div>
        <div class="catside__cta">
          <b>Need something custom?</b>
          <p>Send a drawing or sample and we'll fabricate to your spec.</p>
          <a class="link" href="contact.html">Request a quote ${arrow.replace('width="2"','width="2" width="15" height="15"')}</a>
        </div>
      </aside>

      <div class="catmain">
        <div class="catmain__head">
          <h2 class="h2">${cat.name}</h2>
          <span class="catmain__count">${allProducts(cat).length} product${allProducts(cat).length === 1 ? "" : "s"}</span>
        </div>
${subsOf(cat)
  ? cat.subcategories.map((s) => `        <div class="subcat" id="${s.slug}">
          <div class="subcat__head">
            <h3 class="subcat__title">${s.name}</h3>
            <span class="subcat__count">${(s.products || []).length} item${(s.products || []).length === 1 ? "" : "s"}</span>
          </div>
          <div class="grid grid--3 stagger">
            ${(s.products || []).map((p) => productCard(cat, p, s.name)).join("\n            ")}
          </div>
        </div>`).join("\n")
  : `        <div class="grid grid--3 stagger">
          ${allProducts(cat).map((p) => productCard(cat, p)).join("\n          ")}
        </div>`}
      </div>
    </div>
  </section>
  ${refBlock(cat)}
  ${ctaBand()}
</main>
` + footer();

/* ---------- product page ---------- */
const specTable = (specs, caption = "Key specification") => `<table class="spec"><caption>${caption}</caption><tbody>${specs.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}</tbody></table>`;

/* ---------- rich product sections ----------
   Each renders nothing at all when its data is absent, so products supplied
   by name only keep the original lean layout. */

// Wide data table (dimensions, materials, reference charts). The wrapper is what
// makes it scroll on narrow screens instead of pushing the page sideways.
const dataTable = (t, cls = "") => !t || !t.rows || !t.rows.length ? "" : `
        <figure class="dtable ${cls}">
          <figcaption class="dtable__cap">${t.caption}</figcaption>
          <div class="dtable__scroll" tabindex="0" role="group" aria-label="${esc(plain(t.caption))} — scrollable table">
            <table class="dtable__t">
              <thead><tr>${t.cols.map((c) => `<th scope="col">${c}</th>`).join("")}</tr></thead>
              <tbody>${t.rows.map((r) => `<tr>${r.map((c, i) => i === 0
                ? `<th scope="row">${c}</th>`
                : `<td${/^[✓—]$/.test(String(c)) ? ` class="is-${String(c) === "✓" ? "yes" : "no"}"` : ""} data-label="${esc(t.cols[i] || "")}">${c}</td>`).join("")}</tr>`).join("")}
              </tbody>
            </table>
          </div>
          ${t.note ? `<p class="dtable__note">${t.note}</p>` : ""}
        </figure>`;

const bulletCards = (items, ico) => items.map((x) => `<li class="bcard reveal"><span class="bcard__ico">${svg(ico, 18)}</span><span>${x}</span></li>`).join("\n            ");

const overviewBlock = (p) => !p.long ? "" : `
  <section class="section section--alt" id="overview">
    <div class="container">
      <div class="sec-head"><p class="eyebrow">Product overview</p><h2 class="h2">What it does, and where it fits.</h2></div>
      <div class="prose reveal">${p.long.map((t) => `<p>${t}</p>`).join("\n        ")}</div>
    </div>
  </section>`;

const featureBlock = (p, cat) => {
  const blocks = [];
  if (p.features) blocks.push(["Features", "Built into every unit.", p.features, cat.slug]);
  if (p.advantages) blocks.push(["Benefits", "Why it earns its place in the line.", p.advantages, "ptfe-lined"]);
  if (!blocks.length) return "";
  return blocks.map(([eyebrow, h2, items, ico], i) => `
  <section class="section${i % 2 ? " section--alt" : ""}" id="${eyebrow.toLowerCase()}">
    <div class="container">
      <div class="sec-head"><p class="eyebrow">${eyebrow}</p><h2 class="h2">${h2}</h2></div>
      <ul class="blist stagger">
            ${bulletCards(items, ico)}
      </ul>
    </div>
  </section>`).join("\n");
};

const applicationBlock = (p, cat) => {
  if (!p.applications && !p.industries) return "";
  return `
  <section class="section" id="applications">
    <div class="container">
      <div class="sec-head"><p class="eyebrow">Applications &amp; industries</p><h2 class="h2">Where it is specified.</h2></div>
      <div class="applayout">
        ${p.applications ? `<div class="reveal">
          <h3 class="h3 applayout__h">Typical applications</h3>
          <ul class="checklist">${p.applications.map((a) => `<li>${a}</li>`).join("")}</ul>
        </div>` : ""}
        ${p.industries ? `<div class="reveal">
          <h3 class="h3 applayout__h">Industries served</h3>
          <ul class="chips">${p.industries.map((a) => `<li class="chip">${a}</li>`).join("")}</ul>
        </div>` : ""}
      </div>
    </div>
  </section>`;
};

const techBlock = (p, cat) => {
  if (!p.spec && !p.dim && !p.matTable) return "";
  return `
  <section class="section section--alt" id="technical">
    <div class="container">
      <div class="sec-head"><p class="eyebrow">Technical data</p><h2 class="h2">Specification for ${p.name}.</h2>
        <p>Figures below are for this product only — every item in the range carries its own dimension table.</p></div>
      ${p.spec ? `<div class="reveal">${specTable(p.spec, `${p.name} — technical specification`)}</div>` : ""}
      ${p.dim ? dataTable(p.dim, "reveal") : ""}
      ${p.matTable ? dataTable(p.matTable, "reveal") : ""}
      ${p.options && p.options.length ? `<div class="optbox reveal">
        <h3 class="h3">Available on request</h3>
        <ul class="checklist">${p.options.map((o) => `<li>${o}</li>`).join("")}</ul>
      </div>` : ""}
    </div>
  </section>`;
};

const explodedBlock = (p) => !p.exploded ? "" : `
  <section class="section" id="drawing">
    <div class="container">
      <div class="sec-head"><p class="eyebrow">Exploded view</p><h2 class="h2">Every part, in assembly order.</h2>
        <p>Item numbers match the material specification table above.</p></div>
      <figure class="exploded reveal">
        <img src="${p.exploded}"${dimAttrs(p.exploded)} alt="Exploded assembly view of the ${plain(p.name)} showing numbered components" loading="lazy" decoding="async" />
      </figure>
    </div>
  </section>`;

const faqBlock = (p) => !p.faqs || !p.faqs.length ? "" : `
  <section class="section section--alt" id="faq">
    <div class="container">
      <div class="sec-head"><p class="eyebrow">FAQ</p><h2 class="h2">Questions we are asked about this item.</h2></div>
      <div class="accordion faq-wrap">
        ${p.faqs.map(([q, a]) => `<div class="acc"><button class="acc__q" aria-expanded="false">${q}<span class="acc__i"></span></button><div class="acc__a"><div><p>${a}</p></div></div></div>`).join("\n        ")}
      </div>
    </div>
  </section>`;

const inquiryBlock = (p, cat) => `
  <section class="section" id="inquiry">
    <div class="container">
      <div class="sec-head"><p class="eyebrow">Enquiry</p><h2 class="h2">Tell us your line size — we'll confirm the spec.</h2>
        <p>Send the bore, the media, the temperature and pressure, and the flange standard you work to. Drawings and custom sizes welcome.</p></div>
      <div class="ctagrid stagger">
        <a class="ctacard reveal" href="contact.html?product=${p.slug}"><span class="ctacard__ico">${svg("ptfe", 22)}</span><b>Request a quotation</b><small>Priced against your sizes and lining material</small></a>
        ${(p.downloads && p.downloads.length
          ? p.downloads.map((d) => `<a class="ctacard reveal" href="${d.file}" download><span class="ctacard__ico">${svg("pipeline", 22)}</span><b>${d.label}</b><small>Dimensions and catalogue references for this item</small></a>`).join("\n        ")
          : `<a class="ctacard reveal" href="assets/pdfs/${cat.brochure}"><span class="ctacard__ico">${svg("pipeline", 22)}</span><b>Download datasheet</b><small>Full ${cat.name.toLowerCase()} technical brochure</small></a>`)}
        <a class="ctacard reveal" href="contact.html?enquiry=technical&amp;product=${p.slug}"><span class="ctacard__ico">${svg("reaction", 22)}</span><b>Talk to a technical expert</b><small>Material selection and duty review</small></a>
        <a class="ctacard reveal" href="contact.html?enquiry=drawing&amp;product=${p.slug}"><span class="ctacard__ico">${svg("columns", 22)}</span><b>Send a drawing</b><small>We fabricate to your isometric or sketch</small></a>
        <a class="ctacard reveal" href="contact.html?enquiry=custom&amp;product=${p.slug}"><span class="ctacard__ico">${svg("fittings", 22)}</span><b>Request a custom size</b><small>Non-standard bores, lengths and drilling</small></a>
      </div>
    </div>
  </section>`;

const variantsBlock = (variants) => !variants ? "" : `
  <section class="section section--alt">
    <div class="container">
      <div class="sec-head"><p class="eyebrow">Construction options</p><h2 class="h2">Choose the build for your pressure class.</h2></div>
      <div class="grid grid--3 stagger">
        ${variants.map((v) => `<article class="fcard reveal"><span class="fcard__ico">${svg("ptfe", 25)}</span><h3>${v.name}</h3><p><strong>Construction.</strong> ${v.construction}</p><p style="margin-top:10px"><strong>Fitting.</strong> ${v.fitting}</p></article>`).join("\n        ")}
      </div>
    </div>
  </section>`;

/* Site-wide product index so a product can cross-link to any other product,
   including one in a different category. */
const INDEX = new Map();
for (const c of categories) for (const p of allProducts(c)) INDEX.set(p.slug, { p, cat: c, sub: subOf(c, p) });

const relatedBlock = (cat, current) => {
  // Explicit `related` slugs win; otherwise fall back to subcategory siblings.
  let rel = [];
  if (current.related) {
    for (const slug of current.related) {
      const hit = INDEX.get(slug);
      if (hit && hit.p.slug !== current.slug) rel.push(hit);
      else if (!hit) console.warn(`  ! ${current.slug}: related slug "${slug}" not found`);
    }
  }
  if (!rel.length) {
    const sub = subOf(cat, current);
    const pool = sub ? (sub.products || []) : allProducts(cat);
    rel = pool.filter((p) => p.slug !== current.slug).slice(0, 3)
      .map((p) => ({ p, cat, sub }));
  }
  rel = rel.slice(0, 4);
  if (!rel.length) return "";
  return `
  <section class="section" id="related">
    <div class="container">
      <div class="sec-head"><p class="eyebrow">Related products</p><h2 class="h2">Commonly specified alongside ${current.name}.</h2></div>
      <div class="grid grid--4 stagger">
        ${rel.map(({ p, cat: c, sub }) => productCard(c, p, sub ? sub.name : c.name)).join("\n        ")}
      </div>
    </div>
  </section>`;
};

/* schema.org Product + FAQPage + BreadcrumbList for each product page */
const productSchema = (cat, p, sub) => {
  const out = [{
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: plain(p.desc || `${p.name} from Lata Scientific.`),
    sku: p.slug,
    category: `${cat.name}${sub ? ` › ${sub.name}` : ""}`,
    url: `${BASE_URL}product-${p.slug}.html`,
    ...(p.image ? { image: `${BASE_URL}${p.image}` } : {}),
    brand: { "@type": "Brand", name: "Lata Scientific" },
    manufacturer: { "@type": "Organization", name: "Lata Scientific", url: BASE_URL },
    ...(p.spec ? {
      additionalProperty: p.spec.map(([name, value]) => ({
        "@type": "PropertyValue", name, value: plain(value),
      })),
    } : {}),
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}product-${p.slug}.html`,
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      availableDeliveryMethod: "https://schema.org/ParcelService",
      seller: { "@type": "Organization", name: "Lata Scientific" },
    },
  }, {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${BASE_URL}products.html` },
      { "@type": "ListItem", position: 3, name: cat.name, item: `${BASE_URL}cat-${cat.slug}.html` },
      ...(sub ? [{ "@type": "ListItem", position: 4, name: sub.name, item: `${BASE_URL}cat-${cat.slug}.html#${sub.slug}` }] : []),
      { "@type": "ListItem", position: sub ? 5 : 4, name: p.name, item: `${BASE_URL}product-${p.slug}.html` },
    ],
  }];
  if (p.faqs && p.faqs.length) out.push({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faqs.map(([q, a]) => ({
      "@type": "Question", name: plain(q),
      acceptedAnswer: { "@type": "Answer", text: plain(a) },
    })),
  });
  return out;
};

/* In-page jump nav — only lists the sections this product actually has. */
const pdNav = (p) => {
  const items = [
    p.long && ["overview", "Overview"],
    p.features && ["features", "Features"],
    p.advantages && ["benefits", "Benefits"],
    (p.applications || p.industries) && ["applications", "Applications"],
    (p.spec || p.dim || p.matTable) && ["technical", "Technical data"],
    p.exploded && ["drawing", "Exploded view"],
    p.faqs && ["faq", "FAQ"],
    ["related", "Related"],
    ["inquiry", "Enquiry"],
  ].filter(Boolean);
  if (items.length < 4) return "";
  return `
  <nav class="pdnav" aria-label="On this page">
    <div class="container pdnav__inner">
      ${items.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}
    </div>
  </nav>`;
};

const productPage = (cat, p) => {
  const sub = subOf(cat, p);
  const metaDesc = plain(p.desc || `${p.name} — ${sub ? sub.name + ", " : ""}${cat.name} from Lata Scientific. Process components made to your specification.`).slice(0, 158);
  return head(
    `${p.name} — ${sub ? sub.name : cat.name} | Lata Scientific`,
    metaDesc,
    `product-${p.slug}.html`,
    {
      keywords: p.keywords,
      image: p.image,
      imageAlt: p.alt || p.name,
      ogType: "product",
      ogTitle: `${p.name} | Lata Scientific`,
      jsonld: productSchema(cat, p, sub),
    }
  ) + header() + `
<main id="main">
  <section class="section" style="padding-top: clamp(26px,4vw,42px)">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb" style="color:var(--muted);margin-bottom:24px">
        <a href="index.html" style="color:var(--accent-strong)">Home</a><span style="opacity:.5">/</span>
        <a href="products.html" style="color:var(--accent-strong)">Products</a><span style="opacity:.5">/</span>
        <a href="cat-${cat.slug}.html" style="color:var(--accent-strong)">${cat.name}</a><span style="opacity:.5">/</span>
        ${sub ? `<a href="cat-${cat.slug}.html#${sub.slug}" style="color:var(--accent-strong)">${sub.name}</a><span style="opacity:.5">/</span>
        ` : ""}<b style="color:var(--ink-2)">${p.name}</b>
      </nav>
      <div class="pd">
        <div class="pd__media">${p.image ? `<img src="${p.image}"${dimAttrs(p.image)} alt="${esc(p.alt || p.name)}" fetchpriority="high" decoding="async" />` : `<div class="ph" role="img" aria-label="${esc(p.name)}">${bigArt(cat.slug)}</div>`}</div>
        <div class="pd__copy">
          <span class="pd__tag">${sub ? sub.name : cat.name}</span>
          <h1>${p.name}</h1>
          ${p.subtitle ? `<p class="pd__sub">${p.subtitle}</p>` : ""}
          ${p.desc ? `<p class="pd__desc">${p.desc}</p>` : `<p class="pd__desc">Dimensions, bore sizes and drawings for this item are available on request — tell us your line size and we'll confirm the exact specification.</p>`}
          <div class="pd__actions">
            <a href="contact.html?product=${p.slug}" class="btn btn--primary">Request a quotation ${arrow}</a>
            <a href="${p.downloads && p.downloads.length ? p.downloads[0].file : `assets/pdfs/${cat.brochure}`}" class="btn btn--ghost"${p.downloads && p.downloads.length ? " download" : ""}>Download datasheet <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 11l5 5 5-5"/><path d="M5 20h14"/></svg></a>
          </div>
          ${p.specs ? specTable(p.specs) : ""}
          ${p.spec ? specTable(p.spec.slice(0, 8), "At a glance") : ""}
          <p class="pd__more"><a class="link" href="#technical">Full technical data and dimensions ${arrow.replace('width="2"', 'width="2" width="15" height="15"')}</a></p>
        </div>
      </div>
    </div>
  </section>
  ${pdNav(p)}
  ${overviewBlock(p)}
  ${featureBlock(p, cat)}
  ${applicationBlock(p, cat)}
  ${techBlock(p, cat)}
  ${explodedBlock(p)}
  ${variantsBlock(p.variants)}
  ${faqBlock(p)}
  ${relatedBlock(cat, p)}
  ${inquiryBlock(p, cat)}
  ${ctaBand()}
</main>
` + footer();
};

/* ---------- products overview ---------- */
/* A category with real products shows its lead product shot; empty
   categories keep the icon placeholder they were designed with. */
const catShot = (c) => {
  const hit = allProducts(c).find((p) => p.image);
  return hit
    ? `<img class="pcard__shot" src="${hit.image}"${dimAttrs(hit.image)} alt="${esc(c.name)} — ${esc(hit.name)}" loading="lazy" decoding="async" />`
    : `<div class="ph ph--sm">${bigArt(c.slug)}</div>`;
};

const overviewGroup = (title, list) => `
    <div class="sec-head"><p class="eyebrow">${title.eyebrow}</p><h2 class="h2">${title.h2}</h2></div>
    <div class="grid grid--3 stagger">
      ${list.map((c) => `<article class="pcard reveal" id="${c.slug}">
        <div class="pcard__media"><span class="pcard__tag">${c.group === "glass" ? "Glass" : "Fluid"}</span>${catShot(c)}</div>
        <div class="pcard__body"><h3>${c.name}</h3><p>${c.blurb}</p>
          <div class="pcard__foot"><span class="pcard__count">${allProducts(c).length} product${allProducts(c).length === 1 ? "" : "s"}</span><a class="pcard__arrow" href="cat-${c.slug}.html" aria-label="${c.name}">${arrow.replace('width="2"','width="2" width="16" height="16"')}</a></div>
        </div>
      </article>`).join("\n      ")}`;

const overviewPage = () => head(
  "Products — Glassware, Process Equipment & Fluid Transfer | Lata Scientific",
  "Browse Lata Scientific's full catalogue: laboratory glassware, reaction & distillation assemblies, glass columns, condensers, scrubbers, PTFE & silicone hoses, sanitary valves, fittings and filter housings.",
  "products.html"
) + header() + `
<main id="main">
  <section class="pagehero">
    <div class="container pagehero__inner">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><b>Products</b></nav>
      <p class="eyebrow">Full catalogue</p>
      <h1>Everything your process line needs, from one supplier.</h1>
      <p>Two catalogues under one quality standard — precision borosilicate glass and hygienic fluid-transfer components. Pick a category to see its products, specs and brochures.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">${overviewGroup({ eyebrow: "Glass &amp; process equipment", h2: "Borosilicate 3.3, formed and tested in-house." }, glass)}</div>
  </section>
  <section class="section section--alt">
    <div class="container">${overviewGroup({ eyebrow: "Fluid transfer &amp; fittings", h2: "Hygienic hoses, valves and fittings that connect it all." }, fluid)}</div>
  </section>
  ${ctaBand()}
</main>
` + footer();

/* ---------- write everything ---------- */
let n = 0;
out("products.html", overviewPage()); n++;
for (const cat of categories) {
  out(`cat-${cat.slug}.html`, categoryPage(cat)); n++;
  for (const p of allProducts(cat)) { out(`product-${p.slug}.html`, productPage(cat, p)); n++; }
}
console.log(`Generated ${n} pages: 1 overview, ${categories.length} categories, ${categories.reduce((a, c) => a + allProducts(c).length, 0)} products.`);

/* ---------- sitemap ---------- */
const BASE = "https://www.latascientific.com/";
const staticPages = [
  ["", "1.0"], ["about.html", "0.7"], ["products.html", "0.9"],
  ["capabilities.html", "0.8"], ["quality.html", "0.7"], ["contact.html", "0.8"],
];
const urls = [
  ...staticPages.map(([u, p]) => ({ loc: BASE + u, pr: p })),
  ...categories.map((c) => ({ loc: `${BASE}cat-${c.slug}.html`, pr: "0.8" })),
  ...categories.flatMap((c) => allProducts(c).map((p) => ({ loc: `${BASE}product-${p.slug}.html`, pr: "0.6" }))),
];
const today = new Date().toISOString().slice(0, 10);
out("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${u.pr}</priority></url>`).join("\n")}
</urlset>
`);
console.log(`Wrote sitemap.xml with ${urls.length} URLs.`);
