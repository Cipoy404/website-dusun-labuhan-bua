(function () {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.14 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  const counters = document.querySelectorAll('[data-counter]');
  const cio = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target,
          target = Number(el.dataset.counter);
        if (!Number.isFinite(target) || target <= 0) {
          el.textContent = '—';
          return;
        }
        const start = performance.now(),
          dur = 1200;
        requestAnimationFrame(function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('id-ID');
          if (p < 1) requestAnimationFrame(tick);
        });
        cio.unobserve(el);
      }),
    { threshold: 0.5 }
  );
  counters.forEach((el) => cio.observe(el));
  if (
    window.gsap &&
    window.ScrollTrigger &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.hero', {
      backgroundPosition: 'center 58%',
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }
})();
