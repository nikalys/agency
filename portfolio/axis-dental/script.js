(function () {
  var nav = document.getElementById("nav-main");
  var toggle = document.getElementById("nav-toggle");

  if (toggle && nav) {
    function open() {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      nav.classList.add("nav-open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      nav.classList.remove("nav-open");
      document.body.style.overflow = "";
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
})();
