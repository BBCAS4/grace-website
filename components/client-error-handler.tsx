'use client';

import { useEffect } from 'react';

export function ClientErrorHandler() {
  useEffect(() => {
    // Global error handler for unhandled JavaScript errors
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      
      // Prevent the default error handling to avoid the "Application error" page
      event.preventDefault();
      
      // Optionally, you can send error reports to a logging service
      // or show a user-friendly error message
      return false;
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
      return false;
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup function
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null; // This component doesn't render anything
}
