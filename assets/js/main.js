/* =========================================================
   LATA SCIENTIFIC — shared interactions (all pages)
   Vanilla ES6. Motion respects prefers-reduced-motion.
   ========================================================= */
(() => {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = () => window.matchMedia("(min-width: 901px)").matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  // Mark that JS is active — reveal animations only hide content once this is set,
  // so if the script ever fails to run, all content stays visible.
  document.documentElement.classList.add("js");

  // Lite mode: weak hardware or data-saver gets lighter ambient effects up front.
  const lite =
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.connection && navigator.connection.saveData) || false;

  /* ---- Year ---- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---- Sticky header shadow ---- */
  const header = $("#header");
  const onScroll = () => header && header.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile drawer ---- */
  const toggle = $("#navToggle");
  const nav = $("#mainnav");
  let scrim = null;

  const setDrawer = (open) => {
    if (!toggle || !nav) return;
    toggle.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (scrim) scrim.classList.toggle("is-shown", open);
    if (open) {
      const first = nav.querySelector("a[href], button");
      if (first) first.focus({ preventScroll: true });
    }
  };
  const closeDrawer = () => setDrawer(false);

  if (toggle && nav) {
    /* Scrim: dims and blurs the page behind the drawer, and gives a
       tap-anywhere-to-close target. There was previously no way to dismiss
       the drawer by tapping outside it. */
    scrim = document.createElement("div");
    scrim.className = "nav-scrim";
    scrim.setAttribute("aria-hidden", "true");
    document.body.appendChild(scrim);
    scrim.addEventListener("click", closeDrawer);

    toggle.addEventListener("click", () => setDrawer(!nav.classList.contains("is-open")));

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !nav.classList.contains("is-open")) return;
      closeDrawer();
      toggle.focus({ preventScroll: true });   // return focus where it came from
    });

    // Following a link should always leave the drawer closed — otherwise an
    // in-page anchor scrolls the content while the panel still covers it.
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a[href]")) closeDrawer();
    });

    /* A drawer left open while the viewport grows past the breakpoint used
       to strand body{overflow:hidden}: the desktop layout resumed but the
       whole page stayed unscrollable with no way to recover — a rotation
       from portrait to landscape was enough to trigger it.

       Guarded from three directions on purpose. matchMedia is the cheap,
       precise signal, but it does not fire in every environment (it stays
       silent under devtools/CDP viewport overrides), and orientationchange
       does not always coincide with a resize on iOS. Any one of them
       recovering the page is enough. */
    const releaseIfDesktop = () => { if (desktop() && nav.classList.contains("is-open")) closeDrawer(); };
    const mq = window.matchMedia("(min-width: 901px)");
    if (mq.addEventListener) mq.addEventListener("change", releaseIfDesktop);
    else if (mq.addListener) mq.addListener(releaseIfDesktop);   // Safari < 14
    window.addEventListener("resize", releaseIfDesktop, { passive: true });
    window.addEventListener("orientationchange", releaseIfDesktop, { passive: true });

    /* Keep Tab inside the panel while it is open. */
    nav.addEventListener("keydown", (e) => {
      if (e.key !== "Tab" || !nav.classList.contains("is-open") || desktop()) return;
      const items = $$("a[href], button:not([disabled])", nav)
        .filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---- Mega menu (hover on desktop, click on mobile) ---- */
  $$(".has-mega").forEach((wrap) => {
    const trigger = $(".mainnav__trigger", wrap);
    if (!trigger) return;
    const open = (state) => {
      wrap.classList.toggle("is-open", state);
      trigger.setAttribute("aria-expanded", String(state));
    };
    // desktop hover
    let hoverTimer;
    wrap.addEventListener("mouseenter", () => { if (desktop()) { clearTimeout(hoverTimer); open(true); } });
    wrap.addEventListener("mouseleave", () => { if (desktop()) { hoverTimer = setTimeout(() => open(false), 120); } });
    // click (works for both; essential on mobile)
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      open(!wrap.classList.contains("is-open"));
    });
    // close desktop dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (desktop() && !wrap.contains(e.target)) open(false);
    });
  });

  /* ---- In-view reveals + counters (scroll-position based for reliability) ---- */
  $$(".stagger").forEach((g) => $$(".reveal", g).forEach((el, i) => el.style.setProperty("--i", i)));
  const easeOut = (t) => 1 - Math.pow(1 - t, 4);
  const fmt = (n, f) => (f === "comma" ? Math.round(n).toLocaleString("en-US") : String(Math.round(n)));
  const runCounter = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = parseFloat(el.dataset.target) || 0, suffix = el.dataset.suffix || "", f = el.dataset.format || "";
    if (reduce) { el.textContent = fmt(target, f) + suffix; return; }
    const dur = 1500, start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = fmt(target * easeOut(p), f) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  /* Auto-choreography: tag every page's major blocks so they enter one by one.
     Runs on all pages (hand-written and generated) with no markup changes. */
  const AUTO_REVEAL = [
    ".pagehero__inner > *",       // breadcrumb → eyebrow → title → lead on inner pages
    ".sec-head",                  // section headers
    ".split > *",                 // split panels (copy / media)
    ".pd__media", ".pd__copy > *",// product detail: image, tag, title, specs, PDF — in order
    ".catside > *", ".catmain__head", // category sidebar blocks + list header
    ".cta", ".tslider",
    ".infostack > *",             // contact info cards
    ".footer__inner > *",         // footer columns
  ].join(", ");
  $$(AUTO_REVEAL).forEach((el) => {
    if (el.classList.contains("reveal")) return;
    if (el.closest(".hero") || el.closest(".site-header") || el.closest(".topbar") || el.closest(".mega")) return;
    el.classList.add("reveal");
    el.dataset.ar = "1";          // auto-revealed → gets sequential timing
  });

  const revealEls = $$(".reveal, .stagger, .sec-head");
  const counters = $$(".counter");
  if (reduce) {
    revealEls.forEach((el) => el.classList.add("is-in"));
    counters.forEach(runCounter);
  } else {
    /* IntersectionObserver instead of measuring every element on every
       scroll tick. The old path called getBoundingClientRect() on all
       reveal elements ~16×/second, forcing a synchronous layout each time —
       on a product page with 100+ reveal targets that was the single
       biggest source of scroll jank. The observer does the same work off
       the main thread and reports only what actually crossed the line.
       Behaviour is unchanged: same 0.9/0.85 viewport thresholds, same
       one-by-one stagger for auto-revealed elements. */
    const revealNow = (els) => {
      let seq = 0;
      els.forEach((el) => {
        const delay = el.dataset.ar ? Math.min(seq++, 8) * 95 : 0; // grids keep their own CSS stagger
        if (delay) setTimeout(() => el.classList.add("is-in"), delay);
        else el.classList.add("is-in");
      });
    };

    if ("IntersectionObserver" in window) {
      /* One immediate measured pass for whatever is already on screen.
         IntersectionObserver only reports once the page is actually being
         rendered, so a tab restored in the background — or any context that
         is not compositing — would otherwise hold the first screen blank
         until the failsafe. This costs a single layout at startup, not one
         per scroll, and it is what the old code did synchronously. */
      const vh0 = window.innerHeight || document.documentElement.clientHeight;
      const first = [];
      revealEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh0 * 0.9 && r.bottom > 0) first.push(el);
      });
      revealNow(first);
      counters.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (!el.dataset.done && r.top < vh0 * 0.85 && r.bottom > 0) runCounter(el);
      });

      // rootMargin bottom of -10% reproduces the old `top < vh * 0.9` trigger.
      const revealIO = new IntersectionObserver((entries, obs) => {
        const batch = [];
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.unobserve(e.target);
          if (e.target.classList.contains("is-in")) return;
          batch.push(e.target);
        });
        if (batch.length) revealNow(batch);
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });
      revealEls.forEach((el) => revealIO.observe(el));

      const countIO = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.unobserve(e.target);
          if (!e.target.dataset.done) runCounter(e.target);
        });
      }, { rootMargin: "0px 0px -15% 0px", threshold: 0 });
      counters.forEach((el) => countIO.observe(el));
    } else {
      // No IntersectionObserver (very old browsers): keep the original
      // measured path, but batch reads into a rAF so it cannot thrash.
      let queued = false;
      const checkInView = () => {
        queued = false;
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const queue = [];
        revealEls.forEach((el) => {
          if (el.classList.contains("is-in") || el.dataset.rq) return;
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.9 && r.bottom > 0) { el.dataset.rq = "1"; queue.push(el); }
        });
        revealNow(queue);
        counters.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (!el.dataset.done && r.top < vh * 0.85 && r.bottom > 0) runCounter(el);
        });
      };
      const onCheck = () => { if (!queued) { queued = true; requestAnimationFrame(checkInView); } };
      checkInView();
      window.addEventListener("scroll", onCheck, { passive: true });
      window.addEventListener("resize", onCheck, { passive: true });
      window.addEventListener("load", checkInView);
    }
    // Failsafe: guarantee nothing stays invisible. After a few seconds reveal any
    // remaining elements (they are off-screen, so this is not visible as a "pop"),
    // and snap any counters that never animated to their final value.
    setTimeout(() => {
      revealEls.forEach((el) => el.classList.add("is-in"));
      counters.forEach((el) => {
        if (!el.dataset.done) {
          el.dataset.done = "1";
          const target = parseFloat(el.dataset.target) || 0;
          el.textContent = fmt(target, el.dataset.format || "") + (el.dataset.suffix || "");
        }
      });
    }, 3000);
  }

  /* ---- Home hero slider ---- */
  (() => {
    const slides = $$(".hero__slide");
    const dots = $$(".hero__dot");
    if (slides.length < 2) return;
    let i = 0, timer;
    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
    };
    const next = () => show(i + 1);
    const start = () => { if (!reduce) timer = setInterval(next, 6000); };
    const stop = () => clearInterval(timer);
    dots.forEach((d, k) => d.addEventListener("click", () => { show(k); stop(); start(); }));
    const prevA = $("#heroPrev"), nextA = $("#heroNext");
    prevA && prevA.addEventListener("click", () => { show(i - 1); stop(); start(); });
    nextA && nextA.addEventListener("click", () => { show(i + 1); stop(); start(); });
    const heroEl = $(".hero");
    heroEl && heroEl.addEventListener("mouseenter", stop);
    heroEl && heroEl.addEventListener("mouseleave", start);
    show(0); start();
  })();

  /* ---- Testimonial slider ---- */
  (() => {
    const track = $("#ttrack");
    if (!track) return;
    const cards = $$(".tcard", track);
    const dotsWrap = $("#tdots");
    let i = 0, timer;
    cards.forEach((_, k) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", `Go to testimonial ${k + 1}`);
      b.addEventListener("click", () => { go(k); restart(); });
      dotsWrap && dotsWrap.appendChild(b);
    });
    const dots = dotsWrap ? $$("button", dotsWrap) : [];
    const render = () => { track.style.transform = `translateX(-${i * 100}%)`; dots.forEach((d, k) => d.classList.toggle("is-active", k === i)); };
    const go = (n) => { i = (n + cards.length) % cards.length; render(); };
    const start = () => { if (!reduce) timer = setInterval(() => go(i + 1), 6500); };
    const stop = () => clearInterval(timer);
    const restart = () => { stop(); start(); };
    const prev = $("#tPrev"), next = $("#tNext");
    prev && prev.addEventListener("click", () => { go(i - 1); restart(); });
    next && next.addEventListener("click", () => { go(i + 1); restart(); });
    const wrap = $("#tslider");
    if (wrap) { wrap.addEventListener("mouseenter", stop); wrap.addEventListener("mouseleave", start); }
    // swipe
    let x0 = null;
    track.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    render(); start();
  })();

  /* ---- Featured products showcase (auto-slide, infinite, prev/next) ---- */
  (() => {
    const track = $("#showcaseTrack");
    if (!track) return;
    const cards = $$(".scard", track);
    const CLONES = 4;                 // matches the maximum cards-per-view
    if (cards.length <= CLONES) return;
    // Clone the first few cards onto the end so the forward wrap is seamless.
    cards.slice(0, CLONES).forEach((c) => {
      const clone = c.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
    const total = cards.length;       // number of real cards
    const DURATION = 750;             // swipe speed
    const INTERVAL = 3200;            // pause on each set before advancing
    const allCards = $$(".scard", track);  // real cards + clones, in DOM order

    // Card widths are fractional (flex basis of a calc()), so multiplying a single
    // "step" value drifts a fraction of a pixel per slide and the strip creeps out
    // of alignment. Instead, measure each card's true layout position once and
    // slide to that exact position — every step lands pixel-perfect, no drift.
    let offsets = [];
    const measure = () => {
      const prevTransition = track.style.transition;
      const prevTransform = track.style.transform;
      track.style.transition = "none";
      track.style.transform = "none";
      const base = track.getBoundingClientRect().left;
      offsets = allCards.map((c) => c.getBoundingClientRect().left - base);
      track.style.transform = prevTransform;
      track.style.transition = prevTransition;
    };
    measure();

    let index = 0, timer = null, animating = false, watchdog = null;
    const offsetAt = (i) => offsets[Math.max(0, Math.min(i, offsets.length - 1))] || 0;

    const place = (animate) => {
      track.style.transition = animate ? `transform ${DURATION}ms cubic-bezier(0.33, 1, 0.68, 1)` : "none";
      track.style.transform = `translateX(-${offsetAt(index)}px)`;
    };
    const settle = () => {
      clearTimeout(watchdog);
      animating = false;
      if (index >= total) { index -= total; place(false); }        // seamless wrap forward
      else if (index < 0) { index += total; place(false); }         // seamless wrap back
    };
    const move = (dir) => {
      if (animating) return;
      animating = true;
      if (dir < 0 && index <= 0) { index = total; place(false); void track.offsetWidth; } // mirror-jump for prev
      index += dir;
      place(true);
      watchdog = setTimeout(settle, DURATION + 180);                // safety: never lock up if transitionend is missed
    };
    track.addEventListener("transitionend", (e) => { if (e.propertyName === "transform") settle(); });

    const start = () => { if (!reduce && !timer) timer = setInterval(() => move(1), INTERVAL); };
    const stop = () => { clearInterval(timer); timer = null; };
    const restart = () => { stop(); start(); };

    const nextBtn = $("#showcaseNext"), prevBtn = $("#showcasePrev");
    nextBtn && nextBtn.addEventListener("click", () => { move(1); restart(); });
    prevBtn && prevBtn.addEventListener("click", () => { move(-1); restart(); });

    const wrap = $("#showcase");
    if (wrap) { wrap.addEventListener("mouseenter", stop); wrap.addEventListener("mouseleave", start); }
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    const remeasure = () => { measure(); place(false); };
    window.addEventListener("resize", remeasure, { passive: true });
    window.addEventListener("load", remeasure);
    start();
  })();

  /* ---- Scroll gauge (reading progress) ---- */
  (() => {
    const fill = $("#gaugeFill");
    if (!fill) return;
    /* scrollHeight is a layout-forcing read, so cache it and refresh only
       when the document can actually have changed height — not on every
       scroll tick. The write is batched into a rAF. */
    let max = 0, queued = false;
    const measure = () => { max = document.documentElement.scrollHeight - window.innerHeight; };
    const write = () => {
      queued = false;
      fill.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    };
    const update = () => { if (!queued) { queued = true; requestAnimationFrame(write); } };
    const remeasure = () => { measure(); update(); };
    measure(); write();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", remeasure, { passive: true });
    window.addEventListener("load", remeasure);
    // content-visibility and lazy images change document height as you go.
    if ("ResizeObserver" in window) new ResizeObserver(remeasure).observe(document.body);
  })();

  /* ---- Magnetic buttons (subtle pull toward the cursor) ---- */
  if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    /* Measure once on enter, then only write on move — and write at most
       once per frame. Measuring inside mousemove forced a layout on every
       pointer event, which is what made the buttons feel heavy. */
    $$(".magnetic").forEach((el) => {
      const strength = 14;
      let r = null, mx = 0, my = 0, queued = false;
      const write = () => { queued = false; el.style.transform = `translate3d(${mx}px, ${my}px, 0)`; };
      el.addEventListener("mouseenter", () => { r = el.getBoundingClientRect(); }, { passive: true });
      el.addEventListener("mousemove", (e) => {
        if (!r) r = el.getBoundingClientRect();
        mx = ((e.clientX - (r.left + r.width / 2)) / r.width) * strength;
        my = ((e.clientY - (r.top + r.height / 2)) / r.height) * strength;
        if (!queued) { queued = true; requestAnimationFrame(write); }
      }, { passive: true });
      el.addEventListener("mouseleave", () => { r = null; el.style.transform = ""; }, { passive: true });
    });
  }

  /* ---- 3D molecular field (true 3D projection, no libraries) ----
     A rotating cloud of "glass molecules" — nodes joined by bonds —
     floats behind the hero. Mouse steers the rotation; depth sets
     size and opacity so the cloud reads as genuinely three-dimensional. */
  const buildMolecularField = (host, opts) => {
    const canvas = document.createElement("canvas");
    canvas.className = opts.className;
    canvas.setAttribute("aria-hidden", "true");
    host.prepend(canvas);
    const ctx = canvas.getContext("2d");
    const small = window.matchMedia("(max-width: 700px)").matches;
    const N = Math.round((small ? 34 : opts.count) * (lite ? 0.6 : 1));
    const R = opts.radius;
    const pts = Array.from({ length: N }, () => ({
      x: (Math.random() * 2 - 1) * R,
      y: (Math.random() * 2 - 1) * R * 0.62,
      z: (Math.random() * 2 - 1) * R,
      r: 1.6 + Math.random() * 2.6,
      sp: 0.4 + Math.random() * 1.1,
      hue: Math.random() < 0.5,
    }));
    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth; h = host.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    // Layout may not be settled on the very first frame — re-measure once it is.
    requestAnimationFrame(resize);
    window.addEventListener("load", resize);
    window.addEventListener("resize", resize, { passive: true });

    let base = 0, rotY = 0, rotX = -0.18, targY = 0, targX = -0.18;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      host.addEventListener("mousemove", (e) => {
        const r = host.getBoundingClientRect();
        targY = ((e.clientX - r.left) / r.width - 0.5) * 0.55;
        targX = -0.18 + ((e.clientY - r.top) / r.height - 0.5) * 0.32;
      });
    }

    let inView = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((en) => { inView = en[0].isIntersecting; }).observe(host);
    }

    const FL = 900, LINK = opts.link;
    const proj = new Array(N);
    let t = 0;
    const draw = () => {
      if (!w) resize();
      ctx.clearRect(0, 0, w, h);
      const cx = w * opts.cx, cy = h * opts.cy;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const yy = p.y + Math.sin(t * p.sp + i) * 7;
        const x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;
        const y1 = yy * cosX - z1 * sinX;
        z1 = yy * sinX + z1 * cosX;
        const s = FL / (FL + z1 + R);
        proj[i] = { x: cx + x1 * s, y: cy + y1 * s, s };
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = proj[i], b = proj[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const al = (1 - Math.sqrt(d2) / LINK) * opts.lineAlpha * Math.min(a.s, b.s);
            ctx.strokeStyle = `rgba(${opts.lineRGB},${al.toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (let i = 0; i < N; i++) {
        const p = proj[i], pr = pts[i].r * p.s;
        const al = opts.dotAlpha * p.s;
        ctx.fillStyle = pts[i].hue
          ? `rgba(14,165,183,${al.toFixed(3)})`
          : `rgba(37,99,235,${al.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, pr, 0, Math.PI * 2); ctx.fill();
      }
    };
    const tick = () => {
      requestAnimationFrame(tick);
      if (!inView || document.hidden) return;
      t += 0.016;
      base += 0.0011;
      // scroll turns the cloud too — the page feels like one 3D space
      const spin = window.scrollY * 0.00035;
      rotY += (base + targY + spin - rotY) * 0.04;
      rotX += (targX - rotX) * 0.04;
      draw();
    };
    // Paint one settled frame immediately so the field is never blank,
    // then hand off to the animation loop.
    requestAnimationFrame(() => { resize(); draw(); });
    setTimeout(() => { if (!t) draw(); }, 250);
    requestAnimationFrame(tick);
  };

  if (!reduce) {
    const hero = $(".hero");
    if (hero) buildMolecularField(hero, { className: "hero__fx", count: 72, radius: 470, link: 112, cx: 0.70, cy: 0.44, lineRGB: "14,147,176", lineAlpha: 0.16, dotAlpha: 0.5 });
    const pagehero = $(".pagehero");
    if (pagehero) buildMolecularField(pagehero, { className: "pagehero__fx", count: 48, radius: 380, link: 100, cx: 0.78, cy: 0.5, lineRGB: "120,190,220", lineAlpha: 0.20, dotAlpha: 0.55 });
  }

  /* ---- Scroll parallax — imagery drifts at its own depth ---- */
  if (!reduce) {
    const plx = [];
    $$(".hero__figure").forEach((el) => plx.push({ el, sp: -0.085, cur: 0 }));
    $$(".reveal--clip").forEach((el) => plx.push({ el, sp: -0.055, cur: 0 }));
    if (plx.length) {
      /* Read all geometry first, then write all transforms — and do both
         inside one rAF per frame. Previously this ran on every scroll
         event with a read/write interleaved per element, which forced a
         layout recalculation for each item on every tick. */
      let queued = false;
      const apply = () => {
        queued = false;
        const vh = window.innerHeight;
        const writes = [];
        for (const item of plx) {
          const r = item.el.getBoundingClientRect();
          if (!r.height) continue;                                // hidden slide — skip
          const center = r.top - item.cur + r.height / 2;         // position without our own offset
          if (center < -vh || center > vh * 2) continue;          // far off-screen
          item.cur = (center - vh / 2) * item.sp;
          writes.push(item);
        }
        for (const item of writes) {
          item.el.style.transform = `translate3d(0, ${item.cur.toFixed(1)}px, 0)`;
        }
      };
      const onScrollPlx = () => { if (!queued) { queued = true; requestAnimationFrame(apply); } };
      apply();
      window.addEventListener("scroll", onScrollPlx, { passive: true });
      window.addEventListener("resize", onScrollPlx, { passive: true });
    }
  }

  /* ---- 3D tilt — cards tip toward the cursor ---- */
  if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    /* Same treatment as the magnetic buttons: one measurement per hover,
       one style write per frame. A catalogue page carries 30+ cards, so
       measuring per pointer event was pure waste. */
    $$(".featcat, .pcard, .fcard").forEach((card) => {
      let r = null, rx = 0, ry = 0, queued = false;
      const write = () => {
        queued = false;
        card.style.transform = `perspective(850px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
      };
      card.addEventListener("mouseenter", () => { r = card.getBoundingClientRect(); }, { passive: true });
      card.addEventListener("mousemove", (e) => {
        if (!r) r = card.getBoundingClientRect();
        rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
        if (!queued) { queued = true; requestAnimationFrame(write); }
      }, { passive: true });
      card.addEventListener("mouseleave", () => { r = null; card.style.transform = ""; }, { passive: true });
    });
  }

  /* ---- WhatsApp button ----
     Owned by <whatsapp-button> in assets/js/enquiry.js, which reads the
     number from the one CONTACT block the whole site shares. */

  /* ---- Living background (site-wide) ----
     Fine dust drifts over the page. Near the cursor it links up with
     threads and gets nudged aside; a soft aura trails the pointer and
     a click sends out a ripple. Desktop pointers only. */
  if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const aura = document.createElement("div");
    aura.className = "site-aura";
    aura.setAttribute("aria-hidden", "true");
    aura.style.transform = "translate(-999px,-999px)";
    document.body.appendChild(aura);

    const cv = document.createElement("canvas");
    cv.className = "site-fx";
    cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);
    const ctx = cv.getContext("2d");

    let W = 0, H = 0;
    const fit = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * d; cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    fit();
    window.addEventListener("resize", fit, { passive: true });

    const COUNT = lite ? 26 : 52, REACH = 175;
    const dots = Array.from({ length: COUNT }, () => ({
      x: Math.random() * (W || 1200), y: Math.random() * (H || 800),
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: 1 + Math.random() * 2.1, teal: Math.random() < 0.5,
    }));
    let mx = -9999, my = -9999, ax = -9999, ay = -9999;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (ax < -5000) { ax = mx; ay = my; }
    }, { passive: true });
    const ripples = [];
    window.addEventListener("click", (e) => {
      if (ripples.length < 4) ripples.push({ x: e.clientX, y: e.clientY, r: 6, a: 0.4 });
    });

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of dots) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -24) p.x = W + 24; else if (p.x > W + 24) p.x = -24;
        if (p.y < -24) p.y = H + 24; else if (p.y > H + 24) p.y = -24;
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < REACH && d > 0.01) {
          const f = (REACH - d) / REACH;
          p.x += (dx / d) * f * 1.5;        // the cursor gently pushes the dust aside
          p.y += (dy / d) * f * 1.5;
          ctx.strokeStyle = `rgba(14,147,176,${(f * 0.34).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my); ctx.stroke();
        }
        ctx.fillStyle = p.teal ? "rgba(14,165,183,0.38)" : "rgba(37,99,235,0.32)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 4.6; rp.a *= 0.952;
        if (rp.a < 0.02) { ripples.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(37,99,235,${rp.a.toFixed(3)})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke();
      }
    };
    // FPS governor: if this machine can't hold frame rate, the effect
    // removes itself rather than making the whole page feel slow.
    // Frame-count based, so background-tab pauses don't skew the reading.
    let frames = 0, refTime = 0, dead = false;
    const loop = () => {
      if (dead) return;
      requestAnimationFrame(loop);
      if (document.hidden) return;
      frames++;
      if (frames === 20) refTime = performance.now();
      else if (frames === 140) {
        const fps = 120000 / (performance.now() - refTime);
        if (fps < 34) {
          dead = true;
          cv.remove(); aura.remove();
          return;
        }
      }
      ax += (mx - ax) * 0.09; ay += (my - ay) * 0.09;
      aura.style.transform = `translate(${ax.toFixed(1)}px,${ay.toFixed(1)}px)`;
      render();
    };
    render();                       // settle one frame immediately
    requestAnimationFrame(loop);
  }

  /* ---- Accordions ---- */
  $$(".accordion").forEach((group) => {
    $$(".acc", group).forEach((item) => {
      const q = $(".acc__q", item);
      q.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        $$(".acc", group).forEach((el) => { el.classList.remove("is-open"); $(".acc__q", el).setAttribute("aria-expanded", "false"); });
        if (!isOpen) { item.classList.add("is-open"); q.setAttribute("aria-expanded", "true"); }
      });
    });
  });

  /* ---- Back to top ---- */
  const toTop = $("#toTop");
  if (toTop) {
    const t = () => toTop.classList.toggle("is-shown", window.scrollY > 700);
    t(); window.addEventListener("scroll", t, { passive: true });
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
  }

  /* ---- Form validation (newsletter) ----
     The enquiry form validates itself inside <enquiry-form>. */
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const news = $("#newsForm");
  if (news) {
    const nn = $("#newsNote");
    news.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = $("#newsEmail").value.trim();
      if (!emailOk(v)) { nn.style.color = "#ffb4b4"; nn.textContent = "Enter a valid email."; return; }
      nn.style.color = ""; nn.textContent = "Subscribed — thank you.";
      news.reset();
    });
  }
})();
