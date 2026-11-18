import { RollText, SplitText } from './anim.jsx';
import { useMemo, useState } from 'react';
import { education, memePages, profile, projects, techStack, workExperience } from '../data/profile.js';
import { navLinks } from './Header.jsx';
import FooterScene from './FooterScene.jsx';
import { gmailUrl } from './Contact.jsx';

// Everything the footer search can find
function buildIndex() {
  const items = [
    ...navLinks.map((l) => ({ title: l.label, type: 'Page', href: l.href })),
    ...projects.map((p) => ({ title: p.title, type: 'Project', href: '#projects', text: `${p.caption} ${p.stack.join(' ')}` })),
    ...workExperience.map((e) => ({ title: e.title, type: 'Work', href: '#experience', text: `${e.org} ${e.detail}` })),
    ...education.map((e) => ({ title: e.title, type: 'Education', href: '#education', text: `${e.org} ${e.board} ${e.result}` })),
    ...techStack.flatMap((g) => g.items.map((s) => ({ title: s, type: 'Skill', href: '#skills', text: g.title }))),
    { title: 'Resume (PDF)', type: 'File', href: profile.resumeUrl, text: 'cv download' },
    ...memePages.map((pg) => ({ title: pg.name, type: 'Instagram', href: pg.url, text: `${pg.handle} meme page marathi` })),
    { title: 'Email Nikhil', type: 'Contact', href: gmailUrl(), text: profile.email },
  ];
  return items;
}

function Search() {
  const index = useMemo(buildIndex, []);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const term = q.trim().toLowerCase();
  const results = term
    ? index.filter((i) => `${i.title} ${i.type} ${i.text ?? ''}`.toLowerCase().includes(term)).slice(0, 8)
    : [];

  const go = (e) => {
    e.preventDefault();
    if (results[0]) {
      window.location.href = results[0].href;
      setOpen(false);
    }
  };

  return (
    <form className="search" role="search" onSubmit={go} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}>
      <div className="search-box">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search projects, skills, experience…"
          aria-label="Search this site"
        />
        <button type="submit">Search</button>
      </div>
      {open && term && (
        <ul className="search-results">
          {results.length ? (
            results.map((r) => (
              <li key={r.type + r.title}>
                <a href={r.href} onClick={() => setOpen(false)} target={r.href.endsWith('.pdf') || r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {r.title} <small>{r.type}</small>
                </a>
              </li>
            ))
          ) : (
            <li className="search-empty">No results for “{q}”. Try “SQL” or “React”.</li>
          )}
        </ul>
      )}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="logo">{profile.firstName}.</a>
            <p className="muted">{profile.role}<br />{profile.current.line3}</p>
          </div>
          <div className="search-col">
            <Search />
            <ul className="footer-nav">
              {navLinks.map((l) => <li key={l.label}><a href={l.href}><RollText>{l.label}</RollText></a></li>)}
            </ul>
          </div>
          <div className="footer-contact">
            <span className="muted">Get in touch</span>
            <p><a className="u-link" href={gmailUrl()} target="_blank" rel="noreferrer">{profile.email}</a></p>
            <p className="muted">Open to roles, internships and collaborations.</p>
          </div>
        </div>

        <div className="see-you">
          <SplitText as="h2" className="outline-hover" text="See you around." />
          <a href="#top" className="back-top u-link">Back to top ↑</a>
        </div>
      </div>
      <FooterScene />
    </footer>
  );
}
