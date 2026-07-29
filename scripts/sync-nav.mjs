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

/* Icon set kept in step with build.mjs */
const ICON = {
  pipeline: '<path d="M2 9h5v6H2zM17 9h5v6h-5"/><path d="M7 12h10"/>',
  coupling: '<path d="M3 10h7v4H3zM14 10h7v4h-7"/><path d="M10 7.5v9M14 7.5v9"/>',
  "rotary-evaporator": '<path d="M4 5h6M7 5v5"/><path d="M7 10 4.5 17a3.2 3.2 0 0 0 3 4.4h-.9"/><circle cx="15.5" cy="16" r="4.6"/><path d="M11 9.5h6.5a2.5 2.5 0 0 1 2.5 2.5v1"/>',
  "tubular-structure": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
  "heat-exchanger": '<path d="M3 6h14a4 4 0 0 1 0 12H3"/><path d="M6 6v12M10 6v12M14 6v12"/>',
  "column-component": '<rect x="8" y="2" width="8" height="20" rx="1.6"/><path d="M8 7h8M8 12h8M8 17h8"/><path d="M5 12h3M16 12h3"/>',
  "ptfe-lined": '<path d="M3 8h18v8H3z"/><path d="M6 10.5h12v3H6z"/><path d="M3 8v8M21 8v8"/>',
  "lined-valves": '<path d="M3 12h5M16 12h5"/><path d="M8 7h8v10H8z"/><circle cx="12" cy="12" r="2.2"/><path d="M12 7V4M10 4h4"/>',
  "sight-flow": '<path d="M2 10h4v4H2zM18 10h4v4h-4"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1.6"/>',
  valves: '<path d="M4 12h5M15 12h5"/><path d="M9 7l6 10M15 7L9 17"/><circle cx="12" cy="12" r="2"/>',
};
const svg = (slug, w = 20) =>
  `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[slug] || ""}</svg>`;

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

let changed = 0;
for (const page of PAGES) {
  const file = resolve(ROOT, page);
  let html = readFileSync(file, "utf8");
  const before = html;

  const usesMenuItem = /class="mega__link"[^>]*role="menuitem"/.test(html);
  const roleAttr = usesMenuItem ? ' role="menuitem"' : "";

  /* 1. Mega menu — everything between the menu container and the promo card */
  const megaRe = /(<div class="mega" role="menu">)([\s\S]*?)(\s*<div class="mega__promo">)/;
  if (megaRe.test(html)) {
    html = html.replace(
      megaRe,
      (_m, open, _body, promo) =>
        `${open}\n${megaCol("Glass &amp; Process Equipment", glass, roleAttr)}\n${megaCol("Fluid Transfer &amp; Fittings", fluid, roleAttr)}\n${promo}`
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
