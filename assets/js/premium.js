/* =========================================================
   LATA SCIENTIFIC — premium layer (loader driver)
   Every page links this file; it was missing, producing a 404 on
   every request and leaving the cinematic loader on the homepage
   with nothing to dismiss it.

   Deliberately small. premium.css already dismisses the loader on
   its own, so this script is an accelerator, not a dependency:
   if it never runs, the page still becomes usable.
   ========================================================= */

(() => {
  "use strict";

  const loader = document.querySelector(".loader");
  if (!loader) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  if (reduce) {
    loader.remove();
    root.classList.remove("is-loading");
    return;
  }

  root.classList.add("is-loading");

  const pct = loader.querySelector(".loader__pct");
  const gauge = loader.querySelector(".loader__gauge > span");

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    if (pct) pct.textContent = "100%";
    loader.classList.add("is-done");
    root.classList.remove("is-loading");
    // Drop it from the DOM once the fade has played so it costs nothing.
    setTimeout(() => loader.remove(), 500);
  };

  /* Count the readout up on the compositor's clock rather than a timer,
     so it stays in step with the gauge even on a busy main thread. */
  if (pct) {
    const DURATION = 1300;
    let t0 = 0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / DURATION, 1);
      // ease-out so it decelerates into place like the gauge
      const eased = 1 - Math.pow(1 - p, 3);
      pct.textContent = String(Math.round(eased * 100)).padStart(2, "0") + "%";
      if (p < 1 && !done) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* Leave as soon as the page is genuinely ready, but never linger.
     The CSS keyframe is the final backstop at ~2.05s. */
  const MIN_SHOW = 900;   // let the pipe finish drawing — it is the brand moment
  const MAX_SHOW = 1900;
  const started = performance.now();

  const readyOut = () => {
    const waited = performance.now() - started;
    setTimeout(finish, Math.max(0, MIN_SHOW - waited));
  };

  if (document.readyState === "complete") readyOut();
  else addEventListener("load", readyOut, { once: true });

  setTimeout(finish, MAX_SHOW);

  // If the tab is hidden during load, don't hold a stale overlay for the
  // user when they come back to it.
  addEventListener("visibilitychange", () => { if (!document.hidden) finish(); }, { once: true });

  if (gauge) gauge.addEventListener("animationend", () => setTimeout(finish, 120), { once: true });
})();
