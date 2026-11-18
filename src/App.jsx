import { ScrollProgress } from './components/anim.jsx';
import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import Home from './pages/Home.jsx';

// Single page: hash links ("#projects", "#contact"...) scroll to sections on Home.
function getRoute() {
  const h = window.location.hash;
  return 'home';
}

function initialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  return 'dark';
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const onHash = () => {
      const next = getRoute();
      setRoute((prev) => {
        if (prev !== next) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // When arriving on Home with a section hash, scroll to it after render
  useEffect(() => {
    if (route !== 'home') return;
    const id = window.location.hash.replace('#', '');
    if (id && !id.startsWith('/')) {
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    }
  }, [route]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <Header route={route} theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main id="main" tabIndex={-1}>
        {route === 'home' && <Home />}
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
