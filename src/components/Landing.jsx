import { Scramble, SplitText } from './anim.jsx';
import { profile } from '../data/profile.js';

// Full-screen opener: < FULL-STACK DEVELOPER /> with the photo overlapping.
export default function Landing() {
  const [a, b] = profile.bigTitle;
  return (
    <section id="top" className="landing">
      <h1 className="landing-title" aria-label={`${profile.firstName} ${profile.lastName}, ${a} ${b}`}>
        <span className="line"><span className="bracket" aria-hidden="true">&lt;</span> <SplitText text={a} by="char" onLoad delay={150} /></span>
        <span className="line"><SplitText text={b} by="char" onLoad delay={420} /> <span className="bracket" aria-hidden="true">/&gt;</span></span>
      </h1>
      {/* invisible slot: the single shared photo (FlyingPhoto) starts here */}
      <div className="landing-photo photo-slot" aria-hidden="true" />
      <div className="landing-meta">
        <div className="container">
          <span className="year">©{new Date().getFullYear()}</span>
          <Scramble className="tag" text={`{ /${profile.tagline} }`} hover />
        </div>
      </div>
    </section>
  );
}
