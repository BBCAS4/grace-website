import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '../components/analytics';
import { StructuredDataScript } from '../components/structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GRACE Integrated Health | Nurse practitioner-led Aged Care Services',
  description: 'GRACE provides evidence-based, Nurse practitioner-led assessments and integrated care planning for residential aged care facilities. PBS-aware, guideline-aligned care for older adults.',
  keywords: 'aged care, Nurse practitioner, geriatric care, residential aged care, health assessment, medication review, chronic disease management',
  authors: [{ name: 'GRACE Integrated Health' }],
  creator: 'GRACE Integrated Health',
  publisher: 'GRACE Integrated Health',
  applicationName: 'GRACE Integrated Health',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.graceintegratedhealth.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GRACE Integrated Health | Nurse practitioner-led Aged Care Services',
    description: 'Evidence-based care for older adults in residential aged care facilities. Comprehensive assessments, medication reviews, and chronic disease management.',
    url: 'https://www.graceintegratedhealth.com.au',
    siteName: 'GRACE Integrated Health',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GRACE Integrated Health - Nurse practitioner-led Aged Care Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GRACE Integrated Health | Nurse practitioner-led Aged Care Services',
    description: 'Evidence-based care for older adults in residential aged care facilities.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0A3C5F" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="GRACE Integrated Health" />
        <meta name="apple-mobile-web-app-title" content="GRACE Integrated Health" />
      </head>
      <body className={inter.className}>
        <StructuredDataScript />
        {children}
        {gaId && <Analytics gaId={gaId} />}
      </body>
    </html>
  );
}