import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/components/features/legal/PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Straveda',
  description:
    'Learn how Straveda collects, uses, stores and protects your information while using our SaaS platform, AI solutions and IT services.',
  alternates: {
    canonical: 'https://straveda.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Straveda',
    description:
      'Learn how Straveda collects, uses, stores and protects your information while using our SaaS platform, AI solutions and IT services.',
    type: 'website',
    url: 'https://straveda.com/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Privacy() {
  return <PrivacyPolicyPage />;
}
