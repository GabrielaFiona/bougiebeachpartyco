// Bougie Home interactions:
// - reveal on scroll
// - smooth scroll for in-page links
// - theme click logging
// - right drawer menu toggle

(function () {
  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Reveal sections on scroll */
  const targets = document.querySelectorAll(".reveal");
  if (!prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add("is-in"));
  }

  /* Smooth scroll for anchor links like #how, #start */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const sel = a.getAttribute("href");
    if (!sel || sel === "#") return;
    const el = document.querySelector(sel);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  });

  /* Theme bubble logging (for future analytics) */
  document.querySelectorAll(".theme-bubble").forEach((b) => {
    b.addEventListener("click", () => {
      const t = b.textContent.trim() || "theme";
      console.log("Theme selected:", t);
    });
  });

  /* Right-side drawer menu */
  const body = document.body;
  const menuToggle = document.querySelector(".rm-menu-toggle");
  const drawer = document.querySelector(".rm-drawer");
  const backdrop = document.querySelector(".rm-drawer-backdrop");
  const closeBtn = document.querySelector(".rm-drawer-close");

  function openDrawer() {
    body.classList.add("rm-drawer-open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
  }
  function closeDrawer() {
    body.classList.remove("rm-drawer-open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (body.classList.contains("rm-drawer-open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }
  if (backdrop) {
    backdrop.addEventListener("click", closeDrawer);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeDrawer);
  }

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("rm-drawer-open")) {
      closeDrawer();
    }
  });
})();
