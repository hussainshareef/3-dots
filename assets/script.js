// theme handling and nav
(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", theme);

  function setButtonLabel() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const isDark = root.getAttribute("data-theme") === "dark";
    btn.innerHTML = isDark ? "Light mode <span>☀️</span>" : "Dark mode <span>🌙</span>";
  }

  document.addEventListener("DOMContentLoaded", () => {
    setButtonLabel();

    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        setButtonLabel();
      });
    }

    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-open");
      });
    }

    // active nav link based on path
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (
        (path === "" && href.endsWith("index.html")) ||
        path === href ||
        (path === "index.html" && href === "index.html")
      ) {
        a.style.color = "var(--text)";
        a.style.fontWeight = "600";
      }
    });

    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  });
})();
