(function(){
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal on scroll
  const targets = document.querySelectorAll(".reveal");
  if (!prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (e.isIntersecting){
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold:0.12 });

    targets.forEach(t=>io.observe(t));
  } else {
    targets.forEach(t=>t.classList.add("is-in"));
  }

  // Smooth scroll for any in-page anchors (if you add # links later)
  document.addEventListener("click",(e)=>{
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const sel = a.getAttribute("href");
    if (!sel || sel === "#") return;

    const el = document.querySelector(sel);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start"
    });
  });
})();
