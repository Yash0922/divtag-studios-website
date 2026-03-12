import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { ContactForm } from '@/components/contact-form';
import { SERVICES } from '@/lib/constants';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('Form Field Rendering', () => {
    test('renders name field with label', () => {
      render(<ContactForm />);
      
      const nameLabel = screen.getByLabelText(/name/i);
      expect(nameLabel).toBeInTheDocument();
      expect(nameLabel).toHaveAttribute('type', 'text');
    });

    test('renders email field with label', () => {
      render(<ContactForm />);
      
      const emailLabel = screen.getByLabelText(/email/i);
      expect(emailLabel).toBeInTheDocument();
      expect(emailLabel).toHaveAttribute('type', 'email');
    });

    test('renders service dropdown with label', () => {
      render(<ContactForm />);
      
      const serviceLabel = screen.getByText(/service interest/i);
      expect(serviceLabel).toBeInTheDocument();
    });

    test('renders message field with label', () => {
      render(<ContactForm />);
      
      const messageLabel = screen.getByLabelText(/message/i);
      expect(messageLabel).toBeInTheDocument();
    });

    test('renders submit button', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeInTheDocument();
    });

    test('all required fields are marked with asterisk', () => {
      render(<ContactForm />);
      
      const asterisks = screen.getAllByText('*');
      expect(asterisks.length).toBe(4); // name, email, service, message
    });

    test('name field has placeholder text', () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByPlaceholderText(/your full name/i);
      expect(nameInput).toBeInTheDocument();
    });

    test('email field has placeholder text', () => {
      render(<ContactForm />);
      
      const emailInput = screen.getByPlaceholderText(/your.email@example.com/i);
      expect(emailInput).toBeInTheDocument();
    });

    test('message field has placeholder text', () => {
      render(<ContactForm />);
      
      const messageInput = screen.getByPlaceholderText(/tell us about your project/i);
      expect(messageInput).toBeInTheDocument();
    });

    test('service dropdown shows placeholder', () => {
      render(<ContactForm />);
      
      const serviceTrigger = screen.getByRole('combobox');
      expect(serviceTrigger).toHaveTextContent(/select a service/i);
    });
  });

  describe('Error Message Display', () => {
    test('displays error when name is too short', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'A');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    test('displays error when email is invalid', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    test('displays error when message is too short', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, 'Short');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
      });
    });

    test('error messages have proper ARIA attributes', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'A');
      await user.tab();
      
      await waitFor(() => {
        const errorMessage = screen.getByText(/name must be at least 2 characters/i);
        expect(errorMessage).toHaveAttribute('role', 'alert');
        expect(errorMessage).toHaveAttribute('id', 'name-error');
      });
    });

    test('input fields have aria-invalid when errors exist', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'A');
      await user.tab();
      
      await waitFor(() => {
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    test('input fields have aria-describedby pointing to error', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'A');
      await user.tab();
      
      await waitFor(() => {
        expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
      });
    });

    test('displays network error message on fetch failure', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Network error'));
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
    });

    test('displays generic error message on server error', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500
      });
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/server error.*try again later/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Reset After Submission', () => {
    test('clears all fields after successful submission', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          message: "Thank you for contacting us. We'll get back to you soon."
        })
      });
      
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(messageInput, 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/thank you for contacting us/i)).toBeInTheDocument();
      });
      
      // Check that fields are cleared
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });

    test('does not clear fields on submission failure', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockRejectedValue(new Error('Server error'));
      
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(messageInput, 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/something went wrong.*try again/i)).toBeInTheDocument();
      });
      
      // Check that fields are NOT cleared
      expect(nameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('john@example.com');
      expect(messageInput).toHaveValue('This is a test message');
    });

    test('displays success message after submission', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          message: "Thank you for contacting us. We'll get back to you soon."
        })
      });
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        const successMessage = screen.getByText(/thank you for contacting us/i);
        expect(successMessage).toBeInTheDocument();
        expect(successMessage).toHaveAttribute('role', 'alert');
      });
    });
  });

  describe('Loading State During Submission', () => {
    test('disables submit button during submission', async () => {
      const user = userEvent.setup();
      let resolvePromise: (value: any) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      
      global.fetch = vi.fn().mockReturnValue(promise);
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
      
      // Resolve the promise to clean up
      resolvePromise!({
        ok: true,
        json: async () => ({ success: true, message: 'Success' })
      });
    });

    test('shows loading text during submission', async () => {
      const user = userEvent.setup();
      let resolvePromise: (value: any) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      
      global.fetch = vi.fn().mockReturnValue(promise);
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/sending/i)).toBeInTheDocument();
      });
      
      // Resolve the promise to clean up
      resolvePromise!({
        ok: true,
        json: async () => ({ success: true, message: 'Success' })
      });
    });

    test('shows loading spinner during submission', async () => {
      const user = userEvent.setup();
      let resolvePromise: (value: any) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      
      global.fetch = vi.fn().mockReturnValue(promise);
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        const spinner = submitButton.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
      });
      
      // Resolve the promise to clean up
      resolvePromise!({
        ok: true,
        json: async () => ({ success: true, message: 'Success' })
      });
    });

    test('re-enables submit button after successful submission', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          message: "Thank you for contacting us."
        })
      });
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/thank you for contacting us/i)).toBeInTheDocument();
      });
      
      expect(submitButton).not.toBeDisabled();
    });

    test('re-enables submit button after failed submission', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/something went wrong.*try again/i)).toBeInTheDocument();
      });
      
      expect(submitButton).not.toBeDisabled();
    });

    test('disables all form inputs during submission', async () => {
      const user = userEvent.setup();
      let resolvePromise: (value: any) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      
      global.fetch = vi.fn().mockReturnValue(promise);
      
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(messageInput, 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        expect(nameInput).toBeDisabled();
        expect(emailInput).toBeDisabled();
        expect(messageInput).toBeDisabled();
      });
      
      // Resolve the promise to clean up
      resolvePromise!({
        ok: true,
        json: async () => ({ success: true, message: 'Success' })
      });
    });

    test('re-enables all form inputs after successful submission', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          message: "Thank you for contacting us."
        })
      });
      
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(messageInput, 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/thank you for contacting us/i)).toBeInTheDocument();
      });
      
      expect(nameInput).not.toBeDisabled();
      expect(emailInput).not.toBeDisabled();
      expect(messageInput).not.toBeDisabled();
    });

    test('re-enables all form inputs after failed submission', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(messageInput, 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/something went wrong.*try again/i)).toBeInTheDocument();
      });
      
      expect(nameInput).not.toBeDisabled();
      expect(emailInput).not.toBeDisabled();
      expect(messageInput).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    test('all form fields have proper labels', () => {
      render(<ContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    test('all required fields have aria-required', () => {
      render(<ContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/message/i)).toHaveAttribute('aria-required', 'true');
    });

    test('submit button meets minimum touch target size', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('min-h-[44px]');
    });

    test('success message has aria-live region', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          message: "Thank you for contacting us."
        })
      });
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        const successMessage = screen.getByText(/thank you for contacting us/i);
        expect(successMessage).toHaveAttribute('aria-live', 'polite');
      });
    });

    test('error message has aria-live region', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        const errorMessage = screen.getByText(/something went wrong.*try again/i);
        expect(errorMessage).toHaveAttribute('aria-live', 'polite');
      });
    });
  });

  describe('Form Submission', () => {
    test('submits form data to correct endpoint', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          message: "Thank you for contacting us."
        })
      });
      global.fetch = mockFetch;
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/contact',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          })
        );
      });
    });

    test('submits correct form data', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          message: "Thank you for contacting us."
        })
      });
      global.fetch = mockFetch;
      
      render(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Web Development' }));
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/contact',
          expect.objectContaining({
            body: JSON.stringify({
              name: 'John Doe',
              email: 'john@example.com',
              service: 'web-development',
              message: 'This is a test message'
            })
          })
        );
      });
    });
  });

  describe('Service Dropdown', () => {
    test('displays all available services', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      await user.click(screen.getByRole('combobox'));
      
      SERVICES.forEach(service => {
        expect(screen.getByRole('option', { name: service.title })).toBeInTheDocument();
      });
    });

    test('allows selecting a service', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Android Development' }));
      
      expect(screen.getByRole('combobox')).toHaveTextContent('Android Development');
    });
  });

  describe('Layout and Styling', () => {
    test('form has proper spacing between fields', () => {
      const { container } = render(<ContactForm />);
      
      const form = container.querySelector('form');
      expect(form).toHaveClass('space-y-6');
    });

    test('submit button spans full width', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('w-full');
    });

    test('applies custom className when provided', () => {
      const { container } = render(<ContactForm className="custom-class" />);
      
      const form = container.querySelector('form');
      expect(form).toHaveClass('custom-class');
    });
  });
});
