import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './AboutPage';
import { describe, expect, it } from 'vitest';

describe('About', () => {
  it('renders headings, description, and links', () => {
    render(<About />, { wrapper: MemoryRouter });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'About us'
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Developed by Aleksandr Kleshchev'
    );
    expect(
      screen.getByText('Passionate junior developer studying at RS-School.')
    ).toBeInTheDocument();

    const externalLink = screen.getByRole('link', {
      name: /RS-School React Course/i,
    });
    expect(externalLink).toBeInTheDocument();
    expect(externalLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(externalLink).toHaveAttribute('target', '_blank');

    const internalLink = screen.getByRole('link', {
      name: /Go back to homepage/i,
    });
    expect(internalLink).toBeInTheDocument();
    expect(internalLink).toHaveAttribute('href', '/');
  });
});
