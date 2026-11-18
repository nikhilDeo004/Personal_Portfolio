import { Scramble, SplitText } from './anim.jsx';
import { certifications, techStack } from '../data/profile.js';
import Reveal from './Reveal.jsx';

export default function TechStack() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <Scramble as="p" className="kicker" text="Skills" />
            <SplitText as="h2" className="h-lg" text="Tech Stack" />
          </div>
        </Reveal>

        <div className="stack-grid">
          {techStack.map((g, i) => (
            <Reveal key={g.title} delay={i * 90} className="stack-card">
              <span className="kicker">0{i + 1}</span>
              <h3>{g.title}</h3>
              <p className="muted">{g.tagline}</p>
              <ul className="chips">
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="certs">
          <h3>Certifications &amp; Courses</h3>
          <ul>
            {certifications.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
