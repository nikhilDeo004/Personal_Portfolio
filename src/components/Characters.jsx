// Ink-style characters for the footer scene.
const INK = '#111';
const PAPER = '#fff';
const SKIN = '#b5764c';
const SKIN_DARK = '#a86a43';
const KURTA = '#e5452c';
const KURTA_DARK = '#b9321d';
const VESPA = '#d42a2f';
const VESPA_DARK = '#a81f24';

// deterministic pseudo-random
export function rng(seed) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/* ── Nikhil: orange kurta, arms crossed, big smile (feet at 0,0) ── */
export function Nikhil({ idPrefix = 'n' }) {
  const torso = 'M-26 -96 Q-22 -103 0 -104 Q22 -103 26 -96 L28 -66 L25 -36 Q0 -31 -25 -36 L-28 -66 Z';
  const st = { stroke: INK, strokeWidth: 1.6, strokeLinejoin: 'round' };
  return (
    <g>
      <defs>
        <clipPath id={`${idPrefix}-kurta`}><path d={torso} /></clipPath>
      </defs>
      {/* legs: jeans + white sneakers */}
      <rect x="-13" y="-42" width="10" height="38" rx="3" fill="#3d5a8a" {...st} />
      <rect x="3" y="-42" width="10" height="38" rx="3" fill="#3d5a8a" {...st} />
      <rect x="-17" y="-7" width="15" height="7" rx="3" fill={PAPER} {...st} />
      <rect x="2" y="-7" width="15" height="7" rx="3" fill={PAPER} {...st} />
      {/* kurta */}
      <path d={torso} fill={KURTA} />
      <g clipPath={`url(#${idPrefix}-kurta)`} stroke={KURTA_DARK} strokeWidth="1" opacity="0.55">
        {[-24, -18, -12, -6, 6, 12, 18, 24].map((x) => <line key={x} x1={x} y1="-104" x2={x} y2="-30" />)}
      </g>
      <path d={torso} fill="none" {...st} />
      <path d="M-7 -102 Q0 -98 7 -102 L7 -106 Q0 -102 -7 -106 Z" fill={KURTA_DARK} {...st} strokeWidth="1" />
      <line x1="0" y1="-100" x2="0" y2="-80" stroke={KURTA_DARK} strokeWidth="1.5" />
      {[-96, -90, -84].map((y) => <circle key={y} cx="2.5" cy={y} r="1.2" fill="#f3ecd2" />)}
      {/* rolled sleeves */}
      <rect x="-31" y="-75" width="10" height="10" rx="3" fill="#c23620" {...st} strokeWidth="1.2" />
      <rect x="21" y="-75" width="10" height="10" rx="3" fill="#c23620" {...st} strokeWidth="1.2" />
      {/* crossed forearms (outlined) */}
      <line x1="25" y1="-68" x2="-13" y2="-79" stroke={INK} strokeWidth="11.5" strokeLinecap="round" />
      <line x1="25" y1="-68" x2="-13" y2="-79" stroke={SKIN_DARK} strokeWidth="8.5" strokeLinecap="round" />
      <line x1="-25" y1="-68" x2="13" y2="-80" stroke={INK} strokeWidth="11.5" strokeLinecap="round" />
      <line x1="-25" y1="-68" x2="13" y2="-80" stroke={SKIN} strokeWidth="8.5" strokeLinecap="round" />
      <g transform="rotate(-17 -7 -73.5)">
        <rect x="-11" y="-79" width="8" height="11" rx="2" fill={INK} />
        <circle cx="-7" cy="-73.5" r="2.6" fill="#3a3f4a" />
      </g>
      {/* neck + head */}
      <rect x="-5" y="-113" width="10" height="11" fill={SKIN_DARK} {...st} strokeWidth="1.2" />
      <circle cx="-18" cy="-127" r="4" fill={SKIN} {...st} strokeWidth="1.2" />
      <circle cx="18" cy="-127" r="4" fill={SKIN} {...st} strokeWidth="1.2" />
      <circle cx="0" cy="-128" r="18" fill={SKIN} {...st} />
      {/* hair: neat short cut — short black sides, tidy top combed up */}
      <path d="M-17.8 -130 Q-18.2 -137 -15.6 -141 L-13.2 -139.5 Q-15.4 -136 -15.9 -130 Z" fill={INK} />
      <path d="M17.8 -130 Q18.2 -137 15.6 -141 L13.2 -139.5 Q15.4 -136 15.9 -130 Z" fill={INK} />
      <path d="M-15.5 -140 Q-17 -151.5 -5 -154.5 Q7 -157.5 15.5 -151.5 Q19 -146.5 16.5 -139.5 Q13 -143.5 7 -144.5 Q0 -145.5 -6 -143.5 Q-11 -142.5 -15.5 -140 Z" fill={INK} />
      <path d="M4 -153.8 Q11 -158.4 16.6 -152.4 Q13 -153 8.5 -152.4 Z" fill={INK} />
      {/* face */}
      <path d="M-12 -135 Q-8 -138 -4 -135" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M4 -135 Q8 -138 12 -135" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M-11 -129 Q-8 -132 -5 -129" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M5 -129 Q8 -132 11 -129" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M0 -128 Q3 -123 -1 -122" stroke="#7a4529" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M-18 -126 Q-17 -109 0 -107 Q17 -109 18 -126 Q15 -115 9 -114 Q0 -112 -9 -114 Q-15 -115 -18 -126 Z" fill={INK} opacity="0.92" />
      <path d="M-8 -120.5 Q0 -124 8 -120.5 Q0 -118.5 -8 -120.5 Z" fill={INK} />
      <path d="M-8 -119.5 Q0 -109 8 -119.5 Z" fill={PAPER} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    </g>
  );
}

