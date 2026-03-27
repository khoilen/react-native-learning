import { HomeStackRoutes } from '@/navigation/stack-navigators/home-stack/home-stack-routes';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { MainTabs } from './main-tabs';

jest.mock('@/navigation/stack-navigators/home-stack/home-stack', () => ({
  HomeStack: () => null,
}));
jest.mock('@/navigation/stack-navigators/profile-stack/profile-stack', () => ({
  ProfileStack: () => null,
}));
jest.mock('../placeholder/placeholde', () => ({
  Placeholder: () => null,
}));

jest.mock('lucide-react-native', () => ({
  ShoppingBag: () => null,
  LayoutGrid: () => null,
  Heart: () => null,
  User: () => null,
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    getFocusedRouteNameFromRoute: jest.fn(),
  };
});

type SetupOptions = {
  routeName?: string | HomeStackRoutes;
};

const defaultOptions: SetupOptions = {
  routeName: HomeStackRoutes.HomeScreen,
};

const setup = (options?: SetupOptions) => {
  const setupOptions = { ...defaultOptions, ...options };

  (getFocusedRouteNameFromRoute as jest.Mock).mockReturnValue(
    setupOptions.routeName,
  );

  render(
    <NavigationContainer>
      <MainTabs testIdBottomBar="bottom-tab-bar" />
    </NavigationContainer>,
  );
};

describe('MainTabs', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders all four tab items correctly', () => {
    setup();

    expect(screen.getByText('Shop')).toBeOnTheScreen();
    expect(screen.getByText('Saved')).toBeOnTheScreen();
    expect(screen.getByText('Profile')).toBeOnTheScreen();
  });

  it('initially selects the first tab (Shop)', () => {
    setup();

    const shopTab = screen.getByRole('button', { name: /Shop/i });
    expect(shopTab.props.accessibilityState.selected).toBe(true);
  });

  it('defines the correct number of tabs in the bar', () => {
    setup();

    const tabs = screen.getAllByRole('button');
    expect(tabs.length).toBe(3);
  });

  it('hides the tab bar when on a hidden route ProductDetailScreen', async () => {
    setup({
      routeName: HomeStackRoutes.ProductDetailScreen,
    });

    const bottomTabBar = screen.queryByTestId('bottom-tab-bar');

    expect(bottomTabBar).toBeNull();
  });

  it('shows the tab bar when on a regular route (e.g., Shop)', () => {
    setup({
      routeName: 'Shop',
    });

    const bottomTabBar = screen.getByTestId('bottom-tab-bar');
    expect(bottomTabBar.props.style).not.toContainEqual({ display: 'none' });
    expect(bottomTabBar.props.style).toContainEqual({ display: 'flex' });
  });

  it('falls back to route.name if getFocusedRouteNameFromRoute returns undefined', () => {
    setup({
      routeName: undefined,
    });

    const bottomTabBar = screen.getByTestId('bottom-tab-bar');
    expect(bottomTabBar.props.style).toContainEqual({ display: 'flex' });
  });
});
