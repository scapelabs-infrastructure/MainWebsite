import { useState, useEffect } from 'react';
import { DynamicIslandHeader } from './components/DynamicIslandHeader';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { TechArsenal } from './components/TechArsenal';
import { ProjectsCommunity } from './components/ProjectsCommunity';
import { Community } from './components/Community';
import { Team } from './components/Team';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FilmGrain } from './components/FilmGrain';

import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Onboarding } from './pages/Onboarding';
import { JoinUs } from './pages/JoinUs';
import { WorkWithUs } from './pages/WorkWithUs';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };
    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  useEffect(() => {
    document.title = 'Asociația ScapeLabs';
    const favicon =
      document.querySelector('link[rel="icon"]') || document.createElement('link');
    (favicon as HTMLLinkElement).rel = 'icon';
    (favicon as HTMLLinkElement).type = 'image/png';
    (favicon as HTMLLinkElement).href =
      'https://scapelabs.io/wp-content/uploads/2025/07/cropped-Favicon.png';
    if (!document.querySelector('link[rel="icon"]')) {
      document.head.appendChild(favicon);
    }
    document.documentElement.style.scrollBehavior = 'smooth';
  }, [path]);

  if (path === '/privacy-policy') return <PrivacyPolicy />;
  if (path === '/terms-of-service') return <TermsOfService />;
  if (path === '/onboarding') return <Onboarding />;
  if (path === '/join') return <JoinUs />;
  if (path === '/work-with-us') return <WorkWithUs />;

  return (
    <div
      className="relative overflow-x-hidden"
      style={{ background: '#080810', color: '#E8E8F0', fontFamily: "'Inter', sans-serif" }}
    >
      <FilmGrain />
      <DynamicIslandHeader />
      <Hero />
      <Manifesto />
      <TechArsenal />
      <ProjectsCommunity />
      <Community />
      <Team />
      <FinalCTA />
      <Footer />
    </div>
  );
}