/* ── Red Vespa, facing left (wheels on 0) ── */
export function Vespa() {
  const st = { stroke: INK, strokeWidth: 1.6, strokeLinejoin: 'round' };
  return (
    <g>
      {[22, 94].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="-12" r="12" fill={INK} />
          <circle cx={cx} cy="-12" r="5" fill="#9a9a96" stroke={INK} strokeWidth="1" />
        </g>
      ))}
      <path d="M6 -14 Q8 -35 23 -35 Q38 -34 39 -16 Z" fill={VESPA} {...st} />
      <rect x="38" y="-25" width="34" height="8" rx="2" fill="#2a2a2a" {...st} strokeWidth="1.2" />
      <path d="M26 -20 Q18 -60 22 -84 Q26 -92 33 -88 Q36 -60 50 -22 Z" fill={VESPA} {...st} />
      <path d="M38 -21 Q30 -60 31 -88 Q33 -89 33 -88 Q36 -60 50 -22 Z" fill={VESPA_DARK} opacity="0.6" />
      <path d="M62 -18 Q58 -57 87 -61 Q115 -59 115 -32 Q115 -18 104 -16 Z" fill={VESPA} {...st} />
      <path d="M66 -22 Q100 -18 114 -28 Q115 -18 104 -16 L63 -18 Z" fill={VESPA_DARK} opacity="0.7" />
      <path d="M73 -50 Q84 -57 99 -55" stroke="#fff" strokeWidth="3" fill="none" opacity="0.45" strokeLinecap="round" />
      <rect x="111" y="-46" width="5" height="7" rx="2" fill="#ff9a3c" stroke={INK} strokeWidth="1" />
      <rect x="66" y="-68" width="46" height="9" rx="4.5" fill="#1b1b1b" />
      <line x1="28" y1="-88" x2="26" y2="-99" stroke={INK} strokeWidth="7" />
      <line x1="28" y1="-88" x2="26" y2="-99" stroke={VESPA} strokeWidth="4.5" />
      <ellipse cx="25" cy="-101" rx="15" ry="7" fill={VESPA} {...st} />
      <path d="M14 -104 Q25 -109 37 -104" stroke="#fff" strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round" />
      <line x1="4" y1="-103" x2="12" y2="-102" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <line x1="38" y1="-102" x2="47" y2="-104" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <circle cx="12" cy="-100" r="16" fill="#ffd84a" opacity="0.35" className="headlight" />
      <circle cx="12" cy="-100" r="6" fill="#fffbe8" stroke={INK} strokeWidth="1.5" />
      <line x1="40" y1="-104" x2="44" y2="-117" stroke={INK} strokeWidth="1.5" />
      <ellipse cx="45" cy="-119" rx="4" ry="3" fill="#cfcfca" stroke={INK} strokeWidth="1.2" />
    </g>
  );
}

