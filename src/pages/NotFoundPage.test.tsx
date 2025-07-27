import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFoundPage';
import { describe, expect, it } from 'vitest';

describe('NotFound', () => {
  it('renders 404 heading and message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '404 - Page Not Found'
    );
    expect(
      screen.getByText("Oops! The page you're looking for doesn't exist.")
    ).toBeInTheDocument();
  });

  it('has a link to go back to homepage', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /go back to homepage/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
