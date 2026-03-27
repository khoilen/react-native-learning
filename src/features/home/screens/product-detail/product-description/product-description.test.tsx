import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { ProductDescription } from './product-description';

const MOCK_DESCRIPTION =
  'This is a long product description that should be expandable.';

const setup = (description = MOCK_DESCRIPTION) =>
  render(<ProductDescription description={description} />);

describe('ProductDescription', () => {
  it('renders the title and description correctly', () => {
    setup();

    expect(screen.getByText('Product Description')).toBeTruthy();
    expect(screen.getByText(MOCK_DESCRIPTION)).toBeTruthy();
  });

  it('shows "Read more..." by default and "Show less" when expanded', () => {
    setup();

    const toggleButton = screen.getByText('Read more...');
    expect(toggleButton).toBeTruthy();

    fireEvent.press(toggleButton);
    expect(screen.getByText('Show less')).toBeTruthy();

    fireEvent.press(screen.getByText('Show less'));
    expect(screen.getByText('Read more...')).toBeTruthy();
  });

  it('toggles numberOfLines prop when the button is pressed', () => {
    setup();

    const descriptionText = screen.getByText(MOCK_DESCRIPTION);

    expect(descriptionText.props.numberOfLines).toBe(4);

    fireEvent.press(screen.getByText('Read more...'));
    expect(descriptionText.props.numberOfLines).toBeUndefined();
  });
});
