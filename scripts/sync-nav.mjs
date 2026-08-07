/* =========================================================
   LATA SCIENTIFIC — navigation sync for the hand-written pages
   Run:  node scripts/sync-nav.mjs

   index.html, about.html, capabilities.html, quality.html and
   contact.html carry their own copies of the header mega-menu and the
   footer "Products" column. scripts/build.mjs cannot reach them, so
   before this script they drifted out of step with data/catalogue.mjs
   every time the category list changed.

   This rewrites ONLY those two fragments, from the same source of truth
   the generator uses. Markup, classes and icons are byte-for-byte what
   build.mjs emits, so nothing about the design changes.
   ========================================================= */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { categories } from "../data/catalogue.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PAGES = ["index.html", "about.html", "capabilities.html", "quality.html", "contact.html"];

/* ---------- contact details ----------
   Must stay identical to CONTACT in scripts/build.mjs and to the CONTACT
   block in assets/js/enquiry.js. */
const CONTACT = {
  waDigits: "919033630547",
  waDisplay: "+91 90336 30547",
  waTel: "+919033630547",
  email: "latascientific@gmail.com",
  floatMessage: "Hello Lata Scientific, I would like to enquire about your products.",
};
const waHref = (msg) => `https://wa.me/${CONTACT.waDigits}?text=${encodeURIComponent(msg)}`;

/* ---------- registered address ----------
   Identical to ADDRESS in scripts/build.mjs. One NAP for the whole site. */
const ADDRESS = {
  street: "A/24, Yamuna Park, Opp. Poonam Complex, Waghodiya Road",
  locality: "Vadodara",
  region: "Gujarat",
  postalCode: "390019",
  country: "India",
  countryCode: "IN",
};
const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: ADDRESS.street,
  addressLocality: ADDRESS.locality,
  addressRegion: ADDRESS.region,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.countryCode,
});

const WA_GLYPH = '<path d="M12.04 2C6.55 2 2.1 6.44 2.1 11.92c0 1.75.46 3.45 1.33 4.95L2 22l5.27-1.38a9.9 9.9 0 0 0 4.77 1.21h.01c5.48 0 9.94-4.45 9.94-9.93A9.87 9.87 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.23c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.8-.22-.09-.39-.13-.55.12-.17.25-.64.8-.79.97-.14.16-.29.19-.54.06-.24-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.11-.51.11-.11.24-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z"/>';
const MAIL_GLYPH = '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/>';

/* Byte-for-byte the markup build.mjs emits, so generated and hand-written
   pages carry the same header and footer. */
const topbarContacts = () =>
  `<div class="topbar__contacts">
      <a href="${waHref(CONTACT.floatMessage)}" target="_blank" rel="noopener" aria-label="WhatsApp ${CONTACT.waDisplay}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${WA_GLYPH}</svg>${CONTACT.waDisplay}</a>
      <a href="mailto:${CONTACT.email}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${MAIL_GLYPH}</svg>${CONTACT.email}</a>
    </div>`;

const footerContact = () =>
  `<div class="footer__contact">
        <a href="${waHref(CONTACT.floatMessage)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">${WA_GLYPH}</svg><span>${CONTACT.waDisplay}</span></a>
        <a href="mailto:${CONTACT.email}"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">${MAIL_GLYPH}</svg><span>${CONTACT.email}</span></a>
      </div>`;

