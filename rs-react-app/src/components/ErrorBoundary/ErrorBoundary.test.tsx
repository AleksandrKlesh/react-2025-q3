import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const ProblemChild = () => {
  throw new Error('App crashed');
};

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should catch an error and display fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const fallbackText = screen.getByText(/something went wrong/i);
    expect(fallbackText).toBeInTheDocument();
  });

  it('should render children wnen no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>No Error</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/no error/i)).toBeInTheDocument();
  });
});
