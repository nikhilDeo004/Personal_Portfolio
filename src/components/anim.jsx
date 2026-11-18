import { useEffect, useRef, useState } from 'react';

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* Fires once when the element scrolls into view */
export function useInView(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return setInView(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

/*
  SplitText — words (or letters) rise up from behind a mask when scrolled into view.
  Use "\n" in text for a line break.  by="char" also lets each letter lift on hover.
*/
export function SplitText({ text, as: Tag = 'span', by = 'word', className = '', delay = 0, stagger, onLoad = false, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!onLoad) return;
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, [onLoad]);
  const active = onLoad ? loaded : inView;
  const step = stagger ?? (by === 'char' ? 28 : 70);
  const count = by === 'char' ? text.replace(/\s/g, '').length : text.split(/\s+/).length;
  // after the entrance finishes, drop the stagger delays so hover effects react instantly
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setSettled(true), delay + count * step + 950);
    return () => clearTimeout(t);
  }, [active]);
  const d = (n) => (settled ? undefined : { transitionDelay: `${delay + n * step}ms` });
  let i = 0;

  return (
    <Tag ref={ref} className={`split ${by === 'char' ? 'split-chars' : ''} ${active ? 'is-in' : ''} ${className}`} aria-label={text.replace(/\n/g, ' ')} {...rest}>
      {text.split('\n').map((line, li, lines) => (
        <span key={li} aria-hidden="true">
          {line.split(' ').map((word, wi, words) => (
            <span key={wi}>
              <span className="w">
                {by === 'char' ? (
                  [...word].map((ch, ci) => (
                    <span key={ci} className="wi ch" style={d(i++)}>{ch}</span>
                  ))
                ) : (
                  <span className="wi" style={d(i++)}>{word}</span>
                )}
              </span>
              {wi < words.length - 1 ? ' ' : ''}
            </span>
          ))}
          {li < lines.length - 1 && <br />}
        </span>
      ))}
    </Tag>
  );
}

/* Scramble — text "decodes" from random glyphs when it scrolls into view (and on hover) */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#01';
export function Scramble({ text, as: Tag = 'span', className = '', hover = false, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.6 });
  const [out, setOut] = useState(text);
  const raf = useRef(0);

  const run = () => {
    if (reduced()) return setOut(text);
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const dur = 650;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const done = Math.floor(p * text.length);
      let s = '';
      for (let k = 0; k < text.length; k++) {
        if (k < done || text[k] === ' ') s += text[k];
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (inView) run();
    return () => cancelAnimationFrame(raf.current);
  }, [inView, text]);

  return (
    <Tag ref={ref} className={`scramble ${className}`} aria-label={text} onMouseEnter={hover ? run : undefined} {...rest}>
      <span aria-hidden="true">{inView ? out : text.replace(/\S/g, ' ')}</span>
    </Tag>
  );
}

/* RollText — on hover of the parent link/button the label rolls up and a copy rolls in */
export function RollText({ children }) {
  return (
    <span className="roll">
      <span className="roll-inner" data-text={children}>{children}</span>
    </span>
  );
}

/* CountUp — animates the first number inside a string, e.g. "CGPA 8.31 (A+)" */
export function CountUp({ value, duration = 1200, className = '' }) {
  const m = String(value).match(/(\d+(?:\.\d+)?)/);
  const [ref, inView] = useInView({ threshold: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!m || !inView) return;
    const target = parseFloat(m[1]);
    if (reduced()) return setN(target);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  if (!m) return <span className={className}>{value}</span>;
  const decimals = (m[1].split('.')[1] || '').length;
  const [before, after] = String(value).split(m[1]);
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">{before}{n.toFixed(decimals)}{after}</span>
    </span>
  );
}

/* Thin progress line at the very top of the page */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}

/* Infinite scrolling strip of words; alternates solid and outlined text, pauses on hover */
export function Marquee({ items, speed = 45 }) {
  const row = items.map((t, i) => (
    <span key={i} className={`mq-item ${i % 2 ? 'outline' : ''}`}>
      {t}<span className="mq-star" aria-hidden="true">✦</span>
    </span>
  ));
  return (
    <div className="marquee" aria-label={items.join(', ')}>
      <div className="mq-track" style={{ animationDuration: `${speed}s` }} aria-hidden="true">
        {row}{row}
      </div>
    </div>
  );
}
