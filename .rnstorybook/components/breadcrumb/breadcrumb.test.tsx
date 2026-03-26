import { fireEvent, render, screen } from '@testing-library/react-native';
import { View } from 'react-native';
import { Breadcrumb, BreadcrumbProps } from './breadcrumb';

const mockOnBackPress = jest.fn();

const defaultProps: BreadcrumbProps = {
  title: 'Test Title',
  onBackPress: mockOnBackPress,
};

const setup = (props?: Partial<BreadcrumbProps>) => {
  render(<Breadcrumb {...defaultProps} {...props} />);
};

describe('Breadcrumb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title correctly', () => {
    setup({ title: 'Profile Settings' });

    expect(screen.getByText('Profile Settings')).toBeOnTheScreen();
  });

  it('renders the back button by default', () => {
    setup();

    expect(screen.getByRole('button')).toBeOnTheScreen();
  });

  it('does not render the back button when showBack is false', () => {
    setup({ showBack: false });

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('calls onBackPress when the back button is pressed', () => {
    setup();

    fireEvent.press(screen.getByRole('button'));

    expect(mockOnBackPress).toHaveBeenCalledTimes(1);
  });

  it('renders the rightIcon when provided', () => {
    const MockRightIcon = <View testID="right-icon-test" />;
    setup({ rightIcon: MockRightIcon });

    expect(screen.getByTestId('right-icon-test')).toBeOnTheScreen();
  });

  it('renders the ChevronLeft icon inside the back button', () => {
    setup();

    const icon = screen.UNSAFE_queryByType(
      require('lucide-react-native').ChevronLeft,
    );

    expect(icon).toBeTruthy();
  });
});
