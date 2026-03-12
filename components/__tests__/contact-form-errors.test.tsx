import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { ContactForm } from '@/components/contact-form';

/**
 * Tests for enhanced error handling in ContactForm
 * Validates Requirements: 5.2, 5.3
 */
describe('ContactForm - Enhanced Error Handling', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Web Development' }));
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');
  };

  describe('HTTP Error Status Handling', () => {
    test('displays specific error for 400 Bad Request', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
      });

      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/invalid form data/i)).toBeInTheDocument();
      });
    });

    test('displays specific error for 500 Internal Server Error', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/server error.*try again later/i)).toBeInTheDocument();
      });
    });

    test('displays specific error for 503 Service Unavailable', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      });

      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/service temporarily unavailable/i)).toBeInTheDocument();
      });
    });

    test('displays generic error for other HTTP errors', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/failed to send message.*try again/i)).toBeInTheDocument();
      });
    });
  });

  describe('Network Error Handling', () => {
    test('displays network error for TypeError', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/network error.*check your connection/i)).toBeInTheDocument();
      });
    });

    test('displays timeout error for timeout errors', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockRejectedValue(new Error('Request timeout'));

      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/request timed out.*check your connection/i)).toBeInTheDocument();
      });
    });

    test('displays generic error for unknown errors', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockRejectedValue(new Error('Unknown error'));

      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/something went wrong.*try again/i)).toBeInTheDocument();
      });
    });
  });

  describe('Error Message Clearing', () => {
    test('clears previous error message on new submission', async () => {
      const user = userEvent.setup();
      
      // First submission fails
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Network error'));
      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });

      // Second submission succeeds
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, message: 'Success' }),
      });

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.queryByText(/network error/i)).not.toBeInTheDocument();
        expect(screen.getByText(/success/i)).toBeInTheDocument();
      });
    });

    test('clears previous success message on new submission', async () => {
      const user = userEvent.setup();
      
      // First submission succeeds
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, message: 'Success' }),
      });
      
      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/success/i)).toBeInTheDocument();
      });

      // Fill form again and submit with error
      await fillValidForm(user);
      global.fetch = vi.fn().mockRejectedValue(new Error('Error'));
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.queryByText(/success/i)).not.toBeInTheDocument();
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      });
    });
  });

  describe('Error Message Accessibility', () => {
    test('error messages have role="alert"', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Network error'));

      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        const errorMessage = screen.getByText(/network error/i);
        expect(errorMessage).toHaveAttribute('role', 'alert');
      });
    });

    test('error messages have aria-live="polite"', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Network error'));

      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        const errorMessage = screen.getByText(/network error/i);
        expect(errorMessage).toHaveAttribute('aria-live', 'polite');
      });
    });
  });

  describe('Form State During Errors', () => {
    test('form remains enabled after error', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Network error'));

      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });

      // Check that form fields are still enabled
      expect(screen.getByLabelText(/name/i)).not.toBeDisabled();
      expect(screen.getByLabelText(/email/i)).not.toBeDisabled();
      expect(screen.getByLabelText(/message/i)).not.toBeDisabled();
      expect(screen.getByRole('button', { name: /send message/i })).not.toBeDisabled();
    });

    test('user can retry submission after error', async () => {
      const user = userEvent.setup();
      
      // First attempt fails
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Network error'));
      render(<ContactForm />);
      await fillValidForm(user);
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });

      // Second attempt succeeds
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, message: 'Success' }),
      });

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/success/i)).toBeInTheDocument();
      });
    });
  });
});
