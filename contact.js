(function(){
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;
  const html = document.documentElement;

  // --- NEW: Function to send the page height to the parent window ---
  function sendHeight() {
    // Calculate the overall document height
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    // Send the height to the parent window
    window.parent.postMessage({
        frameHeight: height,
        source: 'bougieBeachPartyCoContact' // A unique identifier to verify the message
    }, '*'); // Use '*' for the target origin since we don't know RentMyCo's exact domain, but restrict it if you know it!
  }

  // Send the height immediately on load
  sendHeight();

  // Re-send the height whenever the window is resized (e.g., orientation change)
  window.addEventListener('resize', sendHeight);

  // Use a MutationObserver to watch for changes to the DOM (like content loading or reveal animations)
  // and re-send the height. This is crucial for dynamic content.
  const observer = new MutationObserver(sendHeight);
  // Start observing the document body for configured mutations
  observer.observe(document.body, { childList: true, subtree: true, attributes: true });


  // --- EXISTING LOGIC: Reveal on scroll ---
  const targets = document.querySelectorAll(".reveal");
  if (!prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (e.isIntersecting){
          e.target.classList.add("is-in");
          io.unobserve(e.target);
          // NEW: Send height after an element is revealed, just in case
          sendHeight();
        }
      });
    }, { threshold:0.12 });

    targets.forEach(t=>io.observe(t));
  } else {
    targets.forEach(t=>t.classList.add("is-in"));
  }

  // --- EXISTING LOGIC: Smooth scroll for any in-page anchors (if you add # links later) ---
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
