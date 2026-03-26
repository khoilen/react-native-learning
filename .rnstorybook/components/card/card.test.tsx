import { fireEvent, render, screen } from '@testing-library/react-native';
import { View } from 'react-native';
import { Card, type CardProps } from './card';

const mockOnFavoritePress = jest.fn();
const mockOnPressCard = jest.fn();

const MOCK_TITLE = 'Classic T-Shirt';
const MOCK_CAPTION = 'Comfortable cotton blend';
const MOCK_IMAGE = 'https://test.com';

const defaultProps: CardProps = {
  title: MOCK_TITLE,
  caption: MOCK_CAPTION,
  imageSource: MOCK_IMAGE,
  onFavoritePress: mockOnFavoritePress,
  onPressCard: mockOnPressCard,
};

const setup = (props?: Partial<CardProps>) => {
  render(<Card {...defaultProps} {...props} />);
};

describe('Card', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title and caption correctly', () => {
    setup();

    expect(screen.getByText(MOCK_TITLE)).toBeOnTheScreen();
    expect(screen.getByText(MOCK_CAPTION)).toBeOnTheScreen();
  });

  it('renders the image with the correct source URI', () => {
    setup();

    const image = screen.UNSAFE_queryByType(require('react-native').Image);
    expect(image?.props.source).toEqual({ uri: MOCK_IMAGE });
  });

  it('calls onPressCard when the main card is pressed', () => {
    setup();

    fireEvent.press(screen.getByText(MOCK_TITLE));

    expect(mockOnPressCard).toHaveBeenCalledTimes(1);
  });

  it('calls onFavoritePress when the heart button is pressed', () => {
    setup();

    fireEvent.press(screen.getByRole('button'));

    expect(mockOnFavoritePress).toHaveBeenCalledTimes(1);
  });

  it('renders the footer content when provided', () => {
    const MockFooter = <View testID="card-footer" />;
    setup({ footer: MockFooter });

    expect(screen.getByTestId('card-footer')).toBeOnTheScreen();
  });

  it('renders the Heart icon with correct props', () => {
    setup();

    const heartIcon = screen.UNSAFE_queryByType(
      require('lucide-react-native').Heart,
    );

    expect(heartIcon).toBeTruthy();
    expect(heartIcon?.props.size).toBe(18);
    expect(heartIcon?.props.fill).toBe('none');
  });
});
