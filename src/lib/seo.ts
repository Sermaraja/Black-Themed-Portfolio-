// Production Release Auto-Deploy Trigger
import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Sermaraja V',
  title: 'Sermaraja V | Web Developer & Cloud Engineer in Kovilpatti',
  description: 'Sermaraja V is a Web Developer & Cloud Engineer based in Kovilpatti, serving clients across Madurai and Chennai. Full-stack development, Azure/AWS cloud, and DevOps solutions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sermarajav.in',
  ogImage: '/IMG/sermaja V logo.png',
  author: 'Sermaraja V',
  keywords: [
    'web developer Kovilpatti',
    'cloud engineer Kovilpatti',
    'full stack developer Kovilpatti',
    'Azure cloud engineer Tamil Nadu',
    'web developer Madurai',
    'cloud engineer Madurai',
    'web developer Chennai',
    'DevOps engineer Tamil Nadu',
    'Next.js developer India',
    'freelance web developer Tamil Nadu',
  ],
  links: {
    github: 'https://github.com/sermaraja',
    linkedin: 'https://www.linkedin.com/in/sermaraja-v09022005/',
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