/* Icon set kept in step with build.mjs */
const ICON = {
  pipeline: '<path d="M2 9h5v6H2zM17 9h5v6h-5"/><path d="M7 12h10"/>',
  "glass-valves": '<path d="M3 12h5M16 12h5"/><path d="M8 8h8v8H8z"/><path d="M12 8V4M9 4h6"/><path d="M10.5 12h3"/>',
  coupling: '<path d="M3 10h7v4H3zM14 10h7v4h-7"/><path d="M10 7.5v9M14 7.5v9"/>',
  "rotary-evaporator": '<path d="M4 5h6M7 5v5"/><path d="M7 10 4.5 17a3.2 3.2 0 0 0 3 4.4h-.9"/><circle cx="15.5" cy="16" r="4.6"/><path d="M11 9.5h6.5a2.5 2.5 0 0 1 2.5 2.5v1"/>',
  "tubular-structure": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
  "heat-exchanger": '<path d="M3 6h14a4 4 0 0 1 0 12H3"/><path d="M6 6v12M10 6v12M14 6v12"/>',
  "column-component": '<rect x="8" y="2" width="8" height="20" rx="1.6"/><path d="M8 7h8M8 12h8M8 17h8"/><path d="M5 12h3M16 12h3"/>',
  vessel: '<path d="M9.5 3h5"/><path d="M10.5 3v4.2M13.5 3v4.2"/><circle cx="12" cy="14" r="6.5"/>',
  "ptfe-lined": '<path d="M3 8h18v8H3z"/><path d="M6 10.5h12v3H6z"/><path d="M3 8v8M21 8v8"/>',
  "lined-valves": '<path d="M3 12h5M16 12h5"/><path d="M8 7h8v10H8z"/><circle cx="12" cy="12" r="2.2"/><path d="M12 7V4M10 4h4"/>',
  "sight-flow": '<path d="M2 10h4v4H2zM18 10h4v4h-4"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1.6"/>',
  "pilot-plant": '<path d="M12 3v3"/><path d="M8 4h8"/><path d="M6 9h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M12 6v9"/><path d="M9.5 14.5h5"/>',
};
const svg = (slug, w = 20) =>
  `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[slug] || ""}</svg>`;

/* ---------- search triggers ----------
   Byte-for-byte what build.mjs emits, so the header is identical on the
   generated and the hand-written pages. */
const searchIco = (w = 18) =>
  `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>`;
const headerSearchBtn = () =>
  `<button class="hsearch" type="button" data-search-open aria-haspopup="dialog" aria-label="Search products">${searchIco(18)}<span class="hsearch__txt">Search products</span><kbd class="hsearch__kbd">/</kbd></button>`;
const drawerSearchBtn = () =>
  `<button class="navsearch" type="button" data-search-open aria-haspopup="dialog">${searchIco(20)}<span>Search products</span></button>`;

const glass = categories.filter((c) => c.group === "glass");
const fluid = categories.filter((c) => c.group === "fluid");

/* `menuitem` is present on index.html's links but not the inner pages —
   keep whatever the file already used so ARIA semantics do not change. */
const megaCol = (title, list, roleAttr) => `
          <div class="mega__group">
            <h4>${title}</h4>
            ${list.map((c) => `<a class="mega__link" href="cat-${c.slug}.html"${roleAttr}><span class="mega__ico">${svg(c.slug)}</span><span><b>${c.name.replace(/&/g, "&amp;")}</b><small>${c.tagline.replace(/&/g, "&amp;")}</small></span></a>`).join("\n            ")}
          </div>`;

/* build.mjs lists the first six categories in the footer column to keep it
   short — match that exactly so generated and hand-written pages agree. */
const footerCol = () =>
  `<nav class="footer__col" aria-label="Products"><h4>Products</h4>${
    categories.slice(0, 6).map((c) => `<a href="cat-${c.slug}.html">${c.name.replace(/&/g, "&amp;")}</a>`).join("")
  }</nav>`;

/* ---------- social / structured metadata ----------
   The generated pages get Open Graph, Twitter cards and JSON-LD from
   build.mjs. The hand-written pages had title, description and canonical
   only, so they shared as a bare link. Values are derived from what each
   page already declares — nothing is invented. */
const BASE = "https://www.latascientific.com/";
const SHARE_IMG = "assets/img/products/pipe-section.png";   // 1536×1024
const pick = (html, re) => { const m = re.exec(html); return m ? m[1] : null; };

