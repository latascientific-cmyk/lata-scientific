/* =========================================================
   LATA SCIENTIFIC — whole-card links
   Clicking anywhere on a product card opens that product.

   There are two mechanisms and they are deliberately belt-and-braces:

   1. CSS (assets/css/styles.css): the .pcard__arrow anchor's ::after is
      stretched over the card. This is the primary path — it needs no
      JavaScript, and because the click lands on a real <a>, middle-click,
      ctrl-click and "open in new tab" all behave normally.

   2. This file: a delegated click handler that catches anything the overlay
      misses. If the overlay is doing its job the event target IS the anchor,
      so this handler bows out and the browser navigates natively. It only
      acts when the click landed on the image, the heading, the copy or bare
      card padding — which is exactly the case where a stale stylesheet, an
      unexpected stacking context or a z-index collision would otherwise
      leave the card dead.

   The handler is careful to stay out of the way: modified clicks, real
   controls inside the card, and text selection are all left alone.
   ========================================================= */
(function () {
  "use strict";

  function linkFor(card) {
    var a = card.querySelector(".pcard__arrow[href]");
    return a && a.getAttribute("href") ? a : null;
  }

  document.addEventListener("click", function (e) {
    // Something already handled it (or a link is doing its own thing).
    if (e.defaultPrevented) return;
    // Left button only. Let ctrl/cmd/shift/middle clicks keep their meaning
    // so "open in new tab" and "open in new window" still work.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var card = e.target.closest && e.target.closest(".pcard");
    if (!card) return;

    /* A real control inside the card wins — including .pcard__arrow itself,
       whose stretched ::after reports the anchor as the target. When that is
       what we hit, the browser is already navigating and we must not also
       assign location, or the history entry gets written twice. */
    if (e.target.closest("a[href], button, input, select, textarea, label, [role='button']")) return;

    // The visitor was selecting text, not clicking through.
    var sel = window.getSelection && window.getSelection();
    if (sel && String(sel).length > 0 && card.contains(sel.anchorNode)) return;

    var link = linkFor(card);
    if (!link) return;
    e.preventDefault();
    window.location.href = link.href;
  });

  /* Keyboard parity: the anchor already takes focus and Enter already works,
     but the card is the thing that looks focused, so Enter/Space anywhere in
     the card follows the link too. */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var el = document.activeElement;
    if (!el || !el.closest) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable) return;
    // A focused link or button handles its own key events.
    if (el.closest("a[href], button")) return;
    var card = el.closest(".pcard");
    if (!card) return;
    var link = linkFor(card);
    if (!link) return;
    e.preventDefault();
    window.location.href = link.href;
  });
})();
