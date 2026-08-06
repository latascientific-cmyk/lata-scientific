/* =========================================================
   LATA SCIENTIFIC — product search
   One engine, two mounts: an overlay opened from the header/drawer
   triggers, and the inline field in the page hero of products.html and
   the category pages.

   The index (assets/js/search-index.js, written by scripts/build.mjs from
   data/catalogue.mjs, so it covers every product and category and rebuilds
   itself whenever one is added) loads on first intent — hovering the trigger
   or focusing the inline field — so no page pays for search in its initial
   load, and by the time a key is pressed the data is already there.
   ========================================================= */
(function () {
  "use strict";

  var INDEX = null;
  var pending = null;
  var failed = false;
  var INDEX_URL = "assets/js/search-index.js";
  var MAX_RESULTS = 60;

  /* Loaded with a <script> tag, not fetch().
     Every browser blocks fetch() on the file: scheme, and script tags are
     exempt — so this works whether the site is served over http or opened
     straight off disk. A failure sets `failed` and surfaces a real message;
     it must never fall through to an empty index, because that renders as
     "No matching products found" and looks like the catalogue is empty. */
  function load() {
    if (INDEX) return Promise.resolve(INDEX);
    if (pending) return pending;
    pending = new Promise(function (resolve) {
      if (window.LATA_SEARCH_INDEX) { resolve(window.LATA_SEARCH_INDEX); return; }
      var s = document.createElement("script");
      s.src = INDEX_URL;
      s.async = true;
      s.onload = function () {
        if (window.LATA_SEARCH_INDEX) resolve(window.LATA_SEARCH_INDEX);
        else fallback(resolve);
      };
      s.onerror = function () { fallback(resolve); };
      document.head.appendChild(s);
    }).then(function (d) {
      if (d && d.products && d.products.length) { INDEX = d; failed = false; }
      else { INDEX = { products: [], categories: [] }; failed = true; }
      return INDEX;
    });
    return pending;
  }

  // Only reached if the script tag itself could not run — try the network.
  function fallback(resolve) {
    if (typeof fetch !== "function") { resolve(null); return; }
    fetch(INDEX_URL, { credentials: "same-origin" })
      .then(function (r) { return r.ok ? r.text() : null; })
      .then(function (t) {
        if (!t) { resolve(null); return; }
        try { (0, eval)(t); } catch (e) { /* fall through to null */ }
        resolve(window.LATA_SEARCH_INDEX || null);
      })
      .catch(function () { resolve(null); });
  }

  /* ---------- text helpers ---------- */
  // Fold to lowercase alphanumeric words: kills accents, punctuation and
  // runs of whitespace, so "  PTFE-Lined  " and "ptfe lined" are the same.
  function norm(s) {
    return String(s || "").toLowerCase()
      .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ").trim();
  }
  function terms(q) {
    var t = norm(q).split(" ").filter(Boolean);
    return t.slice(0, 8);
  }
  // Crude but effective stemmer for the singular/plural case: valves→valve,
  // bodies→bodi, glasses→glasse. Only used as an extra candidate, never alone.
  function stem(t) {
    if (t.length > 4 && /ies$/.test(t)) return t.slice(0, -3) + "y";
    if (t.length > 4 && /(ses|xes|zes|ches|shes)$/.test(t)) return t.slice(0, -2);
    if (t.length > 3 && /s$/.test(t) && !/ss$/.test(t)) return t.slice(0, -1);
    return t;
  }
  /* Damerau-Levenshtein capped at 1 — one insert, delete, substitution OR
     transposition. Transposition matters: "vlave" for "valve" is the single
     most common kind of typo, and it is distance 2 under plain Levenshtein,
     so a substitution-only check would miss exactly the case users hit most.
     Cheap enough to run over the name words of 121 products per keystroke. */
  function within1(a, b) {
    if (a === b) return true;
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 1) return false;
    var i = 0, j = 0, edits = 0;
    while (i < la && j < lb) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (la === lb) {
        if (a[i + 1] === b[j] && a[i] === b[j + 1]) { i += 2; j += 2; }  // swap
        else { i++; j++; }                                              // substitute
      } else if (la > lb) i++;                                          // delete
      else j++;                                                         // insert
    }
    edits += (la - i) + (lb - j);
    return edits <= 1;
  }

  /* Catalogue-specific synonyms, tried only when a term matches nothing on its
     own. Deliberately small: these are the words this industry uses for the
     same object, not a general thesaurus. */
  var SYN = {
    valve: ["valves"], valves: ["valve"],
    teflon: ["ptfe"], ptfe: ["teflon", "fluoropolymer"],
    borosilicate: ["glass"], glass: ["borosilicate"],
    bellow: ["bellows", "expansion"], bellows: ["bellow", "expansion"],
    reactor: ["reaction", "vessel"], vessel: ["reactor", "reaction"],
    sightglass: ["sight", "flow", "indicator"], sight: ["sightglass"],
    pipe: ["pipeline", "spool"], pipeline: ["pipe"], spool: ["pipe"],
    gasket: ["seal", "envelope"], seal: ["gasket"],
    jacket: ["jacketed"], jacketed: ["jacket"],
    column: ["fractionating", "packed", "distillation"],
    condenser: ["cooler", "exchanger"], cooler: ["condenser"],
    strainer: ["filter"], filter: ["strainer"],
    elbow: ["bend"], bend: ["elbow"],
    reducer: ["reducing"], reducing: ["reducer"],
    coupling: ["clamp", "nut"], clamp: ["coupling"],
    flange: ["backing"],
    evaporator: ["evaporation", "rotary"],
    structure: ["tubular", "frame"],
  };

  /* ---------- scoring ----------
     Priority order is the brief's: exact product name, category name,
     product series, product code, keywords, description — then the
     supporting text (specs, applications, features, downloads, dimensions). */
  function scoreTerm(p, t, mult) {
    var st = stem(t), best = 0;

    function inText(hay, exact, prefix, contains) {
      if (!hay) return 0;
      if (hay === t) return exact;
      if (hay.indexOf(t) === 0) return prefix;
      // word-boundary prefix, e.g. "bellow" inside "ptfe line bellow"
      if ((" " + hay).indexOf(" " + t) >= 0) return prefix - 40;
      if (hay.indexOf(t) >= 0) return contains;
      if (st !== t && hay.indexOf(st) >= 0) return contains - 20;
      return 0;
    }
    function has(hay, score) {
      if (!hay) return 0;
      if (hay.indexOf(t) >= 0) return score;
      if (st !== t && hay.indexOf(st) >= 0) return score - 15;
      return 0;
    }

    best = Math.max(best, inText(p._n, 1000, 700, 470));   // 1 product name
    best = Math.max(best, inText(p._c, 900, 640, 430));    // 2 category
    best = Math.max(best, inText(p._g, 600, 520, 380));    // 3 series

    // 4 catalogue codes — whole or prefix only, so a stray substring of a
    // long code cannot pull in unrelated products.
    for (var i = 0; i < p._r.length; i++) {
      var c = p._r[i];
      if (c === t) { best = Math.max(best, 560); break; }
      if (c.indexOf(t) === 0) best = Math.max(best, 430);
    }

    best = Math.max(best, has(p._k, 260));    // 5 keywords
    best = Math.max(best, has(p._d, 190));    // 6 description (short + long)
    best = Math.max(best, has(p._sp, 150));   //   specifications
    best = Math.max(best, has(p._a, 120));    //   applications + industries
    best = Math.max(best, has(p._f, 100));    //   features + benefits
    best = Math.max(best, has(p._dl, 90));    //   download titles
    best = Math.max(best, has(p._dt, 85));    //   dimension table titles
    best = Math.max(best, has(p._pc, 70));    //   parent group

    return best * (mult || 1);
  }

  function fieldScore(p, t, fuzzy) {
    var best = scoreTerm(p, t, 1);

    // Synonyms only when the word itself found nothing on this product.
    if (!best) {
      var syn = SYN[t] || SYN[stem(t)];
      if (syn) for (var i = 0; i < syn.length; i++) {
        var s = scoreTerm(p, syn[i], 0.72);
        if (s > best) best = s;
      }
    }

    // Typo tolerance is a last resort: only consulted when the strict pass
    // returned nothing at all for the whole query.
    if (!best && fuzzy && t.length >= 4) {
      var words = p._nw;
      for (var w = 0; w < words.length; w++) if (within1(words[w], t)) return 70;
    }
    return best;
  }

  function prep(list) {
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      if (p._n !== undefined) continue;
      p._n = norm(p.n); p._c = norm(p.c); p._g = norm(p.g);
      p._k = norm(p.k); p._d = norm(p.d + " " + (p.x || ""));
      p._a = norm(p.a); p._f = norm(p.f);
      p._pc = norm(p.p); p._sp = norm(p.sp);
      p._dl = norm(p.dl); p._dt = norm(p.dt);
      p._nw = p._n.split(" ").filter(Boolean);
      p._r = (p.r || []).map(norm).filter(Boolean);
    }
    return list;
  }

  function searchProducts(q, boostCat) {
    var ts = terms(q);
    if (!ts.length) return [];
    prep(INDEX.products);
    var run = function (fuzzy) {
      var hits = [];
      for (var i = 0; i < INDEX.products.length; i++) {
        var p = INDEX.products[i], total = 0, ok = true;
        for (var j = 0; j < ts.length; j++) {
          var s = fieldScore(p, ts[j], fuzzy);
          if (!s) { ok = false; break; }
          total += s;
        }
        if (!ok) continue;
        // Shorter names are the more specific match for the same score.
        total += Math.max(0, 40 - p._n.length) / 4;
        if (p.pop) total += 6;
        if (boostCat && p.cs === boostCat) total += 90;
        hits.push({ p: p, score: total });
      }
      return hits;
    };
    var hits = run(false);
    if (!hits.length) hits = run(true);
    hits.sort(function (a, b) { return b.score - a.score || a.p._n.localeCompare(b.p._n); });
    /* Generous cap: a category term like "PTFE" legitimately matches most of
       a 40-product range, and the list scrolls, so truncating at two dozen
       would hide real products. */
    return hits.slice(0, MAX_RESULTS).map(function (h) { return h.p; });
  }

  function searchCategories(q) {
    var ts = terms(q);
    if (!ts.length) return [];
    var out = [];
    for (var i = 0; i < INDEX.categories.length; i++) {
      var c = INDEX.categories[i];
      var hay = norm([c.n, c.t, c.b, c.p, c.sub].filter(Boolean).join(" "));
      var name = norm(c.n), total = 0, ok = true;
      for (var j = 0; j < ts.length; j++) {
        var t = ts[j], st = stem(t), s = 0;
        if (name === t) s = 1000;
        else if (name.indexOf(t) === 0) s = 700;
        else if ((" " + name).indexOf(" " + t) >= 0) s = 620;
        else if (name.indexOf(t) >= 0) s = 460;
        else if (hay.indexOf(t) >= 0) s = 180;
        else if (st !== t && hay.indexOf(st) >= 0) s = 150;
        if (!s) { ok = false; break; }
        total += s;
      }
      if (ok) out.push({ c: c, score: total });
    }
    out.sort(function (a, b) { return b.score - a.score; });
    return out.slice(0, 4).map(function (h) { return h.c; });
  }

  function popular() {
    if (!INDEX) return [];
    var f = INDEX.products.filter(function (p) { return p.pop; });
    return (f.length ? f : INDEX.products).slice(0, 5);
  }

  /* ---------- rendering ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  /* Wrap every query term found in `text` with <mark>.
     Matching happens on the RAW text and each slice is escaped as it is
     emitted — escaping first and then replacing would let a term like "amp"
     match inside the "&amp;" entity and tear it in half. */
  function hl(text, ts) {
    text = String(text == null ? "" : text);
    /* Single characters are dropped from the highlight only: "LSPV1.5" folds
       to the terms ["lspv1","5"], and marking every stray "5" on the card
       reads as noise even though the term is doing real matching work. */
    ts = ts.filter(function (t) { return t.length > 1; });
    if (!ts.length) return esc(text);
    var pat = ts.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); })
      .sort(function (a, b) { return b.length - a.length; }).join("|");
    var re;
    try { re = new RegExp(pat, "gi"); } catch (e) { return esc(text); }
    var out = "", last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m[0].length === 0) { re.lastIndex++; continue; }
      out += esc(text.slice(last, m.index)) + "<mark>" + esc(m[0]) + "</mark>";
      last = m.index + m[0].length;
    }
    return out + esc(text.slice(last));
  }

  var ICON_BOX = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h18v8H3z"/><path d="M6 10.5h12v3H6z"/></svg>';
  var ICON_EMPTY = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/><path d="M8.5 11h5"/></svg>';

  function itemHTML(p, ts, idx, id) {
    var media = p.i
      ? '<img src="' + esc(p.i) + '" alt="" loading="lazy" decoding="async" />'
      : ICON_BOX;
    var tags = '<span class="sitem__tag">' + hl(p.c, ts) + "</span>";
    if (p.g) tags += '<span class="sitem__tag sitem__tag--series">' + hl(p.g, ts) + "</span>";
    return '<a class="sitem" role="option" aria-selected="false" id="' + id + "-o" + idx + '"' +
      ' href="product-' + esc(p.s) + '.html" data-i="' + idx + '">' +
      '<span class="sitem__media">' + media + "</span>" +
      "<span><span class=\"sitem__name\">" + hl(p.n, ts) + "</span>" +
      '<span class="sitem__meta">' + tags + "</span>" +
      (p.d ? '<span class="sitem__desc">' + hl(p.d, ts) + "</span>" : "") +
      "</span></a>";
  }

  function catHTML(c, ts, idx, id) {
    var media = c.i ? '<img src="' + esc(c.i) + '" alt="" loading="lazy" decoding="async" />' : ICON_BOX;
    return '<a class="sitem" role="option" aria-selected="false" id="' + id + "-o" + idx + '"' +
      ' href="cat-' + esc(c.s) + '.html" data-i="' + idx + '">' +
      '<span class="sitem__media">' + media + "</span>" +
      "<span><span class=\"sitem__name\">" + hl(c.n, ts) + "</span>" +
      '<span class="sitem__meta"><span class="sitem__tag">Category</span>' +
      '<span class="sitem__tag sitem__tag--series">' + c.q + " product" + (c.q === 1 ? "" : "s") + "</span></span>" +
      '<span class="sitem__desc">' + hl(c.t, ts) + "</span>" +
      "</span></a>";
  }

  /* ---------- a controller shared by both mounts ---------- */
  var seq = 0;
  function Controller(input, panel, opts) {
    opts = opts || {};
    var id = "srch" + (++seq);
    var items = [];       // flat list of nodes, in visual order
    var active = -1;
    var timer = null;
    var lastQ = null;

    panel.id = id + "-list";
    panel.setAttribute("role", "listbox");
    panel.setAttribute("aria-label", "Search results");
    input.setAttribute("aria-controls", panel.id);

    function setActive(i) {
      if (items[active]) { items[active].classList.remove("is-active"); items[active].setAttribute("aria-selected", "false"); }
      active = i;
      if (items[active]) {
        items[active].classList.add("is-active");
        items[active].setAttribute("aria-selected", "true");
        input.setAttribute("aria-activedescendant", items[active].id);
        var el = items[active], top = el.offsetTop, bot = top + el.offsetHeight;
        if (top < panel.scrollTop) panel.scrollTop = top - 8;
        else if (bot > panel.scrollTop + panel.clientHeight) panel.scrollTop = bot - panel.clientHeight + 8;
      } else {
        input.removeAttribute("aria-activedescendant");
      }
    }

    function collect() {
      items = Array.prototype.slice.call(panel.querySelectorAll(".sitem"));
      active = -1;
      input.removeAttribute("aria-activedescendant");
    }

    function show(open) {
      panel.hidden = !open;
      input.setAttribute("aria-expanded", open ? "true" : "false");
      if (open && opts.onShow) opts.onShow();
    }

    function renderEmptyState() {
      var pop = popular();
      if (!pop.length) { show(false); return; }
      var html = '<div class="sgroup">Popular products</div>';
      for (var i = 0; i < pop.length; i++) html += itemHTML(pop[i], [], i, id);
      panel.innerHTML = html;
      collect(); show(true);
    }

    function render(q) {
      /* The index could not be loaded at all. Say so — falling through to the
         no-results state would tell the visitor the catalogue is empty, which
         is the bug this whole path exists to prevent. */
      if (failed) {
        panel.innerHTML = '<div class="sempty"><div class="sempty__ico">' + ICON_EMPTY + "</div>" +
          '<p class="sempty__title">Search is unavailable right now.</p>' +
          '<p class="sempty__sub">The product index could not be loaded. Please reload the page, or browse the catalogue from the Products menu.</p></div>';
        collect(); show(true);
        return;
      }
      var ts = terms(q);
      if (!ts.length) {
        if (opts.emptyShowsPopular) renderEmptyState(); else show(false);
        return;
      }
      var cats = searchCategories(q);
      var prods = searchProducts(q, opts.boost);
      var html = "", idx = 0, i;

      if (!cats.length && !prods.length) {
        var pop = popular();
        html = '<div class="sempty"><div class="sempty__ico">' + ICON_EMPTY + "</div>" +
          '<p class="sempty__title">No matching products found.</p>' +
          '<p class="sempty__sub">Check the spelling, or try a broader term such as “valve”, “PTFE” or a catalogue code.</p></div>';
        if (pop.length) {
          html += '<div class="sgroup">You may be interested in</div>';
          for (i = 0; i < pop.length; i++) html += itemHTML(pop[i], [], idx++, id);
        }
        panel.innerHTML = html;
        collect(); show(true);
        return;
      }

      if (cats.length) {
        html += '<div class="sgroup">Categories</div>';
        for (i = 0; i < cats.length; i++) html += catHTML(cats[i], ts, idx++, id);
      }
      if (prods.length) {
        html += '<div class="sgroup">Products · ' + prods.length + (prods.length === MAX_RESULTS ? "+" : "") + "</div>";
        for (i = 0; i < prods.length; i++) html += itemHTML(prods[i], ts, idx++, id);
      }
      panel.innerHTML = html;
      collect(); show(true);
    }

    function run(immediate) {
      var q = input.value;
      if (q === lastQ && !immediate) return;
      lastQ = q;
      load().then(function () { render(q); });
    }

    input.addEventListener("input", function () {
      if (opts.onInput) opts.onInput(input.value);
      clearTimeout(timer);
      // Debounced, but short enough to read as instant. The index is already
      // in memory by this point, so this only coalesces keystrokes.
      timer = setTimeout(run, 90);
    });
    input.addEventListener("focus", function () { load(); if (input.value || opts.emptyShowsPopular) run(true); });

    input.addEventListener("keydown", function (e) {
      var k = e.key;
      if (k === "ArrowDown" || k === "ArrowUp") {
        if (panel.hidden || !items.length) { if (!panel.hidden) return; run(true); return; }
        e.preventDefault();
        var n = items.length;
        setActive(k === "ArrowDown" ? (active + 1) % n : (active <= 0 ? n - 1 : active - 1));
      } else if (k === "Enter") {
        if (items[active]) { e.preventDefault(); items[active].click(); }
      } else if (k === "Escape") {
        if (!panel.hidden && input.value) { e.preventDefault(); e.stopPropagation(); input.value = ""; if (opts.onInput) opts.onInput(""); run(true); }
        else if (opts.onEscape) { e.preventDefault(); opts.onEscape(); }
      } else if (k === "Tab") {
        // Tab leaves the field; the results close so focus order stays sane.
        if (!opts.keepOnBlur) show(false);
      }
    });

    panel.addEventListener("mousemove", function (e) {
      var el = e.target.closest && e.target.closest(".sitem");
      if (el) { var i = +el.getAttribute("data-i"); if (i !== active) setActive(i); }
    });

    return {
      run: run,
      show: show,
      clear: function () { input.value = ""; lastQ = null; show(false); },
      reset: function () { lastQ = null; },
      panel: panel,
      input: input,
    };
  }

  /* ---------- overlay mount ---------- */
  var overlay = null, ctl = null, lastFocus = null;

  function buildOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.className = "soverlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Search products");
    overlay.innerHTML =
      '<div class="sbox">' +
        '<div class="sbox__field">' +
          '<span class="sbox__ico"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg></span>' +
          '<input class="sbox__input" type="search" placeholder="Search products, categories, series or catalogue code…" aria-label="Search products" autocomplete="off" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="false" aria-autocomplete="list" />' +
          '<button class="sbox__esc" type="button" aria-label="Close search">Esc</button>' +
        "</div>" +
        '<div class="sresults" hidden></div>' +
        '<div class="sfoot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div>' +
      "</div>";
    document.body.appendChild(overlay);

    var input = overlay.querySelector(".sbox__input");
    var panel = overlay.querySelector(".sresults");
    ctl = Controller(input, panel, { emptyShowsPopular: true, keepOnBlur: true, onEscape: close });

    overlay.querySelector(".sbox__esc").addEventListener("click", close);
    overlay.addEventListener("mousedown", function (e) { if (e.target === overlay) close(); });
    // Keep focus inside the dialog while it is open.
    overlay.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = overlay.querySelectorAll("input, button, a[href]");
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    return overlay;
  }

  function open(trigger) {
    buildOverlay();
    /* Prefer the trigger that opened us. A pointer click does not move focus
       to a <button> in every browser, so document.activeElement can still be
       <body> here — and then closing would drop focus to the top of the page
       instead of returning it where the user left off. */
    lastFocus = trigger || (document.activeElement !== document.body ? document.activeElement : null);
    overlay.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
    var input = overlay.querySelector(".sbox__input");
    /* Focus synchronously, inside the user gesture: iOS only raises the
       keyboard for a focus() that happens in the gesture's own task, and
       requestAnimationFrame never fires in a non-compositing tab. visibility
       flips instantly on open (see the CSS) so the input is focusable now. */
    input.focus();
    ctl.reset();
    ctl.run(true);
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    ctl.clear();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  /* ---------- boot ---------- */
  function init() {
    var triggers = document.querySelectorAll("[data-search-open]");
    for (var i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener("click", function (e) { e.preventDefault(); open(this); });
      // Warm the index the moment the user shows intent.
      triggers[i].addEventListener("pointerenter", load, { once: true });
      triggers[i].addEventListener("focus", load, { once: true });
    }

    var inlines = document.querySelectorAll("[data-search-inline]");
    for (var j = 0; j < inlines.length; j++) {
      (function (wrap) {
        var input = wrap.querySelector(".psearch__input");
        var clear = wrap.querySelector(".psearch__clear");
        var panel = document.createElement("div");
        panel.className = "sresults sresults--inline";
        panel.hidden = true;
        /* Portalled to <body>, not nested in .psearch. main.js auto-applies
           .reveal to the field, and its will-change:transform makes .psearch a
           containing block — a position:fixed child would then be positioned
           against the field instead of the viewport (measured 605px off). */
        document.body.appendChild(panel);
        /* On a category page, items from that category float to the top of
           the results — the search still covers the whole catalogue. */
        var cm = /(?:^|\/)cat-([a-z0-9-]+)\.html/.exec(location.pathname);
        var boost = cm ? cm[1] : null;

        /* The panel is position:fixed to escape .pagehero's overflow:hidden,
           so it has to be placed against the field by hand — and kept there
           while the page scrolls or the window resizes. */
        var field = wrap.querySelector(".psearch__field") || wrap;
        function place() {
          var r = field.getBoundingClientRect();
          var vw = document.documentElement.clientWidth;
          var vh = document.documentElement.clientHeight;
          var w = Math.min(r.width, vw - 16);
          panel.style.width = w + "px";
          panel.style.left = Math.min(Math.max(8, r.left), vw - w - 8) + "px";

          /* Open downwards when there is more room below, upwards when there
             is more room above. The field sits in the page hero, which on a
             short window leaves too little underneath — without the flip the
             list would hang past the bottom of the viewport. */
          var below = vh - r.bottom - 16, above = r.top - 16;
          if (below >= above) {
            panel.style.top = (r.bottom + 10) + "px";
            panel.style.bottom = "auto";
            panel.style.maxHeight = Math.max(120, Math.min(below - 10, 460)) + "px";
          } else {
            panel.style.top = "auto";
            panel.style.bottom = (vh - r.top + 10) + "px";
            panel.style.maxHeight = Math.max(120, Math.min(above - 10, 460)) + "px";
          }
        }

        var c = Controller(input, panel, {
          boost: boost,
          onShow: place,
          onInput: function (v) { if (clear) clear.hidden = !v; },
        });
        addEventListener("scroll", function () { if (!panel.hidden) place(); }, { passive: true });
        addEventListener("resize", function () { if (!panel.hidden) place(); });
        if (clear) clear.addEventListener("click", function () {
          c.clear(); clear.hidden = true; input.focus();
        });
        // Clicking away closes the results; clicking a result must still land.
        // The panel is no longer inside `wrap`, so it is tested separately.
        document.addEventListener("mousedown", function (e) {
          if (!wrap.contains(e.target) && !panel.contains(e.target)) c.show(false);
        });
      })(inlines[j]);
    }

    // "/" opens search from anywhere, the way documentation sites do.
    document.addEventListener("keydown", function (e) {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (overlay && overlay.classList.contains("is-open")) return;
      e.preventDefault(); open();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay && overlay.classList.contains("is-open")) close();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
