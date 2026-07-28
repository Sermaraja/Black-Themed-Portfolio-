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
    jobTitle: 'Web Developer & Cloud Engineer',
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
    email: 'sermarajav.offcl@gmail.com',
    award: ['Collaboration Champion Award 2025-26 (Devopstrio Ltd.)'],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Microsoft Certified: Azure Administrator Associate (AZ-104)',
        credentialCategory: 'Certification',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'HashiCorp Certified: Terraform Associate',
        credentialCategory: 'Certification',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Red Hat Certified System Administrator (RHCSA)',
        credentialCategory: 'Certification',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'DevOps Engineering Foundations',
        credentialCategory: 'Certification',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Enterprise Cloud Security & Monitoring Specialization',
        credentialCategory: 'Certification',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kovilpatti',
      addressRegion: 'Tamil Nadu',
      postalCode: '628501',
      addressCountry: 'India',
    },
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.github
    ],
  };

  const localBusinessSchema: WithContext<ProfessionalService> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sermaraja V — Web Developer & Cloud Engineer in Kovilpatti',
    url: siteConfig.url,
    image: `${siteConfig.url}/IMG/sermaja V logo.png`,
    description: 'Full-stack web development, Azure/AWS cloud engineering, and DevOps solutions based in Kovilpatti, Tamil Nadu. Serving clients in Kovilpatti, Madurai, and Chennai.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kovilpatti',
      addressRegion: 'Tamil Nadu',
      postalCode: '628501',
      addressCountry: 'India',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.172205,
      longitude: 77.869389,
    },
    priceRange: '$$$',
    areaServed: [
      'Kovilpatti',
      'Madurai',
      'Chennai',
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
