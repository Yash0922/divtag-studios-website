import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkipLink } from '@/components/skip-link';

describe('SkipLink', () => {
  describe('Rendering', () => {
    test('renders skip link with correct text', () => {
      render(<SkipLink />);
      const skipLink = screen.getByText('Skip to main content');
      expect(skipLink).toBeInTheDocument();
    });

    test('has correct href attribute', () => {
      render(<SkipLink />);
      const skipLink = screen.getByText('Skip to main content');
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });
  });

  describe('Visibility', () => {
    test('is visually hidden by default', () => {
      render(<SkipLink />);
      const skipLink = screen.getByText('Skip to main content');
      expect(skipLink).toHaveClass('sr-only');
    });

    test('becomes visible on focus', () => {
      render(<SkipLink />);
      const skipLink = screen.getByText('Skip to main content');
      expect(skipLink).toHaveClass('focus:not-sr-only');
    });
  });

  describe('Keyboard Navigation', () => {
    test('is focusable via keyboard', async () => {
      const user = userEvent.setup();
      render(<SkipLink />);
      
      const skipLink = screen.getByText('Skip to main content');
      await user.tab();
      
      expect(skipLink).toHaveFocus();
    });

    test('scrolls to main content when clicked', async () => {
      const user = userEvent.setup();
      
      // Create a mock main content element
      const mainContent = document.createElement('main');
      mainContent.id = 'main-content';
      mainContent.tabIndex = -1; // Make it focusable
      const scrollIntoViewMock = vi.fn();
      mainContent.scrollIntoView = scrollIntoViewMock;
      document.body.appendChild(mainContent);
      
      render(<SkipLink />);
      
      const skipLink = screen.getByText('Skip to main content');
      await user.click(skipLink);
      
      expect(scrollIntoViewMock).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Cleanup
      document.body.removeChild(mainContent);
    });

    test('activates on Enter key', async () => {
      const user = userEvent.setup();
      
      // Create a mock main content element
      const mainContent = document.createElement('main');
      mainContent.id = 'main-content';
      mainContent.tabIndex = -1; // Make it focusable
      const scrollIntoViewMock = vi.fn();
      mainContent.scrollIntoView = scrollIntoViewMock;
      document.body.appendChild(mainContent);
      
      render(<SkipLink />);
      
      const skipLink = screen.getByText('Skip to main content');
      skipLink.focus();
      await user.keyboard('{Enter}');
      
      expect(scrollIntoViewMock).toHaveBeenCalled();
      
      // Cleanup
      document.body.removeChild(mainContent);
    });
  });

  describe('Accessibility', () => {
    test('has proper focus styles', () => {
      render(<SkipLink />);
      const skipLink = screen.getByText('Skip to main content');
      
      expect(skipLink).toHaveClass('focus:ring-2');
      expect(skipLink).toHaveClass('focus:ring-offset-2');
    });

    test('has high z-index for visibility', () => {
      render(<SkipLink />);
      const skipLink = screen.getByText('Skip to main content');
      
      expect(skipLink).toHaveClass('focus:z-[100]');
    });

    test('has proper positioning when focused', () => {
      render(<SkipLink />);
      const skipLink = screen.getByText('Skip to main content');
      
      expect(skipLink).toHaveClass('focus:absolute');
      expect(skipLink).toHaveClass('focus:top-4');
      expect(skipLink).toHaveClass('focus:left-4');
    });
  });

  describe('Edge Cases', () => {
    test('handles missing main content gracefully', async () => {
      const user = userEvent.setup();
      render(<SkipLink />);
      
      const skipLink = screen.getByText('Skip to main content');
      
      // Should not throw error when main content doesn't exist
      await expect(user.click(skipLink)).resolves.not.toThrow();
    });
  });
});
