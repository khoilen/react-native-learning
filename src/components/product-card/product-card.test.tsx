import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { ProductCard, ProductCardProps } from './product-card';

jest.mock('lucide-react-native', () => ({
  Plus: () => null,
  Heart: () => null,
}));

const mockOnAddPress = jest.fn();

const MOCK_TITLE = 'Smartphone';
const MOCK_CATEGORY = 'Electronics';
const MOCK_PRICE = '999';
const MOCK_IMAGE = 'https://test.com';

const defaultProps: ProductCardProps = {
  title: MOCK_TITLE,
  category: MOCK_CATEGORY,
  price: MOCK_PRICE,
  imageSource: MOCK_IMAGE,
  onAddPress: mockOnAddPress,
  testId: 'product-card-test',
};

const setup = (props?: Partial<ProductCardProps>) => {
  render(<ProductCard {...defaultProps} {...props} />);
};

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the product title and category correctly', () => {
    setup();

    expect(screen.getByText(MOCK_TITLE)).toBeOnTheScreen();
    expect(screen.getByText(MOCK_CATEGORY)).toBeOnTheScreen();
  });

  it('renders the formatted price using the real utility', () => {
    setup({ price: '1500' });

    expect(screen.getByText(/1.*500/)).toBeOnTheScreen();
  });

  it('calls onAddPress when the plus button is pressed', () => {
    setup();

    const buttons = screen.getAllByRole('button');
    const addButton = buttons[0];

    fireEvent.press(addButton);

    expect(mockOnAddPress).toHaveBeenCalledTimes(1);
  });

  it('renders the Plus icon inside the add button', () => {
    setup();

    const plusIcon = screen.UNSAFE_queryByType(
      require('lucide-react-native').Plus,
    );

    expect(plusIcon?.props.size).toBe(16);
  });

  it('passes the testId to the underlying Card component', () => {
    setup({ testId: 'custom-product-id' });

    expect(screen.getByTestId('custom-product-id')).toBeOnTheScreen();
  });

  it('renders the base Card components (Image) correctly', () => {
    setup();

    const image = screen.UNSAFE_queryByType(require('react-native').Image);
    expect(image?.props.source).toEqual({ uri: MOCK_IMAGE });
  });
});