/* ── Crowd person (bust, ink line art). Origin = bottom-centre; head at ~-118 ── */
export function Person({ seed }) {
  const r = rng(seed);
  const outfit = Math.floor(r() * 5);
  const hair = Math.floor(r() * 8);
  const glasses = r() < 0.32;
  const beard = r() < 0.28 && hair !== 2 && hair !== 3;
  const mouth = Math.floor(r() * 3);
  const hatch = r() < 0.45;
  const wave = r() < 0.12;
  const phone = !wave && r() < 0.12;
  const w = 30 + r() * 8;
  const st = { stroke: INK, strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round' };

  const body = `M${-w} 60 L${-w} -66 Q${-w} -94 -10 -97 L10 -97 Q${w} -94 ${w} -66 L${w} 60 Z`;
  const dark = outfit === 4 || (outfit === 0 && r() < 0.4);

  return (
    <g>
      {/* long hair behind shoulders */}
      {hair === 2 && <path d="M-19 -128 Q-24 -92 -18 -80 L18 -80 Q24 -92 19 -128 Z" fill={INK} />}
      {/* raised waving arm (behind body) */}
      {wave && (
        <g className="wave-arm">
          <path d={`M${w - 6} -70 L${w + 10} -128`} {...st} strokeWidth="13" />
          <path d={`M${w - 6} -70 L${w + 10} -128`} stroke={PAPER} strokeWidth="9" strokeLinecap="round" />
          <circle cx={w + 11} cy={-133} r="7" fill={PAPER} {...st} />
        </g>
      )}
      <path d={body} fill={dark ? INK : PAPER} {...st} />
      {hatch && !dark && (
        <g stroke={INK} strokeWidth="1" opacity="0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={-w + 4 + i * 5} y1={-40 + i * 2} x2={-w + 14 + i * 5} y2={-60 + i * 2} />
          ))}
        </g>
      )}
      {/* outfit details */}
      {outfit === 0 && <path d="M-10 -96 Q0 -86 10 -96" fill="none" stroke={dark ? PAPER : INK} strokeWidth="2" />}
      {outfit === 1 && (
        <g {...st} fill={PAPER}>
          <path d="M-10 -97 L0 -84 L-14 -86 Z" />
          <path d="M10 -97 L0 -84 L14 -86 Z" />
          <line x1="0" y1="-84" x2="0" y2="40" strokeWidth="1.4" />
          {[-70, -54, -38].map((y) => <circle key={y} cx="0" cy={y} r="1.4" fill={INK} stroke="none" />)}
        </g>
      )}
      {outfit === 2 && (
        <g {...st} fill="none">
          <path d="M-16 -96 Q0 -80 16 -96" />
          <line x1="-5" y1="-88" x2="-6" y2="-66" strokeWidth="1.5" />
          <line x1="5" y1="-88" x2="6" y2="-66" strokeWidth="1.5" />
          <rect x={-w + 10} y="-30" width={2 * w - 20} height="22" rx="6" strokeWidth="1.5" />
        </g>
      )}
      {outfit === 3 && (
        <g {...st} fill="none">
          <path d="M-6 -97 L-6 -102 Q0 -100 6 -102 L6 -97" strokeWidth="1.5" />
          <line x1="0" y1="-97" x2="0" y2="-62" strokeWidth="1.5" />
          {[-90, -80, -70].map((y) => <circle key={y} cx="2.5" cy={y} r="1.3" fill={INK} stroke="none" />)}
        </g>
      )}
      {outfit === 4 && (
        <g fill="none" stroke={PAPER} strokeWidth="1.6">
          <path d="M-10 -96 L-3 -50" />
          <path d="M10 -96 L3 -50" />
          <path d="M-9 -95 Q0 -88 9 -95" />
        </g>
      )}
      {/* phone in hand */}
      {phone && (
        <g>
          <rect x="-8" y="-58" width="16" height="24" rx="3" fill={INK} />
          <rect x="-6" y="-56" width="12" height="18" rx="2" fill="#dcdcd6" />
          <circle cx="-10" cy="-40" r="6" fill={PAPER} {...st} />
          <circle cx="10" cy="-40" r="6" fill={PAPER} {...st} />
        </g>
      )}
      {/* neck + head */}
      <rect x="-6" y="-104" width="12" height="10" fill={PAPER} {...st} />
      <circle cx="0" cy="-118" r="17" fill={PAPER} {...st} />
      <path d="M-17 -118 Q-21 -116 -17 -111" fill="none" {...st} strokeWidth="1.5" />
      <path d="M17 -118 Q21 -116 17 -111" fill="none" {...st} strokeWidth="1.5" />
      {/* hair styles */}
      {hair === 0 && <path d="M-17 -121 Q-17 -138 0 -138 Q17 -138 17 -121 Q12 -130 0 -130 Q-12 -130 -17 -121Z" fill={INK} />}
      {hair === 1 && <path d="M-17 -120 L-14 -136 L-8 -132 L-3 -140 L3 -133 L9 -140 L12 -132 L17 -134 L17 -120 Q8 -128 -2 -127 Q-12 -127 -17 -120Z" fill={INK} />}
      {hair === 2 && <path d="M-18 -112 Q-22 -140 0 -139 Q22 -140 18 -112 Q14 -128 4 -130 Q-6 -126 -10 -130 Q-16 -126 -18 -112Z" fill={INK} />}
      {hair === 3 && (
        <g fill={INK}>
          <circle cx="0" cy="-141" r="8" />
          <path d="M-17 -118 Q-18 -137 0 -137 Q18 -137 17 -118 Q12 -129 0 -129 Q-12 -129 -17 -118Z" />
        </g>
      )}
      {hair === 4 && (
        <g fill={INK}>
          {[[-13, -128], [-6, -135], [3, -136], [11, -131], [16, -123], [-16, -121]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="7" />
          ))}
        </g>
      )}
      {hair === 5 && (
        <g>
          <path d="M-17 -121 Q-16 -138 0 -138 Q16 -138 17 -121 Z" fill={INK} />
          <path d="M8 -124 L30 -122 Q30 -118 17 -119" fill={INK} />
        </g>
      )}
      {hair === 6 && <path d="M-17 -118 Q-19 -134 -6 -137 Q8 -140 15 -131 Q4 -133 -2 -127 Q-10 -125 -17 -118Z" fill={INK} />}
      {hair === 7 && <path d="M-17 -116 Q-20 -128 -15 -130 M15 -130 Q20 -128 17 -116" fill="none" stroke={INK} strokeWidth="4" />}
      {/* face */}
      <circle cx="-6" cy="-117" r="1.8" fill={INK} />
      <circle cx="6" cy="-117" r="1.8" fill={INK} />
      {glasses && (
        <g fill="none" stroke={INK} strokeWidth="1.6">
          <circle cx="-6.5" cy="-117" r="5" />
          <circle cx="6.5" cy="-117" r="5" />
          <line x1="-1.5" y1="-117" x2="1.5" y2="-117" />
        </g>
      )}
      <path d="M0 -115 Q2 -111 -1 -110" fill="none" stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
      {beard && <path d="M-16 -114 Q-14 -100 0 -99 Q14 -100 16 -114 Q12 -105 0 -105 Q-12 -105 -16 -114Z" fill={INK} />}
      {mouth === 0 && <path d="M-5 -107 Q0 -103 5 -107" fill="none" stroke={beard ? PAPER : INK} strokeWidth="1.6" strokeLinecap="round" />}
      {mouth === 1 && <path d="M-5 -108 Q0 -101 5 -108 Z" fill={beard ? PAPER : INK} />}
      {mouth === 2 && <path d="M-4 -106 L4 -106" stroke={beard ? PAPER : INK} strokeWidth="1.6" strokeLinecap="round" />}
    </g>
  );
}
