import { RollText, Scramble, SplitText } from './anim.jsx';
import { aboutObject, aboutText, memePages } from '../data/profile.js';
import { InstagramIcon } from './Projects.jsx';
import Reveal from './Reveal.jsx';

function Value({ v }) {
  if (Array.isArray(v)) {
    return (
      <>
        [
        {v.map((item, i) => (
          <span key={i}>
            <span className="tok-str">'{item}'</span>
            {i < v.length - 1 ? ', ' : ''}
          </span>
        ))}
        ]
      </>
    );
  }
  return <span className="tok-str">'{v}'</span>;
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <Reveal>
          <Scramble as="p" className="kicker" text="About" />
          <SplitText as="h2" className="h-lg" text="A bit about me." />
          <p className="lead">{aboutText[0]}</p>
          <p className="muted">{aboutText[1]}</p>
          <div className="pages-run">
            <p className="kicker">Pages I run</p>
            <div className="pages-grid">
              {memePages.map((pg) => (
                <a key={pg.url} href={pg.url} target="_blank" rel="noreferrer" className="page-card">
                  <span className="page-icon"><InstagramIcon size={13} /></span>
                  <span className="page-text">
                    <strong>{pg.name}</strong>
                    <small>{pg.handle}</small>
                  </span>
                  <span className="page-follow"><RollText>Follow</RollText> ↗</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="code-window" aria-label="Profile written as code">
          <div className="code-bar">
            <span /><span /><span />
            <em>nikhil.js</em>
          </div>
          <pre>
            <code>
              <span className="tok-kw">const</span> nikhil = {'{'}
              {'\n'}
              {Object.entries(aboutObject).map(([k, v]) => (
                <span key={k}>
                  {'  '}<span className="tok-key">{k}</span>: <Value v={v} />,{'\n'}
                </span>
              ))}
              {'}'};{'\n\n'}
              <span className="tok-kw">export default function</span> <span className="tok-fn">Hello</span>() {'{'}
              {'\n  '}<span className="tok-kw">return</span> {'<'}<span className="tok-tag">h1</span>{'>'}Namaskar, I'm {'{'}nikhil.name{'}'} 👋{'</'}<span className="tok-tag">h1</span>{'>'};
              {'\n'}{'}'}<span className="caret" aria-hidden="true" />
            </code>
          </pre>
        </Reveal>
      </div>
    </section>
  );
}
