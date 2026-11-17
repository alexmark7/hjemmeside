/*
 * Binderly — shared site behaviour.
 * Keeps product details, release links, and feature labels configurable.
 */
(function () {
  "use strict";

  var config = window.SITE_CONFIG || {};
  var doc = document;

var ICONS = {
  "arrow": "<path d=\"M4 12h15M13.5 6.5 20 12l-6.5 5.5\"/>",
  "binder": "<rect x=\"4.5\" y=\"3.5\" width=\"15\" height=\"17\" rx=\"2.2\"/><path d=\"M8 3.5v17M8 7h8M8 12h8M8 17h8\"/><circle cx=\"6.2\" cy=\"8\" r=\".6\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"6.2\" cy=\"12\" r=\".6\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"6.2\" cy=\"16\" r=\".6\" fill=\"currentColor\" stroke=\"none\"/>",
  "card": "<rect x=\"3.5\" y=\"5.5\" width=\"17\" height=\"13\" rx=\"2\"/><circle cx=\"8.5\" cy=\"10.5\" r=\"1.4\"/><path d=\"M3.5 15.5 9 11l4 4 3-2.5 4.5 4\"/>",
  "chart": "<path d=\"M4 20h16\"/><rect x=\"5.5\" y=\"12\" width=\"3.2\" height=\"5.5\" rx=\".8\"/><rect x=\"10.4\" y=\"8\" width=\"3.2\" height=\"9.5\" rx=\".8\"/><rect x=\"15.3\" y=\"4.5\" width=\"3.2\" height=\"13\" rx=\".8\"/>",
  "check": "<path d=\"M4.5 12.5 9.5 17.5 19.5 6.5\"/>",
  "code": "<path d=\"m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15\"/>",
  "download": "<path d=\"M12 3.5v11M7.5 10.5 12 15l4.5-4.5\"/><path d=\"M4.5 16.5v3h15v-3\"/>",
  "edit": "<path d=\"M4 20h4.2L20 8.2a2.3 2.3 0 0 0-3.2-3.2L4.8 16.8z\"/><path d=\"M14.8 7.2 18.8 11.2\"/>",
  "filter": "<path d=\"M3.5 5.5h17l-6.5 7.2v5.4l-4 1.9v-7.3z\"/>",
  "info": "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><path d=\"M12 11v5.5M12 7.8v.1\"/>",
  "laptop": "<rect x=\"4\" y=\"5\" width=\"16\" height=\"11\" rx=\"1.4\"/><path d=\"M2 19.5h20M9 16.5h6\"/>",
  "layers": "<path d=\"m12 3.5 8.5 4.5L12 12.5 3.5 8z\"/><path d=\"m4 12 8 4.2 8-4.2M4 16l8 4.2 8-4.2\"/>",
  "mail": "<rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"m4 7 8 6 8-6\"/>",
  "phone": "<path d=\"M7.2 3.5h3l1.4 4-2 1.5a12.5 12.5 0 0 0 5.4 5.4l1.5-2 4 1.4v3c0 1.4-1.1 2.5-2.5 2.5C10.4 19.3 4.7 13.6 4.7 6c0-1.4 1.1-2.5 2.5-2.5z\"/>",
  "plus": "<path d=\"M12 4.5v15M4.5 12h15\"/>",
  "save": "<path d=\"M4.5 4.5h12l3 3v12h-15z\"/><path d=\"M8 4.5v5h7v-5M8 19.5v-6h8v6\"/>",
  "search": "<circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"M15.4 15.4 21 21\"/>",
  "shield": "<path d=\"M12 3 20 6v6c0 5-3.5 7.8-8 9-4.5-1.2-8-4-8-9V6z\"/><path d=\"m8.5 11.8 2.4 2.4 4.8-4.8\"/>",
  "sort": "<path d=\"M7 4v16M3.5 16.5 7 20l3.5-3.5M17 20V4M13.5 7.5 17 4l3.5 3.5\"/>",
  "transfer": "<path d=\"M4 8h14M14.5 4.5 18 8l-3.5 3.5M20 16H6M9.5 12.5 6 16l3.5 3.5\"/>",
  "trash": "<path d=\"M4.5 6.5h15M9.5 3.5h5M6.5 6.5 7.5 21h9l1-14.5M10 10.5v6.5M14 10.5v6.5\"/>",
  "user": "<circle cx=\"12\" cy=\"8\" r=\"3.8\"/><path d=\"M4.5 20.5c.6-4 3.6-6.2 7.5-6.2s6.9 2.2 7.5 6.2\"/>",
  "warning": "<path d=\"M12 3.5 22 20H2z\"/><path d=\"M12 9v5M12 17.2v.1\"/>"
};

  function injectIcons() {
    doc.querySelectorAll(".icon").forEach(function (el) {
      var iconClass = Array.prototype.slice.call(el.classList).filter(function (name) {
        return name.indexOf("icon--") === 0;
      })[0];
      if (!iconClass) return;
      var markup = ICONS[iconClass.slice(6)];
      if (!markup) return;
      var svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "1.8");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.innerHTML = markup;
      el.textContent = "";
      el.appendChild(svg);
    });
  }

  injectIcons();

  function setText(selector, value) {
    if (!value) return;
    doc.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  setText("[data-site-name]", config.productName);
  setText("[data-site-version]", config.version);
  setText("[data-supported-os]", config.supportedOS);
  setText("[data-site-tagline]", config.tagline);
  setText("[data-year]", String(new Date().getFullYear()));

  // Release call-to-action: never show a working button without a real file.
  doc.querySelectorAll("[data-download-cta]").forEach(function (el) {
    if (config.downloadUrl) {
      el.setAttribute("href", config.downloadUrl);
      el.removeAttribute("aria-disabled");
      el.classList.remove("is-disabled");
      if (el.dataset.downloadLabel) {
        el.textContent = el.dataset.downloadLabel;
      }
      return;
    }
    var unavailable = doc.createElement("span");
    unavailable.className = el.className + " is-disabled";
    unavailable.setAttribute("aria-disabled", "true");
    unavailable.textContent = "Download not yet available";
    el.replaceWith(unavailable);
  });

  // Repository links are configured in one place.
  doc.querySelectorAll("[data-repo-link]").forEach(function (el) {
    if (config.repositoryUrl) {
      el.setAttribute("href", config.repositoryUrl);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
      if (el.dataset.repoLabel) {
        el.textContent = el.dataset.repoLabel;
      }
      return;
    }
    var missing = doc.createElement("span");
    missing.className = "muted";
    missing.textContent = "Repository link to be added";
    el.replaceWith(missing);
  });

  // Feature status labels come from the config so they stay consistent.
  doc.querySelectorAll("[data-feature-status]").forEach(function (el) {
    var key = el.getAttribute("data-feature-status");
    var status = config.featureStatus && config.featureStatus[key];
    var label = status && config.statusLabels && config.statusLabels[status];
    if (!label) return;
    el.className = "status " + label.className;
    el.textContent = label.text;
  });

  // Mobile navigation
  var header = doc.querySelector(".site-header");
  var toggle = doc.querySelector(".nav-toggle");
  var nav = doc.getElementById("site-nav");
  var lastFocused = null;

  function setNav(open) {
    if (!header || !toggle) return;
    header.classList.toggle("is-open", open);
    doc.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    if (open) {
      lastFocused = doc.activeElement;
      var firstLink = nav && nav.querySelector("a");
      if (firstLink) firstLink.focus();
    } else if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
  }

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      setNav(!header.classList.contains("is-open"));
    });

    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        setNav(false);
      }
    });

    doc.addEventListener("click", function (event) {
      if (header.classList.contains("is-open") && !header.contains(event.target)) {
        setNav(false);
      }
    });

    var desktop = window.matchMedia("(min-width: 901px)");
    if (desktop.addEventListener) {
      desktop.addEventListener("change", function (event) {
        if (event.matches) setNav(false);
      });
    }

    nav &&
      nav.addEventListener("click", function (event) {
        if (event.target.closest("a") && !event.target.closest(".nav__dropdown")) {
          setNav(false);
        }
      });
  }

  // Keep guide dropdowns tidy: close when clicking elsewhere or pressing Escape.
  doc.querySelectorAll(".nav__dropdown").forEach(function (dropdown) {
    doc.addEventListener("click", function (event) {
      if (dropdown.open && !dropdown.contains(event.target)) {
        dropdown.open = false;
      }
    });
    dropdown.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        dropdown.open = false;
        var summary = dropdown.querySelector("summary");
        if (summary) summary.focus();
      }
    });
  });

  // Highlight the current page, including the Guides section label.
  var page = window.location.pathname.split("/").pop() || "index.html";
  if (page === "") page = "index.html";
  var guidePages = [
    "getting-started.html",
    "managing-your-collection.html",
    "search-sort-filter.html",
    "statistics.html",
    "import-export.html"
  ];

  doc.querySelectorAll(".nav a[href]").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === page) {
      link.setAttribute("aria-current", "page");
    }
  });

  if (guidePages.indexOf(page) !== -1) {
    var guideSummary = doc.querySelector(".nav__dropdown > summary");
    if (guideSummary) guideSummary.setAttribute("aria-current", "page");
  }
})();
