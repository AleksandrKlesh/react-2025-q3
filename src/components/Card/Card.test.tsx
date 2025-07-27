import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import Card from './Card';
import { describe, expect, it } from 'vitest';

describe('Card', () => {
  const props = {
    name: 'Rick Sanchez',
    species: 'Human',
    gender: 'Male',
    image: 'https://example.com/rick.png',
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
});
