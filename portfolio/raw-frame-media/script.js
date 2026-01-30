(function () {
  var body = document.body;
  var nav = document.getElementById("nav-main");
  var toggle = document.getElementById("nav-toggle");
  var gallery = document.getElementById("horizontal-gallery");

  /* Mobile nav */
  if (toggle && nav) {
    function open() {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      nav.classList.add("nav-open");
      body.classList.add("nav-open");
    }
    function close() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      nav.classList.remove("nav-open");
      body.classList.remove("nav-open");
    }
    toggle.addEventListener("click", function () {
      nav.classList.contains("nav-open") ? close() : open();
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* Horizontal gallery: drag to scroll (desktop) + prev/next buttons */
  if (gallery) {
    var track = gallery.querySelector(".horizontal-gallery-track");
    var prevBtn = document.getElementById("gallery-prev");
    var nextBtn = document.getElementById("gallery-next");
    var images = track ? track.querySelectorAll("img") : [];
    var count = images.length;

    function getStepWidth() {
      if (count === 0) return gallery.clientWidth;
      var first = images[0];
      var gap = 16;
      return first.offsetWidth + gap;
    }

    function updateButtons() {
      var scrollLeft = gallery.scrollLeft;
      var maxScroll = gallery.scrollWidth - gallery.clientWidth;
      if (prevBtn) {
        prevBtn.disabled = scrollLeft <= 2;
      }
      if (nextBtn) {
        nextBtn.disabled = maxScroll <= 2 || scrollLeft >= maxScroll - 2;
      }
    }

    if (track) {
      var isDown = false;
      var startX;
      var scrollLeftStart;

      gallery.addEventListener("mousedown", function (e) {
        if (e.target.closest("button") || e.target.closest("a")) return;
        isDown = true;
        gallery.style.cursor = "grabbing";
        gallery.style.userSelect = "none";
        startX = e.pageX - gallery.offsetLeft;
        scrollLeftStart = gallery.scrollLeft;
      });

      gallery.addEventListener("mouseleave", function () {
        isDown = false;
        gallery.style.cursor = "grab";
        gallery.style.userSelect = "";
      });

      gallery.addEventListener("mouseup", function () {
        isDown = false;
        gallery.style.cursor = "grab";
        gallery.style.userSelect = "";
      });

      gallery.addEventListener("mousemove", function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - gallery.offsetLeft;
        var walk = (x - startX) * 1.2;
        gallery.scrollLeft = scrollLeftStart - walk;
      });

      gallery.addEventListener("scroll", updateButtons);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        var stepWidth = getStepWidth();
        gallery.scrollLeft = Math.max(0, gallery.scrollLeft - stepWidth);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        var stepWidth = getStepWidth();
        var maxScroll = gallery.scrollWidth - gallery.clientWidth;
        gallery.scrollLeft = Math.min(maxScroll, gallery.scrollLeft + stepWidth);
      });
    }

    updateButtons();
  }
})();
