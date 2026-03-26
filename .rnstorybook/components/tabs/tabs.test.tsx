import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet, Text } from 'react-native';
import { Tabs, type TabItem } from './tabs';

jest.mock('./hooks/use-tabs-animation', () => ({
  useTabsAnimation: () => ({
    scale: 1,
    contentOpacity: 1,
    contentTranslateY: 0,
    animatePress: jest.fn(),
    animateContent: jest.fn(),
  }),
}));

const mockOnChange = jest.fn();

const MOCK_TABS: TabItem[] = [
  {
    key: 'tab1',
    label: 'Tab One',
    children: <Text testID="content-1">Content 1</Text>,
  },
  {
    key: 'tab2',
    label: 'Tab Two',
    children: <Text testID="content-2">Content 2</Text>,
  },
];

const defaultProps = {
  tabs: MOCK_TABS,
  onChange: mockOnChange,
};

const setup = (props = {}) => {
  render(<Tabs {...defaultProps} {...props} />);
};

describe('Tabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all tab labels correctly', () => {
    setup();
    expect(screen.getByText('Tab One')).toBeOnTheScreen();
    expect(screen.getByText('Tab Two')).toBeOnTheScreen();
  });

  it('initially displays the first tab content', () => {
    setup();
    expect(screen.getByTestId('content-1')).toBeOnTheScreen();
    expect(screen.queryByTestId('content-2')).toBeNull();
  });

  it('changes content and calls onChange when a tab is pressed', () => {
    setup();

    fireEvent.press(screen.getByText('Tab Two'));

    expect(mockOnChange).toHaveBeenCalledWith('tab2');
    expect(screen.getByTestId('content-2')).toBeOnTheScreen();
    expect(screen.queryByTestId('content-1')).toBeNull();
  });

  it('uses activeKey prop to set initial selected tab', () => {
    setup({ activeKey: 'tab2' });

    expect(screen.getByTestId('content-2')).toBeOnTheScreen();

    const tabTwo = screen.getByRole('button', { name: /Tab Two/i });
    expect(tabTwo.props.accessibilityState.selected).toBe(true);
  });

  it('applies custom tab and label styles', () => {
    const activeTabStyle = { backgroundColor: 'red' };
    const activeLabelStyle = { color: 'blue' };

    setup({ activeTabStyle, activeLabelStyle });

    const activeLabel = screen.getByText('Tab One');
    const activeTab = screen.getByRole('button', { name: /Tab One/i });

    const flattenedLabelStyle = StyleSheet.flatten(activeLabel.props.style);
    const flattenedTabStyle = StyleSheet.flatten(activeTab.props.style);

    expect(flattenedLabelStyle).toMatchObject(activeLabelStyle);
    expect(flattenedTabStyle).toMatchObject(activeTabStyle);
  });
});
