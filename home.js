// Bougie Home — reveal + smooth scroll + theme click logging
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

  // Smooth scroll for in-page anchors (#how, #start, etc.)
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

  // Theme bubble click logging (for your reference / future analytics)
  document.querySelectorAll(".theme-bubble").forEach(b=>{
    b.addEventListener("click",()=>{
      const t = b.textContent.trim() || "theme";
      console.log("Theme selected:", t);
    });
  });
})();
