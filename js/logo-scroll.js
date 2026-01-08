// Logo fade in/out based on scroll direction
(function() {
  const logo = document.getElementById('sintef-logo');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateLogo() {
    const currentScrollY = window.scrollY;

    // Scrolling down - fade out
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      logo.style.opacity = '0';
      logo.style.pointerEvents = 'none';
    }
    // Scrolling up - fade in
    else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
      logo.style.opacity = '1';
      logo.style.pointerEvents = 'auto';
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateLogo);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();
