import { Marquee } from '../components/anim.jsx';
import Landing from '../components/Landing.jsx';
import FlyingPhoto from '../components/FlyingPhoto.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import TechStack from '../components/TechStack.jsx';
import Projects from '../components/Projects.jsx';
import Experience from '../components/Experience.jsx';
import Education from '../components/Education.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  return (
    <>
      <Landing />
      <Hero />
      <Marquee items={['SQL', 'React', 'Power BI', 'Python', 'Node.js', 'Dashboards', 'MongoDB', 'LLM Testing', 'PostgreSQL', 'Express.js', 'Hugging Face', 'ETL']} />
      <Projects />
      <About />
      <TechStack />
      <Experience />
      <Education />
      <Contact />
      <FlyingPhoto />
    </>
  );
}
