import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductActions } from './product-actions';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

const setup = () => {
  (useSafeAreaInsets as jest.Mock).mockReturnValue({
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  });

  return render(<ProductActions />);
};

describe('ProductActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both action buttons', () => {
    setup();

    expect(screen.getByText(/add to cart/i)).toBeTruthy();
    expect(screen.getByText(/buy now/i)).toBeTruthy();
  });
});
