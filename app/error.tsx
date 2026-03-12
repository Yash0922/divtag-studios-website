'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Error Boundary Component
 * Catches React component errors and displays fallback UI
 * Validates Requirements: 5.2
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log errors to console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground">
          We encountered an unexpected error. Please try again.
        </p>
        <Button
          onClick={reset}
          className="min-h-[44px] px-6"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
