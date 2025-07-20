import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as api from '../../api/fetchData';
import App from './App';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';

vi.mock('../../api/fetchData');

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders SearchBar initially', () => {
    (api.fetchData as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    render(<App />);
    expect(
      screen.getByPlaceholderText(/search characters/i)
    ).toBeInTheDocument();
  });

  it('shows characters cards on successful fetch', async () => {
    (api.fetchData as ReturnType<typeof vi.fn>).mockResolvedValue([
      mockCharacter,
    ]);

    render(<App />);
    const input = screen.getByPlaceholderText(/search characters/i);
    await userEvent.type(input, 'rick');

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('shows "No results found." on 404', async () => {
    (api.fetchData as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    render(<App />);
    const input = screen.getByPlaceholderText(/search characters/i);
    await userEvent.type(input, 'unknown');

    await waitFor(() => {
      expect(screen.getByText(/no results found./i)).toBeInTheDocument();
    });
  });

  it('shows error boundary on click', () => {
    render(<App />);
    const button = screen.getByText(/throw error/i);
    userEvent.click(button);

    waitFor(() => {
      expect(
        screen.getByText(/something went wrong, try reloading the page/i)
      ).toBeInTheDocument();
    });
  });
});
