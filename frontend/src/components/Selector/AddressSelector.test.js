import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddressSelector from './AddressSelector';

describe('AddressSelector Component', () => {
  it('renders correctly', () => {
    render(<AddressSelector />);
    expect(screen.getByText('States')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Street')).toBeInTheDocument();
  });

  it('updates cities based on state selection', () => {
    render(<AddressSelector />);
    const stateSelect = screen.getByText('States').parentElement;

    // Simulate selecting 'NSW'
    fireEvent.change(stateSelect, { target: { value: 'NSW' } });
    expect(stateSelect.value).toBe('NSW');

    // Check if cities dropdown is updated
    expect(screen.getByText('Sydney')).toBeInTheDocument();
    expect(screen.getByText('Newcastle')).toBeInTheDocument();
    expect(screen.getByText('Wollongong')).toBeInTheDocument();
  });

  it('disables cities dropdown when no state is selected', () => {
    render(<AddressSelector />);
    const citiesSelect = screen.getByText('Cities').parentElement;
    expect(citiesSelect).toBeDisabled();
  });
});
