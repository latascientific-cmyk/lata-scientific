/* =========================================================
   LATA SCIENTIFIC — product image viewer
   Click any product image to inspect it full screen, with zoom, pan and
   gallery navigation, without leaving the page.

   Deliberately NOT applied to images that already sit inside a link — the
   category cards on the home page are anchors, and hijacking their click
   would break navigation the site already relies on.
   ========================================================= */
(function () {
  "use strict";

  /* Which images become zoomable: the hero on a product page, the dimension
     drawing and the exploded view.

     Product card images are deliberately NOT here. The whole card is now a
     link, so a click on the card image navigates to the product — opening a
     viewer there instead would fight the card's own job. Leaving them in the
     selector would also give each one a stray tab stop and a "View larger"
     label for something that no longer opens the viewer. */
  var SELECTORS = [
    ".pd__media img",
    ".specsplit__fig img",
    ".exploded img",
  ].join(",");

  var box = null, imgEl = null, titleEl = null, countEl = null,
      thumbsEl = null, prevBtn = null, nextBtn = null, pctEl = null,
      stageEl = null, hintEl = null;
  var group = [], index = 0, lastFocus = null;
  var scale = 1, tx = 0, ty = 0, natural = { w: 0, h: 0 };
  var MIN = 1, MAX = 5;

  /* ---------- build once ---------- */
  var ICO = {
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    prev: '<path d="M15 5l-7 7 7 7"/>',
    next: '<path d="M9 5l7 7-7 7"/>',
    plus: '<path d="M12 6v12M6 12h12"/>',
    minus: '<path d="M6 12h12"/>',
    reset: '<path d="M4 9V5h4"/><path d="M20 15v4h-4"/><path d="M20 9a8 8 0 0 0-14-4"/><path d="M4 15a8 8 0 0 0 14 4"/>',
  };
  function svg(d, w) {
    return '<svg viewBox="0 0 24 24" width="' + (w || 20) + '" height="' + (w || 20) +
      '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>";
  }

  function build() {
    if (box) return;
    box = document.createElement("div");
    box.className = "lbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Product image viewer");
    box.innerHTML =
      '<div class="lbox__bar">' +
        '<span class="lbox__title"></span>' +
        '<span class="lbox__count"></span>' +
        '<button class="lbox__btn" type="button" data-lb="close" aria-label="Close image viewer">' + svg(ICO.close) + "</button>" +
      "</div>" +
      '<div class="lbox__stage">' +
        '<img class="lbox__img" alt="" draggable="false" />' +
        '<button class="lbox__btn lbox__nav lbox__nav--prev" type="button" data-lb="prev" aria-label="Previous image">' + svg(ICO.prev) + "</button>" +
        '<button class="lbox__btn lbox__nav lbox__nav--next" type="button" data-lb="next" aria-label="Next image">' + svg(ICO.next) + "</button>" +
        '<span class="lbox__hint">Double-click to zoom · scroll to zoom · drag to pan</span>' +
      "</div>" +
      '<div class="lbox__foot">' +
        '<div class="lbox__thumbs" role="tablist" aria-label="Image thumbnails" hidden></div>' +
        '<div class="lbox__zoom">' +
          '<button class="lbox__btn" type="button" data-lb="out" aria-label="Zoom out">' + svg(ICO.minus) + "</button>" +
          '<span class="lbox__pct" aria-live="polite">100%</span>' +
          '<button class="lbox__btn" type="button" data-lb="in" aria-label="Zoom in">' + svg(ICO.plus) + "</button>" +
          '<button class="lbox__btn" type="button" data-lb="reset" aria-label="Reset zoom">' + svg(ICO.reset, 18) + "</button>" +
        "</div>" +
      "</div>";
    document.body.appendChild(box);

    imgEl = box.querySelector(".lbox__img");
    titleEl = box.querySelector(".lbox__title");
    countEl = box.querySelector(".lbox__count");
    thumbsEl = box.querySelector(".lbox__thumbs");
    prevBtn = box.querySelector('[data-lb="prev"]');
    nextBtn = box.querySelector('[data-lb="next"]');
    pctEl = box.querySelector(".lbox__pct");
    stageEl = box.querySelector(".lbox__stage");
    hintEl = box.querySelector(".lbox__hint");

    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-lb]");
      if (b) {
        var a = b.getAttribute("data-lb");
        if (a === "close") close();
        else if (a === "prev") go(-1);
        else if (a === "next") go(1);
        else if (a === "in") zoomBy(1.5);
        else if (a === "out") zoomBy(1 / 1.5);
        else if (a === "reset") resetZoom();
        return;
      }
      var th = e.target.closest(".lbox__thumb");
      if (th) { show(+th.getAttribute("data-i")); return; }
      // Clicking the backdrop (anything that is not the image) closes.
      if (e.target !== imgEl && !e.target.closest(".lbox__foot, .lbox__bar")) close();
    });

    bindZoom();
    bindTouch();
  }

  /* ---------- transform ---------- */
  function apply(animate) {
    imgEl.classList.toggle("is-panning", !animate);
    imgEl.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
    imgEl.classList.toggle("is-zoomed", scale > 1.01);
    pctEl.textContent = Math.round(scale * 100) + "%";
    imgEl.setAttribute("aria-label", "Image at " + Math.round(scale * 100) + " percent");
  }
  function resetZoom() { scale = 1; tx = 0; ty = 0; apply(true); }

  // Keep the image from being dragged entirely off the stage.
  function clamp() {
    var r = imgEl.getBoundingClientRect();
    var s = stageEl.getBoundingClientRect();
    var w = imgEl.offsetWidth * scale, h = imgEl.offsetHeight * scale;
    var maxX = Math.max(0, (w - s.width) / 2), maxY = Math.max(0, (h - s.height) / 2);
    tx = Math.min(maxX, Math.max(-maxX, tx));
    ty = Math.min(maxY, Math.max(-maxY, ty));
    void r;
  }
  function zoomAt(factor, cx, cy) {
    var prev = scale;
    scale = Math.min(MAX, Math.max(MIN, scale * factor));
    if (scale === prev) return;
    if (scale === 1) { tx = 0; ty = 0; }
    else {
      var s = stageEl.getBoundingClientRect();
      var ox = (cx == null ? s.left + s.width / 2 : cx) - (s.left + s.width / 2);
      var oy = (cy == null ? s.top + s.height / 2 : cy) - (s.top + s.height / 2);
      var k = scale / prev;
      tx = (tx - ox) * k + ox;
      ty = (ty - oy) * k + oy;
      clamp();
    }
    apply(true);
  }
  function zoomBy(f) { zoomAt(f, null, null); }

  function bindZoom() {
    stageEl.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoomAt(e.deltaY < 0 ? 1.14 : 1 / 1.14, e.clientX, e.clientY);
    }, { passive: false });

    imgEl.addEventListener("dblclick", function (e) {
      e.preventDefault();
      if (scale > 1.01) resetZoom(); else zoomAt(2.4, e.clientX, e.clientY);
    });

    var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
    imgEl.addEventListener("pointerdown", function (e) {
      if (scale <= 1.01 || e.pointerType === "touch") return;
      dragging = true; sx = e.clientX; sy = e.clientY; ox = tx; oy = ty;
      imgEl.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    imgEl.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      tx = ox + (e.clientX - sx); ty = oy + (e.clientY - sy);
      clamp(); apply(false);
    });
    var end = function (e) {
      if (!dragging) return;
      dragging = false;
      try { imgEl.releasePointerCapture(e.pointerId); } catch (err) { /* already released */ }
      apply(true);
    };
    imgEl.addEventListener("pointerup", end);
    imgEl.addEventListener("pointercancel", end);
  }

  /* ---------- touch: pinch, swipe, drag ---------- */
  function bindTouch() {
    var pts = {}, startDist = 0, startScale = 1, startTx = 0, startTy = 0;
    var swipeX = 0, swipeY = 0, swiping = false, moved = false;

    function dist() {
      var k = Object.keys(pts);
      if (k.length < 2) return 0;
      var a = pts[k[0]], b = pts[k[1]];
      return Math.hypot(a.x - b.x, a.y - b.y);
    }
    function mid() {
      var k = Object.keys(pts), a = pts[k[0]], b = pts[k[1]];
      return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    }

    stageEl.addEventListener("touchstart", function (e) {
      for (var i = 0; i < e.changedTouches.length; i++) {
        var t = e.changedTouches[i];
        pts[t.identifier] = { x: t.clientX, y: t.clientY };
      }
      var n = Object.keys(pts).length;
      if (n === 2) { startDist = dist(); startScale = scale; startTx = tx; startTy = ty; }
      else if (n === 1) {
        var t0 = e.changedTouches[0];
        swipeX = t0.clientX; swipeY = t0.clientY; swiping = true; moved = false;
        startTx = tx; startTy = ty;
      }
    }, { passive: true });

    stageEl.addEventListener("touchmove", function (e) {
      for (var i = 0; i < e.changedTouches.length; i++) {
        var t = e.changedTouches[i];
        if (pts[t.identifier]) { pts[t.identifier].x = t.clientX; pts[t.identifier].y = t.clientY; }
      }
      var n = Object.keys(pts).length;
      if (n >= 2 && startDist) {
        e.preventDefault();
        var m = mid();
        var prev = scale;
        scale = Math.min(MAX, Math.max(MIN, startScale * (dist() / startDist)));
        var s = stageEl.getBoundingClientRect();
        var cx = m.x - (s.left + s.width / 2), cy = m.y - (s.top + s.height / 2);
        var k = scale / prev;
        tx = (tx - cx) * k + cx; ty = (ty - cy) * k + cy;
        clamp(); apply(false);
        moved = true;
      } else if (n === 1 && swiping) {
        var t1 = e.changedTouches[0];
        var dx = t1.clientX - swipeX, dy = t1.clientY - swipeY;
        if (scale > 1.01) {
          // Zoomed in: one finger pans the image.
          e.preventDefault();
          tx = startTx + dx; ty = startTy + dy;
          clamp(); apply(false);
          moved = true;
        } else if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          moved = true;
        }
      }
    }, { passive: false });

    stageEl.addEventListener("touchend", function (e) {
      for (var i = 0; i < e.changedTouches.length; i++) delete pts[e.changedTouches[i].identifier];
      var remaining = Object.keys(pts).length;
      if (remaining === 0 && swiping && scale <= 1.01 && moved) {
        var t = e.changedTouches[0];
        var dx = t.clientX - swipeX, dy = t.clientY - swipeY;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();      // swipe down to dismiss
      }
      if (remaining === 0) { swiping = false; startDist = 0; apply(true); }
    }, { passive: true });
  }

  /* ---------- gallery ---------- */
  function preload(i) {
    if (i < 0 || i >= group.length) return;
    var im = new Image();
    im.src = group[i].src;
  }

  function show(i, skipAnim) {
    if (i < 0 || i >= group.length) return;
    index = i;
    var item = group[i];
    scale = 1; tx = 0; ty = 0;

    var swap = function () {
      imgEl.src = item.src;
      imgEl.alt = item.alt || "";
      titleEl.textContent = item.title || item.alt || "";
      apply(true);
      box.classList.remove("is-swapping");
    };
    if (skipAnim) swap();
    else { box.classList.add("is-swapping"); setTimeout(swap, 110); }

    var multi = group.length > 1;
    countEl.textContent = multi ? (i + 1) + " / " + group.length : "";
    prevBtn.hidden = !multi; nextBtn.hidden = !multi;
    prevBtn.disabled = !multi; nextBtn.disabled = !multi;
    thumbsEl.hidden = !multi;

    if (multi) {
      var t = thumbsEl.querySelectorAll(".lbox__thumb");
      for (var k = 0; k < t.length; k++) {
        var on = k === i;
        t[k].classList.toggle("is-current", on);
        t[k].setAttribute("aria-selected", on ? "true" : "false");
        t[k].tabIndex = on ? 0 : -1;
      }
      if (t[i] && t[i].scrollIntoView) t[i].scrollIntoView({ block: "nearest", inline: "nearest" });
    }
    preload(i + 1); preload(i - 1);
    hintEl.hidden = false;
  }

  function go(d) {
    if (group.length < 2) return;
    show((index + d + group.length) % group.length);
  }

  function buildThumbs() {
    if (group.length < 2) { thumbsEl.innerHTML = ""; return; }
    var h = "";
    for (var i = 0; i < group.length; i++) {
      h += '<button class="lbox__thumb" type="button" role="tab" data-i="' + i + '" aria-label="' +
        (group[i].alt || "Image " + (i + 1)).replace(/"/g, "&quot;") + '"><img src="' + group[i].src +
        '" alt="" loading="lazy" decoding="async" /></button>';
    }
    thumbsEl.innerHTML = h;
  }

  /* ---------- open / close ---------- */
  function open(items, start) {
    build();
    group = items; index = start || 0;
    lastFocus = document.activeElement;
    buildThumbs();
    box.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
    show(index, true);
    /* Focus synchronously. visibility flips instantly on open (see the CSS),
       so the button is focusable right now — and requestAnimationFrame never
       fires in a background or non-compositing tab, which would strand focus
       outside the dialog. */
    box.querySelector('[data-lb="close"]').focus();
  }

  function close() {
    if (!box || !box.classList.contains("is-open")) return;
    box.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    resetZoom();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  /* ---------- page wiring ---------- */
  function itemFor(img) {
    return {
      // Product cards use a cover crop; the viewer should show the full file.
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt") || "",
      title: img.getAttribute("alt") || document.title.split("—")[0].trim(),
    };
  }

  function init() {
    var imgs = Array.prototype.slice.call(document.querySelectorAll(SELECTORS))
      .filter(function (img) { return !img.closest("a"); });
    if (!imgs.length) return;

    /* On a product page the hero, the dimension drawing and the exploded view
       are all the same product, so they form one gallery. Elsewhere (a
       category page carrying a reference drawing, say) each image stands
       alone. */
    var isProductPage = !!document.querySelector(".pd__media");
    var galleryImgs = isProductPage ? imgs : [];
    var gallery = galleryImgs.map(itemFor);

    imgs.forEach(function (img) {
      img.setAttribute("data-zoomable", "");
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      if (!img.getAttribute("aria-label")) {
        img.setAttribute("aria-label", "View larger: " + (img.getAttribute("alt") || "product image"));
      }
      var openThis = function () {
        var gi = galleryImgs.indexOf(img);
        if (gi >= 0) open(gallery, gi);
        else open([itemFor(img)], 0);
      };
      img.addEventListener("click", openThis);
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openThis(); }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (!box || !box.classList.contains("is-open")) return;
      switch (e.key) {
        case "Escape": e.preventDefault(); close(); break;
        case "ArrowLeft": e.preventDefault(); go(-1); break;
        case "ArrowRight": e.preventDefault(); go(1); break;
        case "+": case "=": e.preventDefault(); zoomBy(1.4); break;
        case "-": case "_": e.preventDefault(); zoomBy(1 / 1.4); break;
        case "0": e.preventDefault(); resetZoom(); break;
        case "Tab": {
          var f = box.querySelectorAll("button:not([disabled]):not([hidden])");
          if (!f.length) return;
          var first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
          break;
        }
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
