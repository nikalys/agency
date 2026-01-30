// mock2: animate splash logo to hero logo position
window.addEventListener("DOMContentLoaded", () => {
  const splashLogo = document.querySelector(".splash-logo");
  const heroLogo = document.querySelector(".hero-logo");
  const splash = document.querySelector(".splash");
  
  if (!splashLogo || !heroLogo || !splash) return;
  
  // Temporarily make hero visible for accurate position calculation
  const hero = document.querySelector(".hero");
  const originalHeroOpacity = hero ? getComputedStyle(hero).opacity : "1";
  if (hero) {
    hero.style.opacity = "1";
    hero.style.transform = "none";
  }
  
  // Function to calculate and animate
  const animateLogo = () => {
    // Force layout recalculation
    void splashLogo.offsetWidth;
    void heroLogo.offsetWidth;
    
    // Get positions relative to viewport
    const splashRect = splashLogo.getBoundingClientRect();
    const heroRect = heroLogo.getBoundingClientRect();
    
    // Calculate center points
    const splashCenterX = splashRect.left + splashRect.width / 2;
    const splashCenterY = splashRect.top + splashRect.height / 2;
    const heroCenterX = heroRect.left + heroRect.width / 2;
    const heroCenterY = heroRect.top + heroRect.height / 2;
    
    // Calculate the difference in position
    const deltaX = heroCenterX - splashCenterX;
    const deltaY = heroCenterY - splashCenterY;
    
    // Get the scale factor (hero logo size / splash logo size)
    const scale = heroRect.width / splashRect.width;
    
    // Restore hero opacity for CSS animation
    if (hero) {
      hero.style.opacity = originalHeroOpacity;
      hero.style.transform = "";
    }
    
    // Set initial transform origin to center
    splashLogo.style.transformOrigin = "center center";
    
    // After 1 second, animate to hero position
    setTimeout(() => {
      // Start showing hero logo almost immediately for better crossfade
      setTimeout(() => {
        heroLogo.style.opacity = "1";
        heroLogo.style.transform = "scale(1)";
      }, 100);
      
      splashLogo.style.transition = "transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 700ms ease";
      splashLogo.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
      splashLogo.style.opacity = "0";
      
      // Hide splash container after animation completes
      setTimeout(() => {
        splash.style.opacity = "0";
        splash.style.visibility = "hidden";
        splash.style.pointerEvents = "none";
      }, 700);
    }, 1000);
  };
  
  // Wait for layout to settle, then calculate
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animateLogo();
    });
  });
  
  // Mark ready
  setTimeout(() => {
    document.body.dataset.state = "ready";
  }, 1100);
});

