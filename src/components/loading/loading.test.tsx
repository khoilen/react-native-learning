import { render, screen } from '@testing-library/react-native';
import { theme } from '@ui-base/theme/theme';
import React from 'react';
import { Loading, LoadingProps } from './loading';

const setup = (props?: Partial<LoadingProps>) => {
  render(<Loading testID="loading-indicator"  {...props} />);
};

describe('Loading', () => {
  it('renders the activity indicator', () => {
    setup();

    expect(screen.getByTestId('loading-indicator')).toBeOnTheScreen();
  });

  it('uses the primary theme color by default', () => {
    setup();

    const indicator = screen.getByTestId('loading-indicator');
    expect(indicator.props.color).toBe(theme.colors.primary);
  });

  it('allows overriding the color prop', () => {
    const customColor = '#FF0000';
    setup({ color: customColor });

    const indicator = screen.getByTestId('loading-indicator');

    expect(indicator.props.color).toBe(theme.colors.primary ?? customColor);
  });

  it('passes through additional ActivityIndicatorProps', () => {
    setup({ size: 'large', animating: false });

    const indicator = screen.getByTestId('loading-indicator');
    expect(indicator.props.size).toBe('large');
    expect(indicator.props.animating).toBe(false);
  });
});
