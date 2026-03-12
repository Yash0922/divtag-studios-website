import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '../select';

describe('Select Components', () => {
  describe('Select with Trigger and Content', () => {
    test('renders select trigger correctly', () => {
      render(
        <Select>
          <SelectTrigger data-testid="trigger">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
        </Select>
      );
      expect(screen.getByTestId('trigger')).toBeInTheDocument();
    });

    test('displays placeholder text', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
        </Select>
      );
      expect(screen.getByText('Choose option')).toBeInTheDocument();
    });

    test('renders with items', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByText('Select')).toBeInTheDocument();
    });

    test('applies custom className to trigger', () => {
      render(
        <Select>
          <SelectTrigger className="custom-trigger" data-testid="trigger">
            <SelectValue />
          </SelectTrigger>
        </Select>
      );
      expect(screen.getByTestId('trigger')).toHaveClass('custom-trigger');
    });

    test('trigger has correct default styling', () => {
      render(
        <Select>
          <SelectTrigger data-testid="trigger">
            <SelectValue />
          </SelectTrigger>
        </Select>
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveClass('flex');
      expect(trigger).toHaveClass('h-10');
      expect(trigger).toHaveClass('w-full');
      expect(trigger).toHaveClass('rounded-md');
      expect(trigger).toHaveClass('border');
    });

    test('handles disabled state', () => {
      render(
        <Select disabled>
          <SelectTrigger data-testid="trigger">
            <SelectValue />
          </SelectTrigger>
        </Select>
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toBeDisabled();
    });
  });

  describe('SelectItem', () => {
    test('renders select items with correct structure', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    test('applies custom className to item', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test" className="custom-item">
              Test
            </SelectItem>
          </SelectContent>
        </Select>
      );
      const item = screen.getByText('Test').closest('[role="option"]');
      expect(item).toHaveClass('custom-item');
    });
  });

  describe('SelectGroup and SelectLabel', () => {
    test('renders select group with label', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group Label</SelectLabel>
              <SelectItem value="item1">Item 1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
      expect(screen.getByText('Group Label')).toBeInTheDocument();
    });

    test('applies custom className to label', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="custom-label" data-testid="label">
                Label
              </SelectLabel>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
      expect(screen.getByTestId('label')).toHaveClass('custom-label');
    });
  });

  describe('SelectSeparator', () => {
    test('renders separator', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
            <SelectSeparator data-testid="separator" />
            <SelectItem value="item2">Item 2</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });

    test('applies custom className to separator', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectSeparator className="custom-separator" data-testid="separator" />
          </SelectContent>
        </Select>
      );
      expect(screen.getByTestId('separator')).toHaveClass('custom-separator');
    });
  });

  describe('Select Integration', () => {
    test('renders complete select with all components', () => {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <SelectItem value="carrot">Carrot</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );

      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Vegetables')).toBeInTheDocument();
      expect(screen.getByText('Carrot')).toBeInTheDocument();
    });
  });
});
