(function () {
  var nav = document.getElementById("nav-main");
  var toggle = document.getElementById("nav-toggle");

  if (toggle && nav) {
    function open() {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      nav.classList.add("nav-open");
      document.body.classList.add("nav-open");
    }
    function close() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      nav.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
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

  /* Status strip – rotate message */
  var statusEl = document.getElementById("status-text");
  if (statusEl) {
    var messages = [
      "ACCEPTING PROJECTS",
      "SYSTEMS ONLINE",
      "READY FOR SIGNAL",
      "NO CORPORATE B.S."
    ];
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % messages.length;
      statusEl.textContent = messages[idx];
    }, 2500);
  }

  /* Stats strip – count-up animation */
  function animateValue(el, end, duration) {
    var start = 0;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easeOut = 1 - Math.pow(1 - progress, 2);
      var current = Math.floor(start + (end - start) * easeOut);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statNumbers = document.querySelectorAll(".stat-number[data-value]");
  if (statNumbers.length && typeof IntersectionObserver !== "undefined") {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var val = parseInt(el.getAttribute("data-value"), 10);
          if (!isNaN(val)) {
            animateValue(el, val, 1200);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px" }
    );
    statNumbers.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
