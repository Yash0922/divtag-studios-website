import { describe, test, expect } from 'vitest';
import { POST, GET, PUT, DELETE, PATCH } from '../route';

describe('POST /api/contact', () => {
  test('returns success for valid data', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        service: 'web-development',
        message: 'I need a professional website for my business'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain('Thank you');
  });

  test('returns 400 for invalid email', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid-email',
        service: 'web-development',
        message: 'I need a website'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Invalid form data');
  });

  test('returns 400 for missing required fields', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
        // Missing service and message
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  test('returns 400 for name too short', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'A',
        email: 'john@example.com',
        service: 'web-development',
        message: 'I need a website'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  test('returns 400 for message too short', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        service: 'web-development',
        message: 'Short'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });
});

describe('GET /api/contact', () => {
  test('returns 405 Method Not Allowed', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data.error).toBe('Method not allowed');
  });
});

describe('PUT /api/contact', () => {
  test('returns 405 Method Not Allowed', async () => {
    const response = await PUT();
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data.error).toBe('Method not allowed');
  });
});

describe('DELETE /api/contact', () => {
  test('returns 405 Method Not Allowed', async () => {
    const response = await DELETE();
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data.error).toBe('Method not allowed');
  });
});

describe('PATCH /api/contact', () => {
  test('returns 405 Method Not Allowed', async () => {
    const response = await PATCH();
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data.error).toBe('Method not allowed');
  });
});
