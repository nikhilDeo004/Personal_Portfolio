import { RollText } from './anim.jsx';
import { useEffect, useState } from 'react';
import { profile } from '../data/profile.js';

export const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

function SunMoon({ theme }) {
  return theme === 'dark' ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
    </svg>
  );
}

export default function Header({ route, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="logo" aria-label="Back to top">{profile.firstName}.</a>

        <nav className="nav-pill" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className={l.page && route === l.page ? 'active' : ''}>
              <RollText>{l.label}</RollText>
            </a>
          ))}
          <button className="menu-btn" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu">
            Menu
          </button>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title="Toggle theme"
          >
            <SunMoon theme={theme} />
          </button>
        </nav>

        <a href="#contact" className="header-cta u-link">Say hello ↗</a>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">×</button>
        {navLinks.map((l) => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
