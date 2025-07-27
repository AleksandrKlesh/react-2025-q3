import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('SearchBar', () => {
  const setup = (initialValue = '') => {
    const onSearchMock = vi.fn();
    render(<SearchBar initialValue={initialValue} onSearch={onSearchMock} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });
    return { input, button, onSearchMock };
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders with initial value', () => {
    const { input } = setup('Morty');
    expect(input.value).toBe('Morty');
  });

  it('updates input value on change', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Summer' } });
    expect(input.value).toBe('Summer');
  });

  it('calls onSearch and saves to localStorage on click', () => {
    const { input, button, onSearchMock } = setup();
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('Rick');
    expect(localStorage.getItem('searchQuery')).toBe('Rick');
  });

  it('trims whitespace from search input before saving', () => {
    const { input, button, onSearchMock } = setup();
    fireEvent.change(input, { target: { value: '  Beth  ' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('Beth');
    expect(localStorage.getItem('searchQuery')).toBe('Beth');
  });
});
