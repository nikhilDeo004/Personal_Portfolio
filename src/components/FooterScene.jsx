import { useEffect, useRef } from 'react';
import { Nikhil, Vespa, rng } from './Characters.jsx';
import Walker from './Walker.jsx';
import { profile } from '../data/profile.js';

/*
  Footer street scene.
  Nikhil stands straight and still in the middle, beside his parked Vespa.
  Around him, lanes of people walk past in both directions. Every walker is drawn
  in profile and faces the way they are walking (walkers going left are mirrored).
  Legs and arms swing with CSS; positions are moved here with requestAnimationFrame.
*/
const W = 1440;
const H = 470;
const MARGIN = 140;
const LOOP = W + MARGIN * 2;
const SCALE = 1.75;
const VESPA_X = 596; // left edge of the parked Vespa
const NIK_X = 806; // Nikhil's feet (Vespa stays at VESPA_X)
const GROUND = 452;

// back → front lanes. dir 1 = walking right, -1 = walking left.
// speed is matched to step length so feet don't slide (dur = seconds per stride).
const LANES = [
  { y: 336, scale: 0.98, gap: [70, 150], dir: 1, dur: 1.15, seed: 21 },
  { y: 378, scale: 1.14, gap: [86, 175], dir: -1, dur: 1.1, seed: 233 },
  { y: 424, scale: 1.32, gap: [104, 210], dir: 1, dur: 1.05, seed: 457 },
  { y: 540, scale: 1.58, gap: [300, 460], dir: -1, dur: 1.0, seed: 881 },
];
const STRIDE = 92; // px travelled per full stride at scale 1

function buildLane(l) {
  const r = rng(l.seed);
  const out = [];
  let x = r() * l.gap[0];
  while (x < LOOP) {
    const kid = r() < 0.12;
    out.push({ base: x, seed: l.seed * 31 + Math.floor(x), size: kid ? 0.78 : 0.94 + r() * 0.12, delay: -r() * l.dur });
    x += l.gap[0] + r() * (l.gap[1] - l.gap[0]);
  }
  return out;
}
const PEOPLE = LANES.map(buildLane);
const speedOf = (l) => (STRIDE * l.scale) / l.dur;
const posAt = (p, l, t) => {
  const raw = p.base + l.dir * speedOf(l) * t;
  return (((raw % LOOP) + LOOP) % LOOP) - MARGIN;
};

function Skyline() {
  const r = rng(42);
  const blocks = [];
  let x = 0;
  while (x < W) {
    const w = 70 + Math.floor(r() * 90);
    const h = 90 + Math.floor(r() * 150);
    blocks.push({ x, w, h, cols: Math.max(2, Math.floor(w / 26)), rows: Math.floor(h / 30) });
    x += w + 6 + Math.floor(r() * 20);
  }
  const base = 340;
  return (
    <g stroke="#c9c9c3" strokeWidth="1.4" fill="none">
      {blocks.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={base - b.h} width={b.w} height={b.h + 40} fill="#fbfbf8" />
          {i % 4 === 1 && <path d={`M${b.x + b.w / 2 - 10} ${base - b.h} v-14 h20 v14 M${b.x + b.w / 2} ${base - b.h - 14} v-16`} />}
          {i % 5 === 3 && <path d={`M${b.x + 8} ${base - b.h} l${b.w / 2 - 8} -26 l${b.w / 2 - 8} 26`} />}
          {Array.from({ length: b.rows }).map((_, ry) =>
            Array.from({ length: b.cols }).map((__, cx) => (
              <rect key={`${ry}-${cx}`} x={b.x + 9 + cx * ((b.w - 18) / b.cols)} y={base - b.h + 12 + ry * 28} width={Math.max(6, (b.w - 18) / b.cols - 8)} height="12" strokeWidth="1" />
            ))
          )}
        </g>
      ))}
    </g>
  );
}

export default function FooterScene() {
  const svgRef = useRef(null);
  const refs = useRef(PEOPLE.map((lane) => lane.map(() => null)));

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let running = false;
    let last = performance.now();
    let t = 0;
    const tick = (now) => {
      t += Math.min(0.05, (now - last) / 1000);
      last = now;
      LANES.forEach((l, li) => {
        PEOPLE[li].forEach((p, pi) => {
          const el = refs.current[li][pi];
          if (el) el.setAttribute('transform', `translate(${posAt(p, l, t).toFixed(1)} ${l.y})`);
        });
      });
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      const scene = svg.closest('.footer-scene');
      if (e.isIntersecting && !running) {
        running = true;
        scene?.classList.add('is-walking');
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!e.isIntersecting && running) {
        running = false;
        scene?.classList.remove('is-walking');
        cancelAnimationFrame(raf);
      }
    });
    io.observe(svg);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const renderLane = (li) => {
    const l = LANES[li];
    return PEOPLE[li].map((p, pi) => (
      <g key={`${li}-${pi}`} ref={(el) => (refs.current[li][pi] = el)} transform={`translate(${posAt(p, l, 0).toFixed(1)} ${l.y})`}>
        {/* facing: mirror walkers that go left so they look where they walk */}
        <g transform={`scale(${l.scale * p.size * l.dir} ${l.scale * p.size})`} style={{ '--dur': `${l.dur}s`, '--delay': `${p.delay.toFixed(2)}s` }}>
          <Walker seed={p.seed} />
        </g>
      </g>
    ));
  };

  return (
    <div className="footer-scene">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Ink illustration of a busy street. ${profile.firstName} stands still in the middle in an orange kurta, arms crossed, standing beside his red Vespa, while people walk past in both directions.`}
      >
        <rect width={W} height={H} fill="#f7f7f4" />
        <Skyline />
        <g className="drift" stroke="#111" strokeWidth="1.6" fill="none" strokeLinecap="round">
          {[[1500, 60], [1540, 80], [1580, 55], [2100, 100], [2140, 90], [2700, 70]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} q6 -6 12 0 q6 -6 12 0`} />
          ))}
        </g>
        <text x={W / 2} y="300" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="330" letterSpacing="-18" fill="#e6e6e1" opacity="0.92">
          {profile.firstName.toUpperCase()}
        </text>

        {/* pavement lines */}
        <g stroke="#d6d6d0" strokeWidth="1.2">
          {LANES.map((l) => <line key={l.y} x1="0" x2={W} y1={l.y + 1} y2={l.y + 1} />)}
        </g>

        {renderLane(0)}
        {renderLane(1)}
        {renderLane(2)}

        {/* Nikhil standing straight beside the parked Vespa — both stay still */}
        <g transform={`translate(${VESPA_X} ${GROUND}) scale(${SCALE})`}>
          <ellipse cx="58" cy="-1" rx="62" ry="3.5" fill="#000" opacity="0.18" />
          <Vespa />
        </g>
        <g transform={`translate(${NIK_X} ${GROUND})`}>
          <ellipse cx="0" cy="-1" rx="50" ry="5" fill="#000" opacity="0.16" />
          <g transform={`scale(${SCALE})`}>
            <g className="nik-idle">
              <Nikhil idPrefix="footer-nik" />
            </g>
          </g>
        </g>

        {renderLane(3)}

      </svg>

      <div className="footer-legal">
        <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
        <span>Made in Pune · Built with React</span>
      </div>
    </div>
  );
}
