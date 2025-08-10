import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as api from '../../services/fetchData';
import App from './App';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('../../services/fetchData');

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

const mockQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders SearchBar initially', () => {
    (api.fetchData as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: [],
      info: { pages: 1 },
    });

    render(
      <QueryClientProvider client={mockQueryClient()}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(
      screen.getByPlaceholderText(/search characters/i)
    ).toBeInTheDocument();
  });

  it('shows loading during fetch', async () => {
    (api.fetchData as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve({ results: [mockCharacter], info: { pages: 1 } }),
            50
          )
        )
    );

    render(
      <QueryClientProvider client={mockQueryClient()}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    waitFor(() => {
      expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    });
  });

  it('shows characters cards on successful fetch', async () => {
    (api.fetchData as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: [mockCharacter],
      info: { pages: 1 },
    });

    render(
      <QueryClientProvider client={mockQueryClient()}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/search characters/i);
    await userEvent.type(input, 'rick');

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('shows "No results found." on 404', async () => {
    (api.fetchData as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: [],
      info: { pages: 1 },
    });

    render(
      <QueryClientProvider client={mockQueryClient()}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/search characters/i);
    await userEvent.type(input, 'unknown');

    await waitFor(() => {
      expect(screen.getByText(/no results found./i)).toBeInTheDocument();
    });
  });
});
