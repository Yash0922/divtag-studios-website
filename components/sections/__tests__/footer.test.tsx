import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Footer } from '../footer';

describe('Footer', () => {
  test('displays copyright notice with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Div Tag Studios. All rights reserved.`)).toBeInTheDocument();
  });

  test('displays company name and tagline', () => {
    render(<Footer />);
    expect(screen.getByText('Div Tag Studios')).toBeInTheDocument();
    expect(screen.getByText('Turning Pixels into Products')).toBeInTheDocument();
  });

  test('displays company email contact', () => {
    render(<Footer />);
    const emailLink = screen.getByRole('link', { name: /contact@divtagstudios\.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@divtagstudios.com');
  });

  test('displays social media links with proper attributes', () => {
    render(<Footer />);
    
    // LinkedIn link
    const linkedinLink = screen.getByRole('link', { name: /visit our linkedin page/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/company/divtagstudios');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Twitter link
    const twitterLink = screen.getByRole('link', { name: /visit our twitter profile/i });
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/divtagstudios');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // GitHub link
    const githubLink = screen.getByRole('link', { name: /visit our github profile/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/divtagstudios');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('social media links have aria-labels for accessibility', () => {
    render(<Footer />);
    
    expect(screen.getByLabelText('Visit our LinkedIn page')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit our Twitter profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit our GitHub profile')).toBeInTheDocument();
  });

  test('renders as a footer element', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  test('displays contact section heading', () => {
    render(<Footer />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('displays follow us section heading', () => {
    render(<Footer />);
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
  });
});
