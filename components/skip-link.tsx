'use client';

/**
 * SkipLink component provides a "Skip to main content" link for keyboard and screen reader users
 * 
 * Features:
 * - Hidden by default, visible on keyboard focus
 * - Allows users to bypass navigation and jump directly to main content
 * - Positioned at the top of the page for first tab stop
 * - Meets WCAG 2.1 AA accessibility requirements
 * 
 * Requirements: 10.1 - Keyboard navigation support
 */
export function SkipLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
