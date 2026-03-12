import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../input';

describe('Input Component', () => {
  test('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  test('applies default styling classes', () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('flex');
    expect(input).toHaveClass('h-10');
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('rounded-md');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('border-input');
    expect(input).toHaveClass('bg-background');
  });

  test('applies custom className', () => {
    render(<Input className="custom-input" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('custom-input');
  });

  test('renders with different input types', () => {
    const { rerender } = render(<Input type="text" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'text');

    rerender(<Input type="email" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');

    rerender(<Input type="number" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'number');
  });

  test('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" />);
    const input = screen.getByTestId('input') as HTMLInputElement;

    await user.type(input, 'Hello World');
    expect(input.value).toBe('Hello World');
  });

  test('handles disabled state', () => {
    render(<Input disabled data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed');
    expect(input).toHaveClass('disabled:opacity-50');
  });

  test('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('accepts and applies HTML input attributes', () => {
    render(
      <Input
        data-testid="input"
        placeholder="Enter email"
        required
        aria-label="Email input"
        maxLength={50}
      />
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-label', 'Email input');
    expect(input).toHaveAttribute('maxLength', '50');
  });

  test('displays placeholder text', () => {
    render(<Input placeholder="Search..." />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('handles value prop', () => {
    render(<Input value="Initial value" onChange={() => {}} data-testid="input" />);
    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe('Initial value');
  });

  test('handles defaultValue prop', () => {
    render(<Input defaultValue="Default text" data-testid="input" />);
    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe('Default text');
  });

  test('applies focus-visible styles', () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('focus-visible:outline-none');
    expect(input).toHaveClass('focus-visible:ring-2');
    expect(input).toHaveClass('focus-visible:ring-ring');
    expect(input).toHaveClass('focus-visible:ring-offset-2');
  });
});
