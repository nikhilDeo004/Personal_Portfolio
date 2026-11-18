import { RollText, Scramble, SplitText } from './anim.jsx';
import { useEffect, useState } from 'react';
import { profile, projects } from '../data/profile.js';
import Reveal from './Reveal.jsx';

export function InstagramIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DetailModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close" autoFocus>×</button>
        <p className="kicker">{project.label}</p>
        <h3 id="modal-title">{project.title}</h3>
        <p className="summary">{project.summary}</p>
        <ul className="highlights">
          {project.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
        <ul className="chips">
          {project.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        {project.links && (
          <div className="modal-links">
            {project.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="btn btn-solid">
                <InstagramIcon /> <RollText>{l.label}</RollText> <span className="arrow">↗</span>
              </a>
            ))}
          </div>
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-solid">
            <RollText>Open live project</RollText> <span className="arrow">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <Scramble as="p" className="kicker" text="Work" />
            <SplitText as="h2" className="h-lg" text={"Featured\nProjects"} />
            <p className="muted">Things I have built. Hover a folder to peek, click to open it.</p>
          </div>
          {profile.githubUrl ? (
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="link-arrow u-link">View all on GitHub ↗</a>
          ) : (
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="link-arrow u-link">Full resume ↗</a>
          )}
        </Reveal>

        <div className="project-row">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className="folder-wrap">
              <button className="folder" onClick={() => setActive(p)} aria-haspopup="dialog" aria-label={`Open ${p.title}`}>
                <span className="folder-back" />
                <span className="folder-paper" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>
                <span className="folder-front">
                  <span className="folder-title">
                    <span className="folder-label">{p.label}</span>
                    {p.title}
                  </span>
                  <span className="icon-box" aria-hidden="true">→</span>
                </span>
              </button>
              <div className="folder-caption">
                <span>{p.caption}</span>
                <button className="u-link" onClick={() => setActive(p)}>
                  {p.type === 'case-study' ? 'Read case study' : 'View project'} ↗
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {active && <DetailModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
