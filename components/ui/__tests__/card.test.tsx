import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../card';

describe('Card Components', () => {
  describe('Card', () => {
    test('renders correctly', () => {
      render(<Card data-testid="card">Card content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent('Card content');
    });

    test('applies default styling classes', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('bg-card');
      expect(card).toHaveClass('text-card-foreground');
      expect(card).toHaveClass('shadow-sm');
    });

    test('applies custom className', () => {
      render(<Card className="custom-card" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-card');
    });

    test('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardHeader', () => {
    test('renders correctly', () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>);
      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Header content');
    });

    test('applies default styling classes', () => {
      render(<CardHeader data-testid="header">Content</CardHeader>);
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('flex');
      expect(header).toHaveClass('flex-col');
      expect(header).toHaveClass('space-y-1.5');
      expect(header).toHaveClass('p-6');
    });

    test('applies custom className', () => {
      render(<CardHeader className="custom-header" data-testid="header">Content</CardHeader>);
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('CardTitle', () => {
    test('renders correctly', () => {
      render(<CardTitle data-testid="title">Card Title</CardTitle>);
      const title = screen.getByTestId('title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Card Title');
    });

    test('applies default styling classes', () => {
      render(<CardTitle data-testid="title">Title</CardTitle>);
      const title = screen.getByTestId('title');
      expect(title).toHaveClass('text-2xl');
      expect(title).toHaveClass('font-semibold');
      expect(title).toHaveClass('leading-none');
      expect(title).toHaveClass('tracking-tight');
    });

    test('applies custom className', () => {
      render(<CardTitle className="custom-title" data-testid="title">Title</CardTitle>);
      const title = screen.getByTestId('title');
      expect(title).toHaveClass('custom-title');
    });
  });

  describe('CardDescription', () => {
    test('renders correctly', () => {
      render(<CardDescription data-testid="description">Description text</CardDescription>);
      const description = screen.getByTestId('description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent('Description text');
    });

    test('applies default styling classes', () => {
      render(<CardDescription data-testid="description">Text</CardDescription>);
      const description = screen.getByTestId('description');
      expect(description).toHaveClass('text-sm');
      expect(description).toHaveClass('text-muted-foreground');
    });

    test('applies custom className', () => {
      render(<CardDescription className="custom-desc" data-testid="description">Text</CardDescription>);
      const description = screen.getByTestId('description');
      expect(description).toHaveClass('custom-desc');
    });
  });

  describe('CardContent', () => {
    test('renders correctly', () => {
      render(<CardContent data-testid="content">Content text</CardContent>);
      const content = screen.getByTestId('content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent('Content text');
    });

    test('applies default styling classes', () => {
      render(<CardContent data-testid="content">Text</CardContent>);
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('p-6');
      expect(content).toHaveClass('pt-0');
    });

    test('applies custom className', () => {
      render(<CardContent className="custom-content" data-testid="content">Text</CardContent>);
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('custom-content');
    });
  });

  describe('CardFooter', () => {
    test('renders correctly', () => {
      render(<CardFooter data-testid="footer">Footer content</CardFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveTextContent('Footer content');
    });

    test('applies default styling classes', () => {
      render(<CardFooter data-testid="footer">Content</CardFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('flex');
      expect(footer).toHaveClass('items-center');
      expect(footer).toHaveClass('p-6');
      expect(footer).toHaveClass('pt-0');
    });

    test('applies custom className', () => {
      render(<CardFooter className="custom-footer" data-testid="footer">Content</CardFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('Card Integration', () => {
    test('renders complete card with all components', () => {
      render(
        <Card data-testid="card">
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });
  });
});
