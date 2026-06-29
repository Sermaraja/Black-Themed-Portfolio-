import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Sermaraja V',
  title: 'Sermaraja V | Associate System Engineer, Cloud & Full Stack Developer',
  description: 'Official portfolio of Sermaraja V (Sermaraj Vairamani), Associate System Engineer at Devopstrio Ltd. Specialized in Azure/AWS Cloud Engineering, DevOps, Infrastructure Modernization, and Full Stack Web Development across Kovilpatti, Chennai, Bangalore, India, UK, London, USA, and Australia.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sermaraja.com',
  ogImage: '/IMG/sermaja V logo.png',
  author: 'Sermaraja V',
  keywords: [
    // Brand & Name Keywords (Main Focus)
    'sermaraj',
    'sermaraja V',
    'sermaraja vairamani',
    'devopstrio',
    'devopstrio ltd',
    'Sermaraja V portfolio',

    // Main Focus Local City (Kovilpatti)
    'web developer in kovilpatti',
    'full stack developer in kovilpatti',
    'cloud engineer in kovilpatti',
    'devops engineer in kovilpatti',
    'system engineer in kovilpatti',
    'software engineer in kovilpatti',
    'Kovilpatti web developer',
    'Kovil patti cloud specialist',

    // Major Tamil Nadu Cities & Services
    'web developer in chennai',
    'cloud engineer in chennai',
    'devops engineer in chennai',
    'web developer in madurai',
    'full stack developer in madurai',
    'web developer in coimbatore',
    'cloud engineer in coimbatore',
    'web developer in thirunelvelli',
    'web developer in tirunelveli',
    'web developer in trichy',

    // Metro Indian Cities & Services
    'web developer in bangalore',
    'cloud engineer in bangalore',
    'devops engineer in bangalore',
    'web developer in mumbai',
    'cloud engineer in mumbai',
    'web developer in delhi',

    // Global Services & Target Countries
    'cloud engineer India',
    'devops engineer India',
    'cloud engineer UK',
    'cloud engineer London',
    'cloud engineer USA',
    'cloud engineer Australia',
    'remote full stack developer UK',
    'remote azure cloud specialist USA',
    'freelance web developer Australia',

    // Core Technical Expertise
    'Associate System Engineer',
    'Azure Cloud Specialist',
    'AWS Migration Specialist',
    'VMware Virtualization Specialist',
    'Infrastructure Modernization',
    'Next.js Full Stack Developer',
    'AI Agent & RAG Developer'
  ],
  links: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
};

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = '/IMG/sermaraj fevicon.png',
  noIndex = false,
  path = '',
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  path?: string;
} = {}): Metadata {
  const canonicalUrl = path ? `${siteConfig.url}${path}` : siteConfig.url;

  return {
    title,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@sermaraja',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons,
    other: {
      'geo.region': 'IN-TN',
      'geo.placename': 'Kovilpatti, Tamil Nadu, India',
      'geo.position': '9.1722;77.8694',
      'ICBM': '9.1722, 77.8694',
    },
  };
}
