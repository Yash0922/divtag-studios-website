# Test Utilities and Arbitraries

This directory contains reusable test utilities and fast-check arbitraries for property-based testing across the service website test suite.

## Files

- **`arbitraries.ts`**: Fast-check arbitraries for generating test data
- **`test-utils.tsx`**: Helper functions for common test scenarios
- **`setup.ts`**: Global test setup and configuration

## Arbitraries

### Service Arbitraries

#### `serviceArbitrary`
Generates valid Service objects with realistic data.

```typescript
import { serviceArbitrary } from '@/test/arbitraries';

fc.assert(
  fc.property(serviceArbitrary, (service) => {
    // Test with random service data
  })
);
```

#### `iconNameArbitrary`
Generates valid icon names from the actual service offerings.

### Contact Form Arbitraries

#### `validContactFormDataArbitrary`
Generates valid contact form data that passes all validation rules:
- name: ≥2 characters, ≤100 characters
- email: valid email format
- service: valid service ID
- message: ≥10 characters, ≤1000 characters

```typescript
import { validContactFormDataArbitrary } from '@/test/arbitraries';

fc.assert(
  fc.asyncProperty(validContactFormDataArbitrary, async (formData) => {
    // Test with valid form data
  })
);
```

#### `invalidContactFormDataArbitrary`
Generates invalid contact form data with a known error field.

```typescript
import { invalidContactFormDataArbitrary } from '@/test/arbitraries';

fc.assert(
  fc.asyncProperty(invalidContactFormDataArbitrary, async ({ data, errorField }) => {
    // Test with invalid data
    // errorField indicates which field should have an error
  })
);
```

#### `validEmailArbitrary`
Generates valid email addresses.

#### `invalidEmailArbitrary`
Generates invalid email addresses for testing validation.

### Navigation Arbitraries

#### `validSectionIdArbitrary`
Generates valid section IDs from the website (hero, services, about, contact).

#### `validServiceIdArbitrary`
Generates valid service IDs from the SERVICES constant.

### UI Arbitraries

#### `buttonTextArbitrary`
Generates realistic button text content.

#### `keyboardSafeTextArbitrary`
Generates text without special characters interpreted by userEvent.keyboard.

#### `hexColorArbitrary`
Generates valid hex color codes.

#### `viewportSizeArbitrary`
Generates realistic viewport dimensions for responsive testing.

#### `imageAltTextArbitrary`
Generates descriptive alt text for images.

#### `urlPathArbitrary`
Generates valid URL paths.

#### `ariaRoleArbitrary`
Generates valid ARIA role attributes.

## Test Utilities

### Fetch Mocking

#### `mockSuccessfulFetch(responseData?)`
Mocks fetch with a successful response.

```typescript
import { mockSuccessfulFetch } from '@/test/test-utils';

const mockFetch = mockSuccessfulFetch({ success: true, message: 'Success' });
// Use in tests
```

#### `mockFailedFetch(status?, errorData?)`
Mocks fetch with a failed response.

#### `mockNetworkError()`
Mocks fetch with a network error.

### DOM Utilities

#### `createMockSections(sectionIds?)`
Creates mock DOM sections for navigation testing.

```typescript
import { createMockSections } from '@/test/test-utils';

const cleanup = createMockSections(['hero', 'services', 'about']);
// Run tests
cleanup(); // Remove sections
```

#### `createMockMainContent()`
Creates a mock main content element for skip link testing.

```typescript
import { createMockMainContent } from '@/test/test-utils';

const { element, scrollIntoViewMock, cleanup } = createMockMainContent();
// Run tests
cleanup();
```

### Form Utilities

#### `fillContactFormWithKeyboard(user, formData)`
Fills contact form fields using keyboard navigation.

```typescript
import { setupUserEvent, fillContactFormWithKeyboard } from '@/test/test-utils';

const user = setupUserEvent();
await fillContactFormWithKeyboard(user, {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Test message'
});
```

#### `submitFormWithKeyboard(user)`
Submits form using keyboard (Tab to submit button, Enter to submit).

### Accessibility Utilities

