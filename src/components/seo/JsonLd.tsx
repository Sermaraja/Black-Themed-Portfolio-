import React from 'react';
import { WithContext, Person, ProfessionalService } from 'schema-dts';
import { siteConfig } from '@/lib/seo';

export function JsonLd() {
  const personSchema: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sermaraja V',
    alternateName: ['Sermaraj', 'Sermaraja Vairamani', 'Sermaraj V', 'sermaraja'],
    url: siteConfig.url,
    image: `${siteConfig.url}/IMG/sermaja V logo.png`,
    jobTitle: 'Associate System Engineer & Cloud Specialist',
    worksFor: {
      '@type': 'Organization',
      name: 'Devopstrio Ltd.',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Anna University',
    },
    knowsAbout: [
      'Cloud Computing',
      'Microsoft Azure',
      'Amazon Web Services (AWS)',
      'DevOps Engineering',
      'Infrastructure Modernization',
      'VMware Virtualization',
      'Full Stack Web Development',
      'Next.js & React',
      'System Architecture',
      'AI Agent & RAG Development'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kovilpatti',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'India',
    },
    sameAs: [
      'https://linkedin.com',
      'https://github.com'
    ],
  };

  const localBusinessSchema: WithContext<ProfessionalService> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sermaraja V (Devopstrio Ltd) - Cloud Engineering & Web Development',
    url: siteConfig.url,
    image: `${siteConfig.url}/IMG/sermaja V logo.png`,
    description: 'Professional Cloud Infrastructure Modernization, Azure/AWS Migration, DevOps, and Full-Stack Web Development serving Kovilpatti, Chennai, Madurai, Tirunelveli, Coimbatore, Trichy, Bangalore, Mumbai, Delhi, India, UK, London, USA, and Australia.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kovilpatti',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'India',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.1722,
      longitude: 77.8694,
    },
    priceRange: '$$$',
    areaServed: [
      'Kovilpatti',
      'Chennai',
      'Madurai',
      'Tirunelveli',
      'Coimbatore',
      'Trichy',
      'Bangalore',
      'Mumbai',
      'Delhi',
      'India',
      'United Kingdom',
      'London',
      'United States',
      'Australia'
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
