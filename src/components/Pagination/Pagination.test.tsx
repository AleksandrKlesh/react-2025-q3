import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

const mockSetSearchParams = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useSearchParams: () => [
      new URLSearchParams({ page: '1' }),
      mockSetSearchParams,
    ],
  };
});

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Prev, page buttons and Next', () => {
    render(<Pagination currentPage={1} totalPages={5} />);

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables Prev button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    const prevButton = screen.getByText('Prev') as HTMLButtonElement;
    expect(prevButton.disabled).toBe(true);
  });

  it('disables Next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    const nextButton = screen.getByText('Next') as HTMLButtonElement;
    expect(nextButton.disabled).toBe(true);
  });

  it('calls setSearchParams when a page is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} />);
    fireEvent.click(screen.getByText('3'));
    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});
