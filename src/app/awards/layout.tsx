import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Awards & Recognitions | Sermaraja V',
  description: 'Honors, recognitions, and achievement awards earned by Sermaraja V in system engineering and technical competitions.',
  path: '/awards',
});

export default function AwardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
