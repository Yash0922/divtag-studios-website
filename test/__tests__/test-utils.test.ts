import { describe, test, expect, vi } from 'vitest';
import {
  mockSuccessfulFetch,
  mockFailedFetch,
  mockNetworkError,
  createMockSections,
  createMockMainContent,
  createMockService,
  createMockContactFormData,
  hasVisibleFocusIndicator,
  isKeyboardAccessible,
  meetsTouchTargetSize,
  hasAriaLabel,
} from '../test-utils';

describe('Test Utilities', () => {
  describe('Fetch Mocking', () => {
    test('mockSuccessfulFetch creates a successful fetch mock', async () => {
      const mockFetch = mockSuccessfulFetch({ success: true, data: 'test' });
      
      const response = await fetch('/test');
      const data = await response.json();
      
      expect(response.ok).toBe(true);
      expect(data).toEqual({ success: true, data: 'test' });
      expect(mockFetch).toHaveBeenCalled();
    });

    test('mockFailedFetch creates a failed fetch mock', async () => {
      const mockFetch = mockFailedFetch(400, { error: 'Bad Request' });
      
      const response = await fetch('/test');
      const data = await response.json();
      
      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Bad Request' });
      expect(mockFetch).toHaveBeenCalled();
    });

    test('mockNetworkError creates a network error mock', async () => {
      const mockFetch = mockNetworkError();
      
      await expect(fetch('/test')).rejects.toThrow('Network error');
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe('DOM Utilities', () => {
    test('createMockSections creates and cleans up sections', () => {
      const cleanup = createMockSections(['test1', 'test2']);
      
      expect(document.getElementById('test1')).toBeInTheDocument();
      expect(document.getElementById('test2')).toBeInTheDocument();
      
      cleanup();
      
      expect(document.getElementById('test1')).not.toBeInTheDocument();
      expect(document.getElementById('test2')).not.toBeInTheDocument();
    });

    test('createMockMainContent creates and cleans up main element', () => {
      const { element, scrollIntoViewMock, cleanup } = createMockMainContent();
      
      expect(element).toBeInTheDocument();
      expect(element.id).toBe('main-content');
      expect(scrollIntoViewMock).toBeDefined();
      
      cleanup();
      
      expect(document.getElementById('main-content')).not.toBeInTheDocument();
    });
  });

  describe('Mock Data Utilities', () => {
    test('createMockService creates a service object', () => {
      const service = createMockService();
      
      expect(service).toHaveProperty('id');
      expect(service).toHaveProperty('title');
      expect(service).toHaveProperty('description');
      expect(service).toHaveProperty('iconName');
      expect(service).toHaveProperty('keywords');
    });

    test('createMockService accepts overrides', () => {
      const service = createMockService({
        title: 'Custom Title',
        description: 'Custom Description'
      });
      
      expect(service.title).toBe('Custom Title');
      expect(service.description).toBe('Custom Description');
    });

    test('createMockContactFormData creates form data', () => {
      const formData = createMockContactFormData();
      
      expect(formData).toHaveProperty('name');
      expect(formData).toHaveProperty('email');
      expect(formData).toHaveProperty('service');
      expect(formData).toHaveProperty('message');
    });

    test('createMockContactFormData accepts overrides', () => {
      const formData = createMockContactFormData({
        name: 'Jane Doe',
        email: 'jane@example.com'
      });
      
      expect(formData.name).toBe('Jane Doe');
      expect(formData.email).toBe('jane@example.com');
    });
  });

  describe('Accessibility Utilities', () => {
    test('hasVisibleFocusIndicator detects focus classes', () => {
      const element = document.createElement('button');
      element.className = 'focus-visible:ring-2';
      
      expect(hasVisibleFocusIndicator(element)).toBe(true);
    });

    test('hasVisibleFocusIndicator returns false for no focus classes', () => {
      const element = document.createElement('button');
      element.className = 'bg-blue-500';
      
      expect(hasVisibleFocusIndicator(element)).toBe(false);
    });

    test('isKeyboardAccessible detects focusable elements', () => {
      const button = document.createElement('button');
      expect(isKeyboardAccessible(button)).toBe(true);
      
      const link = document.createElement('a');
      expect(isKeyboardAccessible(link)).toBe(true);
      
      const input = document.createElement('input');
      expect(isKeyboardAccessible(input)).toBe(true);
    });

    test('meetsTouchTargetSize checks element dimensions', () => {
      const element = document.createElement('button');
      
      // Mock getBoundingClientRect
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        width: 44,
        height: 44,
        top: 0,
        left: 0,
        bottom: 44,
        right: 44,
        x: 0,
        y: 0,
        toJSON: () => ({})
      });
      
      expect(meetsTouchTargetSize(element)).toBe(true);
    });

    test('meetsTouchTargetSize returns false for small elements', () => {
      const element = document.createElement('button');
      
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        width: 20,
        height: 20,
        top: 0,
        left: 0,
        bottom: 20,
        right: 20,
        x: 0,
        y: 0,
        toJSON: () => ({})
      });
      
      expect(meetsTouchTargetSize(element)).toBe(false);
    });

    test('hasAriaLabel detects aria-label attribute', () => {
      const element = document.createElement('button');
      element.setAttribute('aria-label', 'Close');
      
      expect(hasAriaLabel(element)).toBe(true);
    });

    test('hasAriaLabel detects aria-labelledby attribute', () => {
      const element = document.createElement('button');
      element.setAttribute('aria-labelledby', 'label-id');
      
      expect(hasAriaLabel(element)).toBe(true);
    });

    test('hasAriaLabel returns false for no aria labels', () => {
      const element = document.createElement('button');
      
      expect(hasAriaLabel(element)).toBe(false);
    });
  });
});
