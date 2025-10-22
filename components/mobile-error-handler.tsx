'use client';

import { useEffect } from 'react';

export function MobileErrorHandler() {
  useEffect(() => {
    // Enhanced error handling specifically for mobile browsers and Google crawler
    const handleError = (event: ErrorEvent) => {
      console.error('Mobile error caught:', event.error);
      
      // Prevent default error handling
      event.preventDefault();
      
      // Try to recover gracefully
      try {
        // If it's a hydration error, try to re-render
        if (event.error?.message?.includes('hydration') || 
            event.error?.message?.includes('SSR') ||
            event.error?.message?.includes('client-side')) {
          
          // Force a soft reload without losing state
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
      } catch (recoveryError) {
        console.error('Error recovery failed:', recoveryError);
      }
      
      return false;
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Mobile promise rejection:', event.reason);
      event.preventDefault();
      return false;
    };

    // Handle specific mobile browser issues
    const handleMobileIssues = () => {
      try {
        // Check if we're in a mobile browser
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isGoogleCrawler = /Googlebot/i.test(navigator.userAgent);
        
        if (isMobile || isGoogleCrawler) {
          // Add mobile-specific error handling
          console.log('Mobile browser or Google crawler detected, enhanced error handling enabled');
          
          // Prevent common mobile issues
          if (typeof window !== 'undefined') {
            // Prevent zoom issues
            document.addEventListener('touchstart', function(event) {
              if (event.touches.length > 1) {
                event.preventDefault();
              }
            }, { passive: false });

            // Prevent double-tap zoom
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function(event) {
              const now = (new Date()).getTime();
              if (now - lastTouchEnd <= 300) {
                event.preventDefault();
              }
              lastTouchEnd = now;
            }, { passive: false });
          }
        }
      } catch (error) {
        console.error('Mobile issue handler error:', error);
      }
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    // Initialize mobile handling
    handleMobileIssues();

    // Cleanup function
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null; // This component doesn't render anything
}
