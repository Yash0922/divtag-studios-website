import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('Button Component', () => {
  test('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('renders with default variant', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-primary-foreground');
  });

  test('renders with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive');
    expect(button).toHaveClass('text-destructive-foreground');
  });

  test('renders with outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-input');
  });

  test('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary');
    expect(button).toHaveClass('text-secondary-foreground');
  });

  test('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-accent');
  });

  test('renders with link variant', () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-primary');
    expect(button).toHaveClass('underline-offset-4');
  });

  test('renders with small size', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-9');
    expect(button).toHaveClass('px-3');
  });

  test('renders with large size', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-11');
    expect(button).toHaveClass('px-8');
  });

  test('renders with icon size', () => {
    render(<Button size="icon">+</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('w-10');
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  test('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:pointer-events-none');
    expect(button).toHaveClass('disabled:opacity-50');
  });

  test('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Button ref={ref}>Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test('accepts and applies HTML button attributes', () => {
    render(<Button type="submit" aria-label="Submit form">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-label', 'Submit form');
  });
});
