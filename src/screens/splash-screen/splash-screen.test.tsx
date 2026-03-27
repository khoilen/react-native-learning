import { Loading } from '@/components/loading/loading';
import { render, screen } from '@testing-library/react-native';
import { theme } from '@ui-base/theme/theme';
import React from 'react';
import { SplashScreen } from './splash-screen';
import { styles } from './styles';

const setup = () => {
  render(<SplashScreen />);
};

describe('SplashScreen', () => {
  it('renders the Loading component with correct props', () => {
    setup();

    const loading = screen.UNSAFE_queryByType(Loading);

    expect(loading?.props.size).toBe('large');
    expect(loading?.props.color).toBe(theme.colors.primary);
  });

  it('renders the container View with the correct styles', () => {
    setup();

    const container = screen.UNSAFE_queryByType(Loading)?.parent;

    expect(container?.props.style).toEqual(styles.container);
  });

  it('uses the primary color from the theme directly', () => {
    setup();

    expect(screen.UNSAFE_queryByType(Loading)?.props.color).toEqual(
      theme.colors.primary,
    );
  });
});
