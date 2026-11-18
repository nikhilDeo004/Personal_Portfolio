import { RollText, Scramble, SplitText } from './anim.jsx';
import { profile } from '../data/profile.js';
import Reveal from './Reveal.jsx';

export default function Hero() {
  const c = profile.current;
  return (
    <section className="hero" aria-labelledby="hi">
      <div className="container hero-grid">
        <Reveal>
          <SplitText as="h2" id="hi" className="hero-hi" text={`Hi, I'm\n${profile.firstName}.`} />
          <p className="hero-role">{profile.role}</p>
          <div className="current">
            <Scramble as="p" className="kicker" text={c.label} />
            <strong>{c.line1}</strong>
            <span className="muted">{c.line2}</span><br />
            <span className="muted">{c.line3}</span>
          </div>
        </Reveal>

        {/* invisible slot: the shared photo spins in and lands here while scrolling */}
        <div className="hero-photo photo-slot" aria-hidden="true" />

        <Reveal delay={220} className="hero-right">
          <p className="hero-intro">
            {profile.intro.map(([text, bold], i) => (bold ? <strong key={i} className="hl" style={{ '--d': `${350 + i * 90}ms` }}>{text}</strong> : <span key={i}>{text}</span>))}
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-solid"><RollText>Explore projects</RollText> <span className="arrow">→</span></a>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn"><RollText>Resume</RollText> ↗</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
