'use client';

import { useEffect } from 'react';

export function GoogleWebViewHandler() {
  useEffect(() => {
    // Detect if we're in Google's WebView
    const isGoogleWebView = () => {
      const userAgent = navigator.userAgent;
      return /Googlebot|Google WebView|GoogleApp/i.test(userAgent) || 
             window.location.href.includes('google.com') ||
             document.referrer.includes('google.com');
    };

    // Handle Google WebView specific issues
    const handleGoogleWebView = () => {
      if (isGoogleWebView()) {
        console.log('Google WebView detected, applying specific fixes');
        
        // Prevent common Google WebView issues
        try {
          // Disable certain features that cause issues in Google WebView
          if (typeof window !== 'undefined') {
            // Prevent touch event issues
            document.addEventListener('touchstart', function(e) {
              e.preventDefault();
            }, { passive: false });

            // Prevent zoom issues
            document.addEventListener('gesturestart', function(e) {
              e.preventDefault();
            }, { passive: false });

            // Handle orientation changes
            window.addEventListener('orientationchange', function() {
              setTimeout(() => {
                window.scrollTo(0, 0);
              }, 100);
            });

            // Prevent double-tap zoom
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function(e) {
              const now = (new Date()).getTime();
              if (now - lastTouchEnd <= 300) {
                e.preventDefault();
              }
              lastTouchEnd = now;
            }, { passive: false });
          }
        } catch (error) {
          console.error('Google WebView handler error:', error);
        }
      }
    };

    // Apply fixes immediately
    handleGoogleWebView();

    // Also apply fixes after a short delay to catch late-loading issues
    const timeoutId = setTimeout(handleGoogleWebView, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
