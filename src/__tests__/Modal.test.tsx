import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../components/Modal/Modal';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Modal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <div>Content</div>
      </Modal>
    );

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Modal>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onClose when Escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking on overlay', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Modal>
    );

    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside modal content', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <button>Click Me</button>
      </Modal>
    );

    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('focuses the first focusable element inside modal when opened', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>
          <input placeholder="Name" />
          <button>Submit</button>
        </div>
      </Modal>
    );

    const input = screen.getByPlaceholderText('Name');
    expect(document.activeElement).toBe(input);
  });
});
