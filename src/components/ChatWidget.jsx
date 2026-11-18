import { useEffect, useRef, useState } from 'react';
import { assistantKB, assistantSuggestions, profile } from '../data/profile.js';

// A small on-site assistant that answers questions using only resume facts.
// No backend or API key needed: it matches keywords against assistantKB.
function answer(question) {
  const q = question.toLowerCase();
  if (/^(hi|hello|hey|namaskar|namaste)\b/.test(q)) {
    return `Hi! 👋 I can answer questions about ${profile.firstName}'s skills, experience, projects, education and how to contact him.`;
  }
  let best = null;
  let bestScore = 0;
  for (const item of assistantKB) {
    const score = item.keys.reduce((s, k) => s + (q.includes(k) ? 1 : 0), 0);
    if (score > bestScore) { best = item; bestScore = score; }
  }
  if (best) return best.answer;
  return `I'm not sure about that one. You can ask ${profile.firstName} directly at ${profile.email}.`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Hi! I'm ${profile.firstName}'s assistant. Ask me anything about his work, skills or education.` },
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const send = (text) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: 'user', text: t }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: 'bot', text: answer(t) }]);
    }, 550);
  };

  return (
    <>
      {open && (
        <div className="chat-panel" role="dialog" aria-label={`Chat with ${profile.firstName}'s assistant`}>
          <div className="chat-head">
            <div className="chat-avatar"><img src={profile.portrait} alt="" /></div>
            <div>
              <strong>{profile.firstName}'s assistant</strong>
              <small>Answers from my resume</small>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>
          <div className="chat-body" ref={bodyRef} aria-live="polite">
            {messages.map((m, i) => <div key={i} className={`msg ${m.from}`}>{m.text}</div>)}
            {typing && <div className="msg bot typing" aria-label="Typing"><span /><span /><span /></div>}
          </div>
          <div className="chat-suggest">
            {assistantSuggestions.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}
          </div>
          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Nikhil…" aria-label="Your question" autoFocus />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="dot" aria-hidden="true" />
        <span className="label">{open ? 'Close chat' : `Ask ${profile.firstName}'s assistant`}</span>
        <span aria-hidden="true">{open ? '×' : '✦'}</span>
      </button>
    </>
  );
}
