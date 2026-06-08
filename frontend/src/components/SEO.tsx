import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  lang?: string;
  altLang?: string;
  altUrl?: string;
  jsonLd?: Record<string, unknown>;
}

export function SEO({ title, description, url = '', image = '/ScapeLabs-Logo.png', lang = 'ro', altLang, altUrl, jsonLd }: SEOProps) {
  const fullTitle = `${title} | ScapeLabs`;

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Asociația ScapeLabs',
    alternateName: 'ScapeLabs Organization',
    url: 'https://scapelabs.ro',
    logo: 'https://scapelabs.ro/ScapeLabs-Logo.png',
    description: 'Laborator de spatial computing, Academy tech gratuită și parteneriate CSR. Fondat la București, construit pentru Europa.',
    foundingDate: '2024',
    foundingLocation: 'București, România',
    areaServed: 'EU',
    sameAs: ['https://www.linkedin.com/company/scapelabs'],
    memberOf: {
      '@type': 'Organization',
      name: 'Erasmus+',
    },
  };

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {altLang && altUrl && (
        <link rel="alternate" hrefLang={altLang} href={altUrl} />
      )}
      <link rel="alternate" hrefLang="x-default" href="https://scapelabs.ro" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ScapeLabs Organization" />
      <meta property="og:locale" content={lang === 'ro' ? 'ro_RO' : 'en_US'} />
      {altLang && (
        <meta property="og:locale:alternate" content={altLang === 'ro' ? 'ro_RO' : 'en_US'} />
      )}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd ?? orgJsonLd)}
      </script>
    </Helmet>
  );
}
