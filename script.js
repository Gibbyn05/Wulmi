(() => {
  const slots = document.querySelectorAll('[data-image]');
  slots.forEach((slot) => {
    const image = slot.querySelector('img');
    if (!image) return;
    const markLoaded = () => slot.classList.add('has-image');
    if (image.complete && image.naturalWidth) markLoaded();
    image.addEventListener('load', markLoaded);
    image.addEventListener('error', () => { image.style.display = 'none'; });
  });

  const section = document.querySelector('.sheep-demo');
  const tiredSheep = document.querySelector('.demo-sheep.tired');
  const healthySheep = document.querySelector('.demo-sheep:not(.tired)');
  let rafPending = false;

  function updateSheep() {
    rafPending = false;
    const bounds = section.getBoundingClientRect();
    const travel = Math.max(1, bounds.height - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -bounds.top / travel));
    // A quiet bell curve means the gentle transition reverses as visitors scroll back up.
    const transition = Math.sin(progress * Math.PI);
    tiredSheep.style.opacity = transition.toFixed(3);
    healthySheep.style.opacity = (1 - transition * 0.72).toFixed(3);
  }

  function onScroll() {
    if (!rafPending) { rafPending = true; requestAnimationFrame(updateSheep); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateSheep();
})();
