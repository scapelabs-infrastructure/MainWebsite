import { useState, useEffect } from 'react';
import { DynamicIslandHeader } from './components/DynamicIslandHeader';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { WowVision } from './components/WowVision';
import { LabVisions } from './components/LabVisions';
import { Team } from './components/Team';
import { VibeStory } from './components/VibeStory';
import { Blueprint } from './components/Blueprint';
import { PilotProjects } from './components/PilotProjects';
import { Recruitment } from './components/Recruitment';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';
import { FilmGrain } from './components/FilmGrain';

import { FinalCTA } from './components/FinalCTA';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Onboarding } from './pages/Onboarding';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [scrollToPartners, setScrollToPartners] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };
    
    window.history.replaceState = function(...args) {
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
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    (favicon as HTMLLinkElement).rel = 'icon';
    (favicon as HTMLLinkElement).type = 'image/png';
    (favicon as HTMLLinkElement).href = 'https://scapelabs.io/wp-content/uploads/2025/07/cropped-Favicon.png';
    if (!document.querySelector('link[rel="icon"]')) {
      document.head.appendChild(favicon);
    }
    document.documentElement.style.scrollBehavior = 'smooth';
  }, [path]);

  if (path === '/privacy-policy') {
    return <PrivacyPolicy />;
  }

  if (path === '/terms-of-service') {
    return <TermsOfService />;
  }

  if (path === '/onboarding') {
    return <Onboarding />;
  }

  const handleRecruitmentClick = () => {
    const element = document.getElementById('recruitment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePartnerClick = () => {
    const element = document.getElementById('partners');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#030303] text-[#EDEDED] overflow-x-hidden">
      <FilmGrain />
      <DynamicIslandHeader />
      <Hero />
      <Manifesto />
      <WowVision />
      <LabVisions />
      <PilotProjects />
      <Team />
      <VibeStory />
      <Recruitment />
      <Partners />
      <FinalCTA onRecruitmentClick={handleRecruitmentClick} onPartnerClick={handlePartnerClick} />
      <Footer />
    </div>
  );
}
