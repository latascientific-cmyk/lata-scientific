/* =========================================================
   LATA SCIENTIFIC — product enquiry system
   -----------------------------------------------------
   Three reusable components, registered as custom elements so any page
   can drop them in without wiring anything up by hand:

     <enquiry-form data-product="Straight Through Valve">
     <whatsapp-button>
     <product-cta data-product="…">…markup…</product-cta>

   The product name is NEVER hardcoded here. It arrives, in order of
   preference, from the element's own data-product attribute, from the
   ?product= slug in the URL (resolved through the generated index in
   assets/js/product-index.js), or from the page's <h1>.

   Contact details live in one place — CONTACT below. Change them there
   and the header, footer, floating button, WhatsApp message and mailto
   subject all follow.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- single source of truth for contact details ---------- */
  var CONTACT = {
    /* wa.me wants country code first, digits only */
    waDigits: "919033630547",
    waDisplay: "+91 90336 30547",
    waTel: "+919033630547",
    email: "latascientific@gmail.com",
    floatMessage: "Hello Lata Scientific, I would like to enquire about your products."
  };
  window.LATA_CONTACT = CONTACT;

  var waLink = function (message) {
    return "https://wa.me/" + CONTACT.waDigits +
      (message ? "?text=" + encodeURIComponent(message) : "");
  };
  CONTACT.waLink = waLink;

  /* ---------- small helpers ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var escAttr = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };

  /* Turn "straight-through-valve" into "Straight Through Valve" only as a
     last resort — the generated index is consulted first. */
  var titleCase = function (slug) {
    return String(slug).split(/[-_]+/).filter(Boolean)
      .map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); })
      .join(" ");
  };

  var param = function (name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || "";
    } catch (e) { return ""; }
  };

  /* Resolve the product this enquiry is about. Nothing here knows any
     product name — every branch reads it from the page or the index. */
  var resolveProduct = function (el) {
    var explicit = el && (el.getAttribute("data-product") || el.getAttribute("product"));
    if (explicit) return explicit.trim();

    var slug = param("product");
    if (slug) {
      var index = window.LATA_PRODUCTS || {};
      return index[slug] || titleCase(slug);
    }

    var meta = document.querySelector('meta[name="product-name"]');
    if (meta && meta.content) return meta.content.trim();

    var h1 = document.querySelector(".pd__copy h1, main h1");
    if (h1 && h1.textContent.trim()) return h1.textContent.trim();

    return "";
  };

  var ARROW = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var WA_GLYPH = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.55 2 2.1 6.44 2.1 11.92c0 1.75.46 3.45 1.33 4.95L2 22l5.27-1.38a9.9 9.9 0 0 0 4.77 1.21h.01c5.48 0 9.94-4.45 9.94-9.93A9.87 9.87 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.23c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.8-.22-.09-.39-.13-.55.12-.17.25-.64.8-.79.97-.14.16-.29.19-.54.06-.24-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.11-.51.11-.11.24-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z"/></svg>';

  /* A short, familiar list for the datalist — the field stays free text so
     any country can be typed. */
  var COUNTRIES = ["India", "United States", "United Kingdom", "Germany", "France",
    "Italy", "Spain", "Netherlands", "Belgium", "Switzerland", "Sweden", "Poland",
    "Turkey", "Russia", "United Arab Emirates", "Saudi Arabia", "Qatar", "Oman",
    "Kuwait", "Egypt", "South Africa", "Nigeria", "Kenya", "China", "Japan",
    "South Korea", "Taiwan", "Singapore", "Malaysia", "Indonesia", "Thailand",
    "Vietnam", "Philippines", "Bangladesh", "Sri Lanka", "Nepal", "Pakistan",
    "Australia", "New Zealand", "Canada", "Mexico", "Brazil", "Argentina", "Chile",
    "Colombia", "Peru"];

  /* =========================================================
     Success dialog — one instance, shared by every form
     ========================================================= */
  var dialog = null;
  var lastFocus = null;

  function buildDialog() {
    if (dialog) return dialog;
    var wrap = document.createElement("div");
    wrap.className = "enq-modal";
    wrap.setAttribute("hidden", "");
    wrap.innerHTML =
      '<div class="enq-modal__backdrop" data-close></div>' +
      '<div class="enq-modal__panel" role="dialog" aria-modal="true" aria-labelledby="enqModalTitle">' +
        '<span class="enq-modal__tick" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' +
        '</span>' +
        '<h2 class="enq-modal__title" id="enqModalTitle">Enquiry sent</h2>' +
        '<p class="enq-modal__body">Thank you for contacting Lata Scientific. Our team will get back to you shortly.</p>' +
        '<button type="button" class="btn btn--primary enq-modal__close" data-close>Close</button>' +
      '</div>';
    document.body.appendChild(wrap);

    wrap.addEventListener("click", function (e) {
      if (e.target.hasAttribute && e.target.hasAttribute("data-close")) closeDialog();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !wrap.hasAttribute("hidden")) closeDialog();
      /* keep tab focus inside the panel while it is open */
      if (e.key === "Tab" && !wrap.hasAttribute("hidden")) {
        var f = wrap.querySelectorAll("button");
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    dialog = wrap;
    return wrap;
  }

  function openDialog() {
    var wrap = buildDialog();
    lastFocus = document.activeElement;
    wrap.removeAttribute("hidden");
    /* Force a reflow so the transition has a starting state to animate from.
       A rAF callback would do the same, but browsers throttle it when the tab
       is backgrounded — which would leave the panel stuck at opacity 0 while
       still covering the page. */
    void wrap.offsetHeight;
    wrap.classList.add("is-open");
    var btn = wrap.querySelector(".enq-modal__close");
    if (btn) btn.focus();
  }

  function closeDialog() {
    if (!dialog) return;
    /* Hidden in the same tick — the entry animation has no exit counterpart,
       so there is nothing to wait for and no window where a half-faded
       overlay could keep swallowing clicks. */
    dialog.classList.remove("is-open");
    dialog.setAttribute("hidden", "");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* =========================================================
     <enquiry-form> — the enquiry form itself
     ========================================================= */
  var FIELDS = [
    { id: "name", label: "Your name", type: "text", ac: "name", required: true, ph: "Full name", half: true },
    { id: "company", label: "Company name", type: "text", ac: "organization", ph: "Organisation", half: true },
    { id: "email", label: "Email", type: "email", ac: "email", required: true, ph: "you@company.com", half: true },
    { id: "phone", label: "Phone number", type: "tel", ac: "tel", required: true, ph: "With country code", half: true },
    { id: "country", label: "Country", type: "text", ac: "country-name", required: true, ph: "Where you are based", half: true, list: true }
  ];

  var MESSAGE_PLACEHOLDER =
    "Please provide your requirement, quantity, operating temperature, pressure, or any custom specifications.";

  var uid = 0;

  function EnquiryFormInit(host) {
    if (host.dataset.ready === "1") return;
    host.dataset.ready = "1";

    var product = resolveProduct(host);
    var n = ++uid;
    var fid = function (base) { return "enq-" + base + "-" + n; };

    var fieldHtml = FIELDS.map(function (f) {
      var id = fid(f.id);
      return '<div class="field' + (f.half ? "" : " field--full") + '">' +
        '<label for="' + id + '">' + f.label + (f.required ? "" : ' <span class="field__opt">(optional)</span>') + "</label>" +
        '<input type="' + f.type + '" id="' + id + '" name="' + f.id + '"' +
          ' autocomplete="' + f.ac + '" placeholder="' + escAttr(f.ph) + '"' +
          (f.required ? " required" : "") +
          (f.list ? ' list="enq-countries"' : "") + " />" +
        '<span class="field__err" data-for="' + f.id + '" role="alert"></span>' +
        "</div>";
    }).join("");

    var msgId = fid("message");

    host.innerHTML =
      '<form class="enq formcard" novalidate>' +
        /* the product travels with the enquiry without the visitor typing it */
        '<input type="hidden" name="product" value="' + escAttr(product) + '" />' +
        (product
          ? '<div class="enq__head">' +
              '<p class="enq__eyebrow">Product enquiry</p>' +
              '<p class="enq__product"><span class="enq__dot" aria-hidden="true"></span>' + escAttr(product) + "</p>" +
              '<p class="enq__note">This enquiry is linked to the product above — no need to type it.</p>' +
            "</div>"
          : '<div class="enq__head">' +
              '<p class="enq__eyebrow">Enquiry</p>' +
              '<p class="enq__note">Tell us what you need and we will come back within one business day.</p>' +
            "</div>") +
        '<div class="formgrid">' +
          fieldHtml +
          '<div class="field field--full">' +
            '<label for="' + msgId + '">Message</label>' +
            '<textarea id="' + msgId + '" name="message" rows="5" required placeholder="' +
              escAttr(MESSAGE_PLACEHOLDER) + '"></textarea>' +
            '<span class="field__err" data-for="message" role="alert"></span>' +
          "</div>" +
        "</div>" +
        '<div class="enq__actions">' +
          '<button type="submit" class="btn btn--primary enq__btn" data-act="email">' +
            '<span class="enq__spin" aria-hidden="true"></span>' +
            '<span class="enq__btn-label">Send enquiry</span>' + ARROW +
          "</button>" +
          '<button type="button" class="btn btn--wa enq__btn" data-act="whatsapp">' +
            '<span class="enq__spin" aria-hidden="true"></span>' +
            WA_GLYPH + '<span class="enq__btn-label">Send via WhatsApp</span>' +
          "</button>" +
        "</div>" +
        '<p class="enq__status" role="status" aria-live="polite"></p>' +
        '<p class="enq__fine">Or reach us directly — ' +
          '<a href="mailto:' + CONTACT.email + '">' + CONTACT.email + "</a> · " +
          '<a href="' + waLink(CONTACT.floatMessage) + '" target="_blank" rel="noopener">' + CONTACT.waDisplay + "</a>" +
        "</p>" +
      "</form>";

    ensureCountryList();

    var form = host.querySelector("form");
    var status = host.querySelector(".enq__status");
    var buttons = host.querySelectorAll(".enq__btn");
    var busy = false;

    var showError = function (name, msg) {
      var input = form.elements[name];
      if (!input) return !msg;
      var wrap = input.closest(".field");
      var slot = form.querySelector('.field__err[data-for="' + name + '"]');
      if (wrap) wrap.classList.toggle("is-invalid", !!msg);
      if (slot) slot.textContent = msg || "";
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      return !msg;
    };

    var validate = function () {
      var v = function (name) { return (form.elements[name].value || "").trim(); };
      var ok = true;
      ok = showError("name", v("name") ? "" : "Please enter your name.") && ok;
      ok = showError("email", EMAIL_RE.test(v("email")) ? "" : "Enter a valid email address.") && ok;
      ok = showError("phone", v("phone").replace(/\D/g, "").length >= 7 ? "" : "Enter a phone number we can reach you on.") && ok;
      ok = showError("country", v("country") ? "" : "Please tell us your country.") && ok;
      ok = showError("message", v("message").length >= 8 ? "" : "A little more detail helps us quote accurately.") && ok;
      if (!ok) {
        var bad = form.querySelector(".field.is-invalid input, .field.is-invalid textarea");
        if (bad) bad.focus();
      }
      return ok;
    };

    var collect = function () {
      var get = function (name) { return (form.elements[name].value || "").trim(); };
      return {
        product: get("product") || product,
        name: get("name"),
        company: get("company"),
        email: get("email"),
        phone: get("phone"),
        country: get("country"),
        message: get("message")
      };
    };

    /* Exactly the layout the enquiry is expected to arrive in. */
    var whatsappText = function (d) {
      return [
        "Hello Lata Scientific,",
        "I am interested in the following product.",
        "",
        "Product:",
        d.product || "General enquiry",
        "",
        "Name:",
        d.name,
        "",
        "Company:",
        d.company || "-",
        "",
        "Email:",
        d.email,
        "",
        "Phone:",
        d.phone,
        "",
        "Country:",
        d.country,
        "",
        "Requirement:",
        d.message
      ].join("\n");
    };

    var mailtoUrl = function (d) {
      var subject = "New Product Enquiry - " + (d.product || "General enquiry");
      var body = [
        "New product enquiry from latascientific.com",
        "",
        "Product: " + (d.product || "General enquiry"),
        "",
        "Name: " + d.name,
        "Company: " + (d.company || "-"),
        "Email: " + d.email,
        "Phone: " + d.phone,
        "Country: " + d.country,
        "",
        "Requirement:",
        d.message,
        ""
      ].join("\n");
      return "mailto:" + CONTACT.email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    };

    var setBusy = function (on, btn) {
      busy = on;
      form.classList.toggle("is-busy", on);
      Array.prototype.forEach.call(buttons, function (b) {
        b.disabled = on;
        b.classList.toggle("is-loading", on && b === btn);
      });
    };

    var finish = function (channel) {
      setBusy(false);
      status.textContent = channel === "whatsapp"
        ? "WhatsApp opened with your enquiry — press send there to deliver it."
        : "Your email client has opened with the enquiry — press send to deliver it.";
      form.reset();
      openDialog();
    };

    var send = function (channel, btn) {
      if (busy) return;
      status.textContent = "";
      if (!validate()) {
        status.textContent = "Please fix the highlighted fields.";
        return;
      }
      setBusy(true, btn);
      var data = collect();
      /* Opened inside the click so the browser still counts it as a user
         gesture — deferring it behind a timer gets the tab blocked. */
      if (channel === "whatsapp") {
        window.open(waLink(whatsappText(data)), "_blank", "noopener");
      } else {
        window.location.href = mailtoUrl(data);
      }
      window.setTimeout(function () { finish(channel); }, 700);
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      send("email", form.querySelector('[data-act="email"]'));
    });

    form.querySelector('[data-act="whatsapp"]').addEventListener("click", function () {
      send("whatsapp", this);
    });

    /* clear a field's error as soon as the visitor starts fixing it */
    form.addEventListener("input", function (e) {
      if (e.target.name) showError(e.target.name, "");
    });
  }

  function ensureCountryList() {
    if (document.getElementById("enq-countries")) return;
    var dl = document.createElement("datalist");
    dl.id = "enq-countries";
    dl.innerHTML = COUNTRIES.map(function (c) {
      return '<option value="' + escAttr(c) + '"></option>';
    }).join("");
    document.body.appendChild(dl);
  }

  /* =========================================================
     <whatsapp-button> — floating contact button
     ========================================================= */
  function WhatsAppButtonInit(host) {
    if (host.dataset.ready === "1") return;
    host.dataset.ready = "1";
    var label = host.getAttribute("data-label") || "WhatsApp enquiry";
    host.innerHTML =
      '<a class="wa-float" href="' + waLink(CONTACT.floatMessage) + '" target="_blank" rel="noopener"' +
      ' aria-label="Enquire on WhatsApp at ' + escAttr(CONTACT.waDisplay) + '">' +
      WA_GLYPH + "<span>" + escAttr(label) + "</span></a>";
  }

  /* =========================================================
     <product-cta> — the action stack on a product page
     Markup is server-rendered inside the element so it works without
     JavaScript; this only upgrades the quotation button so it opens the
     enquiry form on the same page instead of navigating away.
     ========================================================= */
  function ProductCTAInit(host) {
    if (host.dataset.ready === "1") return;
    host.dataset.ready = "1";

    var target = document.querySelector("enquiry-form");
    if (!target) return;

    var quote = host.querySelector("[data-enq-open]");
    if (!quote) return;

    quote.addEventListener("click", function (e) {
      /* let modified clicks (new tab, etc.) behave normally */
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      var section = target.closest("section") || target;
      section.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
      var first = target.querySelector("input:not([type=hidden])");
      if (first) window.setTimeout(function () { first.focus({ preventScroll: true }); }, 500);
    });
  }

  /* =========================================================
     registration
     ========================================================= */
  var define = function (tag, init) {
    if (window.customElements && !window.customElements.get(tag)) {
      window.customElements.define(tag, class extends HTMLElement {
        connectedCallback() { init(this); }
      });
    }
  };

  var boot = function () {
    define("enquiry-form", EnquiryFormInit);
    define("whatsapp-button", WhatsAppButtonInit);
    define("product-cta", ProductCTAInit);

    /* Every page gets the floating button, whether or not the markup
       declares one. */
    if (!document.querySelector("whatsapp-button")) {
      var el = document.createElement("whatsapp-button");
      document.body.appendChild(el);
      if (!window.customElements) WhatsAppButtonInit(el);
    }

    /* Fallback for browsers without custom elements: upgrade by hand. */
    if (!window.customElements) {
      Array.prototype.forEach.call(document.querySelectorAll("enquiry-form"), EnquiryFormInit);
      Array.prototype.forEach.call(document.querySelectorAll("product-cta"), ProductCTAInit);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
