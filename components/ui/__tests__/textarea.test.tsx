import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '../textarea';

describe('Textarea Component', () => {
  test('renders correctly', () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toBeInTheDocument();
  });

  test('applies default styling classes', () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('flex');
    expect(textarea).toHaveClass('min-h-[80px]');
    expect(textarea).toHaveClass('w-full');
    expect(textarea).toHaveClass('rounded-md');
    expect(textarea).toHaveClass('border');
    expect(textarea).toHaveClass('border-input');
    expect(textarea).toHaveClass('bg-background');
  });

  test('applies custom className', () => {
    render(<Textarea className="custom-textarea" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('custom-textarea');
  });

  test('handles user input', async () => {
    const user = userEvent.setup();
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

    await user.type(textarea, 'Hello World\nMultiple lines');
    expect(textarea.value).toBe('Hello World\nMultiple lines');
  });

  test('handles disabled state', () => {
    render(<Textarea disabled data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:cursor-not-allowed');
    expect(textarea).toHaveClass('disabled:opacity-50');
  });

  test('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  test('accepts and applies HTML textarea attributes', () => {
    render(
      <Textarea
        data-testid="textarea"
        placeholder="Enter message"
        required
        aria-label="Message textarea"
        maxLength={500}
        rows={5}
      />
    );
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('placeholder', 'Enter message');
    expect(textarea).toHaveAttribute('required');
    expect(textarea).toHaveAttribute('aria-label', 'Message textarea');
    expect(textarea).toHaveAttribute('maxLength', '500');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  test('displays placeholder text', () => {
    render(<Textarea placeholder="Type your message..." />);
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
  });

  test('handles value prop', () => {
    render(<Textarea value="Initial value" onChange={() => {}} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('Initial value');
  });

  test('handles defaultValue prop', () => {
    render(<Textarea defaultValue="Default text" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('Default text');
  });

  test('applies focus-visible styles', () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('focus-visible:outline-none');
    expect(textarea).toHaveClass('focus-visible:ring-2');
    expect(textarea).toHaveClass('focus-visible:ring-ring');
    expect(textarea).toHaveClass('focus-visible:ring-offset-2');
  });

  test('handles multiline text', async () => {
    const user = userEvent.setup();
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

    const multilineText = 'Line 1\nLine 2\nLine 3';
    await user.type(textarea, multilineText);
    expect(textarea.value).toBe(multilineText);
  });

  test('respects rows attribute for height', () => {
    render(<Textarea rows={10} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('rows', '10');
  });
});
