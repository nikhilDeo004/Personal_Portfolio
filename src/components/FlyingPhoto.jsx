import { useEffect, useRef } from 'react';
import { profile } from '../data/profile.js';

/*
  ONE photo that travels from the opening screen into the "Hi, I'm…" section.

  - Two invisible "slots" mark where it starts (.landing-photo) and ends (.hero-photo).
  - While you scroll between them the photo stays put on screen (pinned), flips over ONCE (a half turn)
    around its vertical axis like a card, and grows into the Hero slot. The card has the
    photo on both faces, so it never ends up mirrored.
  - Once it arrives it simply scrolls with the Hero section.
*/
const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // easeInOutCubic

export default function FlyingPhoto() {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const geo = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const docRect = (node) => {
      const r = node.getBoundingClientRect();
      return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
    };

    const measure = () => {
      const a = document.querySelector('.landing-photo');
      const b = document.querySelector('.hero-photo');
      if (!a || !b) return;
      // measure without any running entrance transforms
      const A = docRect(a);
      const B = docRect(b);
      // scroll distance over which the photo stays pinned on screen
      const travel = Math.max(1, B.y - A.y);
      geo.current = { A, B, travel };
      update();
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const g = geo.current;
      if (!g) return;
      const p = clamp01(window.scrollY / g.travel);
      const e = ease(p);
      const x = lerp(g.A.x, g.B.x, e);
      const y = lerp(g.A.y, g.B.y, p); // linear in y → stays pinned while scrolling
      const w = lerp(g.A.w, g.B.w, e);
      const h = lerp(g.A.h, g.B.h, e);
      const turn = reduced ? 0 : 180 * e; // one flip: edge-on only once, halfway
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (cardRef.current) cardRef.current.style.transform = `rotateY(${turn}deg)`;
      el.classList.toggle('is-moving', p > 0 && p < 1);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    const t = setTimeout(measure, 1200); // after entrance animations settle
    return () => {
      ro.disconnect();
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div ref={ref} className="flying-photo">
      <div ref={cardRef} className="fp-card">
        <div className="fp-face fp-front">
          <img src={profile.portrait} alt={`${profile.firstName} ${profile.lastName}`} />
        </div>
        <div className="fp-face fp-back" aria-hidden="true">
          <img src={profile.portrait} alt="" />
        </div>
      </div>
    </div>
  );
}
