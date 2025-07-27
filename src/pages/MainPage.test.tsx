import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';

vi.mock('../components/App/App', () => ({
  default: () => <div data-testid="app">Mock App</div>,
}));
vi.mock('../components/Header/Header', () => ({
  default: () => <div data-testid="header">Mock Header</div>,
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('MainPage', () => {
  it('renders Header and App', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('does not render Outlet when no "details" param is present', () => {
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <MainPage />
      </MemoryRouter>
    );

    const outletContainer = screen.queryByText('Outlet content');
    expect(outletContainer).not.toBeInTheDocument();
  });

  it('renders Outlet when "details" param is present', () => {
    render(
      <MemoryRouter initialEntries={['/?page=2&details=123']}>
        <MainPage />
      </MemoryRouter>
    );

    const outletDivs = screen.getAllByRole('generic');
    expect(outletDivs.some((div) => div.className.includes('max-w-md'))).toBe(
      true
    );
  });

  it('clicking on App container triggers navigation when "details" param exists', () => {
    render(
      <MemoryRouter initialEntries={['/?page=2&details=456']}>
        <MainPage />
      </MemoryRouter>
    );

    const appContainer = screen.getByTestId('app').parentElement;
    if (!appContainer) return;
    fireEvent.click(appContainer);
    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('clicking on App container does nothing when "details" param does not exist', () => {
    mockNavigate.mockClear();
    render(
      <MemoryRouter initialEntries={['/?page=3']}>
        <MainPage />
      </MemoryRouter>
    );

    const appContainer = screen.getByTestId('app').parentElement;
    if (!appContainer) return;
    fireEvent.click(appContainer);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
