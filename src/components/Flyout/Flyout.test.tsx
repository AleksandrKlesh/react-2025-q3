import { beforeEach, describe, expect, it, vi } from 'vitest';
import Flyout from './Flyout';
import { fireEvent, render, screen } from '@testing-library/react';
import downloadCsv from '../../utils/downloadCSV';

vi.mock('../../hooks/useSelectedItemsStore');
vi.mock('../../utils/downloadCSV', () => ({
  default: vi.fn(),
}));

describe('Flyout', () => {
  const mockClearItems = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();

    const store = await import('../../hooks/useSelectedItemsStore');

    vi.spyOn(store, 'useSelectedItemsStore').mockReturnValue({
      selectedItems: {
        1: {
          id: 1,
          name: 'Rick Sanchez',
          species: 'Human',
          gender: 'Male',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        },
      },
      clearItems: mockClearItems,
      toggleItem: function (): void {
        throw new Error('Function not implemented.');
      },
    });
  });

  it('renders the flyout with selected items and handles unselect', () => {
    render(<Flyout />);
    expect(screen.getByText('1 item selected')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Unselect all'));
    expect(mockClearItems).toHaveBeenCalled();
  });

  it('triggers CSV download on click', () => {
    render(<Flyout />);
    fireEvent.click(screen.getByText('Download'));
    expect(downloadCsv).toHaveBeenCalledWith([
      {
        id: 1,
        name: 'Rick Sanchez',
        species: 'Human',
        gender: 'Male',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
    ]);
  });

  it('renders nothing when no items selected', async () => {
    const store = await import('../../hooks/useSelectedItemsStore');
    vi.spyOn(store, 'useSelectedItemsStore').mockReturnValue({
      selectedItems: {},
      clearItems: vi.fn(),
      toggleItem: function (): void {
        throw new Error('Function not implemented.');
      },
    });

    const { container } = render(<Flyout />);
    expect(container.firstChild).toBeNull();
  });
});
