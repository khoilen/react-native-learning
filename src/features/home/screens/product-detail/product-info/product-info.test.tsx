import { Product } from '@/types/product';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { ProductInfo, type ProductInfoProps } from './product-info';

jest.mock('lucide-react-native', () => ({
  Heart: jest.fn(() => null),
}));

const MOCK_PRODUCT: Product = {
  id: 1,
  name: 'Running Shoes',
  price: 150,
  priceUnit: '$',
  image: 'test.jpg',
  description: 'Test description',
};

const defaultProps: ProductInfoProps = {
  product: MOCK_PRODUCT,
};

const setup = (props?: Partial<ProductInfoProps>) =>
  render(<ProductInfo {...defaultProps} {...props} />);

describe('ProductInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the product name and price correctly', () => {
    setup();

    expect(screen.getByText(MOCK_PRODUCT.name)).toBeTruthy();
    expect(screen.getByText(`$${MOCK_PRODUCT.price}`)).toBeTruthy();
  });

  it('renders the NEW ARRIVAL label', () => {
    setup();

    expect(screen.getByText('NEW ARRIVAL')).toBeTruthy();
  });

  it('renders the Heart icon', () => {
    const { Heart } = require('lucide-react-native');
    setup();

    expect(Heart).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 24,
      }),
      undefined,
    );
  });
});
