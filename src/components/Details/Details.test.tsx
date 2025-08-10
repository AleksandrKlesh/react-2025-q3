import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Details from './Details';
import * as fetchModule from '../../services/fetchCharecter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('../../services/fetchCharecter');

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useSearchParams: vi.fn(),
  };
});

const mockQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  gender: 'Male',
  type: '',
  status: 'Alive',
  origin: { name: 'Earth' },
  location: { name: 'Citadel of Ricks' },
  image: 'rick.png',
};

describe('<Details />', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    navigateMock.mockClear();
  });

  it('renders character details when ID is in search params', async () => {
    vi.spyOn(fetchModule, 'default').mockResolvedValue(mockCharacter);

    render(
      <QueryClientProvider client={mockQueryClient()}>
        <MemoryRouter initialEntries={['/?page=2&details=1']}>
          <Details />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Loading details/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
      expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
      expect(screen.getByText(/Origin: Earth/i)).toBeInTheDocument();
    });
  });

  it('navigates to correct page when "Close" button is clicked', async () => {
    vi.mock('react-router-dom', async () => {
      const actual =
        await vi.importActual<typeof import('react-router-dom')>(
          'react-router-dom'
        );
      return {
        ...actual,
        useNavigate: () => navigateMock,
        useSearchParams: () => [new URLSearchParams('page=2&details=1')],
      };
    });

    vi.spyOn(fetchModule, 'default').mockResolvedValue(mockCharacter);

    render(
      <QueryClientProvider client={mockQueryClient()}>
        <MemoryRouter initialEntries={['/?page=2&details=1']}>
          <Details />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByText(/Rick Sanchez/i));
    fireEvent.click(screen.getByText(/Close/i));

    expect(navigateMock).toHaveBeenCalledWith('/?page=2');
  });

  it('renders "No character found" if fetch returns null', async () => {
    vi.spyOn(fetchModule, 'default').mockResolvedValue(null);

    render(
      <QueryClientProvider client={mockQueryClient()}>
        <MemoryRouter initialEntries={['/?page=2&details=1']}>
          <Details />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/No character found/i)).toBeInTheDocument();
    });
  });
});
