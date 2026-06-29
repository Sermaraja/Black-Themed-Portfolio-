import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Certifications & Credentials | Sermaraja V',
  description: 'Verified cloud certifications, technical credentials, and continuous learning achievements of Sermaraja V.',
  path: '/certifications',
});

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
