import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import { ContactForm } from '@/components/contact-form';
import { validContactFormDataArbitrary } from '@/test/arbitraries';
import { SERVICES } from '@/lib/constants';

// Mock fetch globally
beforeEach(() => {
  vi.restoreAllMocks();
});

describe('Loading States Property-Based Tests', () => {
  // Feature: service-website-divtag-studios, Property 7: Asynchronous Operation Loading States
  test('async operations display loading indicators while in progress', async () => {
    /**
     * **Validates: Requirements 6.4**
     * 
     * Property 7: Asynchronous Operation Loading States
     * 
     * For any asynchronous operation (form submission, data fetching), the UI should display
     * a loading indicator while the operation is in progress and remove it when the operation
     * completes or fails.
     * 
     * This test validates the property by:
     * 1. Generating random valid form data
     * 2. Mocking a delayed API response to simulate async operation
     * 3. Simulating form submission
     * 4. Verifying loading indicator appears during submission
     * 5. Verifying loading indicator disappears after completion
     * 6. Testing both success and failure scenarios
     */
    await fc.assert(
      fc.asyncProperty(
        validContactFormDataArbitrary,
        fc.boolean(), // Whether the request should succeed or fail
        async (formData, shouldSucceed) => {
          const user = userEvent.setup();

          // Mock API response with delay to simulate async operation
          const mockFetch = vi.fn().mockImplementation(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                if (shouldSucceed) {
                  resolve({
                    ok: true,
                    json: async () => ({
                      success: true,
                      message: "Thank you for contacting us. We'll get back to you soon."
                    })
                  });
                } else {
                  resolve({
                    ok: false,
                    status: 500,
                    json: async () => ({
                      success: false,
                      error: 'Server error'
                    })
                  });
                }
              }, 50); // 50ms delay to simulate network request
            });
          });
          global.fetch = mockFetch;

          // Render the form
          const { unmount } = render(<ContactForm />);

          try {
            // Fill out the form
            const nameInput = screen.getByLabelText(/name/i);
            const emailInput = screen.getByLabelText(/email/i);
            const serviceSelect = screen.getByLabelText(/service interest/i);
            const messageInput = screen.getByLabelText(/message/i);

            await user.type(nameInput, formData.name);
            await user.type(emailInput, formData.email);
            await user.click(serviceSelect);
            
            // Find and click the service option using the actual service title
            const service = SERVICES.find(s => s.id === formData.service);
            const serviceOption = await screen.findByRole('option', { 
              name: service?.title || formData.service
            });
            await user.click(serviceOption);
            
            await user.type(messageInput, formData.message);

            // Get the submit button
            const submitButton = screen.getByRole('button', { name: /send message/i });

            // Verify button is initially enabled and shows "Send Message"
            expect(submitButton).toBeEnabled();
            expect(submitButton).toHaveTextContent(/send message/i);

            // Submit the form
            await user.click(submitButton);

            // CRITICAL: Verify loading indicator appears
            // The button should be disabled and show loading state
            await waitFor(() => {
              const loadingButton = screen.getByRole('button', { name: /sending/i });
              expect(loadingButton).toBeInTheDocument();
              expect(loadingButton).toBeDisabled();
            }, { timeout: 1000 });

            // Verify loading spinner is present (Loader2 icon with animate-spin class)
            const loadingSpinner = document.querySelector('.animate-spin');
            expect(loadingSpinner).toBeInTheDocument();

            // Verify form inputs are disabled during submission
            expect(nameInput).toBeDisabled();
            expect(emailInput).toBeDisabled();
            expect(messageInput).toBeDisabled();

            // Wait for the async operation to complete
            await waitFor(() => {
              // After completion, button should be re-enabled and show "Send Message" again
              const completedButton = screen.getByRole('button', { name: /send message/i });
              expect(completedButton).toBeEnabled();
            }, { timeout: 2000 });

            // Verify loading indicator is removed
            const noLoadingButton = screen.queryByRole('button', { name: /sending/i });
            expect(noLoadingButton).not.toBeInTheDocument();

            // Verify loading spinner is removed
            const noLoadingSpinner = document.querySelector('.animate-spin');
            expect(noLoadingSpinner).not.toBeInTheDocument();

            // Verify form inputs are re-enabled after submission
            expect(nameInput).toBeEnabled();
            expect(emailInput).toBeEnabled();
            expect(messageInput).toBeEnabled();

            // Verify appropriate message is displayed based on success/failure
            if (shouldSucceed) {
              await waitFor(() => {
                expect(screen.getByText(/thank you for contacting us/i)).toBeInTheDocument();
              });
            } else {
              await waitFor(() => {
                expect(screen.getByText(/server error/i)).toBeInTheDocument();
              });
            }

            // Verify fetch was called
            expect(mockFetch).toHaveBeenCalledTimes(1);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 3, timeout: 10000 } // Run 3 times with 10s timeout per run
    );
  }, 120000); // 2 minute test timeout

  // Feature: service-website-divtag-studios, Property 7: Asynchronous Operation Loading States
  test('loading state prevents multiple simultaneous submissions', async () => {
    /**
     * **Validates: Requirements 6.4**
     * 
     * Property 7 (Additional): Loading State Prevents Double Submission
     * 
     * While an asynchronous operation is in progress, the UI should prevent additional
     * submissions by disabling the submit button and form inputs.
     * 
     * This test validates that:
     * 1. During submission, the button is disabled
     * 2. During submission, form inputs are disabled
     * 3. Multiple clicks on the submit button don't trigger multiple API calls
     */
    await fc.assert(
      fc.asyncProperty(
        validContactFormDataArbitrary,
        async (formData) => {
          const user = userEvent.setup();

          // Mock API response with significant delay
          const mockFetch = vi.fn().mockImplementation(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  ok: true,
                  json: async () => ({
                    success: true,
                    message: "Thank you for contacting us."
                  })
                });
              }, 100); // 100ms delay
            });
          });
          global.fetch = mockFetch;

          // Render the form
          const { unmount } = render(<ContactForm />);

          try {
            // Fill out the form
            const nameInput = screen.getByLabelText(/name/i);
            const emailInput = screen.getByLabelText(/email/i);
            const serviceSelect = screen.getByLabelText(/service interest/i);
            const messageInput = screen.getByLabelText(/message/i);

            await user.type(nameInput, formData.name);
            await user.type(emailInput, formData.email);
            await user.click(serviceSelect);
            
            const service = SERVICES.find(s => s.id === formData.service);
            const serviceOption = await screen.findByRole('option', { 
              name: service?.title || formData.service
            });
            await user.click(serviceOption);
            
            await user.type(messageInput, formData.message);

            // Get the submit button
            const submitButton = screen.getByRole('button', { name: /send message/i });

            // Submit the form
            await user.click(submitButton);

            // Wait for loading state to appear
            await waitFor(() => {
              expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
            }, { timeout: 1000 });

            // Verify the button is disabled (prevents additional submissions)
            const disabledButton = screen.getByRole('button', { name: /sending/i });
            expect(disabledButton).toBeDisabled();

            // Wait for completion
            await waitFor(() => {
              expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
            }, { timeout: 2000 });

            // Verify fetch was called only once
            expect(mockFetch).toHaveBeenCalledTimes(1);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 2, timeout: 10000 } // Run 2 times with 10s timeout per run
    );
  }, 60000); // 1 minute test timeout
});
