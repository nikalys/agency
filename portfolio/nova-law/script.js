(function () {
  var body = document.body;
  var header = document.getElementById("site-header");
  var logoWrap = document.getElementById("hero-logo-wrap");
  var root = document.documentElement;

  /* Top strip height (px) – logo must stay below this. */
  var topStripBottomPx = 2.5 * 16;

  /* Transition: starts after first page, runs over a long scroll range for smoothness. */
  var scrollTransitionStart = 240;
  var scrollTransitionEnd = 720;
  var transitionRange = scrollTransitionEnd - scrollTransitionStart;

  /* Final logo size in nav: 18rem. */
  var navLogoWidthPx = 18 * 16;
  var heroLogoWidthPx = 0;
  var heroLogoHeightPx = 0;
  var endScale = 0.4;

  function setLogoVars(y) {
    if (!logoWrap) return;

    if (heroLogoWidthPx <= 0 && y < 20) {
      var svg = logoWrap.querySelector(".hero-logo-svg");
      if (svg) {
        var rect = svg.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          heroLogoWidthPx = rect.width;
          heroLogoHeightPx = rect.height;
          var headerHeightPx = Math.max(header.offsetHeight, 56);
          var scaleByWidth = navLogoWidthPx / heroLogoWidthPx;
          var scaleByHeight = (headerHeightPx * 0.86) / heroLogoHeightPx;
          endScale = Math.min(1, scaleByWidth, scaleByHeight);
        }
      }
    }

    var progress = 0;
    if (y >= scrollTransitionEnd) {
      progress = 1;
    } else if (y > scrollTransitionStart) {
      progress = (y - scrollTransitionStart) / transitionRange;
      progress = 1 - Math.pow(1 - progress, 2.5);
    }

    var startY = window.innerHeight * 0.5;
    var headerRect = header.getBoundingClientRect();
    var endY = headerRect.top + header.offsetHeight * 0.5;
    var scale = 1 - (1 - endScale) * progress;
    var centerY = startY + (endY - startY) * progress;

    var scaledHeight = heroLogoHeightPx > 0 ? heroLogoHeightPx * scale : 40;
    var minCenterY = topStripBottomPx + scaledHeight * 0.5;
    if (centerY < minCenterY) centerY = minCenterY;

    root.style.setProperty("--logo-y", progress <= 0 ? "50%" : centerY + "px");
    root.style.setProperty("--logo-scale", String(scale));
  }

  function updateScroll() {
    var y = window.scrollY;
    body.classList.toggle("hero-scrolled", y >= scrollTransitionEnd);
    setLogoVars(y);
  }

  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", function () {
    if (window.scrollY < 20) {
      heroLogoWidthPx = 0;
      heroLogoHeightPx = 0;
    }
    updateScroll();
  });

  updateScroll();
  setTimeout(updateScroll, 50);
  setTimeout(updateScroll, 200);

  var btn = document.getElementById("nav-toggle-btn");
  var overlay = document.getElementById("nav-overlay");
  if (btn && overlay) {
    function open() {
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
      overlay.classList.add("nav-open");
      body.classList.add("nav-open");
    }
    function close() {
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
      overlay.classList.remove("nav-open");
      body.classList.remove("nav-open");
    }
    btn.addEventListener("click", function () {
      overlay.classList.contains("nav-open") ? close() : open();
    });
    overlay.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  var link = document.getElementById("hero-logo-link");
  var svg = document.getElementById("hero-logo-svg");
  if (link && svg) {
    var strokeTexts = svg.querySelectorAll(".hero-logo-stroke");
    link.addEventListener("mouseenter", function () {
      strokeTexts.forEach(function (el) { el.classList.add("stroke-draw"); });
    });
    link.addEventListener("mouseleave", function () {
      strokeTexts.forEach(function (el) { el.classList.remove("stroke-draw"); });
    });
  }
})();
