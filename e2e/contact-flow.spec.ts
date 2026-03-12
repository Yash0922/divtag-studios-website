import { test, expect } from '@playwright/test';

/**
 * E2E Test: Complete Contact Form Submission Flow
 * Task 21.1 - Validates Requirements 5.1, 5.2
 * 
 * Tests:
 * - Navigation to contact section
 * - Form filling and submission
 * - Success message display
 */
test.describe('Contact Form Submission Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
  });

  test('should navigate to contact section and submit form successfully', async ({ page }) => {
    // Step 1: Navigate to contact section
    // Find and click the contact navigation link
    const contactLink = page.locator('nav a[href="#contact"]').first();
    await expect(contactLink).toBeVisible();
    await contactLink.click();

    // Wait for smooth scroll to complete and verify we're at the contact section
    await page.waitForTimeout(1000); // Allow time for smooth scroll animation
    
    // Verify contact section is visible
    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeVisible();
    
    // Verify contact form heading is visible
    await expect(page.locator('h2:has-text("Contact Us")')).toBeVisible();

    // Step 2: Fill out the form
    // Fill name field
    const nameInput = page.locator('input#name');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('John Doe');

    // Fill email field
    const emailInput = page.locator('input#email');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('john.doe@example.com');

    // Select service from dropdown
    const serviceSelect = page.locator('button#service');
    await expect(serviceSelect).toBeVisible();
    await serviceSelect.click();
    
    // Wait for dropdown to open and select first service (Web Development)
    const webDevOption = page.locator('[role="option"]:has-text("Web Development")');
    await expect(webDevOption).toBeVisible();
    await webDevOption.click();

    // Fill message field
    const messageTextarea = page.locator('textarea#message');
    await expect(messageTextarea).toBeVisible();
    await messageTextarea.fill('I would like to discuss a web development project for my business. Please contact me at your earliest convenience.');

    // Step 3: Submit the form
    const submitButton = page.locator('button[type="submit"]:has-text("Send Message")');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    
    // Mock the API response
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: "Thank you for contacting us. We'll get back to you soon."
        })
      });
    });

    // Click submit button
    await submitButton.click();

    // Step 4: Verify success message is displayed
    // Wait for the success message to appear
    const successMessage = page.locator('[role="alert"]:has-text("Thank you for contacting us")');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
    
    // Verify the success message contains expected text
    await expect(successMessage).toContainText("Thank you for contacting us");

    // Verify form is reset after successful submission
    await expect(nameInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
    await expect(messageTextarea).toHaveValue('');
  });

  test('should display validation errors for invalid form data', async ({ page }) => {
    // Navigate to contact section
    const contactLink = page.locator('nav a[href="#contact"]').first();
    await contactLink.click();
    await page.waitForTimeout(1000);

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]:has-text("Send Message")');
    await submitButton.click();

    // Verify validation error messages appear
    // Note: Errors appear on blur, so we need to interact with fields first
    const nameInput = page.locator('input#name');
    await nameInput.focus();
    await nameInput.blur();
    
    // Check for name error
    const nameError = page.locator('#name-error');
    await expect(nameError).toBeVisible();
    await expect(nameError).toContainText('Name must be at least 2 characters');

    // Test invalid email
    const emailInput = page.locator('input#email');
    await emailInput.fill('invalid-email');
    await emailInput.blur();
    
    const emailError = page.locator('#email-error');
    await expect(emailError).toBeVisible();
    await expect(emailError).toContainText('Please enter a valid email address');

    // Test short message
    const messageTextarea = page.locator('textarea#message');
    await messageTextarea.fill('Short');
    await messageTextarea.blur();
    
    const messageError = page.locator('#message-error');
    await expect(messageError).toBeVisible();
    await expect(messageError).toContainText('Message must be at least 10 characters');
  });

  test('should display loading state during form submission', async ({ page }) => {
    // Navigate to contact section
    const contactLink = page.locator('nav a[href="#contact"]').first();
    await contactLink.click();
    await page.waitForTimeout(1000);

    // Fill form with valid data
    await page.locator('input#name').fill('Jane Smith');
    await page.locator('input#email').fill('jane.smith@example.com');
    
    // Select service
    await page.locator('button#service').click();
    await page.locator('[role="option"]:has-text("UI/UX Design")').click();
    
    await page.locator('textarea#message').fill('I need help with UI/UX design for my mobile app.');

    // Mock API with delay to see loading state
    await page.route('/api/contact', async (route) => {
      // Add delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: "Thank you for contacting us. We'll get back to you soon."
        })
      });
    });

    // Submit form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Verify loading state appears
    const loadingButton = page.locator('button[type="submit"]:has-text("Sending...")');
    await expect(loadingButton).toBeVisible();
    
    // Verify button is disabled during submission
    await expect(submitButton).toBeDisabled();

    // Verify loading spinner is present
    const spinner = page.locator('button[type="submit"] svg.animate-spin');
    await expect(spinner).toBeVisible();

    // Wait for success message (loading should disappear)
    await expect(page.locator('[role="alert"]:has-text("Thank you for contacting us")')).toBeVisible({ timeout: 5000 });
    
    // Verify button returns to normal state
    await expect(page.locator('button[type="submit"]:has-text("Send Message")')).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Navigate to contact section
    const contactLink = page.locator('nav a[href="#contact"]').first();
    await contactLink.click();
    await page.waitForTimeout(1000);

    // Fill form with valid data
    await page.locator('input#name').fill('Test User');
    await page.locator('input#email').fill('test@example.com');
    await page.locator('button#service').click();
    await page.locator('[role="option"]:has-text("SEO")').click();
    await page.locator('textarea#message').fill('This is a test message for error handling.');

    // Mock API with error response
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Server error'
        })
      });
    });

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Verify error message is displayed
    const errorMessage = page.locator('[role="alert"]:has-text("Server error")');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    
    // Verify form data is preserved (not reset on error)
    await expect(page.locator('input#name')).toHaveValue('Test User');
    await expect(page.locator('input#email')).toHaveValue('test@example.com');
  });
});
