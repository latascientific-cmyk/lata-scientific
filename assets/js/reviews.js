/* =========================================================
   LATA SCIENTIFIC — Client Trust section (public)
   =========================================================
   Reads published reviews and renders the testimonial carousel.

   The empty state is what ships in index.html, so it is what a visitor sees
   with JavaScript off, while the request is in flight, or if the database is
   unreachable. This file only ever REPLACES that state — it never invents a
   review, and on any failure it leaves the honest empty state in place.

   Plain fetch rather than the supabase-js SDK: the home page is the site's
   LCP-critical page and this needs one GET. The SDK is loaded only by the
   admin panel, which actually needs Auth.

   Note there is no `status=eq.published` filter in the query. Filtering on a
   column requires SELECT privilege on it, and the public role deliberately has
   none on `status`. Row Level Security applies exactly that restriction server
   side — `using (status = 'published')` — so the response can only ever
   contain published rows. Flip a row to 'unpublished' in the Table Editor and
   it stops being returned on the next page load.
   ========================================================= */
(() => {
  "use strict";

  const section = document.getElementById("clientTrust");
  if (!section || !window.LATA_SUPABASE) return;

  const body = section.querySelector("[data-ct-body]");
  const heading = section.querySelector("[data-ct-heading]");
  const sub = section.querySelector("[data-ct-sub]");
  if (!body || !heading) return;

  const COLUMNS = "id,name,company,designation,review,rating,photo_url,created_at,approved_at";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- element helpers ----------
     Everything below builds nodes and assigns textContent. No review text ever
     reaches innerHTML, so a review containing markup is displayed as the
     characters the customer typed and can never execute. */
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  const initials = (name) =>
    String(name || "")
      .trim()
      .split(/\s+/)
      .filter((w) => /[a-z0-9]/i.test(w))
      .slice(0, 2)
      .map((w) => w.replace(/[^a-z0-9]/gi, "").charAt(0).toUpperCase())
      .join("") || "?";

  /* Designation and company are both optional. Join whatever exists so a
     reviewer who gave neither does not leave an empty line behind. */
  const roleLine = (r) => [r.designation, r.company].filter(Boolean).join(", ");

  const card = (r) => {
    const c = el("blockquote", "tcard");

    const rating = Math.max(1, Math.min(5, Number(r.rating) || 0));
    const stars = el("div", "tcard__stars", "★".repeat(rating) + "☆".repeat(5 - rating));
    stars.setAttribute("aria-label", `Rated ${rating} out of 5`);
    c.appendChild(stars);

    c.appendChild(el("p", null, `“${r.review}”`));

    const foot = document.createElement("footer");

    const avatar = el("span", "tcard__avatar");
    if (r.photo_url) {
      const img = document.createElement("img");
      img.src = r.photo_url;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:50%";
      /* A broken or removed photo falls back to initials rather than a gap. */
      img.addEventListener("error", () => {
        avatar.textContent = initials(r.name);
      });
      avatar.appendChild(img);
    } else {
      avatar.textContent = initials(r.name);
    }
    foot.appendChild(avatar);

    const cite = document.createElement("cite");
    cite.appendChild(el("b", null, r.name));

    const role = roleLine(r);
    if (role) cite.appendChild(el("span", null, role));

    /* Shown because the row was published by hand from the Supabase dashboard —
       that deliberate act IS the verification. It can never appear on a review
       nobody has published, because the database does not return one. */
    const verified = el("span", null, "✓ Verified client");
    verified.style.cssText =
      "display:block;margin-top:3px;font-family:var(--f-mono);font-size:12px;" +
      "letter-spacing:.06em;text-transform:uppercase;color:var(--accent-strong)";
    cite.appendChild(verified);

    foot.appendChild(cite);
    c.appendChild(foot);
    return c;
  };

  /* ---------- carousel ---------- */
  const mount = (reviews) => {
    heading.textContent = "Trusted by teams across the laboratory and process industry.";
    if (sub) sub.remove();
    body.textContent = "";

    const slider = el("div", "tslider");
    const track = el("div", "ttrack");
    reviews.forEach((r) => track.appendChild(card(r)));
    slider.appendChild(track);
    body.appendChild(slider);

    const many = reviews.length > 1;
    let i = 0;
    let timer = null;
    let dots = [];

    const render = () => {
      track.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((d, k) => {
        d.classList.toggle("is-active", k === i);
        d.setAttribute("aria-selected", k === i ? "true" : "false");
      });
    };
    /* Wraps in both directions, so the strip loops rather than dead-ending. */
    const go = (n) => { i = (n + reviews.length) % reviews.length; render(); };

    const start = () => { if (many && !reduce && !timer) timer = setInterval(() => go(i + 1), 6500); };
    const stop = () => { clearInterval(timer); timer = null; };
    /* Any deliberate interaction pauses the rotation, then it resumes — so the
       carousel never slides out from under someone mid-sentence. */
    const bump = () => { stop(); start(); };

    if (many) {
      const ctrl = el("div", "tctrl");
      const prev = el("button", null, "←");
      prev.type = "button";
      prev.setAttribute("aria-label", "Previous review");
      const next = el("button", null, "→");
      next.type = "button";
      next.setAttribute("aria-label", "Next review");

      const dotsWrap = el("div", "tdots");
      dotsWrap.setAttribute("role", "tablist");
      dotsWrap.setAttribute("aria-label", "Choose review");

      reviews.forEach((_, k) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", `Go to review ${k + 1} of ${reviews.length}`);
        b.addEventListener("click", () => { go(k); bump(); });
        dotsWrap.appendChild(b);
      });
      dots = Array.from(dotsWrap.children);

      prev.addEventListener("click", () => { go(i - 1); bump(); });
      next.addEventListener("click", () => { go(i + 1); bump(); });

      ctrl.appendChild(prev);
      ctrl.appendChild(dotsWrap);
      ctrl.appendChild(next);
      body.appendChild(ctrl);

      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);

      /* Keyboard: the slider is focusable so arrow keys reach it, and the
         controls are real buttons so tabbing already works. */
      slider.tabIndex = 0;
      slider.setAttribute("role", "region");
      slider.setAttribute("aria-roledescription", "carousel");
      slider.setAttribute("aria-label", "Customer reviews");
      slider.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") { go(i - 1); bump(); e.preventDefault(); }
        else if (e.key === "ArrowRight") { go(i + 1); bump(); e.preventDefault(); }
      });

      let x0 = null;
      track.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
      track.addEventListener("touchend", (e) => {
        if (x0 == null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
        x0 = null;
        start();
      });

      document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    }

    render();
    start();
  };

  /* ---------- load ---------- */
  const url =
    `${window.LATA_SUPABASE.url}/rest/v1/reviews` +
    `?select=${encodeURIComponent(COLUMNS)}&order=approved_at.desc&limit=24`;

  fetch(url, {
    headers: {
      apikey: window.LATA_SUPABASE.key,
      Authorization: `Bearer ${window.LATA_SUPABASE.key}`,
      Accept: "application/json",
    },
  })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
    .then((rows) => {
      if (Array.isArray(rows) && rows.length) mount(rows);
      /* No rows: the empty state already in the HTML is the correct answer. */
    })
    .catch((err) => {
      /* Deliberately silent for the visitor — an unreachable database is not
         their problem, and the empty state reads perfectly well on its own. */
      console.warn("[reviews] could not load published reviews:", err.message);
    });
})();
