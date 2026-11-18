import { rng } from './Characters.jsx';

/*
  Walker — a side-view (profile) ink character, drawn FACING RIGHT with the feet at (0,0).
  Flip it with scale(-1,1) to walk left: the face, nose and body always point the way
  the person is walking.  The legs, arms and body bob are animated with CSS
  (see .walker rules in index.css); --dur sets the step speed.
*/
const INK = '#111';
const PAPER = '#fff';
const GREY = '#8a8a86';

const HIP_Y = -60;
const SHOULDER = { x: 1, y: -102 };

function Leg({ cls, pants, dress, shoe }) {
  // pivot at the hip; drawn straight down, rotated by CSS
  return (
    <g transform={`translate(0 ${HIP_Y})`}>
      <g className={`w-limb ${cls}`}>
        <line x1="0" y1="0" x2="0" y2="54" stroke={INK} strokeWidth="11.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="0" y2="54" stroke={dress ? PAPER : pants} strokeWidth="8.5" strokeLinecap="round" />
        <path d="M-5 54 Q-5 49 1 49 L8 50 Q14 52 13 58 L-5 58 Z" fill={shoe} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      </g>
    </g>
  );
}

function Arm({ cls, sleeve, phone }) {
  if (phone) {
    // bent arm holding a phone up in front
    return (
      <g transform={`translate(${SHOULDER.x} ${SHOULDER.y})`}>
        <path d="M0 0 L4 26 L18 18" fill="none" stroke={INK} strokeWidth="10.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M0 0 L4 26 L18 18" fill="none" stroke={sleeve} strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="16" y="6" width="7" height="13" rx="1.5" fill={INK} transform="rotate(-12 19 12)" />
        <circle cx="19" cy="18" r="4" fill={PAPER} stroke={INK} strokeWidth="1.5" />
      </g>
    );
  }
  return (
    <g transform={`translate(${SHOULDER.x} ${SHOULDER.y})`}>
      <g className={`w-limb ${cls}`}>
        <line x1="0" y1="0" x2="0" y2="38" stroke={INK} strokeWidth="10.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="0" y2="38" stroke={sleeve} strokeWidth="7.5" strokeLinecap="round" />
        <circle cx="0" cy="42" r="4.6" fill={PAPER} stroke={INK} strokeWidth="1.5" />
      </g>
    </g>
  );
}

function Hair({ type }) {
  const shortTop = 'M-13 -136 Q-12 -148 2 -148 Q14 -148 17 -138 Q10 -140 4 -138 Q-4 -137 -6 -129 Q-9 -123 -13 -121 Q-17 -130 -13 -136Z';
  switch (type) {
    case 0:
      return <path d={shortTop} fill={INK} />;
    case 1: // long hair down the back
      return <path d="M-14 -134 Q-12 -149 3 -148 Q15 -147 17 -137 Q9 -140 3 -138 Q-6 -134 -7 -120 Q-8 -104 -17 -96 Q-22 -118 -14 -134Z" fill={INK} />;
    case 2: // ponytail
      return (
        <g fill={INK}>
          <path d={shortTop} />
          <path d="M-12 -138 Q-30 -134 -26 -110 Q-21 -124 -11 -128Z" />
        </g>
      );
    case 3: // bun
      return (
        <g fill={INK}>
          <path d={shortTop} />
          <circle cx="-9" cy="-146" r="6.5" />
        </g>
      );
    case 4: // cap
      return (
        <g>
          <path d="M-13 -130 Q-16 -126 -13 -121" fill="none" stroke={INK} strokeWidth="4" />
          <path d="M-13 -138 Q-11 -151 3 -151 Q15 -150 17 -141 L29 -139 Q29 -135 26 -135 L-13 -135 Z" fill={INK} />
        </g>
      );
    case 5: // curly
      return (
        <g fill={INK}>
          {[[-11, -136], [-4, -145], [6, -147], [14, -141], [-14, -127], [-9, -122]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="6.5" />
          ))}
        </g>
      );
    case 6: // balding, grey sides
      return <path d="M-14 -131 Q-17 -124 -11 -119 Q-9 -125 -12 -131Z" fill={GREY} stroke={INK} strokeWidth="1" />;
    default: // spiky
      return <path d="M-13 -134 L-12 -146 L-6 -142 L-2 -151 L3 -144 L9 -150 L11 -142 L17 -142 Q12 -139 4 -138 Q-4 -137 -6 -129 Q-9 -123 -13 -121 Q-16 -128 -13 -134Z" fill={INK} />;
  }
}

