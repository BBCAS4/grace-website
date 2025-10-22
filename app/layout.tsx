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
  other: {
    'mobile-web-app-capable': 'yes',
    'application-name': 'GRACE Integrated Health',
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
        url: '/GRACE_Integrated_Health_Logo.png',
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
    images: ['/GRACE_Integrated_Health_Logo.png'],
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
        <title>GRACE Integrated Health | Nurse practitioner-led Aged Care Services</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/GRACE_Integrated_Health_Logo.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/GRACE_Integrated_Health_Logo.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/GRACE_Integrated_Health_Logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A3C5F" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="application-name" content="GRACE Integrated Health" />
        <meta name="apple-mobile-web-app-title" content="GRACE Integrated Health" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-TileColor" content="#0A3C5F" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#0A3C5F" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0A3C5F" media="(prefers-color-scheme: dark)" />
        <meta name="site_name" content="GRACE Integrated Health" />
        <meta name="og:site_name" content="GRACE Integrated Health" />
        <meta name="twitter:site" content="@GRACEIntegratedHealth" />
        <meta name="twitter:creator" content="@GRACEIntegratedHealth" />
        <meta name="google-site-verification" content="google79eb66bcbe7fe5bb" />
      </head>
      <body className={inter.className}>
        <StructuredDataScript />
        {children}
        {gaId && <Analytics gaId={gaId} />}
      </body>
    </html>
  );
}