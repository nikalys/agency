// Simple utilities for the vaire* digital business plan site

function initThemeToggle() {
  const toggleTrack = document.querySelector("[data-role='theme-toggle']");
  if (!toggleTrack) return;

  const syncPressed = () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    toggleTrack.setAttribute("aria-pressed", isDark ? "true" : "false");
  };

  syncPressed();
  toggleTrack.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    window.localStorage.setItem("vaire-plan-theme", next);
    syncPressed();
  });
}

function initFontSize() {
  var controls = document.querySelectorAll("button[data-font-size]");
  if (!controls.length) return;

  function applySize(size) {
    var value = (size === "small" || size === "medium" || size === "large") ? size : "medium";
    var root = document.documentElement;
    if (!root) return;
    root.setAttribute("data-font-size", value);
    root.classList.remove("font-size-small", "font-size-medium", "font-size-large");
    root.classList.add("font-size-" + value);
    try { window.localStorage.setItem("vaire-font-size", value); } catch (e) {}
    for (var i = 0; i < controls.length; i++) {
      var btn = controls[i];
      btn.classList.toggle("is-active", btn.getAttribute("data-font-size") === value);
    }
  }

  var stored = "";
  try { stored = window.localStorage.getItem("vaire-font-size"); } catch (e) {}
  applySize(stored || "medium");

  for (var i = 0; i < controls.length; i++) {
    (function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var size = btn.getAttribute("data-font-size");
        applySize(size || "medium");
      });
    })(controls[i]);
  }
}

function initNav() {
  const current = document.documentElement.dataset.page;
  if (!current) return;
  const links = document.querySelectorAll("[data-nav]");
  links.forEach((link) => {
    if (link.dataset.nav === current) {
      link.classList.add("nav-link-active");
    } else {
      link.classList.remove("nav-link-active");
    }
  });
}

// Toggle richer visual styling vs a focus/reading mode
function initVisualMode() {
  const toggle = document.querySelector("[data-role='visual-toggle']");
  if (!toggle) return;

  const applyMode = (mode) => {
    const next = mode === "focus" ? "focus" : "rich";
    document.body.dataset.visual = next;
    window.localStorage.setItem("vaire-visual-mode", next);
    toggle.textContent = next === "focus" ? "Full visuals" : "Focus mode";
  };

  const stored = window.localStorage.getItem("vaire-visual-mode");
  applyMode(stored || "rich");

  toggle.addEventListener("click", () => {
    const current = document.body.dataset.visual || "rich";
    const next = current === "rich" ? "focus" : "rich";
    applyMode(next);
  });
}

// Accordion behaviour for elements with .accordion
function initAccordions() {
  document.addEventListener("click", (event) => {
    const header = event.target.closest(".accordion-header");
    if (!header) return;
    const section = header.closest(".accordion");
    if (!section) return;
    const isOpen = section.hasAttribute("open");
    if (isOpen) {
      section.removeAttribute("open");
      if (header.getAttribute("aria-expanded") === "true") {
        header.setAttribute("aria-expanded", "false");
      }
    } else {
      section.setAttribute("open", "");
      if (header.hasAttribute("aria-expanded")) {
        header.setAttribute("aria-expanded", "true");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initFontSize();
  initNav();
  initVisualMode();
  initAccordions();
});

