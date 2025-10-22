'use client';

import Script from 'next/script';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface AnalyticsProps {
  gaId: string;
}

export function Analytics({ gaId }: AnalyticsProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// Hook for tracking events
export function useAnalytics() {
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      }
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  };

  const trackPageView = (url: string) => {
    try {
      if (typeof window !== 'undefined' && window.gtag && window.gtag.config) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: url,
        });
      }
    } catch (error) {
      console.warn('Analytics page view error:', error);
    }
  };

  return { trackEvent, trackPageView };
}
