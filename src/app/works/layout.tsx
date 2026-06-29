import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'All Works & Projects Showcase | Sermaraja V',
  description: 'Explore Devopstrio Cloud Engineering projects, Major full-stack applications, and freelance engagements by Sermaraja V.',
  path: '/works',
});

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
