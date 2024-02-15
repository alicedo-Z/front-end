import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPopup from './ErrorPopup';

describe('ErrorPopup Component Tests', () => {
  it('should not render when isVisible is false', () => {
    render(<ErrorPopup message="Test error message" isVisible={false} onClose={() => {}} />);
    const popupElement = screen.queryByText(/test error message/i);
    expect(popupElement).toBeNull();
  });

  it('should render correctly when isVisible is true', () => {
    render(<ErrorPopup message="Test error message" isVisible={true} onClose={() => {}} />);
    const popupElement = screen.getByText(/test error message/i);
    expect(popupElement).toBeInTheDocument();
  });

  it('should call onClose when the Close button is clicked', () => {
    const handleClose = jest.fn();
    render(<ErrorPopup message="Test error message" isVisible={true} onClose={handleClose} />);
    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
