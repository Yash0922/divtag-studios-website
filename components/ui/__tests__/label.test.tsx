import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from '../label';

describe('Label Component', () => {
  test('renders correctly', () => {
    render(<Label>Label text</Label>);
    expect(screen.getByText('Label text')).toBeInTheDocument();
  });

  test('applies default styling classes', () => {
    render(<Label data-testid="label">Text</Label>);
    const label = screen.getByTestId('label');
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('font-medium');
    expect(label).toHaveClass('leading-none');
  });

  test('applies custom className', () => {
    render(<Label className="custom-label" data-testid="label">Text</Label>);
    const label = screen.getByTestId('label');
    expect(label).toHaveClass('custom-label');
  });

  test('associates with input using htmlFor', () => {
    render(
      <div>
        <Label htmlFor="test-input">Email</Label>
        <input id="test-input" type="email" />
      </div>
    );
    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  test('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Label ref={ref}>Label</Label>);
    expect(ref.current).not.toBeNull();
  });

  test('handles peer-disabled styling', () => {
    render(<Label data-testid="label">Disabled Label</Label>);
    const label = screen.getByTestId('label');
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
    expect(label).toHaveClass('peer-disabled:opacity-70');
  });

  test('accepts and applies HTML label attributes', () => {
    render(
      <Label data-testid="label" htmlFor="input-id" aria-label="Form label">
        Name
      </Label>
    );
    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('for', 'input-id');
    expect(label).toHaveAttribute('aria-label', 'Form label');
  });

  test('renders with children elements', () => {
    render(
      <Label>
        <span>Required</span> Field
      </Label>
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByText(/Field/)).toBeInTheDocument();
  });
});
