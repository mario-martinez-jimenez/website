"use strict";

(function () {
  var button = document.querySelector(".theme-toggle");
  if (!button) return;

  var key = "site-theme-mode";
  var modes = ["auto", "light", "dark"];

  function applyMode(mode, save) {
    var root = document.documentElement;
    root.setAttribute("data-theme-mode", mode);
    if (mode === "light" || mode === "dark") {
      root.setAttribute("data-theme", mode);
    } else {
      root.removeAttribute("data-theme");
    }

    button.setAttribute("data-mode", mode);
    var label = "Theme: " + mode.charAt(0).toUpperCase() + mode.slice(1);
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);

    if (save) {
      try {
        localStorage.setItem(key, mode);
      } catch (e) {
        // Ignore write failures (e.g., private mode).
      }
    }
  }

  var initial = "auto";
  try {
    initial = localStorage.getItem(key) || "auto";
  } catch (e) {
    initial = "auto";
  }

  if (modes.indexOf(initial) === -1) {
    initial = "auto";
  }
  applyMode(initial, false);

  button.addEventListener("click", function () {
    var current = button.getAttribute("data-mode") || "auto";
    var next = modes[(modes.indexOf(current) + 1) % modes.length];
    applyMode(next, true);
  });
})();
