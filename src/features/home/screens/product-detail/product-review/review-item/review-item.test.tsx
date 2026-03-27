import { render, screen } from '@testing-library/react-native';
import { theme } from '@ui-base/theme/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ReviewItem, type ReviewItemProps } from './review-item';

const defaultProps: ReviewItemProps = {
  avatar: 'https://example.com',
  comment: 'This is a great product!',
  date: '2 days ago',
  name: 'John Doe',
  rating: 4,
};

const setup = (props?: Partial<ReviewItemProps>) =>
  render(<ReviewItem {...defaultProps} {...props} />);

describe('ReviewItem', () => {
  it('renders user information and comment correctly', () => {
    setup();

    expect(screen.getByText(defaultProps.name)).toBeTruthy();
    expect(screen.getByText(defaultProps.date)).toBeTruthy();
    expect(screen.getByText(defaultProps.comment)).toBeTruthy();
  });

  it('renders the correct number of highlighted stars based on rating', () => {
    const rating = 3;
    setup({ rating });

    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);

    expect(StyleSheet.flatten(stars[0].props.style)).toMatchObject({
      color: theme.colors.yellow,
    });

    expect(StyleSheet.flatten(stars[4].props.style)).toMatchObject({
      color: theme.colors.border,
    });
  });

  it('renders the avatar image with the correct uri', () => {
    const { UNSAFE_getByType } = setup();
    const { Image } = require('react-native');

    const image = UNSAFE_getByType(Image);
    expect(image.props.source).toEqual({ uri: defaultProps.avatar });
  });
});
