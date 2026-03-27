import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { ProductFeatures } from './product-features';

jest.mock('lucide-react-native', () => ({
  Battery: () => null,
  Zap: () => null,
  Droplets: () => null,
  ShieldCheck: () => null,
}));

const setup = () => render(<ProductFeatures />);

describe('ProductFeatures', () => {
  it('renders the section header correctly', () => {
    setup();
    expect(screen.getByText('Key Features')).toBeTruthy();
  });

  it('renders all four feature items with correct labels and values', () => {
    setup();

    expect(screen.getByText('Battery')).toBeTruthy();
    expect(screen.getByText('48 Hours')).toBeTruthy();

    expect(screen.getByText('Sync')).toBeTruthy();
    expect(screen.getByText('Bluetooth 5.2')).toBeTruthy();

    expect(screen.getByText('Water')).toBeTruthy();
    expect(screen.getByText('5ATM Resist')).toBeTruthy();

    expect(screen.getByText('Warranty')).toBeTruthy();
    expect(screen.getByText('12 Months')).toBeTruthy();
  });
});
