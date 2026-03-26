import { fireEvent, render, screen } from '@testing-library/react-native';
import { LucideIcon, LucideProps } from 'lucide-react-native';
import { View } from 'react-native';
import { MenuTile, type MenuTileProps } from './menu-tile';

const MOCK_TITLE = 'Account Settings';
const mockOnPress = jest.fn();
const MockIcon = (props: LucideProps) => <View testID="menu-icon" {...props} />;

const defaultProps: MenuTileProps = {
  title: MOCK_TITLE,
  icon: MockIcon as LucideIcon,
  onPress: mockOnPress,
};

const setup = (props?: Partial<MenuTileProps>) => {
  render(<MenuTile {...defaultProps} {...props} />);
};

describe('MenuTile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title correctly', () => {
    setup();
    expect(screen.getByText(MOCK_TITLE)).toBeOnTheScreen();
  });

  it('renders the icon with correct size and color', () => {
    const customColor = '#FF0000';
    setup({ iconColor: customColor });

    const icon = screen.getByTestId('menu-icon');
    expect(icon.props.size).toBe(20);
    expect(icon.props.color).toBe(customColor);
  });

  it('calls onPress when the tile is pressed', () => {
    setup();

    fireEvent.press(screen.getByText(MOCK_TITLE));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('shows the chevron by default', () => {
    setup();

    const chevron = screen.UNSAFE_queryByType(
      require('lucide-react-native').ChevronRight,
    );
    expect(chevron).toBeTruthy();
  });

  it('hides the chevron when showChevron is false', () => {
    setup({ showChevron: false });

    const chevron = screen.UNSAFE_queryByType(
      require('lucide-react-native').ChevronRight,
    );
    expect(chevron).toBeNull();
  });

  it('applies custom wrapper styles', () => {
    const customStyle = { backgroundColor: 'blue' };
    setup({ stylesWrapper: customStyle });

    expect(screen.getByRole('button').props.style).toContainEqual(customStyle);
  });
});
