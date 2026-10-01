(function () {
  "use strict";

  /* ---- Theme toggle (light/dark), persisted in localStorage ---- */
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("bal-theme", theme);
    if (toggle) {
      var isLight = theme === "light";
      toggle.setAttribute("aria-pressed", String(isLight));
      toggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    }
  }

  // Sync initial button state with whatever the inline head script already set.
  applyTheme(currentTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "light" ? "dark" : "light");
    });
  }

  /* ---- Sticky mobile CTA: show once the hero is scrolled past ---- */
  var hero = document.getElementById("hero");
  var stickyCta = document.getElementById("sticky-cta");

  if (hero && stickyCta && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          stickyCta.classList.toggle("visible", !entry.isIntersecting);
        });
      },
      { rootMargin: "-10% 0px 0px 0px" }
    );
    observer.observe(hero);
  }
})();