export default function Walker({ seed }) {
  const r = rng(seed);
  const hair = Math.floor(r() * 8);
  const dress = (hair === 1 || hair === 2 || hair === 3) && r() < 0.45;
  const darkTop = r() < 0.38;
  const pantsPick = r();
  const pants = pantsPick < 0.45 ? INK : pantsPick < 0.75 ? '#5d5d5a' : '#d9d9d4';
  const shirt = darkTop ? INK : PAPER;
  const shoe = r() < 0.5 ? PAPER : INK;
  const glasses = r() < 0.3;
  const beard = !dress && hair !== 1 && r() < 0.25;
  const backpack = r() < 0.3;
  const headphones = !backpack && r() < 0.15;
  const phone = r() < 0.15;
  const hatch = !darkTop && r() < 0.4;
  const st = { stroke: INK, strokeWidth: 2, strokeLinejoin: 'round' };

  return (
    <g className="walker">
      {/* far-side limbs (behind the body) */}
      <Leg cls="leg-b" pants={pants} dress={dress} shoe={shoe} />
      <Arm cls="arm-b" sleeve={shirt} />

      {dress && <Leg cls="leg-a" pants={pants} dress={dress} shoe={shoe} />}
      <g className="w-upper">
        {backpack && <rect x="-25" y="-106" width="15" height="34" rx="5" fill={r() < 0.5 ? INK : PAPER} {...st} />}
        {/* body */}
        {dress ? (
          <path d="M-12 -108 Q0 -112 12 -106 L20 -36 Q0 -32 -18 -36 Z" fill={shirt} {...st} />
        ) : (
          <path d="M-13 -58 L-15 -99 Q-14 -111 0 -111 Q14 -111 15 -99 L13 -58 Z" fill={shirt} {...st} />
        )}
        {hatch && (
          <g stroke={INK} strokeWidth="1" opacity="0.45">
            {[0, 1, 2, 3].map((i) => <line key={i} x1={-9 + i * 5} y1={-66} x2={-3 + i * 5} y2={-80} />)}
          </g>
        )}
        {backpack && <line x1="-6" y1="-108" x2="6" y2="-86" stroke={INK} strokeWidth="2.4" />}
        {!dress && <line x1="-12" y1="-62" x2="12" y2="-62" stroke={darkTop ? PAPER : INK} strokeWidth="1.4" opacity="0.6" />}

        {/* neck + head (profile, facing right) */}
        <rect x="-3" y="-118" width="8" height="10" fill={PAPER} {...st} strokeWidth="1.6" />
        <circle cx="2" cy="-131" r="15" fill={PAPER} {...st} />
        <path d="M15.5 -136 Q23 -130 16 -126" fill={PAPER} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="-2" cy="-130" r="3.4" fill={PAPER} stroke={INK} strokeWidth="1.4" />
        <Hair type={hair} />
        <circle cx="9.5" cy="-133" r="1.8" fill={INK} />
        <path d="M6 -138 L12 -139" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        {glasses && (
          <g fill="none" stroke={INK} strokeWidth="1.5">
            <circle cx="10" cy="-133" r="4.6" />
            <line x1="5.4" y1="-133" x2="-1" y2="-131" />
          </g>
        )}
        {beard ? (
          <path d="M-3 -124 Q0 -113 13 -117 Q17 -120 16 -124 Q11 -121 5 -121 Q0 -122 -3 -127Z" fill={INK} />
        ) : (
          <path d="M11 -123 Q14 -121 16 -123" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        )}
        {headphones && (
          <g>
            <path d="M-8 -132 Q-4 -152 12 -146" fill="none" stroke={INK} strokeWidth="2.6" />
            <rect x="-7" y="-136" width="9" height="12" rx="3" fill={INK} />
          </g>
        )}
      </g>

      {/* near-side limbs (in front of the body) */}
      {!dress && <Leg cls="leg-a" pants={pants} dress={dress} shoe={shoe} />}
      <Arm cls="arm-a" sleeve={shirt} phone={phone} />
    </g>
  );
}
