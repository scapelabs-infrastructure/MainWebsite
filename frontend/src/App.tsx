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
import { SEO } from './components/SEO';
import { useLanguage } from './i18n/LanguageContext';

import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Onboarding } from './pages/Onboarding';
import { JoinUs } from './pages/JoinUs';
import { WorkWithUs } from './pages/WorkWithUs';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const { lang } = useLanguage();

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
    document.documentElement.style.scrollBehavior = 'smooth';
  }, [path]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);
      const attempt = (tries: number) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (tries > 0) {
          setTimeout(() => attempt(tries - 1), 150);
        }
      };
      setTimeout(() => attempt(10), 200);
    }
  }, [path]);

  const isRo = lang === 'ro';
  const baseUrl = 'https://scapelabs.ro';

  if (path === '/privacy-policy') return <PrivacyPolicy />;
  if (path === '/terms-of-service') return <TermsOfService />;
  if (path === '/onboarding') return <Onboarding />;

  if (path === '/join') {
    return (
      <>
        <SEO
          lang={lang}
          title={isRo ? 'Alătură-te ScapeLabs — Academy & Comunitate Gratuită' : 'Join ScapeLabs — Free Academy & Community'}
          description={isRo
            ? 'ScapeLabs Academy este 100% gratuită. Înveți spatial computing, AR, AI și design urban, lucrezi pe proiecte reale și obții echivalarea practicii universitare. Fondat la București.'
            : 'ScapeLabs Academy is completely free. Learn spatial computing, AR, AI and urban design, work on real projects and get your university internship covered. Founded in Bucharest.'}
          url={`${baseUrl}/join`}
          altLang={isRo ? 'en' : 'ro'}
          altUrl={`${baseUrl}/join`}
        />
        <JoinUs />
      </>
    );
  }

  if (path === '/work-with-us') {
    return (
      <>
        <SEO
          lang={lang}
          title={isRo ? 'Colaborează cu ScapeLabs — CSR & Spatial Computing' : 'Work With ScapeLabs — CSR & Spatial Computing Partnerships'}
          description={isRo
            ? 'Parteneriate CSR cu impact documentat, experiențe AR pentru evenimente și spații publice, și ScapeStudio — divizia comercială. Construim digital ce rămâne.'
            : 'CSR partnerships with documented impact, AR experiences for events and public spaces, and ScapeStudio — our commercial division. We build digital that lasts.'}
          url={`${baseUrl}/work-with-us`}
          altLang={isRo ? 'en' : 'ro'}
          altUrl={`${baseUrl}/work-with-us`}
        />
        <WorkWithUs />
      </>
    );
  }

  return (
    <>
      <SEO
        lang={lang}
        title={isRo ? 'Asociația ScapeLabs — Laborator de Spatial Computing' : 'ScapeLabs Organization — Spatial Computing Lab'}
        description={isRo
          ? 'Laboratorul de spatial computing care suprapune digital peste lumea fizică. Academy gratuită, experiențe AR și AI pentru spații publice, parteneriate CSR cu impact real. Fondat la București, construit pentru Europa.'
          : 'The spatial computing lab that layers the digital world over the physical one. Free Academy, AR and AI experiences for public spaces, CSR partnerships with real impact. Founded in Bucharest, built for Europe.'}
        url={baseUrl}
        altLang={isRo ? 'en' : 'ro'}
        altUrl={baseUrl}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Asociația ScapeLabs',
          alternateName: 'ScapeLabs Organization',
          url: baseUrl,
          logo: `${baseUrl}/ScapeLabs-Logo.png`,
          description: isRo
            ? 'Laborator de spatial computing, Academy tech gratuită și parteneriate CSR cu impact documentat. Fondat la București.'
            : 'Spatial computing lab, free tech Academy and CSR partnerships with documented impact. Founded in Bucharest.',
          foundingDate: '2024',
          foundingLocation: { '@type': 'Place', name: 'București, România' },
          areaServed: 'EU',
          knowsAbout: ['Spatial Computing', 'Augmented Reality', 'Artificial Intelligence', 'Urban Technology', 'Tech Education'],
          sameAs: ['https://www.linkedin.com/company/scapelabs'],
        }}
      />
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
    </>
  );
}
