import { useState } from 'react';
import { workExperience } from '../data/profile.js';
import { DetailModal } from './Projects.jsx';
import { Scramble, SplitText } from './anim.jsx';
import Reveal from './Reveal.jsx';
import WaveTimeline from './WaveTimeline.jsx';

export default function Experience() {
  const [active, setActive] = useState(null);
  const items = [...workExperience].reverse().map((e) => ({
    tag: e.tag,
    period: e.period,
    title: e.title,
    org: e.org,
    detail: e.detail,
    links: e.links,
    onMore: e.highlights ? () => setActive(e) : undefined,
  }));

  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <Scramble as="p" className="kicker" text="Work" />
            <SplitText as="h2" className="h-lg" text="Work Experience." />
          </div>
          <p className="muted head-note">From where I started<br />to what I do now.</p>
        </Reveal>
        <WaveTimeline items={items} />
      </div>
      {active && (
        <DetailModal project={{ ...active, label: `${active.org} · ${active.period}` }} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