const socialBlock = (html, page) => {
  const title = pick(html, /<title>([\s\S]*?)<\/title>/);
  const desc = pick(html, /<meta\s+name="description"\s+content="([^"]*)"/);
  const canonical = pick(html, /<link\s+rel="canonical"\s+href="([^"]*)"/) || BASE + (page === "index.html" ? "" : page);
  // keep any hand-tuned og:title / og:description already on the page
  const ogTitle = pick(html, /<meta\s+property="og:title"\s+content="([^"]*)"/) || title;
  const ogDesc = pick(html, /<meta\s+property="og:description"\s+content="([^"]*)"/) || desc;
  if (!title || !desc) return null;
  return [
    `  <meta property="og:type" content="website" />`,
    `  <meta property="og:site_name" content="Lata Scientific" />`,
    `  <meta property="og:url" content="${canonical}" />`,
    `  <meta property="og:title" content="${ogTitle}" />`,
    `  <meta property="og:description" content="${ogDesc}" />`,
    `  <meta property="og:image" content="${BASE}${SHARE_IMG}" />`,
    `  <meta property="og:image:alt" content="Lata Scientific — borosilicate glass and lined process components" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${ogTitle}" />`,
    `  <meta name="twitter:description" content="${ogDesc}" />`,
    `  <meta name="twitter:image" content="${BASE}${SHARE_IMG}" />`,
  ].join("\n");
};

/* ---------- structured data for the hand-written pages ----------
   The generated pages get Product / CollectionPage / BreadcrumbList from
   build.mjs. These five had none, so search engines had no machine-readable
   description of the organisation, the site search, or what each page is.
   Everything below is derived from what the page already declares or from
   the CONTACT block — nothing is invented. */
const ORG_ID = `${BASE}#organization`;
const SITE_ID = `${BASE}#website`;

const organisation = () => ({
  "@type": ["Organization", "LocalBusiness"],
  "@id": ORG_ID,
  name: "Lata Scientific",
  url: BASE,
  description: "Manufacturer of borosilicate glass process equipment, glass valves, PTFE lined pipes and fittings, sight flow indicators and custom fabricated laboratory and chemical plant apparatus.",
  email: CONTACT.email,
  telephone: CONTACT.waTel,
  foundingDate: "2021",
  address: postalAddress(),
  areaServed: { "@type": "Country", name: "India" },
  taxID: "24AQQPP2220F1Z1",
  identifier: [
    { "@type": "PropertyValue", name: "GSTIN", value: "24AQQPP2220F1Z1" },
    { "@type": "PropertyValue", name: "MSME/UAM", value: "GJ240227049" },
  ],
  logo: { "@type": "ImageObject", url: `${BASE}assets/img/logo/lata-logo.svg` },
  image: `${BASE}${SHARE_IMG}`,
  contactPoint: [{
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT.email,
    telephone: CONTACT.waTel,
    availableLanguage: ["English", "Hindi"],
  }],
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:30",
  }],
  knowsAbout: [
    "Borosilicate glass process equipment", "Glass pipeline components",
    "Glass valves", "PTFE lined pipes and fittings", "PTFE bellows",
    "Sight flow indicators", "Glass heat exchangers", "Rotary evaporators",
    "Custom glass fabrication",
  ],
});

/* The site carries a working product search, so declare it. */
const website = () => ({
  "@type": "WebSite",
  "@id": SITE_ID,
  url: BASE,
  name: "Lata Scientific",
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE}products.html?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

const PAGE_TYPE = {
  "index.html": "WebPage",
  "about.html": "AboutPage",
  "contact.html": "ContactPage",
  "capabilities.html": "WebPage",
  "quality.html": "WebPage",
};
const CRUMB = {
  "about.html": "About", "contact.html": "Contact",
  "capabilities.html": "Capabilities", "quality.html": "Quality",
};

/* Titles and descriptions are read out of HTML, so they carry entities.
   JSON-LD wants the decoded text — "&amp;" there would be read literally. */
const decode = (s) => String(s)
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");

const pageSchema = (html, page) => {
  const title = decode(pick(html, /<title>([\s\S]*?)<\/title>/));
  const desc = decode(pick(html, /<meta\s+name="description"\s+content="([^"]*)"/));
  if (!title || !desc) return null;
  const url = page === "index.html" ? BASE : BASE + page;

  const graph = [];
  /* Organisation and site node live on the homepage; inner pages reference
     them by @id so the entity is declared once. */
  if (page === "index.html") graph.push(organisation(), website());
  /* The contact page repeats the full LocalBusiness node rather than only
     referencing it: it is the page people and crawlers land on for the
     address, and a bare @id reference resolves only if the homepage was
     fetched in the same pass. */
  else if (page === "contact.html") graph.push(organisation());

  graph.push({
    "@type": PAGE_TYPE[page] || "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description: desc,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
    primaryImageOfPage: { "@type": "ImageObject", url: `${BASE}${SHARE_IMG}` },
  });

  if (CRUMB[page]) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: CRUMB[page], item: url },
      ],
    });
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  return `  <script type="application/ld+json" data-seo>${json}</script>`;
};