#### `hasVisibleFocusIndicator(element)`
Checks if element has visible focus indicator classes.

#### `getFocusableElements(container)`
Gets all focusable elements within a container.

#### `meetsTouchTargetSize(element)`
Checks if element meets minimum touch target size (44x44px).

#### `hasAriaLabel(element)`
Verifies element has ARIA label.

#### `isKeyboardAccessible(element)`
Verifies element is keyboard accessible.

#### `assertAccessible(element)`
Asserts that element meets common accessibility requirements.

### Verification Utilities

#### `verifyApiCall(mockFetch, endpoint, method?, body?)`
Verifies API call was made with correct data.

```typescript
import { mockSuccessfulFetch, verifyApiCall } from '@/test/test-utils';

const mockFetch = mockSuccessfulFetch();
// ... trigger API call
verifyApiCall(mockFetch, '/api/contact', 'POST', formData);
```

### Mock Data Utilities

#### `createMockService(overrides?)`
Creates a mock service object for testing.

```typescript
import { createMockService } from '@/test/test-utils';

const service = createMockService({
  title: 'Custom Service',
  description: 'Custom description'
});
```

#### `createMockContactFormData(overrides?)`
Creates mock contact form data for testing.

### Other Utilities

#### `setupUserEvent()`
Sets up userEvent with default configuration.

#### `waitForAsync(ms?)`
Waits for async operations to complete.

#### `getComputedStyles(element)`
Gets computed styles for an element.

#### `mockIntersectionObserver(mockIntersecting?)`
Mocks IntersectionObserver for testing.

## Usage Examples

### Property-Based Test with Arbitraries

```typescript
import { test } from 'vitest';
import fc from 'fast-check';
import { validContactFormDataArbitrary } from '@/test/arbitraries';
import { mockSuccessfulFetch, verifyApiCall } from '@/test/test-utils';

test('valid form data results in success', async () => {
  await fc.assert(
    fc.asyncProperty(validContactFormDataArbitrary, async (formData) => {
      const mockFetch = mockSuccessfulFetch();
      
      // Test logic here
      
      verifyApiCall(mockFetch, '/api/contact', 'POST', formData);
    }),
    { numRuns: 100 }
  );
});
```

### Keyboard Navigation Test

```typescript
import { test } from 'vitest';
import { render } from '@testing-library/react';
import { setupUserEvent, createMockSections } from '@/test/test-utils';
import { Navbar } from '@/components/navbar';

test('navigation is keyboard accessible', async () => {
  const user = setupUserEvent();
  const cleanup = createMockSections();
  
  render(<Navbar />);
  
  // Tab through navigation
  await user.tab();
  // ... test logic
  
  cleanup();
});
```

### Accessibility Test

```typescript
import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { getFocusableElements, assertAccessible } from '@/test/test-utils';
import { ContactForm } from '@/components/contact-form';

test('all form elements are accessible', () => {
  const { container } = render(<ContactForm />);
  const focusableElements = getFocusableElements(container);
  
  focusableElements.forEach(element => {
    assertAccessible(element);
  });
});
```

## Best Practices

1. **Use arbitraries for property-based tests**: Generate random test data instead of hardcoding values
2. **Use helper functions for common scenarios**: Reduce code duplication across tests
3. **Clean up after tests**: Always call cleanup functions to remove mock DOM elements
4. **Mock external dependencies**: Use fetch mocking utilities for API tests
5. **Test accessibility**: Use accessibility utilities to verify WCAG compliance
6. **Run sufficient iterations**: Use at least 100 iterations for property-based tests

## Configuration

Test configuration is in `vitest.config.ts` at the project root. Global setup is in `setup.ts`.

### Minimum Iterations

Property-based tests must run at least 100 iterations to ensure adequate coverage:

```typescript
fc.assert(
  fc.property(arbitrary, (value) => {
    // Test logic
  }),
  { numRuns: 100 } // Minimum required
);
```

### Test Tagging

Each property-based test must include a comment referencing the design document property:

```typescript
// Feature: service-website-divtag-studios, Property 1: Service Card Complete Rendering
test('service card renders all required fields', () => {
  // Test implementation
});
```
