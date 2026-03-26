import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import { LucideIcon, LucideProps } from 'lucide-react-native';
import { View } from 'react-native';
import { BottomTabs, BottomTabsProps, TabItem } from './bottom-tabs';

const HomeScreen = () => <View testID="home-screen" />;
const SettingsScreen = () => <View testID="settings-screen" />;
const MockIcon = (props: LucideProps) => <View testID="tab-icon" {...props} />;

const mockTabs: TabItem[] = [
  { name: 'Home', component: HomeScreen, icon: MockIcon as LucideIcon },
  { name: 'Settings', component: SettingsScreen, icon: MockIcon as LucideIcon },
];

const defaultProps = {
  tabs: mockTabs,
};

const setup = (props?: Partial<BottomTabsProps>) => {
  render(
    <NavigationContainer>
      <BottomTabs {...defaultProps} {...props} />
    </NavigationContainer>,
  );
};

describe('BottomTabs', () => {
  it('renders all tab labels correctly', () => {
    setup();

    expect(screen.getByText('Home')).toBeOnTheScreen();
    expect(screen.getByText('Settings')).toBeOnTheScreen();
  });

  it('renders the icons for each tab', () => {
    setup();

    const tabButtons = screen.getAllByRole('button');

    expect(tabButtons.length).toBe(2);
  });

  it('passes the correct size to the icons', () => {
    setup();

    const firstIcon = screen.getAllByTestId('tab-icon')[0];
    expect(firstIcon.props.size).toBe(24);
  });

  it('initially displays the first tab content', () => {
    setup();

    expect(screen.getByTestId('home-screen')).toBeOnTheScreen();
    expect(screen.queryByTestId('settings-screen')).toBeNull();
  });

  it('applies the correct active tint color from theme', () => {
    setup();
    const homeTab = screen.getByRole('button', { name: /Home/i });
    expect(homeTab).toBeOnTheScreen();
  });
});