let changed = 0;
for (const page of PAGES) {
  const file = resolve(ROOT, page);
  let html = readFileSync(file, "utf8");
  const before = html;

  /* 0a. Asset parity. about/capabilities/quality/contact only ever linked
         styles.css, so none of the premium-layer fixes (header fit at
         901–1119px and ≤379px, drawer behaviour, touch targets, safe-area
         insets, ultra-wide container) reached them — those pages still
         overflowed their header while the rest of the site was fixed. */
  if (!/assets\/css\/premium\.css/.test(html)) {
    html = html.replace(
      /([ \t]*<link rel="stylesheet" href="assets\/css\/styles\.css"[^>]*>)/,
      `$1\n  <link rel="stylesheet" href="assets/css/premium.css" />`
    );
  }
  if (!/assets\/css\/catalogue\.css/.test(html)) {
    html = html.replace(
      /([ \t]*<link rel="stylesheet" href="assets\/css\/premium\.css"[^>]*>)/,
      `$1\n  <link rel="stylesheet" href="assets/css/catalogue.css" />`
    );
  }
  if (!/assets\/js\/premium\.js/.test(html)) {
    html = html.replace(
      /([ \t]*<script src="assets\/js\/main\.js"[^>]*><\/script>)/,
      `$1\n<script type="module" src="assets/js/premium.js"></script>`
    );
  }
  if (!/assets\/css\/enquiry\.css/.test(html)) {
    html = html.replace(
      /([ \t]*<link rel="stylesheet" href="assets\/css\/catalogue\.css"[^>]*>)/,
      `$1\n  <link rel="stylesheet" href="assets/css/enquiry.css" />`
    );
  }
  /* The enquiry components and the slug→name index must load before
     main.js, exactly as build.mjs orders them. */
  if (!/assets\/js\/enquiry\.js/.test(html)) {
    html = html.replace(
      /([ \t]*<script src="assets\/js\/main\.js"[^>]*><\/script>)/,
      `<script src="assets/js/product-index.js" defer></script>\n<script src="assets/js/enquiry.js" defer></script>\n$1`
    );
  }

  /* 0d. Product search + image viewer. Same assets, same order as build.mjs. */
  if (!/assets\/css\/search\.css/.test(html)) {
    html = html.replace(
      /([ \t]*<link rel="stylesheet" href="assets\/css\/enquiry\.css"[^>]*>)/,
      `$1\n  <link rel="stylesheet" href="assets/css/search.css" />`
    );
  }
  if (!/assets\/css\/lightbox\.css/.test(html)) {
    html = html.replace(
      /([ \t]*<link rel="stylesheet" href="assets\/css\/search\.css"[^>]*>)/,
      `$1\n  <link rel="stylesheet" href="assets/css/lightbox.css" />`
    );
  }
  if (!/assets\/js\/search\.js/.test(html)) {
    html = html.replace(
      /([ \t]*<script src="assets\/js\/main\.js"[^>]*><\/script>)/,
      `$1\n<script src="assets/js/search.js" defer></script>\n<script src="assets/js/lightbox.js" defer></script>`
    );
  }
  if (!/assets\/js\/cards\.js/.test(html)) {
    html = html.replace(
      /([ \t]*<script src="assets\/js\/lightbox\.js"[^>]*><\/script>)/,
      `$1\n<script src="assets/js/cards.js" defer></script>`
    );
  }

  /* 0e. Search triggers — one in the header, one at the top of the drawer.
         Both are replaced wholesale each run so a markup change in build.mjs
         propagates here instead of drifting. */
  /* The trigger sits INSIDE .mainnav, not beside it: as a direct child of
     .header__inner it added a 20px flex gap and the header overflowed by 6px
     at exactly 1120px, the width where the quote button reappears. Inside the
     nav it costs the nav's own 4px gap instead. */
  html = html.replace(/[ \t]*<button class="hsearch"[\s\S]*?<\/button>\r?\n?/, "");
  html = html.replace(
    /([ \t]*<a href="contact\.html" class="btn btn--primary only-drawer">)/,
    `      ${headerSearchBtn()}\n$1`
  );

  const dRe = /[ \t]*<button class="navsearch"[\s\S]*?<\/button>\r?\n?/;
  if (dRe.test(html)) html = html.replace(dRe, `      ${drawerSearchBtn()}\n`);
  else html = html.replace(
    /(<nav class="mainnav"[^>]*>\r?\n)/,
    `$1      ${drawerSearchBtn()}\n`
  );

  /* 0c. Contact details — one number and one address for the whole site. */
  const topRe = /<div class="topbar__contacts">[\s\S]*?<\/div>/;
  if (topRe.test(html)) html = html.replace(topRe, topbarContacts());
  else console.warn(`  ! ${page}: topbar contacts not found — left untouched`);

  const fcRe = /[ \t]*<div class="footer__contact">[\s\S]*?<\/div>\r?\n/;
  if (fcRe.test(html)) {
    html = html.replace(fcRe, `      ${footerContact()}\n`);
  } else {
    /* first run on this page — insert it between the blurb and the socials */
    html = html.replace(
      /([ \t]*<p class="footer__blurb">[\s\S]*?<\/p>\r?\n)/,
      `$1      ${footerContact()}\n`
    );
  }

  /* 0b. Social metadata — strip the block we manage, then re-insert it after
         the canonical link so repeated runs stay idempotent. */
  const block = socialBlock(html, page);
  if (block) {
    html = html.replace(/^[ \t]*<meta\s+(?:property="og:[^"]*"|name="twitter:[^"]*")[^>]*>\r?\n/gm, "");
    html = html.replace(/(<link\s+rel="canonical"[^>]*>)/, `$1\n${block}`);
  }

  /* 0c. Structured data. build.mjs emits JSON-LD on every generated page;
         these five hand-written pages carried none. Marked with data-seo so
         the block can be replaced on each run instead of accumulating. */
  const ld = pageSchema(html, page);
  if (ld) {
    /* Drop the block we manage, and the legacy hand-written Organization
       node on index.html — the @graph below supersedes it, and two
       Organization entities on one page is a duplicate-entity warning. */
    html = html.replace(/[ \t]*<script type="application\/ld\+json" data-seo>[\s\S]*?<\/script>\r?\n/g, "");
    html = html.replace(/[ \t]*<script type="application\/ld\+json">\s*\r?\n?\s*\{"@context":"https:\/\/schema\.org","@type":"Organization"[\s\S]*?<\/script>\r?\n/g, "");
    html = html.replace(/(<\/head>)/, `${ld}\n$1`);
  }

  const usesMenuItem = /class="mega__link"[^>]*role="menuitem"/.test(html);
  const roleAttr = usesMenuItem ? ' role="menuitem"' : "";

  /* 1. Mega menu — everything between the menu container and the promo card.
        The promo marker is matched WITHOUT its leading whitespace and the
        indent is re-emitted explicitly; capturing that whitespace and
        re-inserting it added a blank line on every run, so the files churned
        endlessly instead of settling. */
  const megaRe = /(<div class="mega" role="menu">)[\s\S]*?\s*(<div class="mega__promo">)/;
  if (megaRe.test(html)) {
    html = html.replace(
      megaRe,
      (_m, open, promo) =>
        `${open}\n${megaCol("Glass &amp; Process Equipment", glass, roleAttr)}\n${megaCol("Fluid Transfer &amp; Fittings", fluid, roleAttr)}\n          ${promo}`
    );
  } else {
    console.warn(`  ! ${page}: mega menu block not found — left untouched`);
  }

  /* 2. Footer "Products" column */
  const footRe = /<nav class="footer__col" aria-label="Products">[\s\S]*?<\/nav>/;
  if (footRe.test(html)) html = html.replace(footRe, footerCol());
  else console.warn(`  ! ${page}: footer Products nav not found — left untouched`);

  if (html !== before) { writeFileSync(file, html, "utf8"); changed++; console.log(`  updated ${page}`); }
  else console.log(`  unchanged ${page}`);
}
console.log(`Nav synced across ${changed} page(s) — ${categories.length} categories (${glass.length} glass, ${fluid.length} fluid).`);
