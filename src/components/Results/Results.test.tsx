import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import Results from './Results';
import { describe, expect, it } from 'vitest';

const mockData = [
  {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    gender: 'Male',
    image: 'https://example.com/rick.png',
  },

  {
    id: 2,
    name: 'Morty Smith',
    species: 'Human',
    gender: 'Male',
    image: 'https://example.com/morty.png',
  },
];

describe('Results', () => {
  it('shows loading message when loading is true', () => {
    render(<Results loading={true} error={null} data={[]} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(
      <Results loading={false} error={'Something went wrong'} data={[]} />
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows "No results found" when data is empty', () => {
    render(<Results loading={false} error={null} data={[]} />);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders a Card for each item in the data array', () => {
    render(<Results loading={false} error={null} data={mockData} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
