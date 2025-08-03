import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import Card from './Card';
import { describe, expect, it, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: () => [new URLSearchParams('?page=1')],
  };
});

describe('Card', () => {
  const mockNavigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  const props = {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  };

  it('renders name, species, and gender correctly', () => {
    render(<Card {...props} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  it('renders image with correct src and alt', () => {
    render(<Card {...props} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toBe(props.image);
    expect(img.alt).toBe(props.name);
  });

  it('navigates on card click', () => {
    render(<Card {...props} />);
    fireEvent.click(screen.getByText('Rick Sanchez'));
    expect(mockNavigate).toHaveBeenCalledWith('/?page=1&details=1');
  });
});
