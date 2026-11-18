import { RollText, SplitText } from './anim.jsx';
import { useState } from 'react';
import { profile } from '../data/profile.js';
import Reveal from './Reveal.jsx';
import { InstagramIcon } from './Projects.jsx';

// No backend needed: the form builds a pre-filled email draft (mailto:).
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return setError('Please add your name and a message.');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Please enter a valid email address.');
    setError('');
    const subject = encodeURIComponent(`Hello from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section">
      <div className="container contact-grid">
        <Reveal>
          <SplitText as="h2" className="lets-talk outline-hover" text="Let's talk." />
          <p className="muted">
            Whether it's a role, an internship, a project or a brand collaboration, my inbox is open.
          </p>
          <a href={`mailto:${profile.email}`} className="contact-mail u-link">{profile.email}</a>
          <ul className="socials">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target={s.url.startsWith('http') || s.url.endsWith('.pdf') ? '_blank' : undefined} rel="noreferrer">
                  {s.ig && <InstagramIcon size={13} />}{s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} as="form" className="contact-form" onSubmit={submit} noValidate>
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
            <button type="submit" className="btn btn-solid"><RollText>Create email draft</RollText> <span className="arrow">→</span></button>
            <span className="muted small">or <a href={`mailto:${profile.email}`}>email me directly</a></span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
