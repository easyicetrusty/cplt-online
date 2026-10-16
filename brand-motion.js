/* Progressive enhancement: Firefox-compatible reveals and pinned progress.
   Content is visible without JS; reduced motion has neither effect. */
(() => {
  // Make existing horizontal tables reachable without changing content or markup.
  document.querySelectorAll('.scroller').forEach(scroller => { scroller.tabIndex = 0; });
  const menus = document.querySelectorAll('.brand-menu');
  menus.forEach(menu => {
    menu.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        menu.open = false;
        menu.querySelector('summary').focus();
      }
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let dispose = () => {};
  function start() {
    dispose();
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    const targets = [...document.querySelectorAll('.card,.step,.pane,.punch,.endcta,.recorded-test')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('brand-in');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0, rootMargin: '0px 0px -24px 0px'});
    targets.forEach(element => {
      if (element.getBoundingClientRect().top >= innerHeight) {
        element.classList.add('brand-pre');
        observer.observe(element);
      }
    });
    const bar = document.createElement('div');
    bar.className = 'brand-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    let frame = 0;
    const paint = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${range > 0 ? Math.max(0, Math.min(1, scrollY / range)) : 0})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    addEventListener('scroll', schedule, {passive: true});
    addEventListener('resize', schedule);
    paint();
    dispose = () => {
      observer.disconnect();
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
      targets.forEach(element => element.classList.remove('brand-pre', 'brand-in'));
      bar.remove();
    };
  }
  reduced.addEventListener('change', start);
  // Measure below-fold blocks only after the browser has had a paint opportunity.
  // The default state is visible, so this never delays the initial content.
  requestAnimationFrame(() => requestAnimationFrame(start));
})();
