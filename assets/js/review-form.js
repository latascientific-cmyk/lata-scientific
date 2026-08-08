/* =========================================================
   LATA SCIENTIFIC — review submission form
   =========================================================
   Everything here is a courtesy to the person filling the form: fast feedback,
   clear messages, no wasted round trip. None of it is a security control. The
   controls that actually hold are in the database —

     - CHECK constraints repeat every length, range and format rule
     - the honeypot column must be empty or the row is rejected
     - a trigger caps submissions at three per address per day
     - the public role has no privilege on `status`, so a review cannot be
       submitted as anything other than 'pending'

   See supabase/migrations/0001_reviews.sql.
   ========================================================= */
(() => {
  "use strict";

  const form = document.getElementById("reviewForm");
  if (!form || !window.LATA_SUPABASE) return;

  const $ = (id) => document.getElementById(id);
  const els = {
    name: $("rvName"), email: $("rvEmail"), company: $("rvCompany"),
    designation: $("rvRole"), review: $("rvReview"), consent: $("rvConsent"),
    website: $("rvWebsite"), submit: $("rvSubmit"), status: $("rvStatus"),
    count: $("rvCount"), rating: $("rvRating"), ratingOut: $("rvRatingOut"),
  };

  const LIMITS = { name: 120, company: 160, designation: 160, email: 254, reviewMin: 25, reviewMax: 2000 };
  const THROTTLE_KEY = "lata.review.last";
  const THROTTLE_MS = 60 * 1000;

  let rating = 0;
  let sending = false;

  /* ---------- rating ---------- */
  const starBtns = Array.from(els.rating ? els.rating.querySelectorAll("button") : []);
  const paintStars = (value) => {
    starBtns.forEach((b) => {
      const v = Number(b.dataset.value);
      b.classList.toggle("is-on", v <= value);
      b.setAttribute("aria-checked", v === value ? "true" : "false");
    });
    if (els.ratingOut) els.ratingOut.textContent = value ? `${value} of 5` : "Not rated";
  };
  starBtns.forEach((b) => {
    b.addEventListener("click", () => {
      rating = Number(b.dataset.value);
      paintStars(rating);
      clearError("rating");
    });
  });
  /* Arrow keys move through the group, matching radiogroup expectations. */
  els.rating && els.rating.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    rating = Math.min(5, Math.max(1, rating + (e.key === "ArrowRight" ? 1 : -1)));
    paintStars(rating);
    (starBtns[rating - 1] || starBtns[0]).focus();
    clearError("rating");
  });

  /* ---------- character counter ---------- */
  const updateCount = () => {
    if (els.count && els.review) els.count.textContent = String(els.review.value.trim().length);
  };
  els.review && els.review.addEventListener("input", () => { updateCount(); clearError("review"); });
  updateCount();

  /* ---------- validation plumbing ---------- */
  const fieldOf = (key) => {
    const err = form.querySelector(`[data-err-for="${key}"]`);
    return err ? err.closest(".field") : null;
  };
  const setError = (key, msg) => {
    const err = form.querySelector(`[data-err-for="${key}"]`);
    const field = fieldOf(key);
    if (err) err.textContent = msg;
    if (field) field.classList.add("is-invalid");
  };
  const clearError = (key) => {
    const err = form.querySelector(`[data-err-for="${key}"]`);
    const field = fieldOf(key);
    if (err) err.textContent = "";
    if (field) field.classList.remove("is-invalid");
  };
  const clearAll = () => ["name", "email", "company", "designation", "review", "rating"].forEach(clearError);

  ["name", "email", "company", "designation"].forEach((k) => {
    els[k] && els[k].addEventListener("input", () => clearError(k));
  });

  const showStatus = (msg, kind) => {
    if (!els.status) return;
    els.status.textContent = msg;
    els.status.className = `rvw__status is-on rvw__status--${kind}`;
  };
  const hideStatus = () => { if (els.status) els.status.className = "rvw__status"; };

  /* Collapse whitespace and strip control characters. Not an XSS defence —
     output is written with textContent, which is the actual defence — but it
     stops padded or hidden-character submissions being stored. */
  const clean = (v) => String(v || "").replace(/[\u0000-\u001F\u007F]/g, "").replace(/[ \t]+/g, " ").trim();

  /* Deliberately permissive: one @, something either side, a dot in the domain.
     The database applies the same shape, and anything stricter starts rejecting
     addresses that genuinely work. */
  const emailOk = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) && v.length <= LIMITS.email;

  const validate = () => {
    clearAll();
    let ok = true;
    const first = (key) => { if (ok) { const f = fieldOf(key); f && f.scrollIntoView({ block: "center", behavior: "smooth" }); } };

    const name = clean(els.name.value);
    if (name.length < 2) { setError("name", "Please enter your full name."); first("name"); ok = false; }
    else if (name.length > LIMITS.name) { setError("name", `Please keep this under ${LIMITS.name} characters.`); ok = false; }

    const email = clean(els.email.value).toLowerCase();
    if (!email) { setError("email", "Please enter your email address."); ok && first("email"); ok = false; }
    else if (!emailOk(email)) { setError("email", "Please enter a valid email address."); ok && first("email"); ok = false; }

    const company = clean(els.company.value);
    if (company.length > LIMITS.company) { setError("company", `Please keep this under ${LIMITS.company} characters.`); ok = false; }

    const designation = clean(els.designation.value);
    if (designation.length > LIMITS.designation) { setError("designation", `Please keep this under ${LIMITS.designation} characters.`); ok = false; }

    if (!rating) { setError("rating", "Please choose a rating from 1 to 5 stars."); ok && first("rating"); ok = false; }

    const review = clean(els.review.value);
    if (!review) { setError("review", "Please tell us about your experience."); ok && first("review"); ok = false; }
    else if (review.length < LIMITS.reviewMin) { setError("review", `Please write at least ${LIMITS.reviewMin} characters — currently ${review.length}.`); ok && first("review"); ok = false; }
    else if (review.length > LIMITS.reviewMax) { setError("review", `Please keep this under ${LIMITS.reviewMax} characters.`); ok = false; }

    return ok ? { name, email, company, designation, review } : null;
  };

  /* ---------- submit ---------- */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (sending) return;
    hideStatus();

    /* Honeypot. Fail exactly like a success so a bot learns nothing from the
       response, but send nothing to the database. */
    if (els.website && els.website.value.trim() !== "") {
      showStatus("Thank you for your feedback. Your review has been submitted for approval.", "ok");
      form.reset();
      return;
    }

    const last = Number(localStorage.getItem(THROTTLE_KEY) || 0);
    if (last && Date.now() - last < THROTTLE_MS) {
      showStatus("You have just submitted a review. Please wait a moment before sending another.", "err");
      return;
    }

    const data = validate();
    if (!data) { showStatus("Please correct the highlighted fields and try again.", "err"); return; }

    sending = true;
    els.submit.disabled = true;
    els.submit.classList.add("is-loading");
    const originalLabel = els.submit.textContent;
    els.submit.textContent = "Submitting…";

    /* Only the columns the anon role is granted INSERT on. `status` is absent
       on purpose — it is not ours to set, and the database defaults it to
       'pending'. Including it here would be rejected outright. */
    const payload = {
      name: data.name,
      company: data.company || null,
      designation: data.designation || null,
      email: data.email,
      review: data.review,
      rating: rating,
      consent: !!(els.consent && els.consent.checked),
      website: "",
    };

    try {
      const res = await fetch(`${window.LATA_SUPABASE.url}/rest/v1/reviews`, {
        method: "POST",
        headers: {
          apikey: window.LATA_SUPABASE.key,
          Authorization: `Bearer ${window.LATA_SUPABASE.key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        localStorage.setItem(THROTTLE_KEY, String(Date.now()));
        form.reset();
        rating = 0;
        paintStars(0);
        updateCount();
        clearAll();
        /* Says only that it was received. Whether it is later published or
           rejected is never disclosed here or anywhere else on the site. */
        showStatus("Thank you for your feedback. Your review has been submitted for approval.", "ok");
        els.status.scrollIntoView({ block: "center", behavior: "smooth" });
      } else {
        const body = await res.text();
        if (/Too many reviews/i.test(body)) {
          showStatus("You have already submitted several reviews today. Please try again tomorrow.", "err");
        } else if (res.status === 401 || res.status === 403) {
          showStatus("We could not accept the review just now. Please email latascientific@gmail.com and we will add it for you.", "err");
        } else {
          showStatus("Something went wrong sending your review. Please try again, or email latascientific@gmail.com.", "err");
        }
        console.warn("[review-form] submit failed", res.status, body);
      }
    } catch (err) {
      showStatus("We could not reach the server. Please check your connection and try again.", "err");
      console.warn("[review-form] network error", err);
    } finally {
      sending = false;
      els.submit.disabled = false;
      els.submit.classList.remove("is-loading");
      els.submit.textContent = originalLabel;
    }
  });

  paintStars(0);
})();
