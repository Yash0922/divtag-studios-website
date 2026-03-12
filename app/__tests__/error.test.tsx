import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeAll } from 'vitest';

describe('Error Boundary', () => {
  let ErrorBoundary: any;

  beforeAll(async () => {
    ErrorBoundary = (await import('../error')).default;
  });

  const mockError = new Error('Test error message');
  const mockReset = vi.fn();

  test('displays error message', () => {
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/We encountered an unexpected error/i)).toBeInTheDocument();
  });

  test('displays try again button', () => {
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    
    const button = screen.getByRole('button', { name: /try again/i });
    expect(button).toBeInTheDocument();
  });

  test('calls reset function when try again button is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    
    const button = screen.getByRole('button', { name: /try again/i });
    await user.click(button);
    
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  test('logs error to console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    
    expect(consoleSpy).toHaveBeenCalledWith('Application error:', mockError);
    
    consoleSpy.mockRestore();
  });

  test('handles error with digest property', () => {
    const errorWithDigest = Object.assign(new Error('Test error'), { digest: 'abc123' });
    
    render(<ErrorBoundary error={errorWithDigest} reset={mockReset} />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
