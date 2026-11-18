import { education } from '../data/profile.js';
import { Scramble, SplitText } from './anim.jsx';
import Reveal from './Reveal.jsx';
import WaveTimeline from './WaveTimeline.jsx';

// Education on the same wave timeline as Work Experience (oldest → newest)
export default function Education() {
  const items = [...education].reverse().map((e) => ({
    tag: e.tag,
    period: e.period,
    title: e.title,
    org: e.org,
    sub: e.board,
    detail: e.result,
  }));

  return (
    <section id="education" className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <Scramble as="p" className="kicker" text="Studies" />
            <SplitText as="h2" className="h-lg" text="Education." />
          </div>
          <p className="muted head-note">From the foundations<br />to post-grad now.</p>
        </Reveal>
        <WaveTimeline items={items} />
      </div>
    </section>
  );
}
