import { freelance, profile } from '../data/profile.js';
import Reveal from '../components/Reveal.jsx';

export default function Freelance() {
  return (
    <section className="section page-top">
      <div className="container">
        <Reveal>
          <p className="kicker">Freelance</p>
          <h1 className="page-title">Let's build<br />something.</h1>
          <p className="muted" style={{ maxWidth: '52ch', fontSize: '1.1rem' }}>{freelance.intro}</p>
        </Reveal>

        <div className="services">
          {freelance.services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} className="stack-card">
              <span className="kicker">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p className="muted">{s.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="process">
          <h2>How it works</h2>
          <ol>
            {freelance.steps.map((step, i) => (
              <li key={step}><span>{String(i + 1).padStart(2, '0')}</span> {step}</li>
            ))}
          </ol>
        </Reveal>

        <div className="hero-actions">
          <a href="#contact" className="btn btn-solid">Start a conversation <span className="arrow">→</span></a>
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn">Resume ↗</a>
        </div>
      </div>
    </section>
  );
}
