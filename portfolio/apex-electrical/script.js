(function () {
  // Header: transparent until 50px scroll, then solid
  var header = document.getElementById("site-header");
  if (header) {
    var scrollThreshold = 50;
    function updateHeader() {
      if (window.scrollY >= scrollThreshold) {
        header.classList.add("header-solid");
      } else {
        header.classList.remove("header-solid");
      }
    }
    window.addEventListener("scroll", function () {
      updateHeader();
    }, { passive: true });
    updateHeader();
  }

  // Mobile menu: hamburger toggle
  var btn = document.getElementById("nav-toggle-btn");
  var nav = document.getElementById("nav-main");
  if (btn && nav) {
    function open() {
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
      nav.classList.add("nav-open");
      document.body.classList.add("nav-open");
    }
    function close() {
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
      nav.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
    }
    btn.addEventListener("click", function () {
      nav.classList.contains("nav-open") ? close() : open();
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }
})();
