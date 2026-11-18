import { useEffect, useRef, useState } from 'react';
import { useInView } from './anim.jsx';
import { InstagramIcon } from './Projects.jsx';

/*
  WaveTimeline — nodes sit on a smooth wave that alternates high / low.
  Items run oldest → newest, left to right. The line draws itself in on scroll and a
  solid white marker glides along the wave to the newest (last) item.
  On narrow screens it becomes a simple vertical timeline.
  item: { tag?, period?, title, org?, sub?, detail?, onMore? }
*/
const HIGH = 26;
const LOW = 96;
const NODE_INSET = 18; // node distance from each column's left edge

export default function WaveTimeline({ items }) {
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(1200);
  const [ref, inView] = useInView({ threshold: 0.25 });
  const mainRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = items.length;
  const gap = 28;
  const colW = (width - gap * (n - 1)) / n;
  const pts = items.map((_, i) => ({ x: i * (colW + gap) + NODE_INSET, y: i % 2 === 0 ? HIGH : LOW }));

  // smooth curve through the nodes, plus a short tail on each end
  let d = `M${Math.max(0, pts[0].x - 40)} ${pts[0].y}`;
  d += ` L${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < n; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const mx = (a.x + b.x) / 2;
    d += ` C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
  }
  const dMain = d; // path from the first node to the newest node (the marker's route)
  const last = pts[n - 1];
  d += ` C${last.x + colW * 0.35} ${last.y} ${last.x + colW * 0.35} ${last.y === HIGH ? LOW * 0.6 : HIGH} ${Math.min(width, last.x + colW * 0.7)} ${last.y === HIGH ? LOW * 0.6 : HIGH}`;

  // marker: glide along the wave from the first node to the newest one
  useEffect(() => {
    const path = mainRef.current;
    const m = markerRef.current;
    if (!path || !m) return;
    const len = path.getTotalLength();
    const place = (t) => {
      const pt = path.getPointAtLength(len * t);
      m.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
    };
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!inView) return place(0);
    if (reduced) return place(1);
    const start = performance.now() + 250;
    const dur = 1100;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - start) / dur));
      place(1 - Math.pow(1 - p, 3)); // ease-out: quick, then settles
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, width, n]);

  return (
    <div ref={ref} className={`wave ${inView ? 'is-in' : ''}`}>
      <div ref={wrapRef} className="wave-inner" style={{ '--cols': n }}>
        <svg className="wave-line" width={width} height={LOW + 30} viewBox={`0 0 ${width} ${LOW + 30}`} aria-hidden="true">
          <path d={d} pathLength="1" className="wave-path" />
          <path ref={mainRef} d={dMain} fill="none" stroke="none" />
          {pts.map((p, i) => (
            <g key={i} className="wave-node" style={{ '--d': `${150 + i * 160}ms` }}>
              <circle cx={p.x} cy={p.y} r="11" className="ring" />
              <circle cx={p.x} cy={p.y} r="3.5" className="dot" />
            </g>
          ))}
          <g ref={markerRef} className="wave-marker" transform={`translate(${pts[0].x} ${pts[0].y})`}>
            <circle r="13" className="m-ring" />
            <circle r="3.5" className="m-dot" />
          </g>
        </svg>

        <ol className="wave-items">
          {items.map((it, i) => (
            <li key={it.title} className={`wave-item ${i % 2 === 0 ? 'hi' : 'lo'}`} style={{ '--d': `${400 + i * 180}ms` }}>
              <span className="mobile-node" aria-hidden="true" />
              {it.tag && <span className={`t-tag ${i === n - 1 ? 'solid' : ''}`}>{it.tag}</span>}
              {it.period && <p className="t-period">{it.period}</p>}
              <h3>{it.title}</h3>
              {it.org && <p className="t-org">{it.org}</p>}
              {it.sub && <p className="t-sub">{it.sub}</p>}
              {it.detail && <p className="t-detail">{it.detail}</p>}
              {it.links && (
                <div className="t-links">
                  {it.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="t-link">
                      <InstagramIcon size={12} /> {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
              {it.onMore && (
                <button className="t-more u-link" onClick={it.onMore}>
                  View details ↗
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
