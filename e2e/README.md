# E2E Tests with Playwright

This directory contains end-to-end tests for the Div Tag Studios website using Playwright.

## Configuration

The Playwright configuration is defined in `playwright.config.ts` at the project root.

### Test Browsers

Tests run across multiple browsers:
- **Chromium** (Chrome/Edge)
- **Firefox**
- **WebKit** (Safari)

### Viewport Configurations

Tests validate responsive design across three breakpoint categories:

#### Desktop (1024px+) - Requirement 7.3
- `chromium-desktop`: 1280x720
- `firefox-desktop`: 1280x720
- `webkit-desktop`: 1280x720

#### Tablet (768px-1023px) - Requirement 7.2
- `tablet-portrait`: 768x1024 (iPad Mini)
- `tablet-landscape`: 1024x768 (iPad Mini landscape)

#### Mobile (320px-767px) - Requirement 7.1
- `mobile-small`: 375x667 (iPhone SE)
- `mobile-medium`: 390x844 (iPhone 12)
- `mobile-large`: 393x851 (Pixel 5)

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests for specific project
npx playwright test --project=mobile-small

# Run specific test file
npx playwright test e2e/contact-flow.spec.ts
```

## Test Structure

E2E tests will be organized by feature:
- `setup-verification.spec.ts` - Verifies Playwright setup
- `contact-flow.spec.ts` - Contact form submission flow (Task 21.1)
- `mobile-navigation.spec.ts` - Mobile navigation (Task 21.2)
- `responsive-layout.spec.ts` - Responsive grid layouts (Task 21.3)
- `smooth-scroll.spec.ts` - Navigation scroll behavior (Task 21.4)

## Development Server

Playwright automatically starts the Next.js development server before running tests and shuts it down after tests complete. The server runs on `http://localhost:3000`.

## Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## Browser Installation

If you need to reinstall browsers:

```bash
npm run playwright:install
```

## CI/CD

On CI environments:
- Tests run with 2 retries for flaky test resilience
- Tests run sequentially (workers: 1) for stability
- Development server timeout is set to 120 seconds
