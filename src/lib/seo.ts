// Production Release Auto-Deploy Trigger
import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Sermaraja V',
  title: 'Sermaraja V | Web Engineering, Product Strategy & Digital Solutions',
  description: 'Official portfolio of Sermaraja V (Sermaraj Vairamani), Associate System Engineer at Devopstrio Ltd. Specialized in Azure/AWS Cloud Engineering, DevOps, Infrastructure Modernization, and Full Stack Web Development across Kovilpatti, Chennai, Bangalore, India, UK, London, USA, and Australia.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sermarajav.in',
  ogImage: '/IMG/sermaja V logo.png',
  author: 'Sermaraja V',
  keywords: [
    // Brand & Name Keywords (Main Focus)
    'sermaraj',
    'sermaraja V',
    'sermaraja vairamani',
    'sermarajav',
    'sermarajav.in',
    'www.sermarajav.in',
    'devopstrio',
    'devopstrio ltd',
    'Sermaraja V portfolio',
    'Sermaraja V official website',

    // Main Focus Local City (Kovilpatti)
    'web developer in kovilpatti',
    'full stack developer in kovilpatti',
    'cloud engineer in kovilpatti',
    'devops engineer in kovilpatti',
    'system engineer in kovilpatti',
    'software engineer in kovilpatti',
    'Kovilpatti web developer',
    'Kovil patti cloud specialist',
    'Azure Administrator Kovilpatti',

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
    'AI Agent & RAG Developer',
    'Sermaraja V Associate System Engineer',
    'Sermaraja V Web Developer'
  ],
  links: {
    github: 'https://github.com/sermaraja',
    linkedin: 'https://linkedin.com/in/sermaraja',
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
  const absoluteImageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;
  const absoluteIconUrl = icons.startsWith('http') ? icons : `${siteConfig.url}${icons}`;

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
    applicationName: 'Sermaraja V Portfolio',
    referrer: 'origin-when-cross-origin',
    generator: 'Next.js',
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: 'Sermaraja V Logo',
        }
      ],
      locale: 'en_US',
      type: 'profile',
      firstName: 'Sermaraja',
      lastName: 'V',
      username: 'sermaraja',
      gender: 'male',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImageUrl],
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
    icons: {
      icon: absoluteIconUrl,
      shortcut: absoluteIconUrl,
      apple: absoluteIconUrl,
    },
    other: {
      'geo.region': 'IN-TN',
      'geo.placename': 'Kovilpatti, Tamil Nadu, India',
      'geo.position': '9.172205;77.869389',
      'ICBM': '9.172205, 77.869389',
      'place:location:latitude': '9.172205',
      'place:location:longitude': '77.869389',
      'business:contact_data:locality': 'Kovilpatti',
      'business:contact_data:region': 'Tamil Nadu',
      'business:contact_data:country_name': 'India',
      'business:contact_data:email': 'sermarajav.offcl@gmail.com',
    },
  };
}
