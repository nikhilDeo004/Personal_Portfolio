import { RollText, SplitText } from './anim.jsx';
import { useState } from 'react';
import { profile } from '../data/profile.js';
import Reveal from './Reveal.jsx';
import { InstagramIcon } from './Projects.jsx';

// Opens Gmail's compose window in a new tab (instead of Outlook / the default mail app)
export function gmailUrl({ to = profile.email, subject = '', body = '' } = {}) {
  const q = new URLSearchParams({ view: 'cm', fs: '1', to, su: subject, body });
  return `https://mail.google.com/mail/?${q.toString()}`;
}

const isMailto = (url) => url.startsWith('mailto:');

// Contact form: "Draft in Gmail" opens Gmail compose in a new tab, addressed to Nikhil
// and pre-filled with the visitor's message. No Outlook / default mail app.
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const draftInGmail = (e) => {
    e.preventDefault();
    if (!form.message.trim()) return setError('Please write a message first.');
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) return setError('Please enter a valid email address.');
    setError('');
    const sign = form.name ? `\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}` : '';
    window.open(
      gmailUrl({ subject: `Hello from ${form.name || 'your portfolio'}`, body: `${form.message}${sign}` }),
      '_blank',
      'noopener'
    );
  };

  return (
    <section id="contact" className="section">
      <div className="container contact-grid">
        <Reveal>
          <SplitText as="h2" className="lets-talk outline-hover" text="Let's talk." />
          <p className="muted">
            Whether it's a role, an internship, a project or a brand collaboration, my inbox is open.
          </p>
          <a href={gmailUrl()} target="_blank" rel="noreferrer" className="contact-mail u-link">{profile.email}</a>
          <ul className="socials">
            {profile.socials.map((s) => {
              const href = isMailto(s.url) ? gmailUrl() : s.url;
              const external = href.startsWith('http') || href.endsWith('.pdf');
              return (
                <li key={s.label}>
                  <a href={href} target={external ? '_blank' : undefined} rel="noreferrer">
                    {s.ig && <InstagramIcon size={13} />}{s.label} ↗
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={120} as="form" className="contact-form" onSubmit={draftInGmail} noValidate>
          <label className="field">
            <span>Your name</span>
            <input name="name" value={form.name} onChange={update} autoComplete="name" />
          </label>
          <label className="field">
            <span>Your email</span>
            <input name="email" type="email" value={form.email} onChange={update} autoComplete="email" />
          </label>
          <label className="field">
            <span>Your message</span>
            <textarea name="message" rows="4" value={form.message} onChange={update} />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-row">
            <button type="submit" className="btn btn-solid">
              <GmailIcon /> <RollText>Draft in Gmail</RollText> <span className="arrow">↗</span>
            </button>
            <span className="muted small">
              or{' '}
              <a href={gmailUrl()} target="_blank" rel="noreferrer">
                email me directly
              </a>
            </span>
          </div>
          <p className="muted small form-note">Opens Gmail in a new tab with my address and your message ready to send.</p>
        </Reveal>
      </div>
    </section>
  );
}

function GmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
